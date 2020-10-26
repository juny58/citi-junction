import { IndividualCuisineOrder, FoodOrderedByInterface, FoodOrderedFromRestaurantInterface } from '../../restaurant-detail/restaurant-detail.interface';

export interface FoodOrderInterface {
    _id?: string;
    orderStatus: FoodOrderStatusEnum;
    orderType: OrderTypeEnum,
    amount: number;
    discount: number;
    cartTotal: number;
    deliveryCharge: number;
    deliveredAt?: number;
    pickedUpAt?: number;
    orderDetail: FoodOrderDetailInterface;
    orderedAt: number;
    orderedBy: FoodOrderedByInterface;
    tax: number;
    paymentInfo?: PaymentInfoInterface;
    deliveryAgent?: DeliveryAgentInterface;
    profitMargin?: ProfitMarginInterface;
    notes?: OrderNoteInterface
}

export interface FoodOrderDetailInterface {
    cuisines: IndividualCuisineOrder[];
    restaurant: FoodOrderedFromRestaurantInterface
}

export interface PaymentInfoInterface {
    provider: string;
    data: any
}

export interface DeliveryAgentInterface {
    name: string;
    _id: string;
    phone: string;
    coordinates: {
        lat: number;
        long: number
    }
}

export interface ProfitMarginInterface {
    deliveryCharge?: number;
    product?: number;
    extra?: number;
    total?: number
}

export interface OrderNoteInterface {
    customer?: string;
    company?: string
}

export enum FoodOrderStatusEnum {
    'processing' = 'Processing',
    'preparingFood' = 'Preparing Food',
    'pickedUp' = 'Picked Up',
    'delivered' = 'Delivered',
    'cancelled' = "Cancelled & Refund initiated",
    'refunded' = 'Refunded',
    'completed' = 'Completed'
}

export enum OrderTypeEnum {
    'food' = 'food',
    'grocery' = 'grocery'
}