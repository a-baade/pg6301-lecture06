import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { fetchJSON } from "./http";
import { useLoader } from "./useLoader";

function LoginLinks() {
  return (
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
  );
}

function Frontpage() {
  const { loading, error, data } = useLoader(
    async () => await fetchJSON("api/login")
  );
  const user = data;

  if (loading) {
    return <div>LOADING...</div>;
  }
  if (error) {
    return (
      <div
        style={{ border: "1px solid red", background: "Pink", width: "30%" }}
      >
        An error occurred: {error.toString()}
      </div>
    );
  }

  return (
    <div>
      <h1>Movie Application</h1>
      {user ? (
        <div>
          {user.fullName} ({user.username})
        </div>
      ) : (
        <LoginLinks />
      )}
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
