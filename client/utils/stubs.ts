// @ts-nocheck
function incrementCoordinates({ lat, lng }) {
  const coordinate = [lat, lng];

  const angleRadians = Math.random() * 360 * (180 / Math.PI); // in ° radians

  const errorCorrection = 0.995; // avoid float issues
  const distanceInKm = Math.random() * 5 * errorCorrection; // in km

  const distanceInDegree = distanceInKm / 111; // in °

  const newCoordinate = [
    coordinate[0] + Math.sin(angleRadians) * distanceInDegree,
    coordinate[1] + Math.cos(angleRadians) * distanceInDegree,
  ];

  // Box latitude [-90°, 90°]
  newCoordinate[0] = newCoordinate[0] % 180;
  if (newCoordinate[0] < -90 || newCoordinate[0] > 90) {
    newCoordinate[0] = Math.sign(newCoordinate[0]) * 180 - newCoordinate[0];
    newCoordinate[1] += 180;
  }
  // Box longitude [-180°, 180°]
  newCoordinate[1] = (((newCoordinate[1] % 360) + 540) % 360) - 180;
  return { lat: newCoordinate[0], lng: newCoordinate[1] };
}

export function getShopsNearAddress(n, baseCoords) {
  let shops = [];
  for (let i = 0; i < n; i++) {
    const { lat, lng } = incrementCoordinates(baseCoords);
    shops.push({
      name: `Shop #${i + 1}`,
      coordinates: {
        lat,
        lng,
      },
      rating: Math.ceil(Math.random() * 5),
    });
  }
  return shops;
}
