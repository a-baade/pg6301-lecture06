import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

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

async function fetchJSON(url) {
  const res = await fetch(url);
  return await res.json();
}

function useLoader(loadingFn) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();
  useEffect(async () => {
    setLoading(true);
    try {
      setData(await loadingFn());
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, data };
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
