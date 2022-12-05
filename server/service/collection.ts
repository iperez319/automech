import ServiceModel from "./model";
import type { Service } from "./model";
import ShopCollection from "../shop/collection";
import _ from "lodash";

const getPercentile = (array: number[], percentile: number) => {
  var index = (percentile / 100) * array.length;
  var result;
  if (Math.floor(index) == index) {
    result = (array[index - 1] + array[index]) / 2;
  } else {
    result = array[Math.floor(index)];
  }
  return result;
};

class ServiceCollection {
  static async addOne(name: string, price: number, shop: string, user: string) {
    let newService = new ServiceModel({ name, price, shop, user });
    await newService.save();
    return newService;
  }

  static async getAveragePriceForShop(service: string, shop: string) {
    let services = await ServiceModel.find({ name: service, shop });
    if (!services) {
      return 0;
    }

    let sum = 0;
    for (let service of services) {
      sum += service.price;
    }
    return sum / services.length;
  }

  static async getQuartilesForLocation(
    services: string[],
    location: { lat: number; lng: number }
  ) {
    // Get shops in a radius of the given location
    let shops = await ShopCollection.findShopsWithinRadiusOfLocation(
      location,
      20
    );

    if (!shops) return { result: [] };

    let services_objs = await ServiceModel.find(
      {
        // Returns service objects of shops within radius of location
        name: {
          $in: services,
        },
        shop: {
          $in: shops.map((s) => s._id),
        },
      },
      null,
      { sort: { price: 1 } }
    );

    let service_groups = _.groupBy(services_objs, (s) => s.name);

    let result: {
      name: String;
      firstQuartile: number;
      secondQuartile: number;
      thirdQuartile: number;
    }[] = [];

    Object.keys(service_groups).forEach(function (key, index) {
      let currentArray = service_groups[key].map((s) => s.price); // Array should already be sorted
      result.push({
        name: key,
        firstQuartile: getPercentile(currentArray, 25),
        secondQuartile: getPercentile(currentArray, 50),
        thirdQuartile: getPercentile(currentArray, 75),
      });
    });

    return { result };
  }
}

export default ServiceCollection;
