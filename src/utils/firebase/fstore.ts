import type { UserData } from "$utils/types";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { app } from './index';

const db = getFirestore(app)

export const addUser = async (userdata: UserData) => {
    const ref = doc(db, "users", userdata.id);
    const res = await setDoc(ref, userdata).catch(err => console.error(err))
    console.log(res);
}