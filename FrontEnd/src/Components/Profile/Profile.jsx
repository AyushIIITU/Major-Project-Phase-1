import { useState } from "react";
import GitHubHeatmap from "./GitHubHeatMap";

const SKILL = [
    "JavaScript",
    "React",
    "Node.js",
    "CSS",
    "HTML",
    "Python",
    "Django",
    "SQL",
    "MongoDB",
    "Git"
];
function Profile() {
    const [username, setUsername] = useState('ayush01122004'); 
  return (
    <>
    <div className="border-solid border-[20px] border-green-800  rounded-lg">
            <div className="flex justify-center overflow-auto ">
            {
                SKILL.map((skill, index) => {
                    return (
                        <div key={index} className="bg-white border-blue-300 border-solid border-2 text-black text-center font-bold p-2 m-2 rounded-lg">
                            {skill}
                        </div>
                    )
                })
            }

        </div>
        <div className="leetcode-card">
        <img
          src={`https://leetcard.jacoblin.cool/${username}?ext=heatmap`}
          alt={`${username}'s LeetCode Card`}
          className="leetcode-image"
        />
      <GitHubHeatmap username="AyushIIITU" />
      </div>
      {/* <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4"> */}
    </div>
    {/* </div> */}
    </>
  )
}

export default Profile