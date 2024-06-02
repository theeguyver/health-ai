import React from "react";
import ProjectCard from "../sub/ProjectCard";

const Projects = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-20"
      id="projects"
    >
      <h1 className="text-[40px] font-bold text-white text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20 mb-10">
        Features
      </h1>
      <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10">
        <ProjectCard
          src="/feature1.jpg"
          title="Emotion Recognition and Sensitivity"
          description="Our chatbot employs advanced algorithms to recognize and understand the user's emotions expressed during the conversation. It sensitively responds to these emotions, adapting its tone and responses accordingly to provide a more empathetic interaction."
        />
        <ProjectCard
          src="/feature11.png"
          title="Continuous Monitoring "
          description="With continuous monitoring capabilities, our chatbot keeps track of the user's conversation history and emotional state over time. This allows it to provide ongoing support, identify trends, and offer personalized assistance based on the user's evolving needs."
        />
        <ProjectCard
          src="/feature2.png"
          title="Personalized Support and Resources"
          description="Our chatbot offers personalized support tailored to each user's unique needs and preferences. By analyzing past interactions and user data, it delivers targeted resources, advice, and recommendations aimed at addressing specific challenges or concerns effectively."
        />
        <ProjectCard
          src="/feature3.png"
          title="Natural Language Understanding"
          description="Leveraging cutting-edge natural language processing (NLP) techniques, our chatbot comprehends and interprets user messages in a conversational manner. It can understand various forms of language inputs, including slang, colloquialisms, and contextually rich expressions, ensuring smooth and intuitive communication."
        />
        
      </div>
    </div>
  );
};

export default Projects;
