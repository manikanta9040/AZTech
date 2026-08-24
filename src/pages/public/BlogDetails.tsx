import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Calendar,
  Clock,
  Tag,
  ArrowLeft,
  ArrowRight,
  Share2,
  Check,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { BlogCard } from '../../components/blog/BlogCard';
import { mockBlogs, type BlogPost } from '../../data/blogs';

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export default function BlogDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const blog: BlogPost | undefined = useMemo(() => {
    return mockBlogs.find((b) => b.slug === slug);
  }, [slug]);

  useEffect(() => {
    if (blog) {
      document.title = `${blog.title} | AZTech Insights`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', blog.excerpt);
      }
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    } else {
      document.title = 'Article Not Found | AZTech Insights';
    }
  }, [blog]);

  const relatedBlogs = useMemo(() => {
    if (!blog) return [];
    // Prefer same category, excluding current blog
    const sameCategory = mockBlogs.filter(
      (b) => b.id !== blog.id && b.category === blog.category
    );
    if (sameCategory.length >= 3) {
      return sameCategory.slice(0, 3);
    }
    const others = mockBlogs.filter(
      (b) => b.id !== blog.id && b.category !== blog.category
    );
    return [...sameCategory, ...others].slice(0, 3);
  }, [blog]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!blog) {
    return (
      <div className="az-section">
        <div className="az-container" style={{ maxWidth: '40rem', marginInline: 'auto' }}>
          <EmptyState
            icon={BookOpen}
            title="Article Not Found"
            description="The requested research article or blog post could not be found or may have been relocated."
            action={
              <Button variant="primary" onClick={() => navigate('/blogs')}>
                <ArrowLeft size={16} aria-hidden="true" />
                <span>Return to Blog Directory</span>
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="az-blog-details-page">
      {/* 1. Breadcrumbs */}
      <header className="az-page-header" aria-label="Breadcrumb navigation">
        <div className="az-container">
          <nav aria-label="Breadcrumb" className="az-breadcrumb">
            <ol className="az-breadcrumb__list">
              <li className="az-breadcrumb__item">
                <Link to="/" className="az-breadcrumb__link">
                  Home
                </Link>
              </li>
              <li className="az-breadcrumb__separator" aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li className="az-breadcrumb__item">
                <Link to="/blogs" className="az-breadcrumb__link">
                  Blogs
                </Link>
              </li>
              <li className="az-breadcrumb__separator" aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li className="az-breadcrumb__item">
                <span className="az-breadcrumb__current" aria-current="page">
                  {blog.title}
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      {/* 2. Article Header Hero */}
      <article className="az-article-container" aria-labelledby="article-title">
        <div className="az-article-header">
          <div className="az-container" style={{ maxWidth: '52rem' }}>
            <div className="az-article-meta-top">
              <Badge variant="primary">
                <Tag size={12} style={{ marginRight: '4px' }} aria-hidden="true" />
                {blog.category}
              </Badge>
              <span className="az-caption" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={14} />
                {blog.publishedAt}
              </span>
              <span className="az-caption" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} />
                {blog.readingTime} min read
              </span>
            </div>

            <h1 id="article-title" className="az-article-title">
              {blog.title}
            </h1>

            <p className="az-article-lead az-body-lg">
              {blog.excerpt}
            </p>

            {/* Author Byline */}
            <div className="az-article-author-card">
              <img
                src={blog.authorAvatar}
                alt={blog.author}
                className="az-article-author-avatar"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(blog.author)}&background=1769aa&color=fff`;
                }}
              />
              <div className="az-article-author-details">
                <strong className="az-article-author-name">{blog.author}</strong>
                <span className="az-article-author-role az-caption">{blog.authorRole}</span>
              </div>

              {/* Share Actions */}
              <div className="az-article-share-group">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="az-button az-button--ghost az-button--sm"
                  aria-label="Copy article link"
                  title="Copy link to clipboard"
                >
                  {copied ? <Check size={16} style={{ color: 'var(--az-success)' }} /> : <Share2 size={16} />}
                  <span>{copied ? 'Copied!' : 'Share'}</span>
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="az-button az-button--ghost az-button--sm az-button--icon"
                  aria-label="Share on X / Twitter"
                  title="Share on X"
                >
                  <XIcon />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="az-button az-button--ghost az-button--sm az-button--icon"
                  aria-label="Share on LinkedIn"
                  title="Share on LinkedIn"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Hero Image */}
        <div className="az-article-hero-image-wrap">
          <div className="az-container" style={{ maxWidth: '52rem' }}>
            <div className="az-article-image-box">
              <img
                src={blog.image}
                alt={blog.title}
                className="az-article-hero-img"
              />
            </div>
          </div>
        </div>

        {/* 4. Article Prose Body */}
        <div className="az-container" style={{ maxWidth: '50rem' }}>
          <div className="az-article-prose">
            {blog.content.split('\n\n').map((paragraph, idx) => {
              const trimmed = paragraph.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith('### ')) {
                return (
                  <h2 key={idx} className="az-article-h2">
                    {trimmed.replace('### ', '')}
                  </h2>
                );
              }

              if (trimmed.startsWith('> ')) {
                return (
                  <blockquote key={idx} className="az-article-quote">
                    {trimmed.replace('> ', '')}
                  </blockquote>
                );
              }

              if (trimmed.startsWith('- ') || trimmed.startsWith('1. ')) {
                const lines = trimmed.split('\n');
                return (
                  <ul key={idx} className="az-article-list">
                    {lines.map((li, lIdx) => (
                      <li key={lIdx}>{li.replace(/^[-*]|\d+\.\s*/, '')}</li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={idx} className="az-body az-article-p">
                  {trimmed}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="az-article-tags-wrap">
              <span className="az-article-tags-label">Related Topics:</span>
              <div className="az-article-tags-list">
                {blog.tags.map((tag) => (
                  <span key={tag} className="az-article-tag-chip">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back Navigation Bar */}
          <div className="az-article-bottom-nav">
            <Link to="/blogs" className="az-button az-button--outline">
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Back to All Articles</span>
            </Link>
          </div>
        </div>
      </article>

      {/* 5. Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="az-section az-related-blogs-section" aria-labelledby="related-blogs-heading">
          <div className="az-container">
            <div className="az-section-header">
              <div>
                <Badge variant="primary">Recommended Reading</Badge>
                <h2 id="related-blogs-heading" className="az-h2" style={{ marginTop: 'var(--az-space-2)' }}>
                  Related Perspectives & Articles
                </h2>
              </div>
              <Link to="/blogs" className="az-button az-button--ghost">
                <span>View All Articles</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <div className="az-blogs-grid">
              {relatedBlogs.map((rBlog) => (
                <BlogCard key={rBlog.id} blog={rBlog} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. CTA Section */}
      <section className="az-cta-section" aria-labelledby="blog-details-cta-heading">
        <div className="az-container">
          <div className="az-cta-banner">
            <div className="az-cta-banner__glow" aria-hidden="true" />
            <div className="az-cta-banner__content">
              <div className="az-cta-banner__badge">
                <Sparkles size={14} aria-hidden="true" />
                <span>Global Conference Network</span>
              </div>
              <h2 id="blog-details-cta-heading" className="az-cta-banner__title">
                Explore Upcoming AZTech Summits
              </h2>
              <p className="az-cta-banner__desc az-body-lg">
                Discover international conferences where cutting-edge research in {blog.category} is presented live.
              </p>
              <div className="az-cta-banner__actions">
                <Link to="/conferences" className="az-button az-button--primary az-button--lg">
                  <span>Explore Conferences</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link to="/register" className="az-button az-button--outline az-button--lg az-cta-banner__btn-alt">
                  <span>Join AZTech Network</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
