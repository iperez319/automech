import ShopCollection from "../shop/collection";
import ReviewModel from "./model";
import type { ShopRequest } from "../shop/model";
import type { Model, Service } from "./model";
import ServiceCollection from "../service/collection";
import { Types } from "mongoose";

class ReviewCollection {
  static async addOne(
    // services: Service[],
    model: Model,
    { name, googlePlaceId, coordinates, address }: ShopRequest,
    rating: number,
    author: string,
    content: string
  ) {
    let shop = await ShopCollection.addOneIfDoesNotExist(
      name,
      googlePlaceId,
      coordinates,
      address
    );
    // console.log(shop);
    // let serviceIds = [];
    // console.log(shop);
    // for (let service of services) {
    //   let newService = await ServiceCollection.addOne(
    //     service.name,
    //     service.price,
    //     shop._id.toString(),
    //     author
    //   );
    //   serviceIds.push(newService._id.toString());
    // }
    let newReview = new ReviewModel({
      author,
      name,
      googlePlaceId,
      rating,
      model,
      // services: serviceIds,
      shop: shop._id,
      content,
    });

    await newReview.save();
    return newReview;
  }

  static async findAll() {
    //Just as dummy, I guess, in order to test the addReview form
    const reviews = await ReviewModel.find()
      .populate("services")
      .sort({ dateModified: -1 });
    return reviews;
  }

  static async findByPlaceId(placeId: string) {
    const shop = await ShopCollection.findByPlaceId(placeId);
    const reviews = await ReviewModel.find({ shop: shop._id }).populate(
      "author"
    );
    return reviews;
  }
}

export default ReviewCollection;

//Get all Reviews in the database, or find by shopId, or find by shopname
// static async findAllReviews(shopNameorId?: Types.ObjectId | string){
//   if (shopNameorId){
//     return ReviewModel.find({
//       $or:[
//         {_id: shopNameorId},
//         {name: shopNameorId}
//       ]}).sort({dateModified: -1})
//   } else{
//     return ReviewModel.find().sort({dateModified: -1})
//   }

// }
