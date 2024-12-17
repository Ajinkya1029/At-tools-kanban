import {Router} from "express"
import {jwtAuth} from '../middleware/jwtauth.js';
import { createTicket,deleteTicket,updateAssignee } from "../controllers/ticket.controller.js";

const router=Router();
router.route("/createTicket").post(jwtAuth,createTicket);
router.route("/deleteTicket").delete(jwtAuth,deleteTicket);
router.route("/updateAssignee").put(jwtAuth,updateAssignee);


export default router;