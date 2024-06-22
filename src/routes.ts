import {Router} from "express";
import axios from "axios";
import multer from "multer";

const routes = Router();
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

routes.get("/", async(req, res) => {
    res.send("Hayya Alassalah API working OK");
});

async function getPrayerTimings(address : string, date
    ?
    : string, school : number = 1, method
    ?
    : string) {
    try {
        const apiUrl = `http://api.aladhan.com/v1/timingsByAddress/${date}?address=${address}&school=${school}&method=${method || ""}`;
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error("Error fetching prayer timings:", error.message);
        throw new Error("Error fetching prayer timings");
    }
}

routes.get("/qibla", async(req, res) => {
    try {
        const {address} = req.query;
        const prayerTimings = await getPrayerTimings(address.toString());
        const {latitude, longitude} = prayerTimings.data.meta;
        const qiblaApiUrl = `http://api.aladhan.com/v1/qibla/${latitude}/${longitude}`;
        const qiblaResponse = await axios.get(qiblaApiUrl);
        res.json(qiblaResponse.data);
    } catch (error) {
        console.error("Error fetching Qibla direction:", error.message);
        res
            .status(500)
            .send("Error fetching Qibla direction");
    }
});

routes.get("/timings/", async(req, res) => {
    try {
        const {
            address,
            date,
            school = 1,
            method
        } = req.query;
        const response = await getPrayerTimings(address.toString(), date
            ? date.toString()
            : null, parseInt(school.toString()), method
            ? method.toString()
            : null);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching prayer timings:", error.message);
        res
            .status(500)
            .send("Error fetching prayer timings");
    }
});

export default routes;