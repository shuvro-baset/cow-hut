import { IBreed, ICategory, ILabel, ILocation } from './cow.interface'

export const cowLocations: ILocation[] = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
]

export const cowBreed: IBreed[] = [
  'Brahman',
  'Nellore',
  'Sahiwal',
  'Gir',
  'Indigenous',
  'Tharparkar',
  'Kankrej',
]

export const cowLabel: ILabel[] = ['for sale', 'sold out']
export const cowCategory: ICategory[] = ['Dairy', 'Beef', 'DualPurpose']

export const cowSearchableFields = ['location', 'breed', 'category']

export const cowFilterableFields = [
  'searchTerm',
  'location',
  'breed',
  'category',
  'minPrice',
  'maxPrice',
]
