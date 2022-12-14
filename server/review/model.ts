import { Types } from "mongoose";
import { Schema, model } from "mongoose";

/**
 * This file defines the properties stored in a User
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for User on the backend

export type Model = {
  model: string;
  make: string;
  year: number;
};

export type Service = {
  name: string;
  price: number;
};

export type Review = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  name: string;
  services: Types.ObjectId[]; // TODO: Change this to array of Services (from service collection)
  rating: number;
  model: Model; // TODO: Change this to Model type
  shop: Types.ObjectId;
  author: string | Types.ObjectId;
  content: string;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Users stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const ReviewSchema = new Schema<Review>({
  name: String,
  //   services: [{ // TODO: Might have to move this to its own model for easier querying
  //     title: String,
  //     price: Number
  //   }],
  services: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Service",
    },
  ],
  rating: Number,
  model: {
    make: String,
    model: String,
    year: Number,
  },
  shop: {
    type: Schema.Types.ObjectId,
    ref: "Shop",
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  content: String,
});

const ReviewModel = model<Review>("Review", ReviewSchema);
export default ReviewModel;
