import { query } from "utils";
import { connection, responseDefault } from "config";

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
