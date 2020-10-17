export interface FoodOrder {
    cuisines: IndividualCuisineOrder[];
    orderedAt: number;
    orderedBy: FoodOrderedByInterface;
    totalAmount: number;
    tax: number;
    discount: number;
    deliveredAt: number;
    deliveryCharge: number;
    restaurant: FoodOrderedFromRestaurantInterface
}

export interface IndividualCuisineOrder {
    _id?: string;
    cuisine: {
        _id: string;
        name: string;
    };
    addOn?: {
        name: string;
        price: number;
    };
    items: number;
    cost: number;
    price: number
}

export interface FoodOrderedByInterface {
    name: string;
    email: string;
    phone: string;
    address: string;
    coordinates: string[]
}

export interface FoodOrderedFromRestaurantInterface {
    _id: string;
    name: string;
    coordinates: {
        lat: number;
        long: number
    }
}
