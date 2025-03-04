
/**
 * This component is used to create a text with a link in it.
 * @param {*} param0 
 * @returns 
 */
const InlineLinkText = ({ text, link="" }) => {
    return (
        <a href={link} target="_blank"
            className="hover:text-blue-500 text-blue-400 underline">
            {text}
        </a>
    );
}

export default InlineLinkText;