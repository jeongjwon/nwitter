# [Firebase V9]

1. Fireabse 인증 모듈
   import { initializeApp } from "firebase/app";
   import { getAuth } from "firebase/auth";
   const firebaseConfig = { ... } ;
   const app = initializeApp(firebaseConfig);
   export const authService = getAuth();
   
   firebase.auth() -> getAuth() (firebase . like function is not used ...)
   firebase -> initializeApp 
   
2. Auth 관련 함수
   data = await authService.createUserWithEmailAndPassword( email, password );
   (createUseWithEmailAndPassword 와 signInWithEmailAndPassword 를 import)
   -> import { createUseWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
   data = awiat createUseWithEmailAndPassword( authService, email, password );
   
3. firebase 관련
    export const firebaseInstance = fireabse;
    -> export const firebaseInstance = getAuth();
    
    import "firebase/firestore"; 
    -> import { getFirestore } from "firebase/firestore";
    
    export const dbService = firebase.firestore();
    -> export const dbService = getFirestore();
    
4. Social LogIn 
   provider = new firebaseInstace.authGoogleAuthProvider();
   
   -> provider = new GoggldAuthProvider();
      import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
    
   -> signInWithPopup 시 
      const data = await authService.signInWithPopup(provider);
      ->          = await signInWithPopup(authService, provider);
   
5. Collection 
   
   #Add 
   
   import { dbService } from "fbase";
   dbService.collection("nweets").add({...}_
   
   ->  import { collection, addDoc } from "firebase/firestore";
       await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt : Date.now(),
       });
   
   #Get
   
   const dbNweets = await dbSerive.collection("nweets").get();
    
   -> import { getDocs } from "firebase.firestore";
      const dbNweets = await getDocs(collecion(dbService, "nweets"));
      
      
6. Snapshot -> RealTime DB
  
