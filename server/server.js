import express from "express";
import * as path from "path";

const app = express();

app.get("/api/login", (req, res) => {
  if (req.user) {
    const { username, fullName } = req.user;
    return res.json({ username, fullName });
  } else {
    res.sendStatus(204);
  }
});

app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`server started at http://localhost:${server.address().port}`);
});
