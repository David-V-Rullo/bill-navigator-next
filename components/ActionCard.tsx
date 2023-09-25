import React from "react";
interface ActionProps {
  chamber: string;
  action_type: string;
  datetime: string;
  description: string;
}

const actionTypeMap = new Map([
  ["IntroReferral", "Introdcution Referral"],
  ["Floor", "Floor Vote"],
  ["Committee", "Committee Actions"],
]);

const renderActionType = (action_type: string) => {
  const convertedAction = actionTypeMap.get(action_type) || action_type;
  return convertedAction;
};
const ActionCard: React.FC<ActionProps> = ({
  chamber,
  action_type,
  datetime,
  description,
}) => {
  return (
    <div className="grid grid-cols-1 p-2 gap-2 bg-gradient-to-b from-slate-800 via-slate-700 to-slate-800">
      <div className="font-bold text-lg">{datetime}</div>
      <div>
        <label className="font-medium">Chamber:</label>
        <div className="p-2">{chamber}</div>
      </div>
      <div>
        <label className="font-medium ">Action Type:</label>
        <div className="p-2">{renderActionType(action_type)}</div>
      </div>
      <div>
        <label className="font-medium ">Description:</label>
        <div className="p-2">{description}</div>
      </div>
    </div>
  );
};

export default ActionCard;
