"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const orders_model_1 = require("./orders.model");
const cow_model_1 = require("../cow/cow.model");
const user_model_1 = require("../user/user.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const createOrder = (cow, buyer) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        cow: cow,
        buyer: buyer,
    };
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const cowData = yield cow_model_1.Cow.findById(cow).exec();
        const buyerData = yield user_model_1.User.findById(buyer).exec();
        if (!cowData || !buyerData) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid cow or buyer');
        }
        if (cowData.price > buyerData.budget) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Buyer does not have enough budget to buy this cow');
        }
        if (cowData.label === 'sold out') {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'This cow is already sold out');
        }
        const sellerData = yield user_model_1.User.findById(cowData === null || cowData === void 0 ? void 0 : cowData.seller).exec();
        if (!sellerData) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid seller');
        }
        sellerData.income += cowData.price;
        buyerData.budget -= cowData.price;
        yield cow_model_1.Cow.findOneAndUpdate({ _id: cowData.id }, { label: 'sold out' }, {
            new: true,
        });
        yield sellerData.save();
        yield buyerData.save();
        yield session.commitTransaction();
        yield session.endSession();
        const result = yield orders_model_1.Order.create(data);
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Order.find().populate('cow').populate('buyer');
    return result;
});
exports.OrderService = {
    createOrder,
    getAllOrders,
};
