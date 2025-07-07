import process from "node:process";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import DatabaseHandler from "./databaseHandler.js";
const database = await DatabaseHandler.init();
dotenv.config();
const key = process.env.KEY;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("uWu!");
});

app.get("/user", async (req, res) => {
  const { name, tag } = req.query;
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
  const { puuid } = req.query;
  const url =
    `https://na1.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}?api_key=${key}`;
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

app.get("/champ-masteries", async (req, res) => {
  const { puuid } = req.query;
  const url =
    `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}?api_key=${key}`;
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

app.get("/all-records", async (req, res) => {
  try {
    const data = await database.getAllRecords();
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/addRecord", async (req, res) => {
  try {
    const insertedRecord = await database.addRecord(req.body);
    res.json(insertedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/record/:puuid", async (req, res) => {
  try {
    const result = await database.getRecordsByPuuid(req.params.puuid);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(process.env.PORT, () => (
  console.log(`Listening on port ${process.env.PORT}`)
));
