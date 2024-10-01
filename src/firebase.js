// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Здесь указываются настройки Firebase, которые ты получаешь из Firebase консоли
const firebaseConfig = {
  apiKey: "AIzaSyAQnPo0dTMowrZFlA2Zd7qGxVkCQxaKn7U",
  authDomain: "sample-firebase-ai-app-bae3d.firebaseapp.com",
  projectId: "sample-firebase-ai-app-bae3d",
  storageBucket: "sample-firebase-ai-app-bae3d.appspot.com",
  messagingSenderId: "806380553587",
  appId: "1:806380553587:web:377a744702003b607c3106"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Экспорт аутентификации
export const auth = getAuth(app);
export default app;
