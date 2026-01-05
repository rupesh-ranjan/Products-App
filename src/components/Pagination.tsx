type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: Props) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-3 mt-10 text-sm">
            {/* Previous */}
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="flex items-center gap-2 text-gray-950 disabled:opacity-40"
            >
                {"< Previous"}
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;
                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`w-8 h-8 rounded border text-sm ${
                                page === currentPage
                                    ? "bg-black text-white border-black"
                                    : "border-gray-300 text-gray-600 hover:border-black"
                            }`}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            {/* Next */}
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="flex items-center gap-2 text-gray-950 disabled:opacity-40"
            >
                {" Next >"}
                {/* <img src={arrowIcon} alt="next" className="h-4 w-4" /> */}
            </button>
        </div>
    );
}
