import jwt from "jsonwebtoken";

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
// };

// export default generateToken;

const generateToken = (id) => {
  try {
    if (!id) {
      throw new Error("ID is required to generate a token.");
    }

    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return token;
  } catch (error) {
    console.error("Error generating JWT token:", error);
    throw error;
  }
};

export default generateToken;
