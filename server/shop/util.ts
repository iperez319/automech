// @ts-nocheck
export default function transformShopResponse(shop: any) {
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
    location: shop.location,
    averageRating,
  };
}
