const DisplayElement = ({ dictWord, value }) => {
    return (
        <div className="flex items-center gap-2 p-2 border-b border-gray-300 bg-blue-50 rounded-lg">
            <label className="font-medium text-blue-700 w-1/5">{dictWord}:</label>
            <p className="text-blue-900 w-4/5 bg-blue-100 rounded px-2 py-1">{value}</p>
        </div>
    );
}

export default DisplayElement;