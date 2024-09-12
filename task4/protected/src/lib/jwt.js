import jwt from 'jsonwebtoken';

const SECRET_KEY = 'helloauth'; // Set a secret key


// for signing
export const signToken = (payload) => {
  try {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  } catch (error) {
    console.error("JWT Signing Error: ", error);
    return null;
  }
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error("JWT Verification Error: ", error);
    return null; // Return null if the token is invalid
  }
};
