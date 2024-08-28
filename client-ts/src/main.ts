import './assets/index.css'

import { createApp } from 'vue' 

import App from './App.vue'
import router from './router'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const app = createApp(App)
 
app.use(router)

initializeApp({
    apiKey: "AIzaSyBJk2sGkmyf-NaGpk1xLkccHFGZZTDZ84U",
    authDomain: "quirk-rewards.firebaseapp.com",
    projectId: "quirk-rewards",
    storageBucket: "quirk-rewards.appspot.com",
    messagingSenderId: "277714949448",
    appId: "1:277714949448:web:f3cf7f24d6b84fbd5ecf7d",
    measurementId: "G-69CTYB1XPT"
}); 

app.mount('#app')
