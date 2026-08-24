import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import type { BlogPost } from '../../data/blogs';

interface BlogCardProps {
  blog: BlogPost;
  featured?: boolean;
}

export function BlogCard({ blog, featured = false }: BlogCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <article
      className={`az-blog-card ${featured ? 'az-blog-card--featured' : ''}`}
      aria-labelledby={`blog-title-${blog.id}`}
    >
      <div className="az-blog-card__image-wrap">
        <Link to={`/blogs/${blog.slug}`} tabIndex={-1} aria-hidden="true">
          {!imageError ? (
            <img
              src={blog.image}
              alt={blog.title}
              loading="lazy"
              className="az-blog-card__image"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="az-blog-card__fallback-img">
              <span>{blog.category}</span>
            </div>
          )}
        </Link>
        <span className="az-blog-card__category-badge">
          <Tag size={11} style={{ marginRight: '3px' }} />
          {blog.category}
        </span>
      </div>

      <div className="az-blog-card__body">
        <div className="az-blog-card__meta-top">
          <span className="az-blog-card__meta-item">
            <Calendar size={13} aria-hidden="true" />
            <time dateTime={blog.publishedAt}>{blog.publishedAt}</time>
          </span>
          <span className="az-blog-card__meta-divider">•</span>
          <span className="az-blog-card__meta-item">
            <Clock size={13} aria-hidden="true" />
            <span>{blog.readingTime} min read</span>
          </span>
        </div>

        <h3 id={`blog-title-${blog.id}`} className="az-blog-card__title">
          <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
        </h3>

        <p className="az-blog-card__excerpt az-body-sm">{blog.excerpt}</p>

        <div className="az-blog-card__footer">
          <div className="az-blog-card__author">
            <img
              src={blog.authorAvatar}
              alt={blog.author}
              className="az-blog-card__author-img"
              loading="lazy"
              onError={(e) => {
                // Fallback avatar
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(blog.author)}&background=1769aa&color=fff`;
              }}
            />
            <div className="az-blog-card__author-info">
              <span className="az-blog-card__author-name">{blog.author}</span>
              {blog.authorRole && (
                <span className="az-blog-card__author-role az-caption">{blog.authorRole}</span>
              )}
            </div>
          </div>

          <Link
            to={`/blogs/${blog.slug}`}
            className="az-blog-card__read-more"
            aria-label={`Read more: ${blog.title}`}
          >
            <span>Read Article</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;
