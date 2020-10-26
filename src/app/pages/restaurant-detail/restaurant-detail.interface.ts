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
    coordinates: {
        lat: number;
        long: number
    };
    landmark: string;
    distanceInKm: number;
    pushToken: string
}

export interface FoodOrderedFromRestaurantInterface {
    _id: string;
    name: string;
    coordinates: {
        lat: number;
        long: number
    }
}
