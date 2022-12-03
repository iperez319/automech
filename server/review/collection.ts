import ShopCollection from "../shop/collection";
import ReviewModel from "./model";
import type { ShopRequest } from "../shop/model";
import type { Model, Service } from "./model";

class ReviewCollection {
  static async addOne(
    services: Service[],
    model: Model,
    { name, googlePlaceId, coordinates }: ShopRequest,
    rating: number,
    author: string
  ) {
    let shop = await ShopCollection.addOneIfDoesNotExist(
      name,
      googlePlaceId,
      coordinates
    );

    let newReview = new ReviewModel({
      author,
      name,
      googlePlaceId,
      rating,
      model,
      services,
      shop: shop._id,
    });

    return await newReview.save();
  }
}

export default ReviewCollection;
