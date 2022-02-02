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
import { app } from "./index";
import { setUser } from "./fstore";
import type { User } from "firebase/auth";

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
    }

    async function signUpWithEmail(name: string, email: string, password: string) {
        const auth = getAuth(app);
        const { user } = await signUp(auth, email, password);
        await updateProfile(user, { displayName: name });
        await setUser(user.uid, { email, phoneNumber: null, address: "" });
        await changePassword(email);
    }

    async function signIn(email:string, password: string) {
        const auth = getAuth(app);
        await signInWithEmailAndPassword(auth, email, password);
    }
    
    async function signOut() {
        const auth = getAuth(app);
        await _signOut(auth);
    }

    async function updateUserData(user: User, { displayName = "", phoneNumber = 0 }) {
        if (displayName) {
            await updateProfile(user, { displayName });
        }
        if (phoneNumber) {
            await setUser(user.uid, { phoneNumber });
        }
    }

    return {
        subscribe,
        signInWith,
        signIn,
        signOut,
        signUpWithEmail,
        updateUserData,
    };
};

export const auth = createAuth();

export const changePassword = async (email: string) => {
    const auth = getAuth(app);
    await sendPasswordResetEmail(auth, email);
    return (`Check your inbox. password reset link sent to ${email}`);
}
