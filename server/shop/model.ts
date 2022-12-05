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
  address: string;
  location: {
    type: string;
    coordinates: [lng: number, lat: number];
  };
  // averageRatings: Map<string, number>; // TODO: Change after creating Service Model
  // averagePrices: Map<string, number>; // TODO: Change after creating Service Model
  //serviceAveragePrices
  //ratingAveragePrices
};

export type ShopRequest = {
  coordinates: {
    lat: number;
    lng: number;
  };
  name: string;
  googlePlaceId: string;
  address: string;
};

const opts = {
  toObject: { virtuals: true, versionKey: false },
  toJSON: { virtuals: true, versionKey: false },
  strictPopulate: false,
};

// Mongoose schema definition for interfacing with a MongoDB table
// Users stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const ShopSchema = new Schema<Shop>(
  {
    name: String,
    googlePlaceId: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    address: String,
  },
  opts
);

ShopSchema.virtual("averageRatings", {
  ref: "Review",
  localField: "_id",
  foreignField: "shop",
  justOne: false,
  options: {
    select: {
      rating: { $avg: "$rating" },
    },
  },
});

ShopSchema.index({ location: "2dsphere" });

const ShopModel = model<Shop>("Shop", ShopSchema);
export default ShopModel;
