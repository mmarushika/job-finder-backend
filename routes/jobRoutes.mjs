import express from 'express';

export const jobRoutes = express.Router();

jobRoutes.get('/jobs', getJob);
jobRoutes.get('/jobs/all', getAllJobs);
jobRoutes.post('/jobs/post', postJob);
jobRoutes.post('/jobs/delete', deleteJob);

// Callback functions
import { addJobListing, getJobListings, getAllJobListings, deleteJobListing } from '../services/mySQLServices.mjs';

async function postJob(req, res) {
    addJobListing(req.body);
}

async function deleteJob(req, res) {
    console.log("delete job", req.body);
    deleteJobListing(req.body);
}
async function getJob(req, res) {
    res.set({
        "Content-Type": "application/json"
    })
    const data = await getJobListings(req.query.user);
    //console.log(data);
    res.send(JSON.stringify(data));
}

async function getAllJobs(req, res) {
    res.set({
        "Content-Type": "application/json"
    })
    const data = await getAllJobListings();
    //console.log("all", data);
    res.send(JSON.stringify(data));
}

