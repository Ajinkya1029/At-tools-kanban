import {Router} from "express"
import {registerUser,loginUser}from '../controllers/user.controller.js';
import {jwtAuth} from '../middleware/jwtauth.js';

const router=Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);


export default router;