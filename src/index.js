import React from "react";
import ReactDOM from "react-dom/client";
import { StarRating } from "./StarRating";
import { useState } from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));

const Test = () => {
    const [userMovieRating, setuserMovieRating] = useState(null);

    return (
        <div>
            the movies is rated {userMovieRating}
            <StarRating
                maxRating={"efadwad"}
                size={30}
                defaultRating={3}
                color={"#eab308"}
                starMessages={["Awful", "Meh", "Decent", "Great", "Awesome"]}
                setuserMovieRating={setuserMovieRating}
            />
        </div>
    );
};

root.render(
    <React.StrictMode>
        <Test />
    </React.StrictMode>
);
