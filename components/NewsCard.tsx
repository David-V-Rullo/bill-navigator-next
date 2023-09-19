import React from "react";

const NewsCard = () => {
  return (
    <div className="flex flex-col gap-2 w-full bg-slate-800">
      <div className="bg-blue-900 w-full p-2 px-5 drop-shadow-xl border-b-red-800 border-b-4 font-sans font-semibold text-2xl text-center ">
        News and Updates
      </div>
      <div className="p-3">
        <h1>Welcome</h1>
        <p>
          This is a alpha build of a project that has been in my head for many
          years.
        </p>
        <p>This is a test</p>
      </div>
    </div>
  );
};

export default NewsCard;
