// @ts-nocheck
import type { Request, Response } from "express";
import ShopCollection from "../shop/collection";
import ServiceCollection from "./collection";
import express from "express";
import type { Model } from "../review/model";
import type { Service } from "./model";
import type { ShopRequest } from "../shop/model";
import * as userValidator from "../user/middleware";
import { formatService } from "./util";

const router = express.Router();

function getPercentile(value: number, q1: number, q2: number, q3: number) {
  // Check if the value is less than the first quartile
  if (value <= q1) {
    // The percentile is the lower bound of the first quartile
    return Math.floor((25 * value) / q1);
  }

  // Check if the value is less than the second quartile
  if (value <= q2) {
    // The percentile is the upper bound of the first quartile
    return Math.ceil(25 + ((50 - 25) * (value - q1)) / (q2 - q1));
  }

  // Check if the value is less than the third quartile
  if (value <= q3) {
    // The percentile is the upper bound of the second quartile
    return Math.ceil(50 + ((75 - 50) * (value - q2)) / (q3 - q2));
  }

  // The value is greater than or equal to the third quartile
  // The percentile is the upper bound of the third quartile
  return Math.ceil((100 * value) / q3);
}

router.post("/compare", async (req: Request, res: Response) => {
  const {
    car,
    services,
    shop,
  }: { car: Model; services: Service[]; shop: ShopRequest } = req.body;

  const { result } = await ServiceCollection.getQuartilesForLocation(
    services.map((s) => s.name),
    shop.coordinates
  );

  if (result.length == 0) {
    res.status(400).json({
      message: "No data available",
    });
    return;
  }

  const totalCost = services.reduce((a, b) => a + b.price, 0);

  const totalFirstQuartile = result.reduce((a, b) => a + b.firstQuartile, 0);
  const totalSecondQuartile = result.reduce((a, b) => a + b.secondQuartile, 0);
  const totalThirdQuartile = result.reduce((a, b) => a + b.thirdQuartile, 0);
  console.log("HERE", {
    totalCost,
    totalFirstQuartile,
    totalSecondQuartile,
    totalThirdQuartile,
  });
  let percentile = getPercentile(
    totalCost,
    totalFirstQuartile,
    totalSecondQuartile,
    totalThirdQuartile
  );
  console.log(percentile);
  if (percentile < 0) percentile = 0;
  else if (percentile > 100) percentile = 100;

  console.log(percentile);

  res.status(200).json({
    firstQuartile: totalFirstQuartile,
    thirdQuartile: totalThirdQuartile,
    percentile,
  });
});

router.post("/", [userValidator.isUserLoggedIn], async (req, res) => {
  const {
    services,
    shop: { name, googlePlaceId, coordinates, address },
    model,
  } = req.body;

  let shop = await ShopCollection.addOneIfDoesNotExist(
    name,
    googlePlaceId,
    coordinates,
    address
  );

  for (let service of services) {
    await ServiceCollection.addOne(
      service.name,
      service.price,
      shop._id,
      req.session.userId
    );
  }

  res.status(200).json({ success: true });
});

router.get("/", async (req, res) => {
  let { services } = req.query;
  console.log(services);
  const result = await ServiceCollection.findByServices(services);
  res.status(200).json(result.map((s) => formatService(s)));
});

export { router as serviceRouter };
