import type {Request, Response} from 'express';
import ShopCollection from './collection';
import * as userValidator from '../user/middleware';
import express from 'express';

const router = express.Router();

/**
 * Get all shops
 * @name GET /api/shops
 *
 * @return - all shops
 */
router.get(
  '/',
  async (req: Request, res: Response) => {
    const allShops = await ShopCollection.findAll();
    res.status(200).json(allShops);
  }
);

/**
 * Get all shops within radius, physical proximity
 * @name GET /api/shops/:local
 *
 * @return - all shops within radius, physical proximity
 */
router.get(
  '/:local',
  async (req: Request, res: Response) => {
    const {location, radius} = req.body;
    const allLocalShops = await ShopCollection.findShopsWithinRadiusOfLocation(location, radius);
    res.status(200).json(allLocalShops);
  }
);

export {router as shopRouter};