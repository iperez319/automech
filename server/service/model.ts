import type { Types } from "mongoose";
import { Schema, model } from "mongoose";

export type Service = {
  _id: Types.ObjectId;
  name: string;
  price: number;
  shop: Types.ObjectId;
  user: Types.ObjectId;
};

const ServiceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  shop: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Shop",
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const ServiceModel = model<Service>("Service", ServiceSchema);
export default ServiceModel;
