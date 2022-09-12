import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
import {getAuth} from "firebase/auth";


const fireConfig = {
apiKey: "AIzaSyCI3SyO8thlKnafJPAAhzKwxHQlXcRFgQo",
  authDomain: "rock-paper-scissors-adde6.firebaseapp.com",
  databaseURL: "https://rock-paper-scissors-adde6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rock-paper-scissors-adde6",
  storageBucket: "rock-paper-scissors-adde6.appspot.com",
  messagingSenderId: "301688251121",
  appId: "1:301688251121:web:1b82aa7128ed4e3d5bff50"

}

const app = initializeApp(fireConfig)

const database = getDatabase(app)

const auth = getAuth()


export { database, auth }

