/* eslint-disable new-cap */
import { Router } from 'express';
import { ThingsController } from '../controllers/things.controller.js';
import { ThingsMongoRepo } from '../repository/things.mongo.repo.js';

export const thingsRouter = Router();
const repo = new ThingsMongoRepo();
const controller = new ThingsController(repo);

thingsRouter.get('/', controller.getAll.bind(controller));
thingsRouter.get('/:id', controller.get.bind(controller));
thingsRouter.post('/', controller.post.bind(controller));
thingsRouter.patch('/:id', controller.patch.bind(controller));
thingsRouter.delete('/:id', controller.delete.bind(controller));
