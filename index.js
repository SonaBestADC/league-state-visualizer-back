import process from "node:process";
import express from "express";
import cors from "cors";
const key = process.env.KEY;
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", (req, res) => {
  res.send("uWu!");
});

app.get("/user", async (req, res) => {
  const { name, tag } = req.body;
  const url =
    `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${key}`;
  try {
    const responce = await fetch(url, {
      method: "GET",
    });
    if (!responce.ok) {
      throw new Error(`ERROR ${responce.status}`);
    }
    const data = await responce.json();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/ranked-stats", async (req, res) => {
  const { puid } = req.body;
  const url =
    `https://na1.api.riotgames.com/lol/league/v4/entries/by-puuid/${puid}?api_key=${key}`;
  try {
    const responce = await fetch(url, {
      method: "GET",
    });
    if (!responce.ok) {
      throw new Error(`ERROR ${responce.status}`);
    }
    const data = await responce.json();
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/champ-masteries", async (req, res) => {
  const { puid } = req.body;
  const url =
    `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puid}?api_key=${key}`;
  try {
    const responce = await fetch(url, {
      method: "GET",
    });
    if (!responce.ok) {
      throw new Error(`ERROR ${responce.status}`);
    }
    const data = await responce.json();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT, () => (
  console.log(`Listening on port ${process.env.PORT}`)
));

