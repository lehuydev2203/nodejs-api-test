import { router } from "utils";
import { authenticate } from "middlewave";
import { Code } from "controllers";

/* `router.get("/", authenticate, Code.get);` is defining a route for a GET request to the root URL
("/"). */
router.get("/", authenticate, Code.get);

/* `router.post("/create", authenticate, Code.create);` is defining a route for a POST request to the
"/create" URL. This route is protected by the `authenticate` middleware, which means that the user
needs to be authenticated before accessing this route. The route is handled by the `Code.create`
controller function, which will be executed when the route is accessed. */
router.post("/create", authenticate, Code.create);

/* `router.post("/detail", authenticate, Code.detail);` is defining a route for a POST request to the
"/detail" URL. This route is protected by the `authenticate` middleware, which means that the user
needs to be authenticated before accessing this route. The route is handled by the `Code.detail`
controller function, which will be executed when the route is accessed. */
router.get("/detail", authenticate, Code.detail);

/* `router.post("/update", authenticate, Code.update);` is defining a route for a POST request to the
"/update" URL. This route is protected by the `authenticate` middleware, which means that the user
needs to be authenticated before accessing this route. The route is handled by the `Code.update`
controller function, which will be executed when the route is accessed. */
router.post("/update", authenticate, Code.update);

/* `router.post("/delete", authenticate, Code.delete);` is defining a route for a POST request to the
"/delete" URL. This route is protected by the `authenticate` middleware, which means that the user
needs to be authenticated before accessing this route. The route is handled by the `Code.delete`
controller function, which will be executed when the route is accessed. This route is typically used
to delete a resource or perform a delete operation on the server. */
router.delete("/delete", authenticate, Code.delete);

export default router;
