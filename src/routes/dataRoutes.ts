import { router } from "utils";
import { authenticate } from "middlewave";
import { data } from "controllers";

router.get("/list", authenticate, data.getData);

export default router;
