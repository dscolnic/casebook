// Minimal static server so Replit (or any host) can run the RECKON site
// straight from this GitHub repo. Serves every file; "/" opens the hub.
const express = require("express");
const path = require("path");

const app = express();
const ROOT = __dirname;

app.get("/", (_req, res) => res.redirect("/reckon.html"));
app.use(express.static(ROOT, { extensions: ["html"] }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => console.log("RECKON running on port " + PORT));
