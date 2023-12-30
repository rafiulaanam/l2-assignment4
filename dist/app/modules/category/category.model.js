"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: { type: String, unique: true, required: true },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: String, default: new Date().toISOString() },
    updatedAt: { type: String, default: new Date().toISOString() }
});
exports.CategoryModel = (0, mongoose_1.model)("Category", categorySchema);
