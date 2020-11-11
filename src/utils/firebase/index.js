import firebase from "firebase";
import "firebase/firestore";
import config from "./config";

const app = firebase.initializeApp(config);

export const fireStore = app.firestore();
export default app;
