import { Types } from "mongoose";
import { Schema, model } from "mongoose";

/**
 * This file defines the properties stored in a User
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for User on the backend

export type Shop = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  googlePlaceId: string;
  name: string;
  // address: string;
  location: {
    type: string,
    coordinates: [lng: number, lat: number]
  }
  averageRatings: Map<string, number>; // TODO: Change after creating Service Model
  averagePrices: Map<string, number>; // TODO: Change after creating Service Model
};

// Mongoose schema definition for interfacing with a MongoDB table
// Users stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const ShopSchema = new Schema<Shop>({
  name: String,
  googlePlaceId: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    index: '2dsphere'
  },
  // address: String,
  averageRatings: { // TODO: Change after creating Service Model
    type: Map,
    of: Number
  },
  averagePrices: { // TODO: Change after creating Service Model
    type: Map,
    of: Number
  }
});

const ShopModel = model<Shop>("Shop", ShopSchema);
export default ShopModel;
