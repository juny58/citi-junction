export interface Product {
    product_id: string;
    created_at: Date;
    modified_at: Date;
    title: string;
    type: ProductType;
    base_price: number;
    vendor_id?: number;
    tags: Array<string>;
    in_stock?: boolean;
    tax_categories: Array<number>;
    variations?: Array<VariableProduct>;
    shipping_category: string;
    images: Array<string>;
    featured: boolean;
    description: string;
    on_sale: boolean;
    sale_count?: number;
    virtual?: boolean;
    stock_count?: number;
    img: string;
    avg_rating: number;
    total_rating: number;
    rating_allowed: boolean;
    item_type: ItemType; // string in backend
    filters: Array<number>,
    parent_category: number;
    is_food?: boolean;
    restaurant_id?: number
}

export enum ProductType {
    variable = 'variable',
    simple = 'simple'
}

export interface VariableProduct {
    attribute: string;
    product_id: string;
    base_price: number;
    sale_count?: number;
    stock_count?: number
}

export enum ItemType {
    food = 'food',
    fashion = 'fashion',
    grocery = 'grocery',
    vegetables = 'vegetables',
    fish = 'fish',
    meat = 'meat',
    electronics = 'electronics',
    home_care = 'home_care'
}