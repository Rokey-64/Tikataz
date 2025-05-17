

import Profiles from "@/components/studio/Profiles";

export default async function GeneralPage(props) {
    const params = await props.params;

    return (
        <>
            <Profiles params={params} />
        </>
    )
}