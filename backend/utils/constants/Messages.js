export const MESSAGES = {

    SUCCESS: "200-Success",

    MISSING_FIELDS: "400-Missing required fields",
    INVALID_EMAIL: "400-Invalid email format",
    INVALID_PASSWORD: "400-Invalid password format",


    EMAIL_ALREADY_EXISTS: "409-Email already exists",
    USERNAME_ALREADY_EXISTS: "409-Username already exists",

    FORBIDDEN: "403-Forbidden",
    NOT_FOUND: "404-Not Found",

    SERVER_ERROR: "500-Internal Server Error",
    FAILED_HASHING_PASSWORD: "500-Failed to hash password",

    NO_USER_FOUND: "No user found to approve the organisation",
    USER_CREATED: "201-User created successfully",
    USER_UPDATED: "200-User updated successfully",
    USER_DELETED: "200-User deleted successfully",
    USER_NOT_FOUND: "404-User not found",
    USER_EXISTS: "409-User already exists",
    USER_FAILED_TO_CREATE: "500-Failed to create user",


    BOOK_CREATED: "201-Book created successfully",
    BOOK_NOT_FOUND: "404-Book not found",
    BOOK_NOT_AVAILABLE: "404-Book not available",
    BOOK_MARKED_FOR_SALE: "200-Book marked for sale successfully",



    LOGIN_SUCCESS: "200-Login successful",
    LOGIN_FAILED: "401-Invalid email or password",
}