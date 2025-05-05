import { useState } from "react";

/**
 * Display product name
 * @param {*} param0 
 * @returns 
 */
const ItemName = ({ name: initialName }) => {
    const [name, setName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    const handleBlur = () => {
        setIsEditing(false);
        if (!name) {
            setName("");
        }
    };

    if(isEditing) return (
        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleBlur}
            autoFocus
            className="border border-gray-300 rounded px-2 py-1 w-full text-blue-700"
        />
    )
    else return (
        <p 
            className={`transition-colors duration-300 ${name ? "text-blue-700 hover:text-blue-600" : "text-gray-400 italic"}`}
            onClick={() => setIsEditing(true)}
        >
            {name || "(Nhập tên sản phẩm)"}
        </p>
    );
};

export default ItemName;


