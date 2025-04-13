"use client";
import React from "react";

function Roadmap({params}) {
    const { resumeId,track } = React.use(params);
    console.log(resumeId,track);
  const modules = [
    {
      time: "Month 1-2",
      name: "Programming Fundamentals",
      description:
        "Learn basic programming concepts, algorithms, and data structures",
      topics: [
        "Variables & Data Types",
        "Control Flow",
        "Functions",
        "Basic DSA",
      ],
      side: "left",
    },
    {
      time: "Month 3-4",
      name: "Frontend Basics",
      description: "Master the fundamentals of web development",
      topics: ["HTML", "CSS", "JavaScript", "DOM"],
      side: "right",
    },
    {
      time: "Month 5-6",
      name: "Frontend Framework",
      description: "Build dynamic web applications with modern tools",
      topics: [
        "React Fundamentals",
        "State Management",
        "Component Design",
        "API Integration",
      ],
      side: "left",
    },
    {
      time: "Month 7-8",
      name: "Backend Development",
      description: "Create server-side applications and APIs",
      topics: ["Node.js", "Express", "RESTful APIs", "Authentication"],
      side: "right",
    },
    {
      time: "Month 9-10",
      name: "Database & DevOps",
      description: "Master data persistence and deployment",
      topics: ["SQL Databases", "NoSQL Databases", "Docker", "CI/CD"],
      side: "left",
    },
    {
      time: "Month 11-12",
      name: "Advanced Concepts",
      description: "Polish your skills with advanced topics",
      topics: ["System Design", "Testing", "Security", "Performance"],
      side: "right",
    },
  ];

  return (
    <div className=" max-w-6xl w-4/5 ">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Full Stack Developer Roadmap
        </h1>
        <p className="text-xl text-gray-300">
          A year-long journey to becoming a full stack developer
        </p>
      </div>

      <div className="relative">
     

        {modules.map((module, index) => (
          <div key={index} className="relative mb-12">
                           <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#1e21fc] " />
            <div className={`flex  items-center ${module.side === "right" ? "flex-row-reverse " : ""}`}>
            <div className={`w-5 h-5 absolute left-1/2 transform -translate-x-1/2 bg-[#1e21fc] rounded-full z-10`} />
              <div className={`w-1/2 ${module.side === "right" ? "" : ""}`}>
                <div className={`bg-[#1E293B]  border-gray-700  p-10 ${module.side=="left" ? "rounded-l-lg border-r-0": "rounded-r-lg border-l-0"} shadow-lg`}>
                  <div className="inline-block px-4 py-1 bg-[#1e21fc]  rounded-full text-sm mb-4">
                    {module.time}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{module.name}</h3>
                  <p className="text-gray-300 mb-4">{module.description}</p>
                  <ul className="space-y-2">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-[#1e21fc] rounded-full mr-2" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <button className="px-8 py-4 rounded-lg text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 transition-all duration-300">
          Join Community
        </button>
      </div>
    </div>
  );
}

export default Roadmap;
