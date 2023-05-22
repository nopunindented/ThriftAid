import React from "react";
import { ReactDOM } from "react";
import Navbar from "../navbar/Navbar";
import Homebody from "./homepagesetup/homebody";

export default function Homepage () {
    return (
        <div className="homep">
            <Homebody />
            <Navbar />
        </div>
    )
}
