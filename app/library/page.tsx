"use client"
import React, { useState, useEffect } from "react";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Footer from "@/components/main/Footer";
// --------------------------------------
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { InfoWindow } from '@react-google-maps/api';


const mapContainerStyle = {
  width: '90vw',
  height: '100vh',
  marginLeft: '45px', // Use camelCase instead of hyphens
  marginRight: '20px', // Use camelCase instead of hyphens
  marginBottom: '20px',
  border: '2px solid white', // White border with 2px width
  borderRadius: '10px', // Slightly rounded edges with 10px border radius
  align: 'center'
};

// ----------------------------

const Library = () => {
  interface therapists {
    name: string;
    image: string;
    designation: string;
    description: string;
    location: string;
    contact: string;
    latitude: string; // New field to store latitude
    longitude: string; // New field to store longitude
  }

  const [searchQuery, setSearchQuery] = useState("");
  // const [therapists, setTherapists] = useState([]);
  const [therapists, setTherapists] = useState<therapists[]>([]);
  const [visibleCardCount, setVisibleCardCount] = useState(3);
  // User location
  const [userLocation, setUserLocation] = useState<null | { lat: number, lng: number }>(null); // Explicitly define type
  // Set therapist location
  const [selectedTherapist, setSelectedTherapist] = useState<therapists | null>(null); 
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState<boolean>(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'YOUR_API_KEY', 
     
  });

  if (loadError) {
    console.log("Error loading maps");
  }

  if (!isLoaded) {
    console.log("Loading maps. ");
  }

  useEffect(() => {
    fetch("http://localhost:3003/therapists")
      .then(response => response.json())
      .then(data => setTherapists(data))
      .catch(error => console.error("Error fetching therapists:", error));

      // Fetch user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        error => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
    
  }, []);

  const filteredTherapists = therapists.filter(therapist =>
    therapist.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleSearchInputChange = event => {
  //   setSearchQuery(event.target.value);
  // };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleLoadMore = () => {
    setVisibleCardCount(prevCount => prevCount + 3);
  };

  const handleContactButtonClick: (therapist: therapists) => void = (therapist) => {
    setSelectedTherapist(therapist);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center px-20 mt-40 w-full">
        <div className="Welcome-box py-8 px-7 border border-[#7042f88b] opacity-[0.9] text-center">
          <SparklesIcon className="text-[#b49bff] h-5 w-5 inline-block" />
          <h1 className="Welcome-text text-[13px]">Improve Mental Health</h1>
        </div>

        <div className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto text-center">
          <span>
            Connecting You{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Instant Access to Nearby Therapists
            </span>
          </span>
        </div>

        <p className="text-lg text-gray-400 my-5 max-w-[600px] text-center">
          If you're not finding the support you need from a mental health chatbot, click here for immediate access to nearby therapists who are ready to provide personalized support and guidance tailored to your needs
        </p>

        <div className="flex flex-col items-center">
        <div className="relative">
    <input
      type="text"
      placeholder="Search location..."
      value={searchQuery}
      onChange={handleSearchInputChange}
      className="border border-gray-300 px-4 py-2 rounded-md mb-4 focus:outline-none focus:border-purple-500 pr-10" // Add pr-10 to add space for the icon
    />
    <img
      src="./search.png" // Replace "search-icon.png" with the path to your search icon image
      alt="Search Icon"
      className="absolute top-0 right-0 mt-1 mr-1 mb-5 h-9 w-9 cursor-pointer"
    />
  </div>
          
          {/* Modify the button click to fetch therapists
          <button onClick={() => {
            fetch("http://localhost:3003/therapists")
              .then(response => response.json())
              .then(data => setTherapists(data))
              .catch(error => console.error("Error fetching therapists:", error));
          }} className="py-2 px-4 button-primary text-center text-white cursor-pointer rounded-lg max-w-[300px] inline-block mb-6">
            Therapists
          </button> */}
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-7xl mt-20">
          {filteredTherapists.slice(0, visibleCardCount).map((therapist, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={therapist.image}
                alt={therapist.name}
                className="rounded w-40 h-40 object-cover"
              />
              <div className="text-center">
                <p className="text-lg font-semibold mt-4 mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                    {therapist.name}
                  </span>
                </p>
                <p className="text text-white mt-2">{therapist.designation}</p>
                <p className="text-sm text-white mt-2">{therapist.description}</p>
                <p className="text text-white mt-2">{therapist.location}</p>
                <button onClick={() => handleContactButtonClick(therapist)} className="text text-white font-bold mt-2 py-2 px-4 button-primary text-center text-white cursor-pointer rounded-lg max-w-[300px] mb-10">Contact Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {visibleCardCount < filteredTherapists.length && (
        <div className="flex justify-center mt-4 mb-10">
          <button onClick={handleLoadMore} className="py-2 px-4 button-primary text-center text-white cursor-pointer rounded-lg max-w-[300px]">
            Load More
          </button>
        </div>
      )}

      {/* Google map here */}
      {isLoaded && userLocation && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={userLocation}
        >
          {/* Render user location marker */}
          {userLocation && <Marker position={userLocation} />}
          {/* Render selected therapist location marker */}
          {selectedTherapist && (
            <Marker
            position={{
              lat: parseFloat(selectedTherapist.latitude),
              lng: parseFloat(selectedTherapist.longitude)
            }}
            icon={{
              url: "https://cdn-icons-png.flaticon.com/256/5695/5695628.png", // Specify the URL of the green marker icon image
              scaledSize: new window.google.maps.Size(40, 40), // Adjust the size of the icon if needed
            }}
            onMouseOver={() => {
              setIsInfoWindowOpen(true);
              console.log("Info Window Open: ", isInfoWindowOpen);
              console.log("Selected therapist: ", selectedTherapist.name);
            }}
            />
          )}
          {isInfoWindowOpen && selectedTherapist && (
  <InfoWindow
    position={{
      lat: parseFloat(selectedTherapist.latitude),
      lng: parseFloat(selectedTherapist.longitude)
    }}
    onCloseClick={() => setIsInfoWindowOpen(false)}
  >
    <div style={{ background: 'linear-gradient(to right, #6a1b9a, #00cccc)',border: '0.5px solid white', padding: '2px', borderRadius: '10px', maxWidth: '200px' }}>
      <img src={selectedTherapist.image} alt={selectedTherapist.name} style={{
        width: '50px', 
        height: '50px', 
        borderRadius: '50%', 
        border: '1px solid white', 
        marginBottom: '10px', 
        display: 'block', 
        marginLeft: 'auto', 
        marginRight: 'auto',
        marginTop: '10px'
  }} />
      <h3 style={{ color: 'white', margin: 0, fontWeight: 'bold', textAlign: 'center' }}>{selectedTherapist.name}</h3>
      <p style={{ color: 'white', margin: 2 }}>{selectedTherapist.designation}</p>
      <p style={{ color: 'white', margin: 2 }}>Contact: {selectedTherapist.contact}</p>
    </div>
  </InfoWindow>
)}
        </GoogleMap>
      )}


    <Footer />
    </div>
  );
};

export default Library;