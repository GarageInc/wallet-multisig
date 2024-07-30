import { BSON } from 'bson';

export const encodeBson = (jsonObject: any) => {
  // Convert JSON to BSON
  const bsonData = BSON.serialize(jsonObject);

  // Convert the BSON to hexadecimal format
  const hexadecimalResult = Buffer.from(bsonData).toString('hex');

  return hexadecimalResult;
};

export const decodeBson = (hexadecimalData: string): any => {
  // Convert the hexadecimal string to a buffer
  const bufferData = Buffer.from(hexadecimalData, 'hex');

  // Deserialize the BSON buffer to get the original JSON
  const jsonObject = BSON.deserialize(bufferData);

  return jsonObject;
};
