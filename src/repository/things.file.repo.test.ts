import { ThingsFileRepo } from './things.file.repo';
import fs from 'fs/promises';
import { Thing } from '../entities/thing';
jest.mock('fs/promises');

describe('Given ThingsFileRepo', () => {
  const repo = new ThingsFileRepo();
  test('Then it could be instantiated', () => {
    expect(repo).toBeInstanceOf(ThingsFileRepo);
  });

  describe('When I use the query method', () => {
    test('Then should return the data', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[]');
      const result = await repo.query();
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When I use queryID method', () => {
    test('Then it should return an object if it has a valid id', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{"id": "1"}]');
      const id = '1';
      const result = await repo.queryId(id);
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
    test('Then it should throw an error if it has a NO valid id', () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{"id": "2"}]');
      const id = '1';
      expect(async () => repo.queryId(id)).rejects.toThrow();
      expect(fs.readFile).toHaveBeenCalled();
    });
  });

  describe('When I use create method', () => {
    test('Then it should return an object', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[]');
      const newThing: Thing = { id: '1', name: 'test', week: 2, level: 2 };
      const result = await repo.create(newThing);
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual(newThing);
    });
  });
  describe('When I use update method', () => {
    test('Then it should return the updated object if it has the same id', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        '[{ "id": "1", "name": "test", "week": 3, "level": 2 }]'
      );
      const result = await repo.update({
        id: '1',
        name: 'test',
        week: 2,
        level: 2,
      });
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual({ id: '1', name: 'test', week: 2, level: 2 });
    });
    test('Then it should throw an error if it has a different id', () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        '[{ "id": "1", "name": "test", "week": 3, "level": 2 }]'
      );
      expect(async () =>
        repo.update({
          id: '2',
          name: 'test',
          week: 2,
          level: 2,
        })
      ).rejects.toThrow();
      expect(fs.readFile).toHaveBeenCalled();
    });
  });
  describe('When I use delete method', () => {
    test('Then if the ID if ound, then should delete the thing', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        '[{ "id": "1", "name": "test", "week": 3, "level": 2 }]'
      );
      const result = await repo.delete('1');
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toBe(undefined);
    });
    test('Then it should throw an error if it has a NO valid id', () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        '[{ "id": "1", "name": "test", "week": 3, "level": 2 }]'
      );
      expect(async () => repo.delete('2')).rejects.toThrow();
      expect(fs.readFile).toHaveBeenCalled();
    });
  });
});
