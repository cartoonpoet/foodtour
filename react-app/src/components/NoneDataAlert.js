import React from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import "./NoneDataAlert.css";

function NoneDataAlert(props) {
    return (
        <div className="no-data-box">
            <AiOutlineExclamationCircle /> &nbsp;{props.message}
        </div>
    );
}

export default NoneDataAlert;