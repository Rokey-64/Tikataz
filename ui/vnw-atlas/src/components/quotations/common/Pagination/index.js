import ReactPaginate from "react-paginate";

const PaginationComponent = ({ totalPages, onPageChange }) => {
    if (totalPages < 1) return null;
    return (
        <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={(data) => onPageChange(data.selected + 1)}
            containerClassName={"flex justify-center items-center gap-4 my-2"}
            activeClassName={"text-blue-600 font-bold"}
            pageClassName={"px-3 py-1 rounded-md hover:bg-gray-200"}
            previousClassName={"text-blue-600 hover:underline"}
            nextClassName={"text-blue-600 hover:underline"}
            disabledClassName={"text-gray-400 cursor-not-allowed"}
        />
    );
};

export default PaginationComponent;