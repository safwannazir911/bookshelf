import express from 'express';
import { authenticateUser } from '../middleware/index.js';
import { FeedController } from '../controllers/index.js'; // Assuming you have an adminController


const router = express.Router();

const feedController = new FeedController();


router.get("/", (req, res) => {
    res.status(200).json({
        message: "Feed route is working"
    });
})


router.use(authenticateUser);

router.route("/get-all-books").get(feedController.getAllBooks);
router.route("/catalogue").get(feedController.getCatalogue);
router.route("/lending-records").get(feedController.getLendingRecords);
router.route("/buying-records").get(feedController.getBuyingRecords);



export default router;

