import jwt, { JwtPayload } from 'jsonwebtoken';

// Define the Payload type to specify the structure of the payload
interface Payload {
  id: string;
  [key: string]: any; // You can add other fields if needed
}

// Sign function with typed payload
const sign = (payload: Payload): string => {
  return jwt.sign(payload, "aliev_davlat");
}

// Verify function with typed token, returning either a JwtPayload or string (in case of failure)
const verify = (token: string):JwtPayload | string  => {
  try {
    return jwt.verify(token, 'aliev_davlat');
  } catch (err) {
    return 'Invalid token';
  }
}

export {
  sign,
  verify
}
