import fs from 'fs/promises';

const file = 'data/data.json';

import { Things } from '../models/things.js';

export class ThingsFileRepo {
  read() {
    return fs
      .readFile(file, { encoding: 'utf-8' })
      .then((data) => JSON.parse(data) as Things[]);
  }

  async readById(id: Things['id']) {
    const info = await fs.readFile(file, { encoding: 'utf-8' });
    const infoParse: Things[] = JSON.parse(info);
    return infoParse.find((item) => item.id === id);
  }

  async write(info: Things) {
    const infoAdd = await fs.readFile(file, { encoding: 'utf-8' });
    const dataInfoAdd: Things[] = JSON.parse(infoAdd);
    const totalData = JSON.stringify([...dataInfoAdd, info]);
    await fs.writeFile(file, totalData, { encoding: 'utf-8' });
  }

  async update(info: Things) {
    const infoUpdate = await fs.readFile(file, { encoding: 'utf-8' });
    const dataInfoUpdate: Things[] = JSON.parse(infoUpdate);
    const updateData = dataInfoUpdate.map((item) =>
      item.id === info.id ? info : item
    );
    const finalData = JSON.stringify(updateData);
    await fs.writeFile(file, finalData, { encoding: 'utf-8' });
  }

  async delete(id: Things['id']) {
    const infoDelete = await fs.readFile(file, { encoding: 'utf-8' });
    const dataInfoDelete: Things[] = JSON.parse(infoDelete);
    const restData = dataInfoDelete.filter((item) => item.id !== id);
    const restFinalData = JSON.stringify(restData);
    await fs.writeFile(file, restFinalData, { encoding: 'utf-8' });
  }
}
