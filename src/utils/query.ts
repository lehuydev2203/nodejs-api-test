export const query = {
  auth: {
    create: " INSERT INTO users SET ? ",
    login: "SELECT * FROM users WHERE username = ?",
  },
  data: {
    get: "SELECT * FROM data",
  },
  code: {
    get: "SELECT id, name_code, code FROM codes where status=1 AND id_user= ?",
    getDetail: "SELECT id, name_code, code FROM codes where id = ?",
    create: "INSERT INTO codes (id_user, name_code, code) VALUES (?, ?, ?)",
    delete: "UPDATE codes SET status = 1 WHERE id = ?",
    update: "UPDATE codes SET name = ?, code = ? WHERE id = ?;",
  },
};
