import { BaseController } from "../index.js";
import { Book, User, Record } from "../../models/index.js";
import { MESSAGES } from "../../utils/constants/Messages.js";

export class BookController extends BaseController {

    constructor() {
        super();
        this.createBookRecord = this.createBookRecord.bind(this);
        this.getBookById = this.getBookById.bind(this);
        this.borrowBook = this.borrowBook.bind(this);
        this.sellBook = this.sellBook.bind(this);
    }

    async createBookRecord(req, res) {

        try {
            if (!this._isAuthorised) {
                return this._sendResponse(res, MESSAGES.FORBIDDEN, 403);
            }

            const ownerId = req.user._id;

            const { title, author, genre, condition, quantity, price } = req.body;

            if (!title || !author || !condition || !quantity || !price) {
                return this._sendResponse(res, MESSAGES.MISSING_FIELDS, 400);
            }


            const { coverImage } = req.files;


            const newBook = await Book.create({
                title,
                author,
                genre,
                coverImage: coverImage[0].location,
                condition,
                ownerId,
                quantity,
                price
            });

            await User.findByIdAndUpdate(ownerId, {
                $addToSet: { books: newBook._id }
            });


            const filteredBook = this._filterBook(newBook);

            this._sendResponse(res, MESSAGES.BOOK_CREATED, 201, filteredBook);
        }
        catch (error) {
            return this._sendError(res, error);
        }
    }

    async getBookById(req, res) {
        try {
            if (!this._isAuthorised) {
                return this._sendResponse(res, MESSAGES.FORBIDDEN, 403);
            }
            const { id } = req.params;

            const book = await Book.findById(id);

            if (!book) {
                return this._sendError(res, MESSAGES.BOOK_NOT_FOUND, 404);
            }

            this._sendResponse(res, MESSAGES.SUCCESS, 200, this._filterBook(book));
        } catch (error) {
            return this._sendError(res, error);
        }
    }

    async borrowBook(req, res) {
        try {
            if (!this._isAuthorised) {
                return this._sendResponse(res, MESSAGES.FORBIDDEN, 403);
            }
            const userId = req.user._id

            const { id } = req.params;

            const book = await Book.findById(id);
            if (!book) {
                return this._sendError(res, MESSAGES.BOOK_NOT_FOUND, 404);
            }

            if (book.quantity <= 0) {
                return this._sendError(res, MESSAGES.BOOK_NOT_AVAILABLE, 400);
            }

            book.quantity -= 1;
            await book.save();

            // Create a record for the borrowed book
            const record = await Record.create({
                bookId: book._id,
                borrowerId: userId,
            });


            // Add the record to the user's borrowedBooks array
            const borrower = await User.findByIdAndUpdate(userId, {
                $addToSet: { borrowedBookRecords: record }
            })

            borrower.save()

            //Add the record to the book's lending records
            const lender = await User.findByIdAndUpdate(book.ownerId, {
                $addToSet: { lendingBookRecords: record }
            })

            lender.save();

            this._sendResponse(res, MESSAGES.SUCCESS, 200);

        }
        catch (error) {
            return this._sendError(res, error);
        }

    }

    async sellBook(req, res) {
        try {
            const { id } = req.params;

            const book = await Book.findById(id);

            if (!book) {
                return this._sendError(res, MESSAGES.BOOK_NOT_FOUND, 404);
            }

            if (book.forSale) {
                return this._sendError(res, MESSAGES.BOOK_ALREADY_FOR_SALE, 400);
            }

            book.forSale = true;
            await book.save();

            this._sendResponse(res, MESSAGES.BOOK_MARKED_FOR_SALE, 200, this._filterBook(book));
        }
        catch (error) {
            return this._sendError(res, error);
        }
    }


    _filterBook(book) {
        const { createdAt, updatedAt, __v, ...filtered } = book.toObject();
        return filtered;
    }
}
