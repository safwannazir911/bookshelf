import express from 'express';
import { authenticateUser } from '../middleware/index.js';
import { BookController } from '../controllers/index.js'; // Assuming you have an adminController
import { upload } from '../middleware/index.js';


const router = express.Router();

const bookController = new BookController();


router.get("/", (req, res) => {
    res.status(200).json({
        message: "Book route is working"
    });
})


router.use(authenticateUser);

router.route("/create-record").post(upload, bookController.createBookRecord);
router.route("/borrow-book/:id").post(bookController.borrowBook);

//Route for marking book for selling
router.route("/sell-book/:id").post(bookController.sellBook);

router.route("/:id").get(bookController.getBookById);


export default router;

