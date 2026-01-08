import { useState } from "react";

type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};
const NO_OF_PAGES = 6;
export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: Props) {
    const [startPage, setStartPage] = useState<number>(2);
    const handlePageChange = (currentPage: number) => {
        onPageChange(currentPage);
        const start_page =
            currentPage < NO_OF_PAGES ? 2 : currentPage - NO_OF_PAGES / 2; //
        setStartPage(start_page);
    };
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
            {/* Add 1 Manually */}
            <button
                key={1}
                onClick={() => handlePageChange(1)}
                className={`w-8 h-8 rounded border text-sm ${
                    1 === currentPage
                        ? "bg-black text-white border-black"
                        : "border-gray-300 text-gray-600 hover:border-black"
                }`}
            >
                {1}
            </button>
            {/* Showing turncation */}
            {currentPage > NO_OF_PAGES && (
                <button
                    key="left-truncate"
                    className={`w-8 h-8 rounded border text-sm border-gray-300 text-gray-600 hover:border-black`}
                >
                    ...
                </button>
            )}

            <div className="flex gap-2">
                {Array.from({ length: NO_OF_PAGES }).map((_, index) => {
                    const page = startPage + index;
                    if (page <= totalPages - 1)
                        return (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
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

                {/* Showing turncation */}
                {startPage + NO_OF_PAGES >= totalPages || (
                    <button
                        key="right-truncate"
                        className={`w-8 h-8 rounded border text-sm border-gray-300 text-gray-600 hover:border-black`}
                    >
                        ...
                    </button>
                )}

                {/* Showing last Page */}
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className={`w-8 h-8 rounded border text-sm ${
                        totalPages === currentPage
                            ? "bg-black text-white border-black"
                            : "border-gray-300 text-gray-600 hover:border-black"
                    }`}
                >
                    {totalPages}
                </button>
            </div>

            {/* Next */}
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="flex items-center gap-2 text-gray-950 disabled:opacity-40"
            >
                {" Next >"}
            </button>
        </div>
    );
}
