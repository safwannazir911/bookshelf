import { BaseController } from "../index.js";
import { User } from "../../models/index.js";
import { MESSAGES } from "../../utils/constants/Messages.js";
import { generateAccessToken } from "../../middleware/index.js";

export class UserController extends BaseController {
    constructor() {
        super();
        this.registerUser = this.registerUser.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.getUserById = this.getUserById.bind(this);
    }

    async registerUser(req, res) {
        try {
            const { email, password, pincode } = req.body;
            if (!email || !password) {
                return this._sendResponse(res, MESSAGES.MISSING_FIELDS, 400);
            }

            const userExists = await User.findOne({ email });
            if (userExists) {
                return this._sendResponse(res, MESSAGES.USER_EXISTS, 400);
            }

            const hashedPassword = await this._hashPassword(password);
            if (!hashedPassword) {
                return this._sendResponse(res, MESSAGES.FAILED_HASHING_PASSWORD, 500);
            }

            const user = await User.create({
                email,
                password: hashedPassword,
                pincode
            });

            if (!user) {
                return this._sendResponse(res, MESSAGES.USER_FAILED_TO_CREATE, 500);
            }

            const filteredUser = this._filterUser(user);
            return this._sendResponse(res, MESSAGES.USER_CREATED, 201, filteredUser);

        } catch (error) {
            return this._sendError(res, error);
        }
    }

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return this._sendResponse(res, MESSAGES.MISSING_FIELDS, 400);
            }

            const user = await User.findOne({ email }).select('+password');
            if (!user) {
                return this._sendResponse(res, MESSAGES.USER_NOT_FOUND, 404);
            }

            const isPasswordValid = await this._comparePassword(password, user.password);
            if (!isPasswordValid) {
                return this._sendResponse(res, MESSAGES.LOGIN_FAILED, 401);
            }

            const payload = {
                _id: user._id,
                userType: "user"
            };

            const token = generateAccessToken(payload);

            if (!token) {
                return this._sendResponse(res, MESSAGES.SERVER_ERROR, 500);
            }

            const filteredUser = this._filterUser(user);

            return this._sendResponse(res, MESSAGES.LOGIN_SUCCESS, 200, {
                ...filteredUser,
                token,
            });
        } catch (error) {
            console.error("Error during user login:", error);
            return this._sendError(res, error);
        }
    }

    async getUserById(req, res) {
        try {
            if (!this._isAuthorised(req, "user")) {
                return this._sendResponse(res, MESSAGES.FORBIDDEN, 403);
            }

            const user = await User.findById(req.params.id);
            if (!user) {
                return this._sendResponse(res, MESSAGES.USER_NOT_FOUND, 404);
            }

            const filteredUser = this._filterUser(user);
            return this._sendResponse(res, MESSAGES.SUCCESS, 200, filteredUser);
        } catch (error) {
            return this._sendError(res, error);
        }
    }



    _filterUser(user) {
        const { password, createdAt, updatedAt, __v, ...filtered } = user.toObject();
        return filtered;
    }
}
