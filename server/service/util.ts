export function formatService(serv: any) {
  return {
    user: serv.user.name,
    shop: { googlePlaceId: serv.shop.googlePlaceId, name: serv.shop.name },
    price: serv.price,
    name: serv.name,
  };
}
