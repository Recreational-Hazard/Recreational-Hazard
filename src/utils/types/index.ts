import type { FieldValue, Timestamp } from "@firebase/firestore";

export interface Product {
    id: string | number,
    title: string,
    description?: string,
    image: string,
    price: number,
    rating?: number,
    quantity?: number,
    category?: string,
    [key: string]: any
}

export interface UserData {
    id: string,
    name: string,
    email: string,
    phone?: string
}

export interface Comment {
    id: string,
    userId: string | number,
    productId: string | number,
    date: Date,
    reply_of?: string | number
}
export interface Cart {
    id?: string,
    product_id: string,
    product_name: string,
    quantity: number, // Number of products that a buyer / client will buy
    price: number,
    user_id?: string,
}

export type DeliveryType = 'cod' | 'bkash' | 'rocket';
export interface Delivery {
    id?: string,
    type: DeliveryType,
    date: Date | Timestamp | FieldValue,
    user: Readonly<UserData>,
    products: {
        product_name: string,
        quantity: number,
        price: number,
        product_id: string,
    }[],
    total_price: number,
    address: string,
    delivered: {
        delivered_by?: string,
        delivered: boolean,
    }
}

export interface CancelDelivery {
    delivery_id: string,
    reason?: string,
    date: Date | Timestamp | FieldValue,
}
