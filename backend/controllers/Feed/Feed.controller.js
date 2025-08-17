import { BaseController } from "../index.js";
import { Book, User } from "../../models/index.js";
import { MESSAGES } from "../../utils/constants/Messages.js";

export class FeedController extends BaseController {

    constructor() {
        super();
        this.getAllBooks = this.getAllBooks.bind(this);
        this.getCatalogue = this.getCatalogue.bind(this);
        this.getLendingRecords = this.getLendingRecords.bind(this);
        this.getBuyingRecords = this.getBuyingRecords.bind(this);
    }


    async getAllBooks(req, res) {
        try {
            const books = await Book.find({ forSale: true });

            this._sendResponse(res, MESSAGES.SUCCESS, 200, { books });
        } catch (error) {
            return this._sendError(res, error);
        }
    }


    async getCatalogue(req, res) {
        try {
            const userId = req.user._id;

            const user = await User.findById(userId).populate("books");

            if (!user) {
                return this._sendError(res, "User not found", 404);
            }

            this._sendResponse(res, MESSAGES.SUCCESS, 200, { books: user.books });

        } catch (error) {
            return this._sendError(res, error);
        }
    }

    async getLendingRecords(req, res) {
        try {
            const userId = req.user._id;

            const user = await User.findById(userId)
                .populate({
                    path: "lendingBookRecords",
                    select: "-createdAt -updatedAt -__v"
                });

            if (!user) {
                return this._sendResponse(res, MESSAGES.NOT_FOUND, 404);
            }

            this._sendResponse(res, MESSAGES.SUCCESS, 200, { lendingRecords: user.lendingBookRecords });

        } catch (error) {
            return this._sendError(res, error);
        }
    }

    async getBuyingRecords(req, res) {
        try {
            const userId = req.user._id;

            const user = await User.findById(userId)
                .populate({
                    path: "borrowedBookRecords",
                    select: "-createdAt -updatedAt -__v"
                });

            if (!user) {
                return this._sendResponse(res, MESSAGES.NOT_FOUND, 404);
            }

            this._sendResponse(res, MESSAGES.SUCCESS, 200, { buyingRecords: user.borrowedBookRecords });

        } catch (error) {
            return this._sendError(res, error);
        }
    }



}
