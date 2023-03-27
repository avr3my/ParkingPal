const calculateDistance = (c1, c2) => {
  let a = c1[0] - c2[0];
  let b = c1[1] - c2[1];
  return Math.sqrt(a ** 2 + b ** 2);
};

const closer = (source, c1, c2) => {
  if (!source?.geometry?.coordinates) return 1;
  let sourceCo = source.geometry.coordinates;
  return calculateDistance(sourceCo, c1.data().address.geometry.coordinates) >
    calculateDistance(sourceCo, c2.data().address.geometry.coordinates)
    ? 1: -1;
};

export const sortByDistance = (source, arr) => arr.sort((a, b) => closer(source, a, b));
