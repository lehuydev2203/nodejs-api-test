import { query } from "utils";
import { connection, responseDefault } from "config";
/**
 * The function `getData` retrieves data from a database and sends a JSON response with the retrieved
 * data.
 * @param {any} req - The `req` parameter is the request object that contains information about the
 * incoming HTTP request, such as headers, query parameters, and request body.
 * @param res - The `res` parameter is an object that has a `json` method. This method is used to send
 * a JSON response to the client.
 */

const getData = (req: any, res: { json: (arg0: any) => void }) => {
  let _res = { ...responseDefault };

  connection.query(query.data.get, (err: any, result: any) => {
    if (err) {
      _res.data = { message: "Error get data" };
      res.json(_res);
      return;
    }

    _res.status = 1;
    _res.data = result;
    res.json(_res);
  });
};

export { getData };
