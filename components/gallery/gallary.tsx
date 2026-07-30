import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import Image from "next/image";
import { X, ZoomIn } from 'lucide-react';
import { useState } from "react";
import { useRouter } from "next/navigation";
// import {Gallary} from "@/types";
export default function GallaryCard({gallaries:gallaries}:any) {
    const router = useRouter();
    const [lightbox, setLightbox] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(gallaries.length / itemsPerPage);
    const paginatedItems = gallaries.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const getVisiblePages = () => {
        const pages = [];
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    return (
        <>
        <MaxWidthWrapper className="py-20 flex flex-col items-center">
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                {paginatedItems.map((item: any) => (
                    <div
                        key={item.id}
                        className="relative h-[300px] w-full overflow-hidden rounded-lg cursor-pointer group"
                        onClick={() => setLightbox(item)}
                    >
                        <Image
                            src={item.image}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            alt={item.name}
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center">
                            <ZoomIn className="text-white w-10 h-10" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 py-3 px-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                            <span className="text-white text-sm font-bold tracking-wide">{item.name}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Previous
                    </button>

                    {getVisiblePages().map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-10 h-10 rounded text-sm font-bold transition-colors ${
                                currentPage === page
                                    ? "bg-[#C4010F] text-white border border-[#C4010F]"
                                    : "border border-gray-200 text-gray-500 hover:bg-gray-100"
                            }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}

            {lightbox && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
                    onClick={() => setLightbox(null)}
                >
                    <div
                        className="relative max-w-5xl w-[80vh] h-[80vh] m-auto bg-white rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={lightbox.image}
                            fill
                            sizes="100vw"
                            alt={lightbox.name}
                            className="object-contain"
                        />
                        <button
                            onClick={() => setLightbox(null)}
                            className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>
            )}
        </MaxWidthWrapper>
        </>
    );
}