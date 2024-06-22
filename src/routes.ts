import { Router } from "express";
import axios from "axios";
import multer from "multer";

const routes = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

routes.get("/", async (req, res) => {
  res.send("Hayya Alassalah API working OK");
});

routes.get("/timings/", async (req, res) => {
  try {
    const { date, address, school = 1, method } = req.query;

    // Construct the Aladhan API URL
    const apiUrl = `http://api.aladhan.com/v1/timingsByAddress/${date}?address=${address}&school=${school}&method=${method || ""}`;

    // Make a request to the Aladhan API
    const response = await axios.get(apiUrl);

    // Send the prayer timings data back to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching prayer timings:", error.message);
    res.status(500).send("Error fetching prayer timings");
  }
});

export default routes;
