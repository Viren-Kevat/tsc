import express from "express"
import { signUp , updateById,deleteById,findById} from "../controller/userController";


const router = express.Router();


router.route("/signup").post(signUp)
router.route("/update/:id").put(updateById)
router.route("/delete/:id").delete(deleteById)
router.route("/find/:id").post(findById)


export default router;