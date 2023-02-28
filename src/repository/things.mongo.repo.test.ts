/* eslint-disable @typescript-eslint/no-var-requires */
import { ThingsMongoRepo } from './things.mongo.repo';
import { ThingModel } from './things.mongo.model';

jest.mock('./things.mongo.model');
describe('Given ThingsMongoRepo', () => {
  const repo = new ThingsMongoRepo();

  test('Then should be instanced', () => {
    expect(repo).toBeInstanceOf(ThingsMongoRepo);
  });

  describe('When I use query method', () => {
    test('Then should return the data', async () => {
      (ThingModel.find as jest.Mock).mockResolvedValue([]);
      const result = await repo.query();
      expect(ThingModel.find).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When I use queryId method', () => {
    test('Then it should return an object', async () => {
      (ThingModel.findById as jest.Mock).mockResolvedValue({ id: '1' });
      const id = '1';
      const result = await repo.queryId(id);
      expect(ThingModel.findById).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
  });

  describe('When I use create method', () => {
    test('Then it should return an object', async () => {
      (ThingModel.create as jest.Mock).mockResolvedValue({
        name: 'test',
        week: 2,
        level: 3,
      });
      const newThing = {
        name: 'test',
        week: 2,
        level: 3,
      };
      const result = await repo.create(newThing);
      expect(result).toStrictEqual(newThing);
    });
  });

  describe('When I use update method', () => {
    test('Then it should return the updated object', async () => {
      (ThingModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        id: '1',
        name: 'thing',
        week: 2,
        level: 3,
      });
      const result = await repo.update({
        id: '1',
        name: 'thing',
        week: 2,
        level: 3,
      });
      expect(ThingModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(result).toStrictEqual({
        id: '1',
        name: 'thing',
        week: 2,
        level: 3,
      });
    });
    describe('When I use delete method', () => {
      test('Then if the ID found, then should delete the thing', async () => {
        (ThingModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
          '[{"id": "1"}]'
        );
        const id = '1';
        const result = await repo.delete(id);
        expect(ThingModel.findByIdAndDelete).toHaveBeenCalled();
        expect(result).toBeUndefined();
      });
    });
  });
});
