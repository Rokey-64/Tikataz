
import BranchInfo from "./BranchInfo";
import DelayedRoute from "@/services/routeDelay";

const BranchList = () => {
  return (
    <DelayedRoute>
      <div>
        <BranchInfo />
      </div>
    </DelayedRoute>
  );
};

export default BranchList;