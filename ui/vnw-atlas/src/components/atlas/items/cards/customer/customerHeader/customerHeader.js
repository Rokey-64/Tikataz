import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

/**
 * Displays a clean and responsive customer card header with title and description
 * @param {Object} data - The customer data containing general information
 * @param {Object} data.general - General information about the customer
 * @param {string} data.general.branchName - The branch name/title
 * @param {string} data.general.description - The description text
 * @returns {JSX.Element} - A responsive customer header component
 */
const CustomerHeader = ({ data }) => {
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const { general } = data;

    useEffect(() => {
        if (general?.description) {
            const trimmedDesc = general.description.length > 200
                ? `${general.description.slice(0, 200)}...`
                : general.description;
            setDescription(trimmedDesc);
        }

        if (general?.branchName) {
            const trimmedTitle = general.branchName.length > 50
                ? `${general.branchName.slice(0, 50)}`
                : general.branchName;
            setTitle(trimmedTitle);
        }
    }, [data]);

    const capitalizeWords = (str) => {
        if (!str) return '';
        return str.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    return (
        <div className="w-full max-w-xs sm:max-w-[27.5rem] space-y-1 sm:space-y-2">
            {/* Title */}
            <h3 className="font-semibold text-xs sm:text-lg text-amber-600 truncate">
                {capitalizeWords(title)}
            </h3>

            {/* Description */}
            <div className="min-h-[1.25rem] sm:min-h-[1.5rem]">
                <p className="text-xs sm:text-sm text-blue-900 font-normal leading-tight sm:leading-snug line-clamp-2">
                    {description}
                </p>
            </div>
        </div>
    );
};

CustomerHeader.propTypes = {
    data: PropTypes.shape({
        general: PropTypes.shape({
            branchName: PropTypes.string,
            description: PropTypes.string
        })
    }).isRequired
};

export default CustomerHeader;