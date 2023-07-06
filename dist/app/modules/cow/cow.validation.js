"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowValidation = void 0;
const zod_1 = require("zod");
const cow_constant_1 = require("./cow.constant");
const createCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'name is required',
        }),
        location: zod_1.z.enum([...cow_constant_1.cowLocations], {
            required_error: 'location is required',
        }),
        breed: zod_1.z.enum([...cow_constant_1.cowBreed], {
            required_error: 'breed is required',
        }),
        seller: zod_1.z.string({
            required_error: 'seller is required',
        }),
    }),
});
const updateCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        age: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        location: zod_1.z.enum([...cow_constant_1.cowLocations]).optional(),
        breed: zod_1.z.enum([...cow_constant_1.cowBreed]).optional(),
        weight: zod_1.z.number().optional(),
        label: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        seller: zod_1.z.string().optional(),
    }),
});
exports.CowValidation = {
    createCowZodSchema,
    updateCowZodSchema,
};
