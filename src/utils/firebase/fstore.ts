import type { Cart, Delivery, DeliveryType, UserData } from "$utils/types";
import { doc, setDoc, getFirestore, query, collection, where, getDocs, addDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { app } from './index';

const db = getFirestore(app)


type AdditionalData = {email?: string, phoneNumber?: number, address?: string, [key:string]:any}

export const setUser = async (user_id: string, AdditionalData:AdditionalData) => {
    const {email,address,phoneNumber} = AdditionalData;
    const ref = doc(db, "users", user_id);
    const res = await setDoc(ref, { email, phoneNumber, address }).catch(err => console.error(err))
    console.log(res);
}

export const addACart = async (cart: Cart) => {
    const carts = collection(db, "carts");
    const ref = await addDoc(carts, cart);
    return ref
}

export const getCartItems = async (uid: string) => {
    const carts = collection(db, "carts");
    const q = query(carts, where("user_id", "==", uid));

    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) return []

    return querySnapshot.docs
}

type OrderDetail = {
    type: DeliveryType,
    products: Cart[],
    address: string,
    total_price: number,
}

export const order = async (user: UserData, order_details: OrderDetail) => {
    const deliveries = collection(db, "deliveries");
    const { address, products, total_price, type } = order_details;

    const delivery: Delivery = {
        address,
        products,
        total_price,
        type,
        user,
        date: serverTimestamp(),
        delivered: {
            delivered_by: null,
            delivered: false
        }
    }
    const ref = await addDoc(deliveries, delivery);

    return ref
}