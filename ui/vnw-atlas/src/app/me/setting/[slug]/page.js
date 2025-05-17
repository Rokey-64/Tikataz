
import Setting from "@/components/studio/Settings";

export default async function SettingPage(props) {
    const params = await props.params;

    return (
        <>
            <Setting slug={params.slug} />
        </>
    )
}