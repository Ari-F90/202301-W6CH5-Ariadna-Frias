import { Response, Request, NextFunction } from 'express';
import { Thing } from '../entities/thing';
import { ThingsFileRepo } from '../repository/things.file.repo';
import { ThingsController } from './things.controller';

describe('Given ThingsController', () => {
  const repo: ThingsFileRepo = {
    create: jest.fn(),
    query: jest.fn(),
    queryId: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    search(query: { key: string; value: unknown }): Promise<Thing[]> {
      throw new Error('Function not implemented.');
    },
  };

  const req = {
    body: {},
    params: { id: '' },
  } as unknown as Request;
  const resp = {
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn() as NextFunction;

  const controller = new ThingsController(repo);

  describe('When we use getAll', () => {
    test('Then if it should be no errors', async () => {
      await controller.getAll(req, resp, next);
      expect(repo.query).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if there are errors', async () => {
      (repo.query as jest.Mock).mockRejectedValue(new Error(''));
      await controller.getAll(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When we use get', () => {
    test('Then if it should be no errors', async () => {
      await controller.get(req, resp, next);
      expect(repo.queryId).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if there are errors', async () => {
      (repo.queryId as jest.Mock).mockRejectedValue(new Error(''));
      await controller.get(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When we use post', () => {
    test('Then if it should be no errors', async () => {
      await controller.post(req, resp, next);
      expect(repo.create).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if there are errors', async () => {
      (repo.create as jest.Mock).mockRejectedValue(new Error(''));
      await controller.post(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When we use patch', () => {
    test('Then if it should be no errors', async () => {
      await controller.patch(req, resp, next);
      expect(repo.update).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if there are errors', async () => {
      (repo.update as jest.Mock).mockRejectedValue(new Error(''));
      await controller.patch(req, resp, next);
      expect(repo.update).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When we use delete', () => {
    test('Then if it should be no errors', async () => {
      await controller.delete(req, resp, next);
      expect(repo.delete).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });
});
