import { MdCenterFocusWeak } from "react-icons/md";

/**
 * This component contains partner icon.
 */
const OwnPartner = () => {
    return (
        <div className="w-full h-full shadow-md border border-t-[1px]">
            <div className="grid justify-center opacity-10">
                <button>
                    <MdCenterFocusWeak className="size-3 m-2 " />
                </button>
            </div>
        </div>
    )
}

export default OwnPartner;