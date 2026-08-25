import { useEffect, useState, type FormEvent } from 'react'
import { ArrowLeft, Save } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AdminBreadcrumbs } from '../../../components/admin/AdminBreadcrumbs'
import { useAdminToast } from '../../../hooks/useAdminToast'
import { Button } from '../../../components/common/Button'
import { Checkbox } from '../../../components/common/FormControls'
import { Input } from '../../../components/common/Input'
import { PageLoader } from '../../../components/common/Loader'
import { Select } from '../../../components/common/Select'
import { Textarea } from '../../../components/common/Textarea'
import { ROUTES } from '../../../constants/routes'
import { BLOG_CATEGORIES, type BlogCategory, type BlogPost } from '../../../data/blogs'
import { adminBlogService } from '../../../services/adminBlogService'

type BlogCategoryOption = Exclude<BlogCategory, 'All'>
const categories = BLOG_CATEGORIES.filter((c): c is BlogCategoryOption => c !== 'All')

export default function EditBlog() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { showSuccess, showError } = useAdminToast()

  const [loading, setLoading] = useState(true)
  const [blog, setBlog] = useState<BlogPost | null>(null)

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState<BlogCategoryOption>('Technology')
  const [tagsText, setTagsText] = useState('')
  const [author, setAuthor] = useState('')
  const [authorRole, setAuthorRole] = useState('')
  const [status, setStatus] = useState<'PUBLISHED' | 'DRAFT'>('PUBLISHED')
  const [featured, setFeatured] = useState(false)

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let isMounted = true
    if (!id) return

    adminBlogService
      .getById(id)
      .then((found) => {
        if (!isMounted) return
        if (!found) {
          showError('Blog post not found.')
          navigate(ROUTES.adminBlogs)
          return
        }
        setBlog(found)
        setTitle(found.title)
        setSlug(found.slug)
        setExcerpt(found.excerpt)
        setContent(found.content)
        setImage(found.image || '')
        setCategory(found.category)
        setTagsText((found.tags || []).join(', '))
        setAuthor(found.author)
        setAuthorRole(found.authorRole || '')
        setStatus(found.status || 'PUBLISHED')
        setFeatured(Boolean(found.featured))
      })
      .catch(() => {
        if (isMounted) showError('Failed to load blog post.')
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [id, navigate, showError])

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
    if (!id || !validate()) {
      showError('Please resolve all validation errors.')
      return
    }

    try {
      setSubmitting(true)
      const tags = tagsText
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)

      await adminBlogService.update(id, {
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        image: image.trim(),
        category,
        tags,
        author: author.trim(),
        authorRole: authorRole.trim(),
        readingTime: Math.max(1, Math.ceil(content.split(/\s+/).length / 200)),
        status,
        featured,
      })

      showSuccess(`Article "${title}" updated successfully!`)
      navigate(ROUTES.adminBlogs)
    } catch {
      showError('Failed to update article.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <PageLoader />

  return (
    <div className="az-admin-page">
      <AdminBreadcrumbs
        items={[
          { label: 'Dashboard', to: ROUTES.adminDashboard },
          { label: 'Blogs', to: ROUTES.adminBlogs },
          { label: 'Edit Blog' },
        ]}
      />

      <div className="az-admin-page__header">
        <div>
          <h1 className="az-admin-page__title">Edit Blog Article</h1>
          <p className="az-admin-page__subtitle">
            Update content, excerpt, and categories for &quot;{blog?.title}&quot;.
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
                onChange={(e) => setTitle(e.target.value)}
                error={errors.title}
              />
            </div>

            <div>
              <Input
                label="URL Slug"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                error={errors.slug}
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
                label="Short Excerpt"
                required
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
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
                label="Full Article Content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                error={errors.content}
                style={{ minHeight: '16rem' }}
              />
            </div>

            <div className="az-grid-col-2">
              <Input
                label="Tags (comma separated)"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
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
                label="Author Affiliation"
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
                label="Feature as Spotlight Article"
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
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
