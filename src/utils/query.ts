export const query = {
  auth: {
    create: " INSERT INTO users SET ? ",
    login: "SELECT * FROM users WHERE username = ?",
  },
  data: {
    get: "SELECT * FROM data",
  },
};
