import { router } from "utils";
import { authenticate } from "middlewave";
import { code } from "controllers";

router.get("/", authenticate, code.getCode);
router.post("/create", authenticate, code.createCode);
router.post("/detail", authenticate, code.getCodeDetail);

export default router;
