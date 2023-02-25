import fs from 'fs/promises';

const file = 'data/data.json';

import { Things } from '../models/models.js';

export class ThingsFileRepo {
  read() {
    return fs
      .readFile(file, { encoding: 'utf-8' })
      .then((data) => JSON.parse(data) as Things[]);
  }

  async readById(id: Things['id']) {
    const infoId = await fs.readFile(file, { encoding: 'utf-8' });
    const dataParse: Things[] = JSON.parse(infoId);
    return dataParse.filter((item) => item.id === id)[0];
  }

  write() {}

  update() {}
  delete() {}
}
