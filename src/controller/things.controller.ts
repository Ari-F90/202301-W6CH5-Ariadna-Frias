/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import { Response, Request, response } from 'express';
import { Things } from '../models/models.js';
import { ThingsFileRepo } from '../repository/things.file.repo.js';

export class ThingsController {
  constructor(public repo: ThingsFileRepo) {}

  getAll(_req: Request, resp: Response) {
    this.repo.read().then((data) => {
      resp.json(data);
    });
  }

  get(req: Request, resp: Response) {
    this.repo.read().then((data) => {
      const { id } = req.params;
      const infoId = data.find((item) => item.id === Number(id));
      resp.json(infoId);
    });
  }

  post(req: Request, resp: Response) {
    this.repo.write(req.body).then((data) => {
      resp.send('Added');
    });
  }

  async patch(req: Request, resp: Response) {
    const id = Number(req.params.id);
    const prevThing: any = await this.repo.readById(id);
    const newThing = req.body;
    const updateThing = Object.assign(prevThing, newThing);
    await this.repo.update(updateThing);
    resp.send('Updated');
  }

  delete(req: Request, resp: Response) {
    const { id } = req.params;
    this.repo.delete(Number(id)).then((data) => {
      resp.send('Deleted');
    });
  }
}
