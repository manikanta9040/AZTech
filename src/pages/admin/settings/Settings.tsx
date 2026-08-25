import { useEffect, useState } from 'react'
import {
  Bell,
  Globe,
  KeyRound,
  Save,
  Shield,
  Sliders,
  User,
} from 'lucide-react'
import { AdminBreadcrumbs } from '../../../components/admin/AdminBreadcrumbs'
import { AdminModal } from '../../../components/admin/AdminModal'
import { useAdminToast } from '../../../hooks/useAdminToast'
import { Button } from '../../../components/common/Button'
import { Checkbox, Switch } from '../../../components/common/FormControls'
import { Input } from '../../../components/common/Input'
import { PageLoader } from '../../../components/common/Loader'
import { Select } from '../../../components/common/Select'
import { Textarea } from '../../../components/common/Textarea'
import { ROUTES } from '../../../constants/routes'
import { useAuth } from '../../../hooks/useAuth'
import { adminSettingsService } from '../../../services/adminSettingsService'

const TABS = [
  { id: 'profile', label: 'Admin Profile', icon: User },
  { id: 'website', label: 'Website Settings', icon: Globe },
  { id: 'conference', label: 'Conference Defaults', icon: Sliders },
  { id: 'notifications', label: 'Notification Alerts', icon: Bell },
  { id: 'security', label: 'Security & Access', icon: Shield },
]

