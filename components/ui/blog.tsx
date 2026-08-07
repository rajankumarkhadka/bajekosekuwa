'use client';

import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { useOutlet } from "@/context/OutletContext";
import { getOutletUrlPath } from "@/utils/outletMatcher";
import SafeImage from "@/components/ui/SafeImage";
import { cleanImageUrl } from "@/utils/image";
import { useArticles } from "@/api/hooks/useArticles";
import { useCategories } from "@/api/hooks/useCategories";

function stripHtml(html?: string): string {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '').trim();
}

function getImageSrc(item: {
    featured_image?: { url: string } | string;
}): string {
    let rawUrl = '';
    if (typeof item.featured_image === 'string') {
        rawUrl = item.featured_image;
    } else if (item.featured_image && typeof item.featured_image === 'object' && item.featured_image.url) {
        rawUrl = item.featured_image.url;
    }
    return cleanImageUrl(rawUrl, '/images/icon.jpg');
}

export default function BlogClient() {
    const [selectedCategoryId, setSelectedCategoryId] = useState("All");
    const params = useParams();
    const { selectedOutlet, outlets } = useOutlet();

    // Resolve branch UUID from URL route params or selectedOutlet
    const activeBranchId = useMemo(() => {
        const branchParam = typeof params?.branch === 'string' ? params.branch : null;
        if (branchParam && outlets && outlets.length > 0) {
            const cleanParam = branchParam.toLowerCase().trim();
            const found = outlets.find((o) =>
                o.id.toLowerCase() === cleanParam ||
                o.name.toLowerCase().trim() === cleanParam ||
                o.name.toLowerCase().replace(/\s+/g, '-').trim() === cleanParam
            );
            if (found?.id) return found.id;
        }
        return selectedOutlet?.id || undefined;
    }, [params, outlets, selectedOutlet]);

    // Helper to resolve canonical post URL adhering to active outlet/country context
    const getPostUrl = (slug: string) => {
        const country = typeof params?.country === 'string' ? params.country : null;
        const branch = typeof params?.branch === 'string' ? params.branch : null;

        if (country && branch) {
            return `/${country}/${branch}/blog/${slug}`;
        }
        if (selectedOutlet) {
            return getOutletUrlPath(selectedOutlet, `/blog/${slug}`);
        }
        return `/blog/${slug}`;
    };

    const queryParams = useMemo(() => {
        const query: Record<string, string> = {};
        if (selectedCategoryId !== "All") {
            query.category_id = selectedCategoryId;
        }
        if (activeBranchId) {
            query.branch_id = activeBranchId;
        }
        return Object.keys(query).length > 0 ? query : undefined;
    }, [selectedCategoryId, activeBranchId]);

    const { data: apiArticles, isLoading } = useArticles(queryParams);
    const { data: apiCategories } = useCategories();

    const categoryMap = useMemo(() => {
        const map = new Map<string, string>();
        if (apiCategories && Array.isArray(apiCategories)) {
            apiCategories.forEach((cat) => {
                if (cat.id && cat.name) {
                    map.set(cat.id, cat.name);
                    map.set(cat.id.toLowerCase(), cat.name);
                }
                if (cat.slug && cat.name) {
                    map.set(cat.slug, cat.name);
                    map.set(cat.slug.toLowerCase(), cat.name);
                }
            });
        }
        return map;
    }, [apiCategories]);

    const categoriesList = useMemo(() => {
        const list: { id: string; name: string }[] = [{ id: "All", name: "All" }];

        if (apiCategories && apiCategories.length > 0) {
            apiCategories.forEach((cat) => {
                if (cat.id && cat.name) {
                    list.push({ id: cat.id, name: cat.name });
                }
            });
        }
        return list;
    }, [apiCategories]);

    const mappedPosts = useMemo(() => {
        if (!apiArticles || apiArticles.length === 0) {
            return [];
        }

        return apiArticles.map((art) => {
            const imageUrl = getImageSrc(art);
            const authorName = 'Bajeko Team';
            const cleanContent = stripHtml(art.content);
            const rawExcerpt = art.excerpt || cleanContent;
            const truncatedExcerpt =
                rawExcerpt.length > 140 ? rawExcerpt.slice(0, 140) + '...' : rawExcerpt;

            const rawDate = art.created_at || art.published_at || art.updated_at;
            const formattedDate = rawDate
                ? new Date(rawDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                })
                : 'Recent';

            const categoryIds = Array.isArray(art.category_ids) ? art.category_ids : [];
            const categoryId = categoryIds.length > 0 ? categoryIds[0] : '';

            let categoryName = 'Articles';
            if (categoryId && categoryMap.has(categoryId)) {
                categoryName = categoryMap.get(categoryId)!;
            }

            const articleSlug = art.slug || art.id || '';

            return {
                id: articleSlug || 'article',
                title: art.title,
                slug: articleSlug,
                featured_image: imageUrl,
                excerpt: truncatedExcerpt,
                description: truncatedExcerpt,
                date: formattedDate,
                readTime: '3 min read',
                category: categoryName,
                categoryId: categoryId,
                categoryIds: categoryIds,
                author: authorName,
                customUrl: getPostUrl(articleSlug),
            };
        });
    }, [apiArticles, categoryMap, params, selectedOutlet]);

    const filteredPosts = useMemo(() => {
        if (selectedCategoryId === "All") return mappedPosts;
        if (!mappedPosts || mappedPosts.length === 0) return [];

        const activeCategoryObj = apiCategories?.find(
            (c) => c.id === selectedCategoryId || c.slug === selectedCategoryId || c.name === selectedCategoryId
        );

        const targetId = (activeCategoryObj?.id || selectedCategoryId).toLowerCase();
        const targetName = (activeCategoryObj?.name || selectedCategoryId).toLowerCase();
        const targetSlug = (activeCategoryObj?.slug || selectedCategoryId).toLowerCase();

        const matches = mappedPosts.filter((post) => {
            const postCatLower = post.category.toLowerCase();
            const postCatIdLower = post.categoryId.toLowerCase();
            const postCatIdsList = (post.categoryIds || []).map((id) => id.toLowerCase());

            return (
                postCatIdLower === targetId ||
                postCatIdLower === targetSlug ||
                postCatLower === targetName ||
                postCatLower === targetSlug ||
                postCatIdsList.includes(targetId) ||
                postCatIdsList.includes(targetSlug)
            );
        });

        return matches.length > 0 ? matches : mappedPosts;
    }, [mappedPosts, selectedCategoryId, apiCategories]);

    const featuredPost = mappedPosts[0];
    const regularPosts = selectedCategoryId === "All"
        ? filteredPosts.filter((post) => post.id !== (featuredPost?.id || ''))
        : filteredPosts;

    return (
        <>
            {selectedCategoryId === "All" && featuredPost && (
                <MaxWidthWrapper>
                    <div className="sm:w-[90%] w-full mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col lg:flex-row gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-10 w-full bg-gray-50 rounded-lg md:rounded-lg border border-gray-150 p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 overflow-hidden group hover:shadow-[0_20px_50px_rgba(0,0,0,0.02)] transition-all duration-500"
                        >
                            <motion.div className="w-full lg:w-1/2 relative aspect-[16/10] sm:aspect-[16/10] rounded-lg overflow-hidden shadow-md" whileHover={{ scale: 1.02 }}>
                                <SafeImage
                                    src={featuredPost.featured_image}
                                    alt={featuredPost.title}
                                    fill
                                    className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50vw"
                                    priority
                                />
                                <motion.div className="absolute top-3 xs:top-4 left-3 xs:left-4 bg-white/95 backdrop-blur-md px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg border border-gray-100 shadow-sm" whileHover={{ scale: 1.05 }}>
                                    <span className="font-syne text-[9px] xs:text-[10px] tracking-[0.2em] uppercase text-[#C4010F] font-bold">
                                        Featured • {featuredPost.category}
                                    </span>
                                </motion.div>
                            </motion.div>

                            <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-4 xs:space-y-5 sm:space-y-6 lg:pl-4">
                                <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 text-[10px] xs:text-xs sm:text-xs font-semibold text-gray-400">
                                    <span className="line-clamp-1">{featuredPost.date}</span>
                                    <span className="w-1 xs:w-1.5 h-1 xs:h-1.5 rounded-full bg-gray-300 shrink-0" />
                                    <span className="line-clamp-1">{featuredPost.readTime}</span>
                                </div>

                                <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-serif text-gray-900 leading-tight group-hover:text-[#C4010F] transition-colors duration-500">
                                    {featuredPost.title}
                                </h2>

                                <p className="text-gray-600 leading-relaxed text-xs xs:text-sm sm:text-base md:text-base lg:text-base line-clamp-3 lg:line-clamp-none">
                                    {featuredPost.description}
                                </p>

                                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 xs:gap-4 pt-4 xs:pt-5 sm:pt-6 border-t border-gray-200/60">
                                    <span className="text-xs xs:text-xs sm:text-sm font-bold text-gray-800 line-clamp-1">By {featuredPost.author}</span>
                                    <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.95 }}>
                                        <Link
                                            href={featuredPost.customUrl || `/blog/${featuredPost.slug}`}
                                            className="group/btn inline-flex items-center gap-1.5 xs:gap-2 px-4 xs:px-5 py-2.5 xs:py-3 rounded-lg md:rounded-lg bg-white border border-gray-200 hover:border-[#C4010F] hover:bg-[#C4010F]/5 transition-all duration-300 shrink-0"
                                        >
                                            <span className="text-xs xs:text-xs sm:text-sm text-gray-600 group-hover/btn:text-[#C4010F] transition-colors font-bold">
                                                Read Article
                                            </span>
                                            <svg className="group-hover/btn:translate-x-1 transition-transform text-[#C4010F] w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </MaxWidthWrapper>
            )}

            {/* ── Dynamic Category Filter ── */}
            <section className="px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 sm:mb-8 md:mb-9 lg:mb-8">
                <div className="w-full lg:max-w-[75%] mx-auto flex flex-wrap gap-2 xs:gap-2.5 sm:gap-3 items-center justify-center border-b border-gray-100 pb-8 md:pb-8 lg:pb-8">
                    {categoriesList.map((category) => (
                        <motion.button
                            key={category.id}
                            onClick={() => setSelectedCategoryId(category.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-3 xs:px-4 sm:px-5 md:px-6 py-2 xs:py-2.5 sm:py-3 rounded-lg md:rounded-lg text-[10px] xs:text-xs sm:text-xs md:text-xs font-bold tracking-wider uppercase transition-all duration-300 whitespace-nowrap ${selectedCategoryId === category.id
                                ? "bg-[#C4010F] text-white shadow-lg shadow-[#C4010F]/20"
                                : "bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                }`}
                        >
                            {category.name}
                        </motion.button>
                    ))}
                </div>
            </section>

            <MaxWidthWrapper className="">
                {isLoading ? (
                    <div className="text-center py-16 text-gray-400 font-medium">Loading articles...</div>
                ) : regularPosts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {regularPosts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group flex flex-col gap-4 xs:gap-5 sm:gap-6 h-full"
                            >
                                <motion.div
                                    className="relative aspect-[4/3] rounded-lg md:rounded-lg overflow-hidden border border-gray-200 shadow-sm group-hover:shadow-md transition-all duration-300"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <SafeImage
                                        src={post.featured_image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md border border-gray-100 shadow-xs z-10">
                                        <span className="font-syne text-[9px] xs:text-[10px] tracking-wider uppercase text-[#C4010F] font-bold">
                                            {post.category}
                                        </span>
                                    </div>
                                </motion.div>

                                <div className="space-y-3 xs:space-y-4 sm:space-y-4 flex-grow flex flex-col justify-between px-1">
                                    <div className="space-y-2 xs:space-y-3 sm:space-y-3">
                                        <div className="flex items-center text-[9px] xs:text-[10px] sm:text-xs font-semibold text-gray-400">
                                            <span className="line-clamp-1">{post.date}</span>
                                            <span className="ml-auto line-clamp-1">{post.readTime}</span>
                                        </div>

                                        <h3 className="text-lg xs:text-xl sm:text-xl md:text-lg lg:text-xl font-serif text-gray-900 leading-snug group-hover:text-[#C4010F] transition-colors duration-500 line-clamp-2">
                                            {post.title}
                                        </h3>

                                        <p className="text-gray-500 text-xs xs:text-sm sm:text-sm leading-relaxed line-clamp-2 xs:line-clamp-3">
                                            {post.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between gap-2 xs:gap-3">
                                        <span className="text-[10px] xs:text-xs sm:text-xs font-bold text-gray-500 line-clamp-1">By {(post.author || 'Bajeko Team').split(' ').pop()}</span>
                                        <motion.div whileHover={{ x: 3 }} whileTap={{ scale: 0.95 }}>
                                            <Link
                                                href={post.customUrl || `/blog/${post.slug}`}
                                                className="group/btn inline-flex items-center gap-1 text-[10px] xs:text-xs sm:text-xs font-bold shrink-0"
                                            >
                                                <span className="text-gray-600 group-hover/btn:text-[#C4010F] transition-colors font-bold">
                                                    Read
                                                </span>
                                                <svg className="group-hover/btn:translate-x-1 transition-transform text-[#C4010F] w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12 xs:py-16 sm:py-20 md:py-24 bg-gray-50 rounded-lg md:rounded-lg border border-gray-150 px-4"
                    >
                        <svg className="w-16 h-16 mx-auto text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 2v6h6" />
                        </svg>
                        <h3 className="text-lg md:text-xl font-serif text-gray-900 font-bold mb-2">No Articles Found</h3>
                        <p className="text-gray-500 text-xs xs:text-sm sm:text-base">We are cooking up new stories. Please check back later!</p>
                    </motion.div>
                )}
            </MaxWidthWrapper>
        </>
    );
}
