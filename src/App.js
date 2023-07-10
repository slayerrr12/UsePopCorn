import "./index.css";
import StarRating from "./StarRating";

import { memo, useEffect, useState } from "react";

const imageStyle = {
  padding: '10px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  transition: 'box-shadow 0.3s ease-in-out'
};

const styleObj = {
  fontSize: 14,
  color: "#4a54f1",
  textAlign: "center",
  paddingTop: "10px",
}

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const SelectedMovieCard = ({ movieId , setUserRating ,setSelectedMovieId}) => {

  const [title, setTitle] = useState(null);
  const [rating, setRating] = useState(null);
  const [plot, setPlot] = useState(null);
  const [poster, setPoster] = useState(null);
  const [starring, setStarring] = useState(null)

  useEffect(() => {
    async function fetchMoviesData() {
      if (movieId === "") {
        return;
      }

      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=a8902e28&i=${movieId}`
        );

        const data = await res.json();
        const { Plot, Title, Ratings, Poster, Actors } = data;
        console.log(data)
        setTitle(` ${Title}`);
        setPoster(Poster);
        setRating(Ratings[0].Value);
        setPlot(`${Plot}`);
        setStarring(Actors)
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchMoviesData();
  }, [movieId]);

  return (
    <div>

      
      <div className="details-overview">
        <header >
        <img src={poster} style={imageStyle} alt="movie poster" />
          <h2>{title}</h2>

          <span style={{ color: "orange", fontWeight: 700 }}>
            {" "}
            ⭐ {rating} IMDb rating{" "}
          </span>
        </header>
        <StarRating setUserMovieRating = {setUserRating}/>
        <section>
          <p>
            {plot}
          </p>
          <p style={
            styleObj
          }>
            Starring :

          </p>
          <p>
            {starring}
          </p>
        </section>

      <button onClick={(e)=>{
        e.preventDefault();
        setSelectedMovieId(null)
      }} className="back-button">
         Back
      </button>
      </div>

    </div>
  );
};

export default function App() {
  const [userRating, setUserRating] = useState(null)
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [watched, setWatched] = useState(tempWatchedData);
  const [error, setError] = useState(false);
  const onChangeQuery = (e) => {
    e.preventDefault();

    const queryValue = e.target.value;
    setQuery(queryValue);
  };

  //side effect code
  useEffect(() => {
    async function fetchMoviesData() {
      if (query === "") {
        return;
      }

      setError(false);
      setLoading(true);
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?s=${query
            .trim()
            .replace(/\s+/g, " ")}&apikey=a8902e28`
        );

        const data = await res.json();
        console.log("data fetch from api was successfull");

        setMovies(data.Search);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchMoviesData();
  }, [query]);

  return (
    <>
      <NavBar>
        <Search onChangeQuery={onChangeQuery} query={query} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {error && <Error />}
          {!error &&
            (loading ? <LoadingSpinner /> : <MovieList movies={movies} setMovieSelectHandler = {setSelectedMovieId} />)}
        </Box>

        <Box>
          {!selectedMovieId ? (
            <span>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </span>
          ) : (
          <SelectedMovieCard setUserRating = {setUserRating} movieId={selectedMovieId} setSelectedMovieId = {setSelectedMovieId}/>
          )}
        </Box>
      </Main>
    </>
  );
}

function Error({ errorMessage }) {
  return (
    <p>
      Oops! Something went wrong...{errorMessage ? `: ${errorMessage}` : ""}.
    </p>
  );
}

function LoadingSpinner() {
  console.log("loading");
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ onChangeQuery, query }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={onChangeQuery}
    />
  );
}

function NumResults({ movies }) {
  if (!movies) {
    return null; // or you can display a loading indicator
  }

  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && children}
    </div>
  );
}

function MovieList({ movies , setMovieSelectHandler }) {

  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID}  setMovieSelectHandler = {setMovieSelectHandler}/>
      ))}
    </ul>
  );
}

function Movie({ movie , setMovieSelectHandler }) {
  return (
    <li  onClick={(e)=>{
      const {imdbID} = movie
      e.preventDefault()
      setMovieSelectHandler(imdbID)
    }}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
