import { Types } from "mongoose";
import { Schema, model } from "mongoose";

/**
 * This file defines the properties stored in a User
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for User on the backend

export type Shop = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  name: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  },
  averageRatings: Map<string, number>; // TODO: Change after creating Service Model
  averagePrices: Map<string, number>; // TODO: Change after creating Service Model
};

// Mongoose schema definition for interfacing with a MongoDB table
// Users stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const ShopSchema = new Schema<Shop>({
  name: String,
  address: String,
  coordinates: {
    latitude: Number,
    longitude: Number,
  },
  averageRatings: { // TODO: Change after creating Service Model
    type: Map,
    of: Number
  },
  averagePrices: { // TODO: Change after creating Service Model
    type: Map,
    of: Number
  }
});

const ReviewModel = model<Shop>("Shop", ShopSchema);
export default ReviewModel;
