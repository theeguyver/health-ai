import React from "react";
import { SparklesIcon } from "@heroicons/react/24/solid";
// Import Image from "next/image" if needed

const Aboutus = () => {
  // Array of team members with their information
  const teamMembers = [
    
    { name: "Subhodeep Mukherjee", image: "https://i.pinimg.com/564x/3d/1e/2b/3d1e2bd7311fb595352c07efc6e9a209.jpg", description: "ML Engineer" },
    { name: "Anjali Kolhatkar", image: "https://i.pinimg.com/564x/ae/bb/d0/aebbd0e69e79b1a79cc6850355db395e.jpg", description: "Full Stack Developer" },
    { name: " Priya Jha", image: "https://i.pinimg.com/564x/a9/a4/fb/a9a4fb5ba7d2f73907f5b4aefbed1b3a.jpg", description: "API & hosting" },
    { name: "Prakashchand Choudhary ", image: "https://i.pinimg.com/564x/14/dc/be/14dcbeff90928ffe57cb1c12bbde8a3d.jpg", description: "ML Engineer" },
    { name: "Shreelu Santosh", image: "https://i.pinimg.com/564x/72/ec/f5/72ecf54e39d1fa8eb10273ddffca9440.jpg", description: "Database Engineer" },
    { name: "Gitisha Mishra", image: "https://i.pinimg.com/564x/43/bf/f3/43bff3b9f736634fe518f6e66eb8f760.jpg", description: "Security Architect" },
    { name: "Aakash Shivshankar", image: "https://i.pinimg.com/564x/41/e0/39/41e0398984b0f1a0c79acfb0694bfcce.jpg", description: "UI/UX designer" },
    { name: "Suchismita Dutta ", image: "https://i.pinimg.com/564x/31/d3/74/31d37447c2fbf8ddab41e80ff24a36b6.jpg", description: "Front end developer " },
    // Add more team members as needed
  ];

  return (
    <div className="flex flex-col items-center justify-center px-20 mt-40 w-full">
      <div className="Welcome-box py-8 px-7 border border-[#7042f88b] opacity-[0.9] text-center">
        <SparklesIcon className="text-[#b49bff] h-5 w-5 inline-block" />
        <h1 className="Welcome-text text-[13px]">Improve Mental Health</h1>
      </div>

      <div className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto text-center">
        <span>
          HealthAI{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          Your Virtual Mental Health Companion
          </span>{" "}
      
        </span>
      </div>

      <p className="text-lg text-gray-400 my-5 max-w-[600px] text-center">
      Welcome to HealthAI, your trusted virtual mental health companion. Our chatbot is designed to provide compassionate support and guidance whenever you need it, 24/7. Whether you're struggling with stress, anxiety, or simply need someone to talk to, HealthAI is here for you. Our intelligent algorithms ensure personalized interactions, offering tailored advice and coping strategies to help you navigate life's challenges. If you're not finding the support you need, HealthAI can seamlessly connect you with nearby therapists for further assistance. Take the first step towards better mental well-being with HealthAI today
      </p>
      <h2 className="text-4xl mx-10 font-bold text-white">Meet Our Team</h2>
      <div className="grid grid-cols-4 gap-8 max-w-5xl mt-20">
      
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={member.image}
              alt={member.name}
              className="rounded-full w-32 h-32 object-cover"
            />
            <p className="text-lg font-semibold mt-4">
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
    {member.name}
  </span>
</p>
<p className="text-sm text-white">{member.description}</p>


          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 mt-16 gap-8 max-w-2xl">
        <h2 className="text-4xl mx-10 font-bold text-white">Contact Us</h2>
        <form>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-white">Name:</label>
            <input type="text" id="name" name="name" className="py-2 px-4 rounded-lg bg-gray-100 mt-3 mb-3" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white">Email:</label>
            <input type="email" id="email" name="email" className="py-2 px-4 rounded-lg bg-gray-100 mt-3 mb-3" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="message" className="text-white">Message:</label>
            <textarea id="message" name="message" rows="4" className="py-2 px-4 rounded-lg bg-gray-100 mt-3 mb-3"></textarea>
          </div>
          <button type="submit" className="py-2 px-10 mx-16 text-white rounded-lg mt-4 mb-6 bg-gradient-to-r from-purple-500 to-cyan-500">Submit</button>

        </form>
      </div>
    </div>
  );
};

export default Aboutus;
