import React from "react";
import ReactDOM from "react-dom/client";
import { StarRating } from "./StarRating";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <StarRating
      maxRating={5}
      size={30}
      defaultRating = {3}
      color={"#eab308"}
      starMessages={["Awful", "Meh", "Decent", "Great", "Awesome"]}
    />
  </React.StrictMode>
);
