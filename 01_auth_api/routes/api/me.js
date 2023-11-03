import { Router } from "express";
import { currentUser } from "../../controller/auth.js";
import { authenticate } from "../../middleware/authenticate.js";

const router = Router();

router.get("/", authenticate, currentUser);

export default router;
