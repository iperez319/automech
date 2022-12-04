import ShopCollection from "../shop/collection";
import ReviewModel from "./model";
import type { ShopRequest } from "../shop/model";
import type { Model, Service } from "./model";
import ServiceCollection from "../service/collection";
import { componentsPlugin } from "bootstrap-vue";

class ReviewCollection {
  static async addOne(
    services: Service[],
    model: Model,
    { name, googlePlaceId, coordinates, address }: ShopRequest,
    rating: number,
    author: string
  ) {
    let shop = await ShopCollection.addOneIfDoesNotExist(
      name,
      googlePlaceId,
      coordinates,
      address
    );

    let serviceIds = [];

    for (let service of services) {
      let newService = await ServiceCollection.addOne(
        service.name,
        service.price,
        shop._id.toString(),
        author
      );
      serviceIds.push(newService._id.toString());
    }

    let newReview = new ReviewModel({
      author,
      name,
      googlePlaceId,
      rating,
      model,
      services: serviceIds,
      shop: shop._id,
    });

    await newReview.save();
    return newReview;
  }
}

export default ReviewCollection;
