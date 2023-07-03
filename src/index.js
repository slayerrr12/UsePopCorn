import React from "react";
import ReactDOM from "react-dom/client";
import { StarRating } from "./StarRating";
import { useState } from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));

const Test = () => {
    const [userMovieRating, setuserMovieRating] = useState(null);

    return (
        <div>
            
        </div>
    );
};

root.render(
    <React.StrictMode>
        <Test />
    </React.StrictMode>
);
