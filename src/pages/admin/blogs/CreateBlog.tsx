import { useState, type FormEvent } from 'react'
import { ArrowLeft, Save } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AdminBreadcrumbs } from '../../../components/admin/AdminBreadcrumbs'
import { useAdminToast } from '../../../hooks/useAdminToast'
import { Button } from '../../../components/common/Button'
import { Checkbox } from '../../../components/common/FormControls'
import { Input } from '../../../components/common/Input'
import { Select } from '../../../components/common/Select'
import { Textarea } from '../../../components/common/Textarea'
import { ROUTES } from '../../../constants/routes'
import { BLOG_CATEGORIES, type BlogCategory } from '../../../data/blogs'
import { adminBlogService } from '../../../services/adminBlogService'

type BlogCategoryOption = Exclude<BlogCategory, 'All'>
const categories = BLOG_CATEGORIES.filter((c): c is BlogCategoryOption => c !== 'All')

export default function CreateBlog() {
  const navigate = useNavigate()
  const { showSuccess, showError } = useAdminToast()

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80'
  )
  const [category, setCategory] = useState<BlogCategoryOption>('Technology')
  const [tagsText, setTagsText] = useState('Artificial Intelligence, Research, Technology')
  const [author, setAuthor] = useState('Dr. Marcus Vance')
  const [authorRole, setAuthorRole] = useState('Senior Fellow in Computational Science, MIT')
  const [status, setStatus] = useState<'PUBLISHED' | 'DRAFT'>('PUBLISHED')
  const [featured, setFeatured] = useState(false)

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const handleTitleChange = (val: string) => {
    setTitle(val)
    const generated = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
    setSlug(generated)
  }

  const validate = (): boolean => {
    const errs: Record<string, string> = {}
    if (!title.trim()) errs.title = 'Title is required.'
    if (!slug.trim()) {
      errs.slug = 'Slug is required.'
    } else if (!/^[a-z0-9-]+$/.test(slug)) {
      errs.slug = 'Slug must only contain lowercase alphanumeric characters and hyphens.'
    }
    if (!excerpt.trim()) errs.excerpt = 'Excerpt summary is required.'
    if (!content.trim()) errs.content = 'Main article content is required.'
    if (!author.trim()) errs.author = 'Author name is required.'

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      showError('Please resolve all validation errors.')
      return
    }

    try {
      setSubmitting(true)
      const tags = tagsText
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)

      const created = await adminBlogService.create({
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        image: image.trim(),
        category,
        tags,
        author: author.trim(),
        authorRole: authorRole.trim(),
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        publishedAt: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        readingTime: Math.max(1, Math.ceil(content.split(/\s+/).length / 200)),
        status,
        featured,
        views: 1,
      })

      showSuccess(`Article "${created.title}" published successfully!`)
      navigate(ROUTES.adminBlogs)
    } catch {
      showError('Failed to create blog post.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="az-admin-page">
      <AdminBreadcrumbs
        items={[
          { label: 'Dashboard', to: ROUTES.adminDashboard },
          { label: 'Blogs', to: ROUTES.adminBlogs },
          { label: 'Create Blog' },
        ]}
      />

      <div className="az-admin-page__header">
        <div>
          <h1 className="az-admin-page__title">Create New Blog Article</h1>
          <p className="az-admin-page__subtitle">
            Author scientific editorial pieces, key insights, and research announcements.
          </p>
        </div>
        <div className="az-admin-page__header-actions">
          <Link to={ROUTES.adminBlogs}>
            <Button variant="ghost" size="sm">
              <ArrowLeft size={15} />
              Back to List
            </Button>
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="az-admin-form-container" noValidate>
        {Object.keys(errors).length > 0 && (
          <div className="az-form-error-summary" role="alert">
            <p><strong>Please correct the following errors:</strong></p>
            <ul>
              {Object.values(errors).map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <section className="az-admin-form-section">
          <h2 className="az-admin-form-section__title">Article Overview</h2>
          <div className="az-admin-form-grid">
            <div className="az-grid-col-2">
              <Input
                label="Article Title"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. The Future of Quantum Advantage in Drug Discovery"
                error={errors.title}
              />
            </div>

            <div>
              <Input
                label="URL Slug"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="future-of-quantum-advantage"
                error={errors.slug}
                helperText="Lowercase characters and hyphens only"
              />
            </div>

            <div>
              <Select
                label="Topic Category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value as BlogCategoryOption)}
                options={categories.map((c) => ({ label: c, value: c }))}
              />
            </div>

            <div className="az-grid-col-2">
              <Input
                label="Short Excerpt (1-2 sentences)"
                required
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief lead paragraph displayed on blog feed..."
                error={errors.excerpt}
              />
            </div>

            <div className="az-grid-col-2">
              <Input
                label="Featured Graphic URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="az-admin-form-section">
          <h2 className="az-admin-form-section__title">Body Content</h2>
          <div className="az-admin-form-grid">
            <div className="az-grid-col-2">
              <Textarea
                label="Full Article Content (Supports Markdown & Heading Structure)"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your in-depth research insights, case studies, or event retrospectives..."
                error={errors.content}
                style={{ minHeight: '16rem' }}
              />
            </div>

            <div className="az-grid-col-2">
              <Input
                label="Tags (comma separated)"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder="Quantum Computing, Biotech, AI"
              />
            </div>
          </div>
        </section>

        <section className="az-admin-form-section">
          <h2 className="az-admin-form-section__title">Authorship & Publication</h2>
          <div className="az-admin-form-grid">
            <div>
              <Input
                label="Author Name"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                error={errors.author}
              />
            </div>

            <div>
              <Input
                label="Author Affiliation / Role"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
              />
            </div>

            <div>
              <Select
                label="Publication Status"
                value={status}
                onChange={(e) => setStatus(e.target.value as 'PUBLISHED' | 'DRAFT')}
                options={[
                  { label: 'Published (Visible to public)', value: 'PUBLISHED' },
                  { label: 'Draft (Admin preview only)', value: 'DRAFT' },
                ]}
              />
            </div>

            <div className="az-form-checkbox-wrap" style={{ alignSelf: 'center' }}>
              <Checkbox
                label="Feature as Spotlight Article on Blog Home"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
            </div>
          </div>
        </section>

        <div className="az-admin-form__actions">
          <Link to={ROUTES.adminBlogs}>
            <Button variant="ghost" type="button" disabled={submitting}>
              Cancel
            </Button>
          </Link>
          <Button type="submit" loading={submitting}>
            <Save size={16} />
            Publish Article
          </Button>
        </div>
      </form>
    </div>
  )
}
