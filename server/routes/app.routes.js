import express from 'express';
const routes = express.Router();

import * as controllers from '../controllers/app.controllers.js';

routes.get('/loginUser', controllers.loginUser);
routes.get('/logoutUser', controllers.logoutUser);
routes.get('/isUserExists', controllers.isUserExists);

export default routes;