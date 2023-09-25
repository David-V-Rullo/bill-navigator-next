import React from "react";

const NewsCard = () => {
  return (
    <div>
      <div className="flex bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 w-full rounded-l  border-b-red-800 border-b-4 ">
        <div className="text-base sm:text-xl md:text-2xl font-semibold p-2 ">
          News and Updates
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full bg-gradient-to-b from-slate-600 to-slate-800 p-2 sm:p-4 md:p-6">
        <div className="p-2 sm:p-3 md:p-4">
          <p className="mb-4">
            This is an alpha build of a project that has been in my head for
            many years. I hope to continue to add features and improve the user
            experience.
          </p>
          <p>
            All data is pulled from the Propublica API and the Congress.gov API.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
