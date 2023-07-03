import React from "react";
import ReactDOM from "react-dom/client";
import { StarRating } from "./StarRating";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <StarRating maxRating={10} size={30} color={"#eab308"} />

    </React.StrictMode>
);
