import { Types } from "mongoose";
import { Schema, model } from "mongoose";

/**
 * This file defines the properties stored in a User
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for User on the backend

type Model = {
  model: string;
  make: string;
  year: number;
};

type Service = {
  title: string;
  price: string;
};

export type Review = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  description: string;
  services: Service; // TODO: Change this to array of Services (from service collection)
  rating: number;
  model: Model; // TODO: Change this to Model type
  shop: Types.ObjectId;
  author: string; //Username of the one who made the review
};

// Mongoose schema definition for interfacing with a MongoDB table
// Users stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const ReviewSchema = new Schema<Review>({
  description: String,
  services: [{ // TODO: Might have to move this to its own model for easier querying
    title: String,
    price: Number
  }],
  rating: Number,
  model: {
    make: String,
    model: String,
    year: Number
  },
  shop: {
    type: Schema.Types.ObjectId,
    ref: "Shop",
  },
});

const ReviewModel = model<Review>("Review", ReviewSchema);
export default ReviewModel;
