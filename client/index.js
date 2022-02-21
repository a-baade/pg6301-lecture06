import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Frontpage() {
  return (
    <div>
      <h1>Movie Application</h1>
      <div>
        <ul>
          <li>
            <Link to={"/login"}> Login </Link>
          </li>
          <li>
            {" "}
            <Link to={"/register"}> Register </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Login() {
  return <h1>Hello User</h1>;
}

function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
