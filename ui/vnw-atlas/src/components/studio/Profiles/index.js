
import BranchList from "./BranchList";
import CompanyInfo from "./CompanyInfo";
import ManagerList from "./ManagerList"

import nationAPI from '@/api/nationCategory';

const Profiles = async ({ params }) => {
    const initNation = await nationAPI();

    const setActiveTab = () => {
        switch (params.slug) {
            case "info":
                return <CompanyInfo initNation={initNation}/>
            case "branch":
                return <BranchList />
            case "manager":
                return <ManagerList />
            default:
                return <></>
        }
    }
    return (
        <div>
            <div className="flex pt-14 md:pt-6">
                <div className="md:pl-10">
                    {setActiveTab()}
                </div>
            </div>
        </div>
    );
};

export default Profiles;