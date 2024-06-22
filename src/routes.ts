import { Router } from "express";
import multer from "multer";

const routes = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

routes.get("/", async (req, res) => {
  res.send("Hayya Alassalah API working OK");
});

export default routes;
