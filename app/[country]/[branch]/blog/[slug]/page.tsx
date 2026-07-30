import articleService from "@/api/services/article.service";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { cleanImageUrl } from "@/utils/image";

interface OutletBlogDetailProps {
  params: Promise<{
    country: string;
    branch: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: OutletBlogDetailProps): Promise<Metadata> {
  const { branch, slug } = await params;
  const cmsArticle = await articleService.getArticleBySlug(slug);
  const branchName = branch
    ? branch.charAt(0).toUpperCase() + branch.slice(1).replace(/-/g, ' ')
    : 'Outlet';

  if (cmsArticle) {
    return {
      title: `${cmsArticle.title} | ${branchName} Outlet | Bajeko Sekuwa Blog`,
      description: cmsArticle.excerpt || cmsArticle.title,
    };
  }
  return {
    title: `Article Not Found | ${branchName} Outlet | Bajeko Sekuwa Blog`,
  };
}

export default async function OutletBlogDetailView({ params }: OutletBlogDetailProps) {
  const { country, branch, slug } = await params;

  // Fetch live article from CMS API
  const cmsArticle = await articleService.getArticleBySlug(slug);

  if (!cmsArticle) {
    notFound();
  }

  const title = cmsArticle.title || '';
  const rawImage =
    cmsArticle.featured_image && typeof cmsArticle.featured_image === 'object'
      ? cmsArticle.featured_image.url
      : typeof cmsArticle.featured_image === 'string'
      ? cmsArticle.featured_image
      : '/images/icon.jpg';
  const image = cleanImageUrl(rawImage, '/images/icon.jpg');

  const author =
    cmsArticle.author && typeof cmsArticle.author === 'object'
      ? cmsArticle.author.name && cmsArticle.author.name !== 'Unknown'
        ? cmsArticle.author.name
        : 'Bajeko Team'
      : typeof cmsArticle.author === 'string' && cmsArticle.author !== 'Unknown'
      ? cmsArticle.author
      : 'Bajeko Team';

  const rawDate = cmsArticle.created_at || cmsArticle.published_at;
  const date = rawDate
    ? new Date(rawDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent';

  const htmlContent = cmsArticle.content || null;
  const excerpt = cmsArticle.excerpt || cmsArticle.summary || '';

  const backLink = `/${country}/${branch}/blog`;

  return (
    <main className="bg-white pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <Link
          href={backLink}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#C4010F] transition-colors mb-10 font-bold"
        >
          ← Back to Blogs
        </Link>

        <div className="relative h-[320px] md:h-[520px] overflow-hidden rounded-lg border border-gray-100 shadow-sm">
          <Image
            src={image}
            alt={title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
            <span className="inline-block bg-[#C4010F] px-4 py-1.5 rounded-full text-xs tracking-[0.2em] uppercase font-bold mb-5">
              Articles
            </span>
            <h1 className="text-3xl md:text-5xl font-serif max-w-4xl leading-tight font-bold">
              {title}
            </h1>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-14">
          <div className="flex flex-wrap items-center gap-4 text-gray-500 border-b border-gray-200 pb-8 text-sm">
            <span>
              <strong className="text-gray-900">Author:</strong> {author}
            </span>
            <span>•</span>
            <span>{date}</span>
            <span>•</span>
            <span>3 min read</span>
          </div>

          {excerpt && (
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mt-10 font-medium italic border-l-4 border-[#C4010F] pl-4">
              {excerpt}
            </p>
          )}

          {htmlContent ? (
            <article
              className="mt-10 text-gray-800 leading-relaxed text-base md:text-lg space-y-6 prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-gray-900 prose-a:text-[#C4010F] prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          ) : (
            <p className="mt-10 text-gray-500 italic">No content available for this article.</p>
          )}
        </div>
      </div>
    </main>
  );
}
