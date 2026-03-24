import Link from 'next/link';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath: string;
}

export default function Pagination({currentPage, totalPages, basePath}: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages = Array.from({length: totalPages}, (_, i) => i + 1);

    return (
        <nav className="flex items-center justify-center gap-2 py-8">
            {pages.map((page) => (
                <Link
                    key={page}
                    href={`${basePath}?page=${page}`}
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                        page === currentPage
                            ? 'bg-primary text-white'
                            : 'bg-medium text-dark hover:bg-primary hover:text-white'
                    }`}
                >
                    {page}
                </Link>
            ))}
        </nav>
    );
}
