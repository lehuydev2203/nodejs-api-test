// src/middleware/authentication.js
import { responseDefault } from "config";
import { jwt, secretKey } from "utils";

const extractBearerToken = (authorizationHeader: string): string => {
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return "";
  }
  return authorizationHeader.split(" ")[1];
};

const authenticate = (req: any, res: any, next: () => void): any => {
  const token = req.headers.authorization;
  const _res = { ...responseDefault };
  if (!token) {
    _res.data = { message: "Not found token" };
    res.json(_res);
    return;
  }

  const _token = extractBearerToken(token);

  jwt.verify(_token, secretKey, (err: any, decoded: any) => {
    if (err) {
      _res.data = { message: "Token invalid" };
      return res.json(_res);
    }

    req.user = decoded;
    next();
  });
};

export { authenticate };
