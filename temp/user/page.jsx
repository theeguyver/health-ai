"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilIcon } from "@heroicons/react/24/solid";

const UserPage = () => {
    const [user, setUser] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {

        function getCookie(name) {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Check if this cookie is the one we're looking for
                if (cookie.startsWith(name + '=')) {
                    // Return the value of the cookie
                    return cookie.substring(name.length + 1);
                }
            }
            // If cookie not found, return null
            return null;
        }  
        const fetchUserDetails = async () => {
            try {
                // Retrieve email from cookie
                const userEmail = getCookie('userEmail');
                console.log(userEmail);
                if (!userEmail) {
                    throw new Error('Email cookie not found');
                }

                const response = await axios.get(`http://localhost:3002/userdetails?email=${encodeURIComponent(userEmail)}`);
                console.log("Response data:", response.data); // Log the response data
                console.log("Image url: ", response.data[0].profilePhoto); // Log the image URL
                setUser(response.data[0]);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
    
        fetchUserDetails();
    }, []);
    

    const handleImageChange = (event) => {
        setImageFile(event.target.files[0]);
    };

    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Check if this cookie is the one we're looking for
            if (cookie.startsWith(name + '=')) {
                // Return the value of the cookie
                return cookie.substring(name.length + 1);
            }
        }
        // If cookie not found, return null
        return null;
    }

    const handleImageUpload = async () => {
        if (!imageFile) return;

        const userEmail = getCookie('userEmail');

        const formData = new FormData();
        formData.append('profilePhoto', imageFile);

        try {
            const response = await axios.post(`http://localhost:3004/uploadphoto?email=${encodeURIComponent(userEmail)}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            setUser({ ...user, imageUrl: response.data.url });
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const containerStyle = {
        textAlign: 'center',
        color: 'white',
        marginTop: '150px',
        width: '200px',

    };

    const userInfoStyle = {
        margin: '10px 0',
    };

    const imageStyle = {
        width: '150px',
        // borderRadius: '50%',
        border: '3px solid white',
        margin: '0 auto 20px',
    };

    return (
        
        <div style={{ textAlign: 'center', color: 'white', marginTop: '150px' }}>
            {user ? (
                <div style={{ backgroundColor: '#17023b', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', width: '700px', margin: '0 auto' }}>
                    <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 font-bold text-4xl mb-6">User Profile</h1>
                    
                    <img src={`http://localhost:3002/${user.profilePhoto}`} alt="User" style={{ width: '150px', border: '3px solid white', margin: '0 auto 20px' }} />
                    <div style={{ marginBottom: '20px' }}>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        <button onClick={handleImageUpload}>Upload Image</button>
                    </div>

                    {/* <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto 20px', overflow: 'hidden', borderRadius: '50%', border: '3px solid white' }}>
                        <img 
                            src={`http://localhost:3002/${user.profilePhoto}`} 
                            alt="User" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                        <input type="file" id="imageUpload" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                        <label htmlFor="imageUpload" style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', background: 'rgba(255, 255, 255, 0.4)', padding: '5px', borderRadius: '50%', cursor: 'pointer' }}>
                            <PencilIcon className="h-6 w-6" />
                        </label>
                    </div>  */}

                    <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '10px' }}>
                    <div style={{ fontSize: '16px', backgroundColor: '#5027a8', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'left' }}>
                        <strong>Name:</strong>
                    </div>
                    <div style={{ fontSize: '16px', backgroundColor: '#5027a8', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'left' }}>
                        {user.name}
                    </div>
                    <div style={{ fontSize: '16px', backgroundColor: '#5027a8', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'left' }}>
                        <strong>Email:</strong>
                    </div>
                    <div style={{ fontSize: '16px', backgroundColor: '#5027a8', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'left' }}>
                        {user.email}
                    </div>
                    <div style={{ fontSize: '16px', backgroundColor: '#5027a8', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'left' }}>
                        <strong>Age:</strong>
                    </div>
                    <div style={{ fontSize: '16px', backgroundColor: '#5027a8', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'left' }}>
                        {user.age}
                    </div>
                    <div style={{ fontSize: '16px', backgroundColor: '#5027a8', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'left' }}>
                        <strong>Gender:</strong>
                    </div>
                    <div style={{ fontSize: '16px', backgroundColor: '#5027a8', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'left' }}>
                        {user.gender}
                    </div>
                    <div style={{ fontSize: '16px', backgroundColor: '#5027a8', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'left' }}>
                        <strong>Phone:</strong>
                    </div>
                    <div style={{ fontSize: '16px', backgroundColor: '#5027a8', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'left' }}>
                        {user.phone}
                    </div>
                </div>

                    

                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default UserPage;