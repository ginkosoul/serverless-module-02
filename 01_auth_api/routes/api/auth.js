import { Router } from "express";
import { signIn, signUp } from "../../controller/auth.js";
import { validateBody } from "../../middleware/validateBody.js";
import { validateUser } from "../../utils/validation.js";

const router = Router();

router.post("/sign-in", validateBody(validateUser), signIn);
router.post("/sign-up", validateBody(validateUser), signUp);

export default router;
