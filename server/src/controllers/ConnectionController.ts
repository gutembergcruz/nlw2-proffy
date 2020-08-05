import { Request, Response } from 'express';
import db from '../database/connection';

export default class ConnectionsController {
  async index(req: Request, resp: Response) {
    const totalConnections = await db('connections').count('* as total');
    const { total } = totalConnections[0];
    return resp.json({ total });
  }
  async create(req: Request, resp: Response) {
    const { user_id } = req.body;

    await db('connections').insert({
      user_id,
    });

    return resp.status(201).send();
  }
}
