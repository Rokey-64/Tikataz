import { useRef, useState, useEffect } from "react";
import WaitingState from "../WaitingState";

const RightChildrenBox = ({ children, interval=1000}) => {
    const timeoutRef = useRef(null);
    const [display, setDisplay] = useState(true);

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setDisplay(false);
        }, interval);
    }, []);

    return (
        <>
            {
                display ? (
                    <WaitingState />
                ) : children
            }
        </>
    );
};

export default RightChildrenBox;