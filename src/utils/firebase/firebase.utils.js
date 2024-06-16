
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getAuth, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, signOut, onAuthStateChanged, 
    signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail  
} from "firebase/auth";
import { Toaster, toast } from 'sonner'
import { doc, getDoc , setDoc, getFirestore, collection, where, orderBy, addDoc, getDocs, query, updateDoc, deleteDoc, startAt, endAt } from "firebase/firestore";


// Firebase configuration

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHsVT1anOf4wf-EkWTbqab37u-JnEi4HY",
  authDomain: "mighty-mainers.firebaseapp.com",
  projectId: "mighty-mainers",
  storageBucket: "mighty-mainers.appspot.com",
  messagingSenderId: "887562355792",
  appId: "1:887562355792:web:4dd9df30c24e2e7c9a3d55"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const imageDb = getStorage(firebaseApp);


export const auth = getAuth();
export const db = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const logGoogleUser = async () => {
    try {
      await signInWithGooglePopup();
    } catch (error) {
      switch (error.code) {
        case ('auth/popup-closed-by-user'):
            infoToast('Login window closed..!');
          break;
      
        default:
            infoToast('An error occured..!')
            console.log('An error occured: '+error.code);
          break;
      }
    }
    // const userDocRef = await createUserDocumentFromAuth();
    // console.log(user);
}

export const createAuth = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);  
}

export const createUserDocumentFromAuth = async (userAuth, additionalinfo = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    // console.log('userDocRef: ', userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    // console.log('userSnapshot: ', userSnapshot);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        // const { email } = userAuth;
        const createdAt = new Date();
        const uid = userAuth.uid;
        const status = 'user';
        const del = 'no';

      try {
        await setDoc(userDocRef, {
          uid, displayName, email, status, del, createdAt, ...additionalinfo
        });
      } catch (error) {
        console.log('An error occured', error.message);
      }
    }
    return await searchUserDoc(userAuth.email)
    return userSnapshot;
}

export const signInAuthWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);  
}

export const signOutUser = async () => await signOut(auth);
export const resetPassword = (email) => sendPasswordResetEmail(auth, email);
export const onAuthStateChangeListener = (callback) => onAuthStateChanged(auth, callback);






// Inquiry

export const createInquiryDoc = async (docToAdd) => {
    const refValue = collection(db, 'inquiries');
    try {
        await addDoc(refValue, docToAdd);
    } catch (error) {
        console.log('Error occoured at Inquiry: ', error.message);
    }
    
}

export const getInquiryDocs = async () => {
    const docsReceiver = [];
    const querySnapshot = await getDocs(query(collection(db, 'inquiries'), orderBy("created_at", "desc")));

    const purMap = () => querySnapshot.forEach((doc) => {
        docsReceiver.push({...doc.data(), id: doc.id});
    });
    purMap();
    return docsReceiver;
}


// Clients

export const createClientDoc = async (docToAdd) => {
    const refValue = collection(db, 'clients');
    try {
        await addDoc(refValue, docToAdd);
    } catch (error) {
        console.log('Error occoured at Client: ', error.message);
    }
    
}

export const getClientDocs = async () => {
    const docsReceiver = [];
    const querySnapshot = await getDocs(query(collection(db, 'clients'), orderBy("created_at", "desc")));

    const purMap = () => querySnapshot.forEach((doc) => {
        docsReceiver.push({...doc.data(), id: doc.id});
    });
    purMap();
    return docsReceiver;
}

export const updateClientDoc = async (client) => {
    const upRefValue = doc(db, 'clients', client.id);
    try {
        await updateDoc(upRefValue, client);
    } catch (error) {
        console.log('Error occoured at Client: ', error.message);
    }
}





// Generate OTP

export const OTPGen = async (limit) => {
    const otpRef = collection(db, 'otpgen');

    for (let i = 0; i < limit; i++) {
        var otpp = 'A'+Math.random()*107000;
        // console.log('OTPGen - '+otpp.substring(0, 5));
        console.log(i+' - '+otpp.substring(0, 5));
        try {
            await addDoc(otpRef, { otp: otpp.substring(0, 5), status: 'no'}).then(
                // window.location.reload()
            );
        } catch (error) {
            infoToast('Internet Disconnected');
            console.log('Error occoured: ', error.message);
        }
        
    }
    
}

export const searchOtp = async (otp) => {
    // const otpRef = await getDocs(query(collection(db, 'otpgen').where("otp", "==", otp)));

    const found = [];
    const otpRef = collection(db, "otpgen");

    const findOtp = await getDocs(query(otpRef, where("otp", "==", otp)));
    const mapOtp = () => findOtp.forEach((doc) => {
        found.push({...doc.data(), id: doc.id});
    });
    mapOtp();
    return found[0];
}

export const updateOTPDoc = async (otp) => {
    const upRefValue = doc(db, 'otpgen', otp.id);
    try {
        await updateDoc(upRefValue, otp);
    } catch (error) {
        console.log('Error occoured at OTP: ', error.message);
    }
}



// Users

export const searchUserDoc = async (email) => {
    const found = [];
    const otpRef = collection(db, "users");

    const findOtp = await getDocs(query(otpRef, where("email", "==", email)));
    const mapOtp = () => findOtp.forEach((doc) => {
        found.push({...doc.data()});
    });
    mapOtp();
    // console.log(found[0]);
    return found[0];
}

export const getUsersDocuments = async () => {
    const usersReceiver = [];
    const querySnapshot = await getDocs(query(collection(db, 'users'), orderBy("createdAt", "desc")));

    const usersMap = () => querySnapshot.forEach((doc) => {
        usersReceiver.push({...doc.data()});
    });
    usersMap();
    // console.log(usersReceiver);
    return usersReceiver;
}

export const updateUserDoc = async (user) => {
    const upRefValue = doc(db, 'users', user.uid);
    try {
        await updateDoc(upRefValue, user).then(
            successToast(user.displayName+"'s record temporarily deleted")
        )
    } catch (error) {
        console.log('Error occoured at sales: ', error.message);
    }
}





// Toasts

export const successToast = (message) => {
  toast.success(message, {
    position: 'top-left',
    duration: '5000'
  })
}

export const errorToast = (message) => {
  toast.error(message, {
    position: 'top-left',
    duration: '5000'
  })
}

export const infoToast = (message) => {
  toast.info(message, {
    position: 'top-left',
    duration: '5000'
  })
}