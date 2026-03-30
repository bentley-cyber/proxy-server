import express from "express";

const app = express();

app.get("*", async (req, res) => {
  const target = "https://www.nike.com" + req.originalUrl;

  try {
    const response = await fetch(target, {
      headers: { "User-Agent": req.headers["user-agent"] },
    });
    const body = await response.text();
    res.status(response.status).send(body);
  } catch (err) {
    res.status(500).send("Error fetching site");
  }
});

app.listen(process.env.PORT || 10000, () => {
  console.log("Proxy running");
});
