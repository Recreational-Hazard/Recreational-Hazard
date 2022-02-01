import { writable } from "svelte/store";
import { browser } from "$app/env";
import {
    getAuth,
    onAuthStateChanged,
    signInWithRedirect,
    signOut as _signOut,
    GoogleAuthProvider,
    FacebookAuthProvider,
    getRedirectResult,
    updateProfile,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword as signUp,
    sendPasswordResetEmail,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { app } from "./index";
import { addUser, updateUser } from "./fstore";
import type { UserData } from "$utils/types";

export interface AuthState {
    user: User | null;
    known: boolean;
}

const createAuth = () => {
    const { subscribe, set } = writable<AuthState>({ user: null, known: false });

    async function listen() {
        const auth = getAuth(app);
        onAuthStateChanged(
            auth,
            (user) => {
                set({ user, known: true });
                console.log("logged in user", user);
            },
            (err) => console.error(err.message)
        );
    }

    if (browser) {
        // listen to auth changes on client
        listen();
    } else {
        // no auth on server in this example
        set({ user: null, known: true });
    }

    function providerFor(name: string) {
        switch (name) {
            case "google":
                return new GoogleAuthProvider();
            case "facebook":
                return new FacebookAuthProvider();
            default:
                throw "unknown provider " + name;
        }
    }

    async function signInWith(name: string) {
        const auth = getAuth(app);
        const provider = providerFor(name);
        await signInWithRedirect(auth, provider);
        const { user } = await getRedirectResult(auth);
        await getUserDataAndAdd(user);
    }

    async function signUpWithEmail(name: string, email: string, password: string) {
        const auth = getAuth(app);
        const { user } = await signUp(auth, email, password);
        await updateProfile(user, { displayName: name });
        await getUserDataAndAdd(user);
    }

    async function signOut() {
        const auth = getAuth(app);
        await _signOut(auth);
    }

    return {
        subscribe,
        signInWith,
        signOut,
        signUpWithEmail,
    };
};

export const auth = createAuth();

export const changePassword = async (email: string) => {
    const auth = getAuth(app);
    await sendPasswordResetEmail(auth, email);
    return (`Check your inbox. password reset link sent to ${email}`);
}


export const changeUserDetails = async (user: User, { displayName = "", phoneNumber = "" }) => {

    if (displayName) {
        await updateProfile(user, {
            displayName: displayName,
        })
        await updateUser(user.uid, { name: displayName })
    }

    if (phoneNumber) {
        await updateUser(user.uid, { phone: phoneNumber })
    }
}

async function getUserDataAndAdd(user: User) {
    const userData: UserData = {
        id: user.uid,
        email: user.email,
        phone: user.phoneNumber,
        name: user.displayName,
    };
    await addUser(userData);
}

