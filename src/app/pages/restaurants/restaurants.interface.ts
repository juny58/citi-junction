export enum RestaurantCategories {
    'biriyani'='Biriyani',
    'chinese'='Chinese',
    'indian'='Indian',
    'sweets'='Sweets',
    'tandoor'='Tandoor',
    'vegetarian'='Vegetarian',
    'fastfood'='Fastfood & Snacks',
    'softdrinksandicecream'='Softdrinks & Icecream',
    'soups'='Soups',
    'southindian'='South Indian'
}

export interface CuisineInterface {
    title: string;
    _id?: string;
    createdAt?: number;
    updatedAt?: number;
    restaurantId: string;
    img: string;
    menuSection: string;
    price: number;
    addOnPrice: CuisineAddOnPriceInterface[];
    catergories: string[];
    description: string;
    availableNow: boolean;
    tags: string[];
    cost: number
}

export interface MenuSectionInterface {
    _id: string;
    name: string
}

export interface CuisineAddOnPriceInterface {
    name: string;
    price: number
}

export interface RestaurantInterface {
    title: string;
    ownedBy: string; // email
    phone: string[];
    registeredOn?: number;
    address: RestaurantAddress;
    categoriesServed: RestaurantCategories[];
    sections?: MenuSectionInterface[];
    _id?: string;
    img: string;
    rating?: number;
    createdAt?: number;
    updatedAt?: number;
    estimationForTwo: number
}

export interface RestaurantAddress {
    details: string;
    coordinates: {
        lat: number;
        long: number;
    }
}