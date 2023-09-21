// src/routes/index.js

import { router } from "utils";

import authRoutes from "./authRoutes";
import uploadMp3Routes from "./uploadMp3Route";
import dataRoutes from "./dataRoutes";
import codeRoutes from "./codeRoutes";

router.use("/auth", authRoutes);
router.use("/upload", uploadMp3Routes);
router.use("/data", dataRoutes);
router.use("/code", codeRoutes);

export { router };
