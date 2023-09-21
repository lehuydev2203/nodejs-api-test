// src/routes/authRoutes.js
import { router } from "utils";
import { auth } from "controllers";

router.post("/login", auth.login);
router.post("/register", auth.register);

export default router;
