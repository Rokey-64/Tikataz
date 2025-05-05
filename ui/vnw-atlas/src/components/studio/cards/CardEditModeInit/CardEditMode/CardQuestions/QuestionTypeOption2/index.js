import QuestionTypeOption1 from "../QuestionTypeOption1";

/**
 * Provides the options with yes or no type for the user to choose from.
 * 
 * Note: Option 2 provides more options for the user to choose from instead of just yes or no.
 */
const QuestionTypeOption2 = ({path, root, callback, title, options, explain, children}) => {

    const createElement = (option, index) => {
        const [key, value] = Object.entries(option)[0];
        return (
            <QuestionTypeOption1 key={index} title={value} callback={callback} path={`${path}.${key}`} root={root}/>
        );
    }

    return (
        <div className="mt-3">
            <h3 className="font-sans text-sm ">{title}</h3>
            <div className="flex flex-wrap items-center justify-start gap-2 w-[400px] md:w-[500px] ml-3">
                {options.map((option, index) => createElement(option, index))}
            </div>
            <div>
                <label className="font-sans text-xs"><i>{explain}</i></label>
            </div>
            <div className={`ml-5 transition-all duration-300 max-h-[500px] opacity-100`}>
                {children}
            </div>
        </div>
    );
}

export default QuestionTypeOption2;