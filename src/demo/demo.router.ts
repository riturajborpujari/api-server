import { Router } from "express";

import { pipeline as demoApiBasic } from "./demo-basic.api";
import { pipeline as demoApiProtected } from "./demo-protected.api";

export const router = Router();

router.post("/basic", demoApiBasic);
router.post("/protected", demoApiProtected);
