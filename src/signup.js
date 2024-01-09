import { useState } from "react";
import fb from "./firebase";
import useAuthState from "./hooks";

export default function Signin() {
  const { user, initializing } = useAuthState(fb.auth());
  const SigninwithGoogle = async () => {
    const provider = new fb.auth.GoogleAuthProvider();
    fb.auth().useDeviceLanguage();

    try {
      await fb.auth().signInWithRedirect(provider);
    } catch (error) {
      console.log(error.message);
    }
    if(initializing){
      return 'Loading....'
    }
  };
  return (
    <div className="mt-20 text-center" onClick={SigninwithGoogle}>
      <button className="border-2 border-black">Sign In With Google</button>
    </div>
  );
}
