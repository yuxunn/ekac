import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { VscAccount } from "react-icons/vsc";
import { auth, db } from "../components/firebase";
import AvatarSelector from '../components/avatarSelector';
import cat from "../assets/cat.png";
import panda from "../assets/panda.png";
import finn from "../assets/finn-the-human-duotone-svgrepo-com.svg"
const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
          const user = auth.currentUser;
          if (user) {
            const profileRef = doc(db, "users", user.uid);
            const profileSnap = await getDoc(profileRef);
            if (profileSnap.exists()) {
              setUserDetails(profileSnap.data());
              setAvatar(profileSnap.data().avatar);
            } else {
              console.log("No user data available");
            }
          } else {
            console.log("User is not logged in");
          }
        };
      
        fetchUserData();
      }, [auth.currentUser]); 
      

      const handleAvatarSelect = async (selectedAvatar) => {
        setAvatar(selectedAvatar);
        const user = auth.currentUser;
        if (user) {
          const profileRef = doc(db, "users", user.uid);
          try {
            await updateDoc(profileRef, { avatar: selectedAvatar });
            setUserDetails(prevState => ({ ...prevState, avatar: selectedAvatar }));
          } catch (error) {
            console.error("Error updating avatar: ", error);
          }
        }
      };
      

    const avatars = [
        cat,panda,finn
    ];


return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 to-blue-300">
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-md mx-4">
            <img src={avatar || avatars[0]} className="w-24 h-24 rounded-full" alt="User Avatar" />
            <div className="flex flex-col justify-center ml-4">
                {userDetails ? (
                    <>
                        <p>Email: {userDetails.email}</p>
                        <AvatarSelector avatars={avatars} onSelect={handleAvatarSelect} />
                    </>
                ) : (
                    <p>Loading user details...</p>
                )}
            </div>
        </div>
    </div>
);
};


export default Profile;
