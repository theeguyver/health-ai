"use client"
import React, { useState, useEffect } from 'react';

const UserDetailsPage = ({ name, age, gender, email, phone, onDownloadReport }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch user details from the server
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3002/userdetails?email=${email}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }
                const data = await response.json();
                setUserDetails(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        // Call the fetchUserDetails function when the component mounts
        fetchUserDetails();
    }, [email]); // Trigger the effect when the email prop changes

    return (
        <div>
            <h2>Welcome to Your Mental Health Profile</h2>
            
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : userDetails ? (
                <div>
                    <div>
                        <p>Name: {userDetails.name}</p>
                        <p>Age: {userDetails.age}</p>
                        <p>Gender: {userDetails.gender}</p>
                        <p>Contact Information:</p>
                        <ul>
                            <li>Email: {userDetails.email}</li>
                            <li>Phone: {userDetails.phone}</li>
                        </ul>
                    </div>
                    <button onClick={onDownloadReport}>Download Report</button>
                </div>
            ) : (
                <p>No user details found</p>
            )}
        </div>
    );
};

export default UserDetailsPage;
