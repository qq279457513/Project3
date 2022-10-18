import _ from "lodash";
import authContext from "./authContext";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyAvidXxiQkKWFPYXi_FfEQqW8ipz7zcir0",
  authDomain: "randel-firebase.firebaseapp.com",
  projectId: "randel-firebase",
  storageBucket: "randel-firebase.appspot.com",
  messagingSenderId: "246585448898",
  appId: "1:246585448898:web:d54dc5767240a5b5a35e5b",
  measurementId: "G-8VE3VXKKM4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const colRef = collection(firestore, "books"); //  "users/`user.uid`/history"
export var userRef = null;

// Initialize data from collection book
getDocs(colRef).then((snapshot) => {
  snapshot.docs.forEach((doc1) => {
    if (doc1.data().pid === 0) {
      authContext._currentValue.invoiceID = doc1.data().invoice;
    } else {
      authContext._currentValue.allBooks.push({ ...doc1.data() });
      authContext._currentValue.totalQty += 1;
      authContext._currentValue.init = 0;
    }
  });
});

initUserState();

//check if user login, initialize user data
export function initUserState() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      try {
        userRef = doc(firestore, "users", user.uid);
        getDoc(userRef).then((snapshot) => {
          authContext._currentValue.name = snapshot.data().name;
          authContext._currentValue.email = snapshot.data().email;
          authContext._currentValue.id = snapshot.data().uid;
          authContext._currentValue.cId = snapshot.data().cartId;
        });
        let ref_c = collection(firestore, `users/${user.uid}/cart`);
      
        setCart(ref_c);
        let ref_h = collection(firestore, `users/${user.uid}/history`);
        setOrderHistory(ref_h);
      } catch (error) {
        console.log(error);
      }

      authContext._currentValue.test = 3;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
}

export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    setDoc(doc(firestore, "users", user.uid), {
      uid: user.uid,
      name: email,
      authProvider: "local",
      email,
      cartId: 0,
    });
    alert("Register successful!");
  } catch (err) {
    alert(err.message);
  }
};

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    // initUserState();

    alert("Login successful!");
    return true;
  } catch (err) {
    authContext._currentValue.test = 1;
    console.error(err);
    alert(err.message);
  }
};

export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const logout = () => {
  signOut(auth);
};

// initial cart and history collection for each new user signup.
export function initUser() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setDoc(doc(firestore, `users/${user.uid}/cart`, user.uid), {
        pid: 0,
        name: "root",
      });
      setDoc(doc(firestore, `users/${user.uid}/history`, user.uid), {
        hid: 0,
        name: "root",
        date: "0",
      });
    } else {
      // User is signed out
      // ...
      console.log("null user");
    }
  });
}

// add product in collection books
export function addBook(data) {
  try {
    setDoc(doc(firestore, `books`, data.pid.toString()), {
      pid: data.pid,
      name: data.name,
      price: data.price,
      url: data.url,
    });
  } catch (err) {
    alert(err.message);
  }
}

//loading cart collection
export function setCart(ref) {
  authContext._currentValue.cart = [];
  getDocs(ref).then((snapshot) => {
    snapshot.docs.forEach((doc1) => {
      if (doc1.data().pid !== 0)
        authContext._currentValue.cart.push({ ...doc1.data() });
    });
    authContext._currentValue.cart = _.sortBy(authContext._currentValue.cart, [
      "cId",
    ]);
  });
}

//loading order histroy
export function setOrderHistory(ref) {
  authContext._currentValue.orderHistory = [];
  getDocs(ref).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      if (doc.data().date !== "0") {
        authContext._currentValue.orderHistory.push({ ...doc.data() });
      }
    });
    authContext._currentValue.orderHistory = _.sortBy(
      authContext._currentValue.orderHistory,
      ["date"]
    );
  });
}

//add product in to cart
export function addBookforUser(data, cid, Qty) {
  setDoc(
    doc(
      firestore,
      `users/${authContext._currentValue.id}/cart`,
      cid.toString()
    ),
    {
      cId: cid,
      pId: data.pid,
      name: data.name,
      price: data.price,
      url: data.url,
      qty: Qty,
    }
  );
  alert("add book in cart");
  let ref = collection(firestore, `users/${authContext._currentValue.id}/cart`);
  setCart(ref);
  let userData = {
    cartId: cid,
  };
  updateUser(userData);
}

//update data in cart
export function updateCartItem(id, data) {
  let ref = doc(
    firestore,
    `users/${authContext._currentValue.id}/cart`,
    id.toString()
  );
  updateDoc(ref, data)
    .then((ref) => {})
    .catch((error) => {
      console.log(error);
    });
}

// update user info
export function updateUser(data) {
  updateDoc(userRef, data)
    .then((userRef) => {
      authContext._currentValue.name = data.name;
     
    })
    .catch((error) => {
      console.log(error);
    });
}

// update history

export function updateHistory(data) {
  let refdoc = doc(
    firestore,
    `users/${authContext._currentValue.id}/history`,
    data.invoice
  );
  let ref = collection(
    firestore,
    `users/${authContext._currentValue.id}/history`
  );
  setDoc(refdoc, data);
  setOrderHistory(ref);
  updateInvoice();
}

//update invoice number record in books/admin
function updateInvoice() {
  updateDoc(doc(firestore, "books", "admin"), {
    invoice: authContext._currentValue.invoiceID,
  });
}

//Delete Doc
export async function deleteCart(docId) {
  let path = doc(
    firestore,
    `users/${authContext._currentValue.id}/cart`,
    docId.toString()
  );
  await deleteDoc(path)
    .then(() => {
    })
    .catch((error) => {
      console.log(error);
    });
}
