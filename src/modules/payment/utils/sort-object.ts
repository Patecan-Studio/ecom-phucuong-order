export const sortObject = (obj: any) => {
  const sortedKeys = Object.keys(obj).sort();

  const sortedObject = {};
  sortedKeys.forEach((key) => {
    sortedObject[key] = obj[key];
  });

  return sortedObject;
};
