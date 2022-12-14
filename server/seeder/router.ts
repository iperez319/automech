import type { Request, Response } from "express";
import express from "express";
import UserCollection from "../user/collection";
import { DateModule, faker } from "@faker-js/faker";
import {
  Client,
  PlaceData,
  PlacesNearbyRanking,
  PlacesNearbyResponse,
} from "@googlemaps/google-maps-services-js";
import ShopCollection from "../shop/collection";
import type { User } from "../user/model";
import type { Shop, ShopRequest } from "../shop/model";
import type { Review } from "../review/model";
import ReviewCollection from "../review/collection";
import ServiceCollection from "../service/collection";
import { services } from "client/utils/constants";

const router = express.Router();
const client = new Client();

const basicServices = [
  {
    name: "Oil Change",
    cheapRange: { min: 0, max: 50 },
    typicalRange: { min: 51, max: 150 },
    expensiveRange: { min: 151, max: 250 },
  },
  {
    name: "Tire Adjustment",
    cheapRange: { min: 0, max: 75 },
    typicalRange: { min: 76, max: 200 },
    expensiveRange: { min: 201, max: 350 },
  },
  {
    name: "Spark Plug Replacement",
    cheapRange: { min: 0, max: 50 },
    typicalRange: { min: 51, max: 150 },
    expensiveRange: { min: 151, max: 250 },
  },
  {
    name: "Replace Oxygen Sensor",
    cheapRange: { min: 0, max: 50 },
    typicalRange: { min: 51, max: 150 },
    expensiveRange: { min: 151, max: 250 },
  },
  {
    name: "Tighten Fuel Cap",
    cheapRange: { min: 0, max: 50 },
    typicalRange: { min: 51, max: 150 },
    expensiveRange: { min: 151, max: 250 },
  },
  {
    name: "Replace AC",
    cheapRange: { min: 0, max: 50 },
    typicalRange: { min: 51, max: 150 },
    expensiveRange: { min: 151, max: 250 },
  },
];

const generateFakeUsers = async (n: number) => {
  let users = [];
  for (let i = 0; i < n; i++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let name = firstName + " " + lastName;
    let username = firstName.toLowerCase() + lastName;
    let password = "1234567890";

    let newUser = await (
      await UserCollection.addOne(username, password, name)
    ).save();
    users.push(newUser);
  }
  return users;
};

const syncDelay = (seconds: number) => {
  const now = Date.now() / 1000;
  while (Date.now() / 1000 - now < seconds) {}
  return;
};

const getShopPlaces = async (n: number) => {
  try {
    let next_page_token = null;
    let shops: Partial<PlaceData>[] = [];

    while (shops.length < n) {
      let result: PlacesNearbyResponse | null = null;

      if (next_page_token) {
        syncDelay(5);
        result = await client.placesNearby({
          params: {
            key: "AIzaSyBDEqPqGsjpE-nVKMnMvvblsXpZbS7ZK_w",
            location: { lat: 42.3570416, lng: -71.1017284 },
            rankby: PlacesNearbyRanking.distance,
            type: "car_repair",
            pagetoken: next_page_token,
          },
        });
      } else if (!next_page_token && shops.length === 0) {
        result = await client.placesNearby({
          params: {
            key: "AIzaSyBDEqPqGsjpE-nVKMnMvvblsXpZbS7ZK_w",
            location: { lat: 42.3570416, lng: -71.1017284 },
            rankby: PlacesNearbyRanking.distance,
            type: "car_repair",
          },
        });
      } else {
        break;
      }
      if (!result) break;

      shops = shops.concat(result.data.results);
      next_page_token = result.data.next_page_token;
    }

    let result = [];
    for (let shop of shops) {
      const geocode_result = await client.geocode({
        params: {
          key: "AIzaSyBDEqPqGsjpE-nVKMnMvvblsXpZbS7ZK_w",
          place_id: shop.place_id,
        },
      });

      result.push({
        name: shop.name,
        coordinates: shop.geometry.location,
        googlePlaceId: shop.place_id,
        address: geocode_result.data.results[0].formatted_address,
      });
    }
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const generateShops = async (n: number) => {
  let shops = await getShopPlaces(n);

  let result = [];

  for (let { name, googlePlaceId, coordinates, address } of shops) {
    if (!googlePlaceId) continue;
    let newShop = await ShopCollection.addOneIfDoesNotExist(
      name,
      googlePlaceId,
      coordinates,
      address
    );
    if (newShop) result.push(newShop);
  }
  return result;
};

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

function formatShop(shop: Shop): ShopRequest {
  const { name, location, address, googlePlaceId } = shop;
  return {
    name,
    address,
    googlePlaceId,
    coordinates: {
      lat: location.coordinates[1],
      lng: location.coordinates[0],
    },
  };
}

const generateReviews = async (n: number, users: User[], shops: Shop[]) => {
  const reviews: Review[] = [];
  for (let i = 0; i < n; i++) {
    let currentUser = users[i % users.length];
    let currentShopObj = shops[i % shops.length];
    let currentShop = formatShop(currentShopObj);
    // let currentService = basicServices[i % basicServices.length];
    // const priceRange = currentService.cheapRange;
    // let servicePrice = getRandomNumberInRange(priceRange.min, priceRange.max);
    // const service = {
    //   name: currentService.name,
    //   price: servicePrice,
    // };
    const [make, model] = faker.vehicle.vehicle().split(" ");
    let car = {
      year: faker.date.past(10).getFullYear(),
      make,
      model,
    };

    let content =
      "While this is only my second maintenance experience with Good News Garage, each visit reinforces how honest, hardworking and educational these guys are. They hold my hand through each step as I have not owned a car in decades! They strive for the highest quality and err on the side of conservative so you don't blow out your budget. I had an emergency a few weeks before my scheduled maintenance and had to have a gas station garage do some work and I called Casey panicked.\nHe explained why it waa imperative to take care of the issue immediately and even spoke with the mechanic doing the work. That's above and beyond! Ryan is equally helpful as he walked me through some brake issues and other work that can be scheduled over time. Good New Garage is tops in my opinion! I moved 40 minutes away and will continue to go to them given all of the above. Thank you to everyone at Good News!";

    let rating = getRandomNumberInRange(1, 5);
    const newReview = await ReviewCollection.addOne(
      // [service],
      car,
      currentShop,
      rating,
      currentUser._id.toString(),
      content
    );

    reviews.push(await newReview);
  }
};

const generateServices = async (n: number, users: User[], shops: Shop[]) => {
  let services = [];
  for (let i = 0; i < n; i++) {
    let currentUser = users[i % users.length];
    let currentShopObj = shops[i % shops.length];
    let currentShop = formatShop(currentShopObj);

    let currentService = basicServices[i % basicServices.length];
    const priceRange = currentService.cheapRange;
    let servicePrice = getRandomNumberInRange(priceRange.min, priceRange.max);
    const service = {
      name: currentService.name,
      price: servicePrice,
    };

    const newService = await ServiceCollection.addOne(
      service.name,
      service.price,
      currentShopObj._id.toString(),
      currentUser._id.toString()
    );
    services.push(newService);
  }
  return services;
};

router.get("/", async (req: Request, res: Response) => {
  const users = await generateFakeUsers(100);
  const shops = await generateShops(100);
  const reviews = await generateReviews(1000, users, shops);
  const services = await generateServices(1000, users, shops);
  res.status(200).json({ message: "Succesfully seeded database" });
});

export { router as seederRouter };
