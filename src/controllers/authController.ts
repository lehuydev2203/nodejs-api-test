// src/controllers/authController.js
import bcrypt from "bcrypt";
import { responseDefault, connection } from "config";
import { responseType } from "interface";
import { jwt, secretKey, query } from "utils";

const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const _salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, _salt);
  return hashedPassword;
};

const login = async (
  req: { body: any },
  res: { json: (arg0: any) => void }
) => {
  const data = req.body;
  const username = data.username;
  const providedPassword = data.password;

  let _res: any = { ...responseDefault };

  connection.query(
    query.auth.login,
    [username],
    async (err: any, results: string | any[]) => {
      if (err) {
        console.error("Database error:", err);
        _res.data = { message: "Internal server error" };
        res.json(_res);
        return;
      }

      if (results.length === 0) {
        _res.data = { message: "User not found" };
        res.json(_res);
        return;
      }

      const storedPassword = results[0].password; // Assume the column name is 'password'
      // Compare provided password with stored hashed password
      const passwordsMatch = await bcrypt.compare(
        providedPassword,
        storedPassword
      );

      // Compare stored password with provided password
      if (passwordsMatch) {
        const user = { id: results[0].id, username: username };
        const token = jwt.sign(user, secretKey, { expiresIn: "1h" });

        _res.status = 1;
        _res.data = {
          token: token,
          ...results[0],
        };

        delete _res.data.password;

        res.json(_res);
      } else {
        _res.data = { message: "Login fail" };
        res.json(_res);
      }
    }
  );
};

const register = async (
  req: { body: any },
  res: { json: (arg0: any) => void }
) => {
  const data = req.body;

  const _data = {
    username: data.username,
    password: await hashPassword(data.password),
  };
  let _res: responseType = { ...responseDefault };

  connection.query(query.auth.create, _data, (err: any, result: any) => {
    if (err) {
      _res.status = 0;
      _res.data = { message: "Error creating user" };
      res.json(_res);
      return;
    }

    _res.status = 1;
    _res.data = { message: "Create user success" };

    res.json(_res);
  });
};

export { login, register };
