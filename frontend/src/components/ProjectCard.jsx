import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ projectItem }) => {
  return (
    <Link to="/">
      <div className="w-[300px] h-[300px] rounded-[5px] cursor-pointer shadow-[0px_0px_16px_-6px_rgba(0,0,0,0.59)] overflow-hidden">
        <img
          className="w-[100%] h-[70%] object-cover"
          src={projectItem.img}
          alt="image"
        />
        <div className="flex items-center gap-[20px] p-[15px]">
          <img
            className="w-[40px] h-[40px] rounded-full object-cover"
            src={projectItem.pp}
            alt="profile picture"
          />
          <div className="text">
            <h2 className="font-medium text-[14px]">{projectItem.cat}</h2>
            <span className="font-light text-[14px]">
              {projectItem.username}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
