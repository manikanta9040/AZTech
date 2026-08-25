import { useEffect, useMemo, useState } from 'react'
import {
  Eye,
  Plus,
  Shield,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  UserX,
} from 'lucide-react'
import { AdminBreadcrumbs } from '../../../components/admin/AdminBreadcrumbs'
import { AdminFilters, type FilterConfig } from '../../../components/admin/AdminFilters'
import { AdminModal } from '../../../components/admin/AdminModal'
import { AdminPagination } from '../../../components/admin/AdminPagination'
import { AdminSearch } from '../../../components/admin/AdminSearch'
import { AdminTable, type AdminTableColumn } from '../../../components/admin/AdminTable'
import { useAdminToast } from '../../../hooks/useAdminToast'
import { Badge } from '../../../components/common/Badge'
import { Button } from '../../../components/common/Button'
import { Input } from '../../../components/common/Input'
import { Select } from '../../../components/common/Select'
import { ROUTES } from '../../../constants/routes'
import { useAuth } from '../../../hooks/useAuth'
import { adminUserService } from '../../../services/adminUserService'
import type { AdminUser } from '../../../types/admin'
import type { UserRole } from '../../../types/auth'

const ROLE_FILTER_OPTIONS = [
  { label: 'All Roles', value: 'all' },
  { label: 'Normal Attendee (USER)', value: 'USER' },
  { label: 'Administrator (ADMIN)', value: 'ADMIN' },
  { label: 'Super Admin (SUPER_ADMIN)', value: 'SUPER_ADMIN' },
]

const STATUS_FILTER_OPTIONS = [
  { label: 'All Statuses', value: 'all' },
  { label: 'Active Accounts', value: 'ACTIVE' },
  { label: 'Inactive / Suspended', value: 'INACTIVE' },
]

