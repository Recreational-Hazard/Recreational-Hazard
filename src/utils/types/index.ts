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

export interface User {
    id: string | number,
    name: string,
    email: string,
    phone?: number
}

export interface Comment {
    id: string | number,
    userId: string | number,
    productId: string | number,
    date: Date,
    replyOf?: string | number
}
