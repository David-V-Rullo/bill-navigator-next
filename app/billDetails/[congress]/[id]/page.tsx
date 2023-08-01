import BillDetail from "@/components/BillDetail";
import React from "react";

const BillDetails = ({
  params,
}: {
  params: { congress: string; id: string };
}) => {
  const { congress, id } = params;
  return (
    <div>
      <BillDetail id={id} congress={congress} />{" "}
    </div>
  );
};

export default BillDetails;
