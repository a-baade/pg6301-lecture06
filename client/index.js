import React, { useState } from "react";
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("api/login", {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: {
        "content-type": "application/json",
      },
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div>
        Username:{" "}
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        Password:{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button>Log-in</button>
      </div>
      <pre>{JSON.stringify({ username, password }, undefined, " ")}</pre>
    </form>
  );
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
