import express from 'express';

export const profileRoutes = express.Router();

profileRoutes.post('/profile/update', update);

// Callback functions
import { updateProfile } from '../services/mySQLServices.mjs';

async function update(req, res) {
    console.log(req.body);
    updateProfile(req.body);
}

