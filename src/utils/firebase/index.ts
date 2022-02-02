import { initializeApp } from "firebase/app";
import type { FirebaseOptions } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { browser } from "$app/env";

const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyCFFbprkGnN8jJJrcynfWzgSmyxpGRnNFc",
    authDomain: "recreational-hazard.firebaseapp.com",
    projectId: "recreational-hazard",
    storageBucket: "recreational-hazard.appspot.com",
    messagingSenderId: "41397810792",
    appId: "1:41397810792:web:574a078026882e154daddd",
    measurementId: "G-GL810PS3QN"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

if (browser) {
    const appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider('6LduwTgeAAAAAOc2NnP9_bW2KH_qQ3hiQ1ww9FRv')
    })
}
