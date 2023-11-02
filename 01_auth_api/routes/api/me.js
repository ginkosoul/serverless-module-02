import { Router } from "express";
import { currentUser } from "../../controller/auth.js";

const router = Router();

router.get("/", currentUser);

export default router;
