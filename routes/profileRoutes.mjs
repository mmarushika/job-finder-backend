import express from 'express';

export const profileRoutes = express.Router();

profileRoutes.get('/profile', get);
profileRoutes.post('/profile/update', update);

// Callback functions
import { getProfile, updateProfile } from '../services/mySQLServices.mjs';

async function update(req, res) {
    console.log(req.body);
    updateProfile(req.body);
}

async function get(req, res) {
    res.set({
        "Content-Type": "application/json"
    })
    const data = await getProfile(req.query.user);
    console.log(data);
    res.send(JSON.stringify(data));
}
