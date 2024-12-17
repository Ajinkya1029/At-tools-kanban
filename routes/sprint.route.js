import {Router} from "express"
import {jwtAuth} from '../middleware/jwtauth.js';
import { getAllSprints,getSprintById,createSprint ,deleteSprint,allTicketOfSprint,addMemberToSprint,sprintMember} from "../controllers/sprint.controller.js";

const router=Router();

router.route("/getAll").get(jwtAuth,getAllSprints);
router.route("/getById").get(jwtAuth,getSprintById);
router.route("/createSprint").post(jwtAuth,createSprint);
router.route("/delete").delete(jwtAuth,deleteSprint);
router.route("/allTicket").get(jwtAuth,allTicketOfSprint);
router.route("/addMember").post(jwtAuth,addMemberToSprint);
router.route("/list").get(jwtAuth,sprintMember);

export default router;