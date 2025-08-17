import bcrypt from 'bcrypt';
import { MESSAGES } from '../../utils/constants/Messages.js';
import { ApiResponse } from '../../middleware/index.js';

export class BaseController {
    _hashPassword(password) {
        return bcrypt.hash(password, 10);
    }

    _comparePassword(password, hash) {
        return bcrypt.compare(password, hash);
    }

    _sendResponse(res, message = "Success", statusCode = 200, data = {}) {
        return res.status(statusCode).json(ApiResponse.success(message, statusCode, data));
    }

    _sendError(res, error) {
        console.error(error);
        return res.status(500).json(ApiResponse.error(MESSAGES.SERVER_ERROR, 500));
    }

    _isAuthorised(req, user) {
        const { userType } = req.user;
        if (userType == user) {
            return true;
        }
        return false;
    }

}