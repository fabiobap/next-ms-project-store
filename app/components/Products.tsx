'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
}

interface PaginationLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

interface ProductsResponse {
    data: Product[];
    links: PaginationLinks;
    meta: PaginationMeta;
}

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchProducts = async (page: number) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8686/api/v1/products?page=${page}`);
            if (!response.ok) {
                setError('Failed to fetch products');
            }
            const data: ProductsResponse = await response.json();
            setProducts(data.data);
            setMeta(data.meta);
        } catch (err) {
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Products</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {products.map((product) => (
                    <Link
                        href={`/products/${product.slug}`}
                        key={product.id}
                        className="block hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="border rounded-lg overflow-hidden bg-white">
                            <div className="relative h-48 w-full">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                                <p className="text-gray-600 line-clamp-2">
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {meta && (
                <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <button
                            onClick={() => handlePageChange(meta.current_page - 1)}
                            disabled={meta.current_page === 1}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                ${meta.current_page === 1
                                ? 'bg-gray-100 text-gray-400'
                                : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => handlePageChange(meta.current_page + 1)}
                            disabled={meta.current_page === meta.last_page}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                ${meta.current_page === meta.last_page
                                ? 'bg-gray-100 text-gray-400'
                                : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{meta.from}</span> to{' '}
                                <span className="font-medium">{meta.to}</span> of{' '}
                                <span className="font-medium">{meta.total}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                {[...Array(meta.last_page)].map((_, index) => {
                                    const page = index + 1;
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold
                        ${meta.current_page === page
                                                ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'}`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