export default function Settings() {
  const { user } = useAuth()
  const { showSuccess, showError } = useAdminToast()

  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Profile Edit State
  const [profileName, setProfileName] = useState(user?.name || 'Administrator')
  const [profileEmail, setProfileEmail] = useState(user?.email || 'admin@aztech.test')
  const [profileImage, setProfileImage] = useState(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  )

  // Change Password Modal State
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({})

  // Website Settings State
  const [websiteName, setWebsiteName] = useState('')
  const [websiteEmail, setWebsiteEmail] = useState('')
  const [websitePhone, setWebsitePhone] = useState('')
  const [websiteAddress, setWebsiteAddress] = useState('')
  const [twitter, setTwitter] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [facebook, setFacebook] = useState('')
  const [github, setGithub] = useState('')
  const [footerText, setFooterText] = useState('')

  // Conference Settings State
  const [defaultCurrency, setDefaultCurrency] = useState('USD')
  const [defaultDeadlineDays, setDefaultDeadlineDays] = useState(14)
  const [enablePublicSubmissions, setEnablePublicSubmissions] = useState(true)
  const [autoApproveFree, setAutoApproveFree] = useState(false)
  const [allowNetworking, setAllowNetworking] = useState(true)

  // Notification Settings State
  const [notifNewRegistration, setNotifNewRegistration] = useState(true)
  const [notifNewAbstract, setNotifNewAbstract] = useState(true)
  const [notifPayment, setNotifPayment] = useState(true)
  const [notifNewUser, setNotifNewUser] = useState(true)
  const [notifConferenceReminder, setNotifConferenceReminder] = useState(true)
  const [notifSystemAlerts, setNotifSystemAlerts] = useState(false)

  // Security Settings State
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState(60)

  useEffect(() => {
    let isMounted = true
    adminSettingsService
      .getSettings()
      .then((s) => {
        if (!isMounted) return
        // Website
        setWebsiteName(s.website.websiteName)
        setWebsiteEmail(s.website.websiteEmail)
        setWebsitePhone(s.website.phone)
        setWebsiteAddress(s.website.address)
        setTwitter(s.website.socialLinks.twitter)
        setLinkedin(s.website.socialLinks.linkedin)
        setFacebook(s.website.socialLinks.facebook)
        setGithub(s.website.socialLinks.github)
        setFooterText(s.website.footerText)
        // Conference
        setDefaultCurrency(s.conference.defaultCurrency)
        setDefaultDeadlineDays(s.conference.defaultDeadlineDays)
        setEnablePublicSubmissions(s.conference.enablePublicSubmissions)
        setAutoApproveFree(s.conference.autoApproveFree)
        setAllowNetworking(s.conference.allowNetworking)
        // Notifications
        setNotifNewRegistration(s.notifications.newRegistration)
        setNotifNewAbstract(s.notifications.newAbstract)
        setNotifPayment(s.notifications.paymentNotification)
        setNotifNewUser(s.notifications.newUser)
        setNotifConferenceReminder(s.notifications.conferenceReminder)
        setNotifSystemAlerts(s.notifications.systemAlerts)
        // Security
        setTwoFactorAuth(s.security.twoFactorAuth)
        setSessionTimeout(s.security.sessionTimeoutMinutes)
      })
      .catch(() => {
        if (isMounted) showError('Failed to load settings.')
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [showError])

  const handleSaveWebsite = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSaving(true)
      await adminSettingsService.updateWebsite({
        websiteName,
        websiteEmail,
        phone: websitePhone,
        address: websiteAddress,
        socialLinks: { twitter, linkedin, facebook, github },
        footerText,
      })
      showSuccess('Website settings updated successfully.')
    } catch {
      showError('Failed to save website settings.')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveConference = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSaving(true)
      await adminSettingsService.updateConference({
        defaultCurrency,
        defaultDeadlineDays: Number(defaultDeadlineDays),
        enablePublicSubmissions,
        autoApproveFree,
        allowNetworking,
      })
      showSuccess('Conference default parameters updated.')
    } catch {
      showError('Failed to save conference settings.')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveNotifications = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSaving(true)
      await adminSettingsService.updateNotifications({
        newRegistration: notifNewRegistration,
        newAbstract: notifNewAbstract,
        paymentNotification: notifPayment,
        newUser: notifNewUser,
        conferenceReminder: notifConferenceReminder,
        systemAlerts: notifSystemAlerts,
      })
      showSuccess('Notification alert preferences saved.')
    } catch {
      showError('Failed to save notifications.')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveSecurity = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSaving(true)
      await adminSettingsService.updateSecurity({
        twoFactorAuth,
        sessionTimeoutMinutes: Number(sessionTimeout),
      })
      showSuccess('Security settings updated.')
    } catch {
      showError('Failed to save security settings.')
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordSubmit = () => {
    const errs: Record<string, string> = {}
    if (!currentPassword) errs.current = 'Current password is required.'
    if (!newPassword) {
      errs.new = 'New password is required.'
    } else if (newPassword.length < 8) {
      errs.new = 'Password must be at least 8 characters.'
    }
    if (newPassword !== confirmPassword) {
      errs.confirm = 'Passwords do not match.'
    }

    if (Object.keys(errs).length > 0) {
      setPasswordErrors(errs)
      return
    }

    showSuccess('Admin password changed successfully (Mock update).')
    setPasswordModalOpen(false)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setPasswordErrors({})
  }

  if (loading) return <PageLoader />

  return (
    <div className="az-admin-page">
      <AdminBreadcrumbs
        items={[
          { label: 'Dashboard', to: ROUTES.adminDashboard },
          { label: 'Settings' },
        ]}
      />

      <div className="az-admin-page__header">
        <div>
          <h1 className="az-admin-page__title">Platform & Admin Settings</h1>
          <p className="az-admin-page__subtitle">
            Configure administrative preferences, institutional brand identity, and global defaults.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="az-admin-tabs" role="tablist">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`az-admin-tab ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab 1: Profile */}
      {activeTab === 'profile' && (
        <section className="az-admin-card">
          <div className="az-admin-card__header">
            <h2 className="az-admin-card__title">Administrator Profile</h2>
            <p className="az-admin-card__subtitle">Your authenticated account credentials</p>
          </div>
          <div className="az-admin-card__content">
            <div className="az-admin-profile-view">
              <div className="az-admin-profile-view__avatar">
                <img src={profileImage} alt={profileName} />
              </div>
              <div className="az-admin-profile-view__info">
                <h3>{profileName}</h3>
                <p>{profileEmail}</p>
                <div className="az-badge az-badge--primary" style={{ marginTop: '0.5rem' }}>
                  {user?.role === 'SUPER_ADMIN' ? 'Super Administrator' : 'Administrator'}
                </div>
              </div>
            </div>

            <div className="az-admin-form-grid" style={{ marginTop: '2rem' }}>
              <div>
                <Input
                  label="Display Name"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                />
              </div>
              <div>
                <Input
                  label="Administrator Email"
                  type="email"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                />
              </div>
              <div className="az-grid-col-2">
                <Input
                  label="Avatar Picture URL"
                  value={profileImage}
                  onChange={(e) => setProfileImage(e.target.value)}
                />
              </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button onClick={() => showSuccess('Profile information saved.')}>
                <Save size={16} />
                Save Profile
              </Button>
              <Button variant="outline" onClick={() => setPasswordModalOpen(true)}>
                <KeyRound size={16} />
                Change Password
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Tab 2: Website Settings */}
      {activeTab === 'website' && (
        <form onSubmit={handleSaveWebsite} className="az-admin-card">
          <div className="az-admin-card__header">
            <h2 className="az-admin-card__title">Website Brand & Contact Information</h2>
            <p className="az-admin-card__subtitle">Global public platform contact info & footer</p>
          </div>
          <div className="az-admin-card__content az-admin-form-grid">
            <div className="az-grid-col-2">
              <Input
                label="Website / Organization Name"
                required
                value={websiteName}
                onChange={(e) => setWebsiteName(e.target.value)}
              />
            </div>
            <div>
              <Input
                label="Official Contact Email"
                type="email"
                required
                value={websiteEmail}
                onChange={(e) => setWebsiteEmail(e.target.value)}
              />
            </div>
            <div>
              <Input
                label="Support Telephone"
                value={websitePhone}
                onChange={(e) => setWebsitePhone(e.target.value)}
              />
            </div>
            <div className="az-grid-col-2">
              <Input
                label="Headquarters Address"
                value={websiteAddress}
                onChange={(e) => setWebsiteAddress(e.target.value)}
              />
            </div>
            <div>
              <Input
                label="Twitter / X Profile"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
            <div>
              <Input
                label="LinkedIn Company Page"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>
            <div>
              <Input
                label="Facebook Page"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </div>
            <div>
              <Input
                label="GitHub Organization"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>
            <div className="az-grid-col-2">
              <Textarea
                label="Footer Copyright Text"
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
              />
            </div>
          </div>
          <div className="az-admin-card__footer">
            <Button type="submit" loading={saving}>
              <Save size={16} />
              Save Website Settings
            </Button>
          </div>
        </form>
      )}

      {/* Tab 3: Conference Settings */}
      {activeTab === 'conference' && (
        <form onSubmit={handleSaveConference} className="az-admin-card">
          <div className="az-admin-card__header">
            <h2 className="az-admin-card__title">Conference & Submission Defaults</h2>
            <p className="az-admin-card__subtitle">Default policies applied when creating new summits</p>
          </div>
          <div className="az-admin-card__content az-admin-form-grid">
            <div>
              <Select
                label="Default Platform Currency"
                value={defaultCurrency}
                onChange={(e) => setDefaultCurrency(e.target.value)}
                options={[
                  { label: 'USD ($)', value: 'USD' },
                  { label: 'EUR (€)', value: 'EUR' },
                  { label: 'GBP (£)', value: 'GBP' },
                  { label: 'INR (₹)', value: 'INR' },
                ]}
              />
            </div>
            <div>
              <Input
                label="Default Abstract Deadline (Days prior to start)"
                type="number"
                value={String(defaultDeadlineDays)}
                onChange={(e) => setDefaultDeadlineDays(Number(e.target.value))}
              />
            </div>
            <div className="az-grid-col-2 az-form-checkbox-wrap">
              <Checkbox
                label="Enable Public Call for Abstracts (Allow paper submissions across all open summits)"
                checked={enablePublicSubmissions}
                onChange={(e) => setEnablePublicSubmissions(e.target.checked)}
              />
            </div>
            <div className="az-grid-col-2 az-form-checkbox-wrap">
              <Checkbox
                label="Auto-Approve Complimentary Registrations"
                checked={autoApproveFree}
                onChange={(e) => setAutoApproveFree(e.target.checked)}
              />
            </div>
            <div className="az-grid-col-2 az-form-checkbox-wrap">
              <Checkbox
                label="Enable Attendee-to-Attendee Networking Hub"
                checked={allowNetworking}
                onChange={(e) => setAllowNetworking(e.target.checked)}
              />
            </div>
          </div>
          <div className="az-admin-card__footer">
            <Button type="submit" loading={saving}>
              <Save size={16} />
              Save Conference Settings
            </Button>
          </div>
        </form>
      )}

      {/* Tab 4: Notifications */}
      {activeTab === 'notifications' && (
        <form onSubmit={handleSaveNotifications} className="az-admin-card">
          <div className="az-admin-card__header">
            <h2 className="az-admin-card__title">Notification Alerts & Email Triggers</h2>
            <p className="az-admin-card__subtitle">Toggle instant administrative alerts for critical platform events</p>
          </div>
          <div className="az-admin-card__content az-settings-toggles">
            <div className="az-toggle-row">
              <div>
                <strong>New Registration Alert</strong>
                <p>Receive immediate alerts when a participant registers for a conference.</p>
              </div>
              <Switch
                label=""
                checked={notifNewRegistration}
                onChange={setNotifNewRegistration}
              />
            </div>

            <div className="az-toggle-row">
              <div>
                <strong>New Abstract Paper Submission</strong>
                <p>Notify review coordinators when an author submits a new research abstract.</p>
              </div>
              <Switch
                label=""
                checked={notifNewAbstract}
                onChange={setNotifNewAbstract}
              />
            </div>

            <div className="az-toggle-row">
              <div>
                <strong>Payment & Gateway Notifications</strong>
                <p>Alerts for successfully settled or failed transaction attempts.</p>
              </div>
              <Switch
                label=""
                checked={notifPayment}
                onChange={setNotifPayment}
              />
            </div>

            <div className="az-toggle-row">
              <div>
                <strong>New User Account Registration</strong>
                <p>Notice when new delegates register on the platform.</p>
              </div>
              <Switch
                label=""
                checked={notifNewUser}
                onChange={setNotifNewUser}
              />
            </div>

            <div className="az-toggle-row">
              <div>
                <strong>Conference Schedule Reminder</strong>
                <p>Automated reminders 7 days prior to summit opening dates.</p>
              </div>
              <Switch
                label=""
                checked={notifConferenceReminder}
                onChange={setNotifConferenceReminder}
              />
            </div>

            <div className="az-toggle-row">
              <div>
                <strong>System Health & Security Alerts</strong>
                <p>Automated diagnostic alerts on API latency and mock log warnings.</p>
              </div>
              <Switch
                label=""
                checked={notifSystemAlerts}
                onChange={setNotifSystemAlerts}
              />
            </div>
          </div>
          <div className="az-admin-card__footer">
            <Button type="submit" loading={saving}>
              <Save size={16} />
              Save Notification Preferences
            </Button>
          </div>
        </form>
      )}

      {/* Tab 5: Security */}
      {activeTab === 'security' && (
        <form onSubmit={handleSaveSecurity} className="az-admin-card">
          <div className="az-admin-card__header">
            <h2 className="az-admin-card__title">Security & Role Governance</h2>
            <p className="az-admin-card__subtitle">Session timeouts and authentication parameters</p>
          </div>
          <div className="az-admin-card__content az-admin-form-grid">
            <div className="az-grid-col-2">
              <div className="az-security-note">
                <Shield size={20} className="az-security-note__icon" />
                <div>
                  <strong>Role Architecture Notice</strong>
                  <p>
                    Currently operating in Frontend Mock Security mode. Full role-based authorization
                    and JWT authentication will be bound with Spring Security in Step 13.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <Select
                label="Admin Session Inactivity Timeout"
                value={String(sessionTimeout)}
                onChange={(e) => setSessionTimeout(Number(e.target.value))}
                options={[
                  { label: '15 Minutes', value: '15' },
                  { label: '30 Minutes', value: '30' },
                  { label: '60 Minutes', value: '60' },
                  { label: '120 Minutes', value: '120' },
                ]}
              />
            </div>

            <div className="az-grid-col-2 az-form-checkbox-wrap">
              <Checkbox
                label="Enforce Two-Factor Authentication (2FA) for All Administrators (Mock)"
                checked={twoFactorAuth}
                onChange={(e) => setTwoFactorAuth(e.target.checked)}
              />
            </div>
          </div>
          <div className="az-admin-card__footer">
            <Button type="submit" loading={saving}>
              <Save size={16} />
              Save Security Policies
            </Button>
          </div>
        </form>
      )}

      {/* Change Password Modal */}
      <AdminModal
        open={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        title="Change Admin Password"
        description="Update your administrator password credentials."
        confirmLabel="Update Password"
        onConfirm={handlePasswordSubmit}
      >
        <div className="az-modal-form-body">
          <Input
            label="Current Password"
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            error={passwordErrors.current}
          />
          <Input
            label="New Password"
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={passwordErrors.new}
            helperText="Minimum 8 characters"
          />
          <Input
            label="Confirm New Password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={passwordErrors.confirm}
          />
        </div>
      </AdminModal>
    </div>
  )
}
