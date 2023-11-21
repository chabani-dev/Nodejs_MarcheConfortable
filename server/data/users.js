import bcrypt from "bcrypt";

const users = [
  {
    name: "Admin",
    email: "admin@fake.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },

  {
    name: "User",
    email: "user@fake.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
