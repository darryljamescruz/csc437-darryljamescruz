"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageMiddlewareFactory = void 0;
exports.handleImageFileErrors = handleImageFileErrors;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
// Determine upload directory
const uploadDir = process.env.IMAGE_UPLOAD_DIR || "uploads";
// Check if the directory exists; if not, create it.
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
class ImageFormatError extends Error {
}
const storageEngine = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = process.env.IMAGE_UPLOAD_DIR || "uploads";
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        let fileExtension;
        if (file.mimetype === "image/png") {
            fileExtension = ".png";
        }
        else if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            fileExtension = ".jpg";
        }
        else {
            return cb(new ImageFormatError("Unsupported image type"), "");
        }
        const fileName = Date.now() + "-" + Math.round(Math.random() * 1E9) + fileExtension;
        cb(null, fileName);
    }
});
exports.imageMiddlewareFactory = (0, multer_1.default)({
    storage: storageEngine,
    limits: {
        files: 1,
        fileSize: 5 * 1024 * 1024 // 5 MB
    },
});
function handleImageFileErrors(err, req, res, next) {
    if (err instanceof multer_1.default.MulterError || err instanceof ImageFormatError) {
        res.status(400).send({
            error: "Bad Request",
            message: err.message
        });
        return;
    }
    next(err); // Some other error, let the next middleware handle it
}
