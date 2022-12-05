import type { Request, Response } from "express";
import ReviewCollection from "./collection";
import * as userValidator from "../user/middleware";
import express from "express";

const router = express.Router();


/**
 * Get all reviews
 *
 * @name GET /api/reviews
 *
 */
router.get(
  '/',
  async (req: Request, res: Response) => {
    const allReviews = await ReviewCollection.findAll();
    res.status(200).json(allReviews);
  }
);


/**
 * Post new review
 *
 * @name POST /api/reviews
 *
 */
router.post(
  "/",
  [userValidator.isUserLoggedIn],
  async (req: Request, res: Response) => {
    console.log("here");
    const { services, model, shop, rating } = req.body;
    const { userId: author } = req.session;

    console.log(req.body);

    const newReview = await ReviewCollection.addOne(
      services,
      model,
      shop,
      rating,
      author
    );

    res.status(200).json(newReview);
  }
);




export { router as reviewRouter };
