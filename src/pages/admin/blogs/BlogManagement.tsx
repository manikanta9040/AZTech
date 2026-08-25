import { useEffect, useMemo, useState } from 'react'
import {
  BookOpen,
  Edit,
  Eye,
  Plus,
  Trash2,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AdminBreadcrumbs } from '../../../components/admin/AdminBreadcrumbs'
import { AdminFilters, type FilterConfig } from '../../../components/admin/AdminFilters'
import { AdminModal } from '../../../components/admin/AdminModal'
import { AdminPagination } from '../../../components/admin/AdminPagination'
import { AdminSearch } from '../../../components/admin/AdminSearch'
import { AdminTable, type AdminTableColumn } from '../../../components/admin/AdminTable'
import { useAdminToast } from '../../../hooks/useAdminToast'
import { Badge } from '../../../components/common/Badge'
import { Button } from '../../../components/common/Button'
import { ROUTES } from '../../../constants/routes'
import { BLOG_CATEGORIES, type BlogPost } from '../../../data/blogs'
import { adminBlogService } from '../../../services/adminBlogService'

export default function BlogManagement() {
  const navigate = useNavigate()
  const { showSuccess, showError } = useAdminToast()

  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Pagination
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Delete modal
  const [deleteBlog, setDeleteBlog] = useState<BlogPost | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    let isMounted = true
    adminBlogService
      .getAll()
      .then((data) => {
        if (isMounted) setBlogs(data)
      })
      .catch(() => {
        if (isMounted) showError('Failed to load blog posts.')
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [showError])

  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const matchSearch =
        !searchTerm ||
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.category.toLowerCase().includes(searchTerm.toLowerCase())

      const matchCategory =
        selectedCategory === 'All' || b.category.toLowerCase() === selectedCategory.toLowerCase()

      const matchStatus =
        selectedStatus === 'all'
          ? true
          : selectedStatus === 'published'
          ? b.status === 'PUBLISHED'
          : b.status === 'DRAFT'

      return matchSearch && matchCategory && matchStatus
    })
  }, [blogs, searchTerm, selectedCategory, selectedStatus])

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredBlogs.slice(start, start + pageSize)
  }, [filteredBlogs, page, pageSize])

  const totalPages = Math.ceil(filteredBlogs.length / pageSize)

  const handleDelete = async () => {
    if (!deleteBlog) return
    try {
      setDeleting(true)
      await adminBlogService.delete(deleteBlog.id)
      setBlogs((prev) => prev.filter((b) => b.id !== deleteBlog.id))
      showSuccess(`Blog post "${deleteBlog.title}" deleted.`)
      setDeleteBlog(null)
    } catch {
      showError('Failed to delete blog post.')
    } finally {
      setDeleting(false)
    }
  }

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      const updated = await adminBlogService.togglePublish(post.id)
      setBlogs((prev) => prev.map((b) => (b.id === post.id ? updated : b)))
      showSuccess(`Post status updated to ${updated.status}.`)
    } catch {
      showError('Failed to update publish state.')
    }
  }

  const filterConfigs: FilterConfig[] = [
    {
      key: 'category',
      label: 'Category',
      value: selectedCategory,
      options: BLOG_CATEGORIES.map((c) => ({ label: c, value: c })),
      onChange: (val) => {
        setSelectedCategory(val)
        setPage(1)
      },
    },
    {
      key: 'status',
      label: 'Status',
      value: selectedStatus,
      options: [
        { label: 'All Statuses', value: 'all' },
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
      onChange: (val) => {
        setSelectedStatus(val)
        setPage(1)
      },
    },
  ]

  const isFiltered = searchTerm !== '' || selectedCategory !== 'All' || selectedStatus !== 'all'

  const handleReset = () => {
    setSearchTerm('')
    setSelectedCategory('All')
    setSelectedStatus('all')
    setPage(1)
  }

  const columns: AdminTableColumn<BlogPost>[] = [
    {
      key: 'title',
      header: 'Article Title',
      render: (post) => (
        <div className="az-table-item-media">
          <div className="az-table-item-media__thumb">
            {post.image ? (
              <img src={post.image} alt={post.title} />
            ) : (
              <BookOpen size={18} />
            )}
          </div>
          <div className="az-table-item-media__details">
            <strong className="az-table-item-media__title" title={post.title}>
              {post.title}
            </strong>
            <span className="az-table-item-media__sub">{post.category}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'author',
      header: 'Author',
      render: (post) => (
        <div className="az-cell-user">
          <strong>{post.author}</strong>
          <small>{post.authorRole}</small>
        </div>
      ),
    },
    {
      key: 'publishedAt',
      header: 'Publish Date',
      render: (post) => <span className="az-muted">{post.publishedAt}</span>,
    },
    {
      key: 'views',
      header: 'Views',
      align: 'center',
      render: (post) => <span>{(post.views || 0).toLocaleString()}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (post) => (
        <button
          type="button"
          className="az-status-toggle-btn"
          onClick={() => handleTogglePublish(post)}
          title="Click to toggle publish status"
        >
          <Badge variant={post.status === 'PUBLISHED' ? 'success' : 'neutral'}>
            {post.status || 'PUBLISHED'}
          </Badge>
        </button>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (post) => (
        <div className="az-action-buttons">
          <a
            href={`/blogs/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="az-action-btn"
            title="View public article"
          >
            <Eye size={15} />
          </a>
          <button
            type="button"
            className="az-action-btn"
            onClick={() => navigate(`/admin/blogs/${post.id}/edit`)}
            title="Edit article"
          >
            <Edit size={15} />
          </button>
          <button
            type="button"
            className="az-action-btn az-action-btn--danger"
            onClick={() => setDeleteBlog(post)}
            title="Delete article"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="az-admin-page">
      <AdminBreadcrumbs
        items={[
          { label: 'Dashboard', to: ROUTES.adminDashboard },
          { label: 'Blogs' },
        ]}
      />

      <div className="az-admin-page__header">
        <div>
          <h1 className="az-admin-page__title">Blog & Article Management</h1>
          <p className="az-admin-page__subtitle">
            Publish research news, conference insights, and scientific breakthroughs.
          </p>
        </div>
        <div className="az-admin-page__header-actions">
          <Link to={ROUTES.adminBlogNew}>
            <Button size="sm">
              <Plus size={15} />
              Create Blog
            </Button>
          </Link>
        </div>
      </div>

      {/* Toolbar */}
      <div className="az-admin-toolbar">
        <AdminSearch
          value={searchTerm}
          onChange={(val) => {
            setSearchTerm(val)
            setPage(1)
          }}
          placeholder="Search by article title, author, category..."
          ariaLabel="Search blog posts"
          className="az-admin-toolbar__search"
        />
        <AdminFilters
          filters={filterConfigs}
          isFiltered={isFiltered}
          onReset={handleReset}
          className="az-admin-toolbar__filters"
        />
      </div>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={paginatedData}
        loading={loading}
        emptyMessage="No articles found."
        emptyDescription="Try clearing filters or write a new article."
        emptyAction={
          <Link to={ROUTES.adminBlogNew}>
            <Button size="sm">
              <Plus size={14} />
              Create Blog
            </Button>
          </Link>
        }
      />

      {/* Pagination */}
      <AdminPagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={filteredBlogs.length}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(s) => {
          setPageSize(s)
          setPage(1)
        }}
      />

      {/* Delete Modal */}
      <AdminModal
        open={Boolean(deleteBlog)}
        onClose={() => setDeleteBlog(null)}
        title="Delete Blog Article"
        description="Are you sure you want to remove this publication? This will unpublish the article and delete its record."
        variant="danger"
        confirmLabel="Delete Article"
        onConfirm={handleDelete}
        confirmLoading={deleting}
      >
        {deleteBlog && (
          <div className="az-confirm-box">
            <strong>{deleteBlog.title}</strong>
            <p>
              By {deleteBlog.author} • {deleteBlog.category}
            </p>
          </div>
        )}
      </AdminModal>
    </div>
  )
}
