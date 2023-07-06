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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const cow_constant_1 = require("./cow.constant");
const cow_model_1 = require("./cow.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createCow = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.label = 'for sale';
    const result = (yield cow_model_1.Cow.create(payload)).populate('seller');
    return result;
});
const getAllCows = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: cow_constant_1.cowSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (filtersData.minPrice !== undefined) {
        andConditions.push({
            price: {
                $gte: filtersData.minPrice,
            },
        });
    }
    if (filtersData.maxPrice !== undefined) {
        andConditions.push({
            price: {
                $lte: filtersData.maxPrice,
            },
        });
    }
    if (Object.keys(filtersData).length > 0) {
        const andFilter = Object.entries(filtersData)
            .filter(([field]) => field !== 'maxPrice' && field !== 'minPrice')
            .map(([field, value]) => ({ [field]: value }));
        if (andFilter.length > 0) {
            andConditions.push({ $and: andFilter });
        }
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield cow_model_1.Cow.find(whereConditions)
        .populate('seller')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield cow_model_1.Cow.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isCowExist = yield cow_model_1.Cow.findById(id);
    if (!isCowExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'This Cow does not exist');
    }
    const result = yield cow_model_1.Cow.findById(id).populate('seller');
    return result;
});
const updateCow = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isCowExist = yield cow_model_1.Cow.findById(id);
    if (!isCowExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'This Cow does not exist');
    }
    const result = yield cow_model_1.Cow.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isCowExist = yield cow_model_1.Cow.findById(id);
    if (!isCowExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'This Cow does not exist');
    }
    const result = yield cow_model_1.Cow.findByIdAndDelete(id);
    return result;
});
exports.CowService = {
    createCow,
    getAllCows,
    getSingleCow,
    updateCow,
    deleteCow,
};
