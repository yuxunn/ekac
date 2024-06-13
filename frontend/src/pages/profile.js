import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { VscAccount } from "react-icons/vsc";
import { auth, db } from "../components/firebase";

const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const profileRef = doc(db, "users", user.uid);
                const profileSnap = await getDoc(profileRef);
                if (profileSnap.exists()) {
                    setUserDetails(profileSnap.data());
                } else {
                    console.log("No user data available");
                }
            } else {
                console.log("User is not logged in");
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 to-blue-300">
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-md mx-4">
                <VscAccount className="w-24 h-24 rounded-full" alt="User Avatar" />
                <div className="flex flex-col justify-center ml-4">
                    {userDetails ? (
                        <div>
                            <p>Email: {userDetails.email}</p>
                        </div>
                    ) : (
                        <p>Loading user details...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
