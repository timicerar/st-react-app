import React from "react"
import ReactDOM from "react-dom"
import "./i18n"
import { configure } from "mobx"
import App from "./App"

configure({ enforceActions: "observed" })

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root"),
)
