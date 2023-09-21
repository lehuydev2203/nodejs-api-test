import { query } from "utils";
import { connection, responseDefault } from "config";

const _res = { ...responseDefault };
/**
 * The function `getCode` retrieves code data for a user and sends a JSON response with the result.
 * @param req - The `req` parameter is an object that represents the request made to the server. It
 * contains information about the user making the request.
 * @param res - The `res` parameter is an object that has a `json` method. This method is used to send
 * a JSON response to the client. The `json` method takes an argument of type `{ status: 0 | 1; data:
 * {} | { message: String } }`. The
 */
const getCode = (
  req: any,
  res: {
    json: (arg0: { status: 0 | 1; data: {} | { message: String } }) => void;
  }
) => {
  const user = req.user;

  try {
    connection.query(
      query.code.get,
      [user.id],
      (err: any, result: {} | { message: String }) => {
        if (err) {
          _res.data = { message: "Error retrieving data" };
          return res.json(_res);
        }

        _res.status = 1;
        _res.data = result;
        res.json(_res);
      }
    );
  } catch (error) {
    console.error("Error:", error);
    _res.data = { message: "An error occurred" };
    res.json(_res);
  }
};

/**
 * The function `createCode` creates a new code entry in a database based on the input data provided,
 * and returns a response indicating the success or failure of the operation.
 * @param req - The `req` parameter is an object that contains the request data. It has two properties:
 * `body` and `user`.
 * @param res - The `res` parameter is an object that has a `json` method. This method is used to send
 * a JSON response to the client. The `json` method takes an argument of type `{ status: 0 | 1; data:
 * {} | { message: String } }`. The
 * @returns a JSON response with either a status of 0 or 1 and a data object. The data object can
 * either be an empty object or an object with a "message" property.
 */
const createCode = (
  req: any,
  res: {
    json: (arg0: { status: 0 | 1; data: {} | { message: String } }) => void;
  }
) => {
  const data = req.body;

  if (!data || !data.name || !data.code) {
    _res.data = { message: "Invalid input data" };
    return res.json(_res);
  }

  const user = req.user;

  try {
    connection.query(
      query.code.create,
      [user.id, data.name, data.code],
      (err: any, result: any) => {
        if (err) {
          _res.data = { message: "Error creating code" };
          return res.json(_res);
        }

        _res.status = 1;
        _res.data = { message: "Code created successfully" };
        res.json(_res);
      }
    );
  } catch (error) {
    console.error("Error:", error);
    _res.data = { message: "An error occurred" };
    res.json(_res);
  }
};

const getCodeDetail = (
  req: any,
  res: {
    json: (arg0: { status: 0 | 1; data: {} | { message: String } }) => void;
  }
) => {
  const id = req.params.id;
  if (!id) {
    return res.json({ status: 0, data: { message: "Not found Id code" } });
  }

  try {
    connection.query(query.code.getDetail, [id], (err: any, result: any) => {
      if (err) {
        return res.json({
          status: 0,
          data: { message: "Error retrieving code detail" },
        });
      }

      if (result.length === 0) {
        return res.json({ status: 0, data: { message: "Code not found" } });
      }

      const codeDetail = result[0]; // Lấy thông tin chi tiết

      return res.json({ status: 1, data: codeDetail });
    });
  } catch (error) {
    console.error("Error:", error);
    return res.json({ status: 0, data: { message: "An error occurred" } });
  }
};

export { getCode, createCode, getCodeDetail };
