import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search as SearchIcon, X, BookOpen, Sparkles, ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Pagination } from '../../components/common/Pagination';
import { EmptyState } from '../../components/common/EmptyState';
import { BlogCard } from '../../components/blog/BlogCard';
import { mockBlogs, BLOG_CATEGORIES, type BlogCategory } from '../../data/blogs';

const ITEMS_PER_PAGE = 9;

export default function Blogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('All');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.title = 'Research Blogs & Insights | AZTech Perspectives';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore thought leadership articles, scientific perspectives, and summit recaps from the AZTech international academic community.'
      );
    }
  }, []);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: BlogCategory) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const featuredBlog = useMemo(() => {
    return mockBlogs.find((b) => b.featured) || mockBlogs[0];
  }, []);

  const filteredBlogs = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return mockBlogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === 'All' || blog.category === selectedCategory;
      const matchesSearch =
        !query ||
        blog.title.toLowerCase().includes(query) ||
        blog.excerpt.toLowerCase().includes(query) ||
        blog.category.toLowerCase().includes(query) ||
        blog.author.toLowerCase().includes(query) ||
        blog.tags.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);

  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBlogs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setCurrentPage(1);
  };

  return (
    <div className="az-blogs-page">
      {/* 1. Page Header & Breadcrumbs */}
      <header className="az-page-header" aria-labelledby="blogs-page-title">
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
                <span className="az-breadcrumb__current" aria-current="page">
                  Blogs
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="az-blogs-hero" aria-labelledby="blogs-page-title">
        <div className="az-container">
          <div className="az-blogs-hero__content">
            <div className="az-blogs-hero__badge">
              <Badge variant="primary">
                <BookOpen size={13} style={{ marginRight: '6px' }} aria-hidden="true" />
                Scholarly Articles & Summit Insights
              </Badge>
            </div>

            <h1 id="blogs-page-title" className="az-blogs-hero__title">
              AZTech <span className="az-gradient-text">Insights & Articles</span>
            </h1>

            <p className="az-blogs-hero__description az-body-lg">
              Explore perspectives, post-conference summaries, peer-review methodologies, and thought leadership from leading global scientific pioneers.
            </p>

            {/* Search Bar */}
            <div className="az-faq-search-wrapper" style={{ maxWidth: '40rem', margin: 'var(--az-space-6) auto 0' }}>
              <div className="az-faq-search-input-box">
                <SearchIcon size={20} className="az-faq-search-icon" aria-hidden="true" />
                <input
                  type="search"
                  className="az-faq-search-input"
                  placeholder="Search articles by title, author, topic, or keyword..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  aria-label="Search articles"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="az-faq-search-clear-btn"
                    onClick={() => handleSearchChange('')}
                    aria-label="Clear search input"
                  >
                    <X size={16} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Blog Highlight (Shown when no search/category filter is active) */}
      {!searchQuery && selectedCategory === 'All' && featuredBlog && (
        <section className="az-featured-blog-section" aria-label="Featured Article">
          <div className="az-container">
            <div className="az-featured-blog-card">
              <div className="az-featured-blog-card__image-wrap">
                <img
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  className="az-featured-blog-card__img"
                />
                <span className="az-featured-badge">
                  <Sparkles size={12} style={{ marginRight: '4px' }} />
                  Featured Insight
                </span>
              </div>
              <div className="az-featured-blog-card__content">
                <div className="az-featured-blog-card__meta">
                  <span className="az-blog-card__category-badge">
                    <Tag size={11} style={{ marginRight: '3px' }} />
                    {featuredBlog.category}
                  </span>
                  <span className="az-caption" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--az-muted)' }}>
                    <Calendar size={13} />
                    {featuredBlog.publishedAt}
                  </span>
                  <span className="az-caption" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--az-muted)' }}>
                    <Clock size={13} />
                    {featuredBlog.readingTime} min read
                  </span>
                </div>

                <h2 className="az-featured-blog-card__title">
                  <Link to={`/blogs/${featuredBlog.slug}`}>{featuredBlog.title}</Link>
                </h2>

                <p className="az-featured-blog-card__excerpt az-body">
                  {featuredBlog.excerpt}
                </p>

                <div className="az-featured-blog-card__footer">
                  <div className="az-blog-card__author">
                    <img
                      src={featuredBlog.authorAvatar}
                      alt={featuredBlog.author}
                      className="az-blog-card__author-img"
                    />
                    <div>
                      <span className="az-blog-card__author-name">{featuredBlog.author}</span>
                      <span className="az-blog-card__author-role az-caption">{featuredBlog.authorRole}</span>
                    </div>
                  </div>

                  <Link
                    to={`/blogs/${featuredBlog.slug}`}
                    className="az-button az-button--primary"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Blog Listing & Filters */}
      <section className="az-section az-blogs-main-section">
        <div className="az-container">
          {/* Category Filter Pills */}
          <div className="az-blogs-categories-bar" role="tablist" aria-label="Blog Categories">
            {BLOG_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`az-category-pill ${isActive ? 'az-category-pill--active' : ''}`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Results Counter & Reset */}
          <div className="az-blogs-results-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--az-space-6)' }}>
            <span className="az-body-sm" style={{ color: 'var(--az-muted)' }}>
              Showing <strong>{filteredBlogs.length}</strong> {filteredBlogs.length === 1 ? 'article' : 'articles'}
              {selectedCategory !== 'All' && <span> in <strong>{selectedCategory}</strong></span>}
              {searchQuery && <span> matching &ldquo;<strong>{searchQuery}</strong>&rdquo;</span>}
            </span>

            {(searchQuery || selectedCategory !== 'All') && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="az-button az-button--ghost az-button--sm"
                style={{ color: 'var(--az-danger)' }}
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Blog Grid or Empty State */}
          {paginatedBlogs.length > 0 ? (
            <>
              <div className="az-blogs-grid">
                {paginatedBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>

              {/* Pagination */}
              <div style={{ marginTop: 'var(--az-space-10)', display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  page={currentPage}
                  totalPages={totalPages}
                  onPageChange={(p) => {
                    setCurrentPage(p);
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                />
              </div>
            </>
          ) : (
            <div style={{ maxWidth: '36rem', marginInline: 'auto' }}>
              <EmptyState
                icon={BookOpen}
                title="No Articles Found"
                description={`We couldn't find any articles matching "${searchQuery}". Try adjusting your keywords or clearing selected filters.`}
                action={
                  <Button variant="primary" onClick={handleClearFilters}>
                    View All Articles
                  </Button>
                }
              />
            </div>
          )}
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="az-cta-section" aria-labelledby="blogs-cta-heading">
        <div className="az-container">
          <div className="az-cta-banner">
            <div className="az-cta-banner__glow" aria-hidden="true" />
            <div className="az-cta-banner__content">
              <div className="az-cta-banner__badge">
                <Sparkles size={14} aria-hidden="true" />
                <span>Publish With AZTech</span>
              </div>
              <h2 id="blogs-cta-heading" className="az-cta-banner__title">
                Share Your Research Perspectives
              </h2>
              <p className="az-cta-banner__desc az-body-lg">
                Submit academic manuscripts and symposium summaries to be featured across the AZTech global editorial network.
              </p>
              <div className="az-cta-banner__actions">
                <Link to="/conferences" className="az-button az-button--primary az-button--lg">
                  <span>Explore Conferences</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link to="/contact" className="az-button az-button--outline az-button--lg az-cta-banner__btn-alt">
                  <span>Submit Article Proposal</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
