import express from 'express';

export const entryRoutes = express.Router();

entryRoutes.post('/signup', signup);
entryRoutes.get('/login', login);
//entryRoutes.post('/logout', logout)


// Callback function
import { createUser, getUser } from '../services/mySQLServices.mjs';
async function signup(req, res) {
    const { username, password } = req.body;
    createUser(username, password);
}
async function login(req, res) {
    const { username, password } = req.query;
    const result = await getUser(username);
    console.log(password, result.password, password===result.password);
    if(result.password === password) {
        res.send({isAuthenticated: true})
    } else {
        res.send({isAuthenticated: false})
    }
}