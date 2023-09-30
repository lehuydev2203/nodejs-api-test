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
        console.log("get res");
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

/**
 * The function `getCodeDetail` retrieves the details of a code based on its ID and returns the result
 * as a JSON response.
 * @param {any} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, headers, query parameters, and request
 * body.
 * @param res - The `res` parameter is an object with a `json` method. This method is used to send a
 * JSON response to the client. The `json` method takes an argument which is an object with two
 * properties: `status` and `data`. The `status` property can have a value
 * @returns The function `getCodeDetail` returns a JSON response with a status and data object. The
 * status can be either 0 or 1, and the data can be an empty object or an object with a message
 * property.
 */
const getCodeDetail = (
  req: any,
  res: {
    json: (arg0: { status: 0 | 1; data: {} | { message: String } }) => void;
  }
) => {
  const id = req.query.id;
  console.log("🚀 ~ file: codeController.ts:111 ~ id:", id);
  if (!id) {
    _res.data = { message: "Not found Id code" };
    return res.json(_res);
  }

  try {
    connection.query(query.code.getDetail, [id], (err: any, result: any) => {
      if (err) {
        _res.data = { message: "Error retrieving code detail" };
        return res.json(_res);
      }

      if (result.length === 0) {
        _res.data = { message: "Code not found" };
        return res.json(_res);
      }

      const codeDetail = result[0]; // Lấy thông tin chi tiết
      console.log(
        "🚀 ~ file: codeController.ts:129 ~ connection.query ~ codeDetail:",
        codeDetail
      );
      _res.status = 1;
      _res.data = codeDetail;
      return res.json(_res);
    });
  } catch (error) {
    console.error("Error:", error);
    return res.json({ status: 0, data: { message: "An error occurred" } });
  }
};

/**
 * The function `updateCode` updates a code's name, code, and status in a database based on the
 * provided data.
 * @param {any} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, and
 * request URL.
 * @param res - The `res` parameter is an object with a `json` method. The `json` method is used to
 * send a JSON response to the client. It takes an argument of type `{ status: 0 | 1; data: {} | {
 * message: String } }`. The `status
 * @returns a JSON response with a status and data object. The status can be either 0 or 1, and the
 * data can be an empty object or an object with a message property.
 */
const updateCode = (
  req: any,
  res: {
    json: (arg0: { status: 0 | 1; data: {} | { message: String } }) => void;
  }
) => {
  const data = req.body;
  if (!data.id) {
    _res.data = { message: "Not found Id code" };
    return res.json(_res);
  }

  try {
    connection.query(
      query.code.getDetail,
      [data.id],
      (err: any, result: any) => {
        if (err) {
          _res.data = { message: "Error retrieving code detail" };
          return res.json(_res);
        }

        if (result.length === 0) {
          _res.data = { message: "Code not found" };
          return res.json(_res);
        }

        const codeDetail = result[0];

        codeDetail.name = data.name;
        codeDetail.code = data.code;
        codeDetail.status = data.status;

        connection.query(
          query.code.update,
          [codeDetail.name, codeDetail.code, data.id],
          (err: any, updateResult: any) => {
            if (err) {
              _res.data = { message: "Error updating code" };
              return res.json(_res);
            }

            _res.status = 1;
            _res.data = { message: "Update success" };
            res.json(_res);
          }
        );
      }
    );
  } catch (error) {
    console.error("Error:", error);
    _res.data = { message: "An error occurred" };
    return res.json(_res);
  }
};
/**
 * The deleteCode function is a TypeScript function that deletes a code based on the provided ID and
 * returns a JSON response indicating the status of the operation.
 * @param {any} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, and
 * request URL.
 * @param res - The `res` parameter is an object with a `json` method. The `json` method is used to
 * send a JSON response to the client. It takes an argument of type `{ status: 0 | 1; data: {} | {
 * message: String } }`, which represents the
 * @returns a JSON response with a status and data property. The status property can have a value of 0
 * or 1, indicating success or failure respectively. The data property can either be an empty object or
 * an object with a message property.
 */
const deleteCode = (
  req: any,
  res: {
    json: (arg0: { status: 0 | 1; data: {} | { message: String } }) => void;
  }
) => {
  const data = req.body;
  if (!data.id) {
    return res.json({ status: 0, data: { message: "Not found Id code" } });
  }

  try {
    connection.query(query.code.delete, [data.id], (err: any, result: any) => {
      if (err) {
        _res.data = { message: "Error retrieving code detail" };

        return res.json(_res);
      }

      _res.status = 1;
      _res.data = { message: "Create user success" };

      res.json(_res);
    });
  } catch (error) {
    console.error("Error:", error);
    _res.data = { message: "An Error Occurred" };
    return res.json(_res);
  }
};

export const Code = {
  get: getCode,
  create: createCode,
  detail: getCodeDetail,
  update: updateCode,
  delete: deleteCode,
};