export default function UserList() {
  const { user: currentAuthUser } = useAuth()
  const { showSuccess, showError } = useAdminToast()

  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  // Pagination
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Modals state
  const [viewUser, setViewUser] = useState<AdminUser | null>(null)
  const [statusModalUser, setStatusModalUser] = useState<AdminUser | null>(null)
  const [roleModalUser, setRoleModalUser] = useState<AdminUser | null>(null)
  const [newRole, setNewRole] = useState<UserRole>('USER')
  const [addUserModalOpen, setAddUserModalOpen] = useState(false)

  // New User Form state
  const [newUserName, setNewUserName] = useState('')
  const [newUserEmail, setNewUserEmail] = useState('')
  const [newUserOrg, setNewUserOrg] = useState('')
  const [newUserRole, setNewUserRole] = useState<UserRole>('USER')

  useEffect(() => {
    let isMounted = true
    adminUserService
      .getAll()
      .then((data) => {
        if (isMounted) setUsers(data)
      })
      .catch(() => {
        if (isMounted) showError('Failed to load user accounts.')
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [showError])

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        !searchTerm ||
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.organization.toLowerCase().includes(searchTerm.toLowerCase())

      const matchRole = roleFilter === 'all' || u.role === roleFilter
      const matchStatus = statusFilter === 'all' || u.status === statusFilter

      return matchSearch && matchRole && matchStatus
    })
  }, [users, searchTerm, roleFilter, statusFilter])

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredUsers.slice(start, start + pageSize)
  }, [filteredUsers, page, pageSize])

  const totalPages = Math.ceil(filteredUsers.length / pageSize)

  const handleToggleStatus = async () => {
    if (!statusModalUser) return
    try {
      const updated = await adminUserService.toggleStatus(statusModalUser.id)
      setUsers((prev) => prev.map((u) => (u.id === statusModalUser.id ? updated : u)))
      showSuccess(
        `User account ${updated.status === 'ACTIVE' ? 'activated' : 'deactivated'} successfully.`
      )
      setStatusModalUser(null)
    } catch {
      showError('Failed to update user status.')
    }
  }

  const handleChangeRole = async () => {
    if (!roleModalUser) return
    try {
      const updated = await adminUserService.changeRole(roleModalUser.id, newRole)
      setUsers((prev) => prev.map((u) => (u.id === roleModalUser.id ? updated : u)))
      showSuccess(`Role for "${roleModalUser.name}" updated to ${newRole}.`)
      setRoleModalUser(null)
    } catch {
      showError('Failed to change user role.')
    }
  }

  const handleCreateUser = async () => {
    if (!newUserName.trim() || !newUserEmail.trim()) {
      showError('Name and Email are required.')
      return
    }
    try {
      const created = await adminUserService.create({
        name: newUserName.trim(),
        email: newUserEmail.trim().toLowerCase(),
        organization: newUserOrg.trim() || 'Independent',
        role: newUserRole,
        registrationCount: 0,
        status: 'ACTIVE',
        createdAt: new Date().toISOString().split('T')[0],
      })
      setUsers((prev) => [created, ...prev])
      showSuccess(`User account "${created.name}" created successfully.`)
      setAddUserModalOpen(false)
      setNewUserName('')
      setNewUserEmail('')
      setNewUserOrg('')
      setNewUserRole('USER')
    } catch {
      showError('Failed to create user.')
    }
  }

  const filterConfigs: FilterConfig[] = [
    {
      key: 'role',
      label: 'Role',
      value: roleFilter,
      options: ROLE_FILTER_OPTIONS,
      onChange: (val) => {
        setRoleFilter(val)
        setPage(1)
      },
    },
    {
      key: 'status',
      label: 'Status',
      value: statusFilter,
      options: STATUS_FILTER_OPTIONS,
      onChange: (val) => {
        setStatusFilter(val)
        setPage(1)
      },
    },
  ]

  const isFiltered = searchTerm !== '' || roleFilter !== 'all' || statusFilter !== 'all'

  const handleReset = () => {
    setSearchTerm('')
    setRoleFilter('all')
    setStatusFilter('all')
    setPage(1)
  }

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return (
          <span className="az-badge az-badge--warning">
            <ShieldAlert size={12} style={{ marginRight: '4px' }} />
            SUPER ADMIN
          </span>
        )
      case 'ADMIN':
        return (
          <span className="az-badge az-badge--primary">
            <ShieldCheck size={12} style={{ marginRight: '4px' }} />
            ADMIN
          </span>
        )
      default:
        return <Badge variant="neutral">USER</Badge>
    }
  }

  const columns: AdminTableColumn<AdminUser>[] = [
    {
      key: 'name',
      header: 'User / Email',
      render: (usr) => (
        <div className="az-table-item-media">
          <div className="az-table-item-media__avatar">
            {usr.avatar ? (
              <img src={usr.avatar} alt={usr.name} />
            ) : (
              <div className="az-avatar-fallback">{usr.name.charAt(0)}</div>
            )}
          </div>
          <div className="az-table-item-media__details">
            <strong className="az-table-item-media__title">{usr.name}</strong>
            <span className="az-table-item-media__sub">{usr.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'organization',
      header: 'Organization',
      render: (usr) => <span>{usr.organization || 'Independent'}</span>,
    },
    {
      key: 'role',
      header: 'Role',
      render: (usr) => getRoleBadge(usr.role),
    },
    {
      key: 'registrations',
      header: 'Registrations',
      align: 'center',
      render: (usr) => (
        <span className="az-badge az-badge--neutral">
          {usr.registrationCount} conferences
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (usr) => (
        <Badge variant={usr.status === 'ACTIVE' ? 'success' : 'error'}>
          {usr.status}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      header: 'Member Since',
      render: (usr) => <span className="az-muted">{usr.createdAt}</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (usr) => (
        <div className="az-action-buttons">
          <button
            type="button"
            className="az-action-btn"
            title="View user details"
            onClick={() => setViewUser(usr)}
          >
            <Eye size={15} />
          </button>
          <button
            type="button"
            className="az-action-btn"
            title="Manage role"
            onClick={() => {
              setRoleModalUser(usr)
              setNewRole(usr.role)
            }}
          >
            <Shield size={15} />
          </button>
          <button
            type="button"
            className={`az-action-btn ${usr.status === 'ACTIVE' ? 'az-action-btn--danger' : 'az-action-btn--success'}`}
            title={usr.status === 'ACTIVE' ? 'Deactivate account' : 'Activate account'}
            onClick={() => setStatusModalUser(usr)}
            disabled={usr.email === currentAuthUser?.email}
          >
            {usr.status === 'ACTIVE' ? <UserX size={15} /> : <UserCheck size={15} />}
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
          { label: 'Users' },
        ]}
      />

      <div className="az-admin-page__header">
        <div>
          <h1 className="az-admin-page__title">User & Role Management</h1>
          <p className="az-admin-page__subtitle">
            Oversee platform delegates, researchers, administrators, and permissions.
          </p>
        </div>
        <div className="az-admin-page__header-actions">
          <Button size="sm" onClick={() => setAddUserModalOpen(true)}>
            <Plus size={15} />
            Add User
          </Button>
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
          placeholder="Search by name, email, organization..."
          ariaLabel="Search users"
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
        emptyMessage="No users found."
        emptyDescription="Try clearing filters or search terms."
      />

      {/* Pagination */}
      <AdminPagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={filteredUsers.length}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(s) => {
          setPageSize(s)
          setPage(1)
        }}
      />

      {/* View User Modal */}
      <AdminModal
        open={Boolean(viewUser)}
        onClose={() => setViewUser(null)}
        title="User Account Details"
        description={`User ID: ${viewUser?.id}`}
        cancelLabel="Close"
      >
        {viewUser && (
          <div className="az-details-grid">
            <div className="az-detail-item">
              <span className="az-detail-label">Full Name</span>
              <strong className="az-detail-value">{viewUser.name}</strong>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Email</span>
              <span className="az-detail-value">{viewUser.email}</span>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Organization</span>
              <span className="az-detail-value">{viewUser.organization || 'Independent'}</span>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Role</span>
              <div>{getRoleBadge(viewUser.role)}</div>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Account Status</span>
              <div>
                <Badge variant={viewUser.status === 'ACTIVE' ? 'success' : 'error'}>
                  {viewUser.status}
                </Badge>
              </div>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Total Registrations</span>
              <strong className="az-detail-value">{viewUser.registrationCount}</strong>
            </div>
            <div className="az-detail-item">
              <span className="az-detail-label">Registration Date</span>
              <span className="az-detail-value">{viewUser.createdAt}</span>
            </div>
          </div>
        )}
      </AdminModal>

      {/* Activate / Deactivate Confirmation Modal */}
      <AdminModal
        open={Boolean(statusModalUser)}
        onClose={() => setStatusModalUser(null)}
        title={statusModalUser?.status === 'ACTIVE' ? 'Deactivate User Account' : 'Activate User Account'}
        description={
          statusModalUser?.status === 'ACTIVE'
            ? 'Deactivating this user will suspend their access to registrations, abstracts, and account settings.'
            : 'Activating this account will restore full access to conference registrations and features.'
        }
        variant={statusModalUser?.status === 'ACTIVE' ? 'danger' : 'success'}
        confirmLabel={statusModalUser?.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
        onConfirm={handleToggleStatus}
      >
        {statusModalUser && (
          <div className="az-confirm-box">
            <strong>{statusModalUser.name}</strong>
            <p>{statusModalUser.email} • {statusModalUser.organization}</p>
          </div>
        )}
      </AdminModal>

      {/* Role Management Modal */}
      <AdminModal
        open={Boolean(roleModalUser)}
        onClose={() => setRoleModalUser(null)}
        title="Manage User Role"
        description="Update administrative access and permission scope. (Frontend mock role management)."
        variant="warning"
        confirmLabel="Update Role"
        onConfirm={handleChangeRole}
      >
        {roleModalUser && (
          <div className="az-modal-form-body">
            <p>
              Modifying role for <strong>{roleModalUser.name}</strong> ({roleModalUser.email}):
            </p>
            <div className="az-field" style={{ marginTop: '1rem' }}>
              <Select
                label="Select Role"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as UserRole)}
                options={[
                  { label: 'USER (Normal Attendee)', value: 'USER' },
                  { label: 'ADMIN (Conference & Content Manager)', value: 'ADMIN' },
                  { label: 'SUPER_ADMIN (Governance & System Settings)', value: 'SUPER_ADMIN' },
                ]}
              />
            </div>
          </div>
        )}
      </AdminModal>

      {/* Add User Modal */}
      <AdminModal
        open={addUserModalOpen}
        onClose={() => setAddUserModalOpen(false)}
        title="Create User Account"
        description="Register a new researcher, conference delegate, or staff account."
        confirmLabel="Create User"
        onConfirm={handleCreateUser}
      >
        <div className="az-modal-form-body">
          <Input
            label="Full Name"
            required
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="e.g. Dr. Jane Smith"
          />
          <Input
            label="Email Address"
            type="email"
            required
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            placeholder="e.g. jane.smith@university.edu"
          />
          <Input
            label="Organization / Affiliation"
            value={newUserOrg}
            onChange={(e) => setNewUserOrg(e.target.value)}
            placeholder="e.g. Oxford University"
          />
          <Select
            label="Assigned Role"
            value={newUserRole}
            onChange={(e) => setNewUserRole(e.target.value as UserRole)}
            options={[
              { label: 'USER (Attendee)', value: 'USER' },
              { label: 'ADMIN (Administrator)', value: 'ADMIN' },
            ]}
          />
        </div>
      </AdminModal>
    </div>
  )
}
