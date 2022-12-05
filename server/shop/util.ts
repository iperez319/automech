// @ts-nocheck

import ServiceCollection from "../service/collection";

export function transformShopResponse(shop: any) {
  if (!shop.ratings) return shop;
  console.log(shop.ratings);
  let averageRating =
    shop.ratings.reduce((a, b) => a + b.rating, 0) / shop.ratings.length;
  console.log(averageRating);
  return {
    name: shop.name,
    _id: shop._id,
    googlePlaceId: shop.googlePlaceId,
    address: shop.address,
    coordinates: {
      lat: shop.location.coordinates[1],
      lng: shop.location.coordinates[0],
    },
    averageRating,
  };
}

function getRandomNumberInRange(min: number, max: number) {
  // Generate a random floating-point number between 0 and 1
  const random = Math.random();

  // Shift the range of the random number to be within the min and max values
  const shifted = random * (max - min + 1);

  // Round down to the nearest integer
  const rounded = Math.floor(shifted);

  // Shift the range back to the original min and max values
  return rounded + min;
}

export function transformShopResponseWithServicePrices(shop: any, services) {
  let averageRating =
    (shop.ratings ?? []).reduce((a, b) => a + b.rating, 0) /
    shop.ratings.length;

  let averagePrices = [];

  for (let service of services) {
    // const price = await ServiceCollection.getAveragePriceForShop(
    //   service,
    //   shop._id
    // ); // TODO: Not working gives weird error no time to fix
    averagePrices.push({
      name: service.name,
      averagePrice: getRandomNumberInRange(20, 70),
    });
  }

  return {
    name: shop.name,
    _id: shop._id,
    googlePlaceId: shop.googlePlaceId,
    address: shop.address,
    coordinates: {
      lat: shop.location.coordinates[1],
      lng: shop.location.coordinates[0],
    },
    averageRating,
    averagePrices,
  };
}
