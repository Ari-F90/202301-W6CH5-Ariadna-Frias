/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import { Response, Request, response } from 'express';
import { ThingsFileRepo } from '../repository/things.file.repo.js';

export class ThingsController {
  constructor(public repo: ThingsFileRepo) {}

  getAll(_req: Request, resp: Response) {
    this.repo.read().then((data) => {
      resp.json(data);
    });
  }

  get(req: Request, resp: Response) {
    this.repo.readById(Number(req.params.id)).then((data) => resp.json(data));
  }

  post(_req: Request, _resp: Response) {}
  patch(_req: Request, _resp: Response) {}
  delete(_req: Request, _resp: Response) {}
}
