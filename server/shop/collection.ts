import ShopModel from "./model";
import type { Shop } from "./model";

class ShopCollection {
  /**
   * Add the shop if it does not already exist
   * @param name Name of the shops
   * @param googlePlaceId The id returned by the google places api
   * @param coordinates The coordinates of the shop
   * @returns True or false whether the shop was added
   */
  static async addOneIfDoesNotExist(
    name: string,
    googlePlaceId: string,
    coordinates: { lat: number; lng: number }
  ): Promise<Shop> {
    let currentShop = await ShopCollection.findByPlaceId(googlePlaceId)
    if (currentShop) return currentShop;
    
    let newShop = new ShopModel({
      name,
      googlePlaceId,
      location: {
        type: "Point",
        coordinates: [coordinates.lng, coordinates.lat],
      },
    });

    return await newShop.save();
}

  static async findAll() { //Just as dummy, I guess, in order to test the addReview form
    const shops = await ShopModel.find();
    return shops;
  }

  static async findByPlaceId(googlePlaceId: string) {
    const shop = await ShopModel.findOne({ googlePlaceId });
    return shop;
  }

  static async findShopsWithinRadiusOfLocation(
    location: {
      lat: number;
      lng: number;
    },
    radius: number // in mi
  ): Promise<Array<Shop>> {
    const shops = await ShopModel.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [location.lng, location.lat],
          },
          $maxDistance: radius * 1609, // Convert from mi to meters
        },
      },
    });
    return shops;
  }
}

export default ShopCollection;
