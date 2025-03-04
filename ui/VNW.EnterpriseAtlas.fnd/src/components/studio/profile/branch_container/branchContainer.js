import BranchInfo from "../branch_display";
import DelayedRoute from "../../../../services/routeDelay";

const BranchContainer = () => {
  return (
    <DelayedRoute>
      <div>
        <BranchInfo />
      </div>
    </DelayedRoute>
  );
};

export default BranchContainer;