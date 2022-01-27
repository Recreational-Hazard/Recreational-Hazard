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
    replyOf?: string | number
}
