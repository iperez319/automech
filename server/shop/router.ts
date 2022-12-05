import type { Request, Response } from "express";
import ShopCollection from "./collection";
import * as userValidator from "../user/middleware";
import express from "express";
import transformShopResponse from "./util";

const router = express.Router();

/**
 * Get all shops
 * @name GET /api/shops
 *
 * @return - all shops
 */
router.get("/", async (req: Request, res: Response) => {
  const allShops = await ShopCollection.findAll();
  let response = allShops.map((shop) => transformShopResponse(shop));

  console.log(JSON.parse(JSON.stringify(response[0])));
  res.status(200).json(response);
});

/**
 * Get all shops within radius, physical proximity
 * @name POST /api/shops/:local
 *
 * @return - all shops within radius, physical proximity
 */
router.post("/:local", async (req: Request, res: Response) => {
  const { location, radius } = req.body;
  const allLocalShops = await ShopCollection.findShopsWithinRadiusOfLocation(
    location,
    radius
  );

  let response = allLocalShops.map((shop) => transformShopResponse(shop));
  console.log(allLocalShops.length);
  res.status(200).json(response);
});

export { router as shopRouter };
