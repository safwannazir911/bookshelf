import express from 'express';
import { authenticateUser } from '../middleware/index.js';
import { UserController } from '../controllers/index.js'; // Assuming you have an adminController


const router = express.Router();

const userController = new UserController();


router.get("/", (req, res) => {
    res.status(200).json({
        message: "User route is working"
    });
})



router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.loginUser);

router.use(authenticateUser);
router.route("/:id").get(userController.getUserById);


export default router;