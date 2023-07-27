import React from "react";

const BillCard = () => {
  return (
    <div className="flex flex-col p-2 m-2">
      <h1 className="font-bold text-center">Bill Title</h1>
      <div className="flex flex-row justify-start gap-3 px-3">
        <h1>Bill Description:</h1>
        <p>
          Ad excepteur est et ex ut sit. Aliqua ipsum culpa ut exercitation quis
          nisi. Aute irure cillum aliquip elit ea aute reprehenderit anim
          ullamco velit anim aute. Veniam adipisicing quis culpa irure quis quis
          ad voluptate occaecat adipisicing labore culpa.
        </p>
      </div>
    </div>
  );
};

export default BillCard;
