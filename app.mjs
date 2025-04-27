import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from "express-fileupload";

import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 8000;

app.use(fileUpload());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

import {entryRoutes} from './routes/entryRoutes.mjs';
import { profileRoutes } from './routes/profileRoutes.mjs';
import { jobRoutes } from './routes/jobRoutes.mjs';

app.use(entryRoutes);
app.use(profileRoutes);
app.use(jobRoutes);

app.get("/jobs/all", async (req, res) => {
    const data = await getJobListings();
    res.set({
        "Content-Type": "application/json"
    })
    res.send(JSON.stringify(data));
});




app.listen(port, () => {
    console.log(`listening on ${port}`);
})