"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowFilterableFields = exports.cowSearchableFields = exports.cowCategory = exports.cowLabel = exports.cowBreed = exports.cowLocations = void 0;
exports.cowLocations = [
    'Dhaka',
    'Chattogram',
    'Barishal',
    'Rajshahi',
    'Sylhet',
    'Comilla',
    'Rangpur',
    'Mymensingh',
];
exports.cowBreed = [
    'Brahman',
    'Nellore',
    'Sahiwal',
    'Gir',
    'Indigenous',
    'Tharparkar',
    'Kankrej',
];
exports.cowLabel = ['for sale', 'sold out'];
exports.cowCategory = ['Dairy', 'Beef', 'DualPurpose'];
exports.cowSearchableFields = ['location', 'breed', 'category'];
exports.cowFilterableFields = [
    'searchTerm',
    'location',
    'breed',
    'category',
    'minPrice',
    'maxPrice',
];
