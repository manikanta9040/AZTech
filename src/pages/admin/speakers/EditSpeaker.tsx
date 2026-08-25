import { useEffect, useState, type FormEvent } from 'react'
import { ArrowLeft, Save } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AdminBreadcrumbs } from '../../../components/admin/AdminBreadcrumbs'
import { useAdminToast } from '../../../hooks/useAdminToast'
import { Button } from '../../../components/common/Button'
import { Checkbox } from '../../../components/common/FormControls'
import { Input } from '../../../components/common/Input'
import { PageLoader } from '../../../components/common/Loader'
import { Textarea } from '../../../components/common/Textarea'
import { ROUTES } from '../../../constants/routes'
import { adminSpeakerService } from '../../../services/adminSpeakerService'
import type { Speaker } from '../../../types/speaker'

export default function EditSpeaker() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { showSuccess, showError } = useAdminToast()

  const [loading, setLoading] = useState(true)
  const [speaker, setSpeaker] = useState<Speaker | null>(null)

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [title, setTitle] = useState('Dr.')
  const [designation, setDesignation] = useState('')
  const [organization, setOrganization] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [image, setImage] = useState('')
  const [shortBio, setShortBio] = useState('')
  const [biography, setBiography] = useState('')
  const [expertiseText, setExpertiseText] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [website, setWebsite] = useState('')
  const [featured, setFeatured] = useState(false)

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function load() {
      if (!id) return
      try {
        setLoading(true)
        const found = await adminSpeakerService.getById(id)
        if (!found) {
          showError('Speaker not found.')
          navigate(ROUTES.adminSpeakers)
          return
        }
        setSpeaker(found)
        setName(found.name)
        setSlug(found.slug)
        setTitle(found.title || 'Dr.')
        setDesignation(found.designation)
        setOrganization(found.organization)
        setCountry(found.country)
        setCity(found.city || '')
        setImage(found.image || '')
        setShortBio(found.shortBio || '')
        setBiography(found.biography || '')
        setExpertiseText((found.expertise || []).join(', '))
        setLinkedin(found.socialLinks?.linkedin || '')
        setWebsite(found.socialLinks?.website || '')
        setFeatured(Boolean(found.featured))
      } catch {
        showError('Failed to load speaker details.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id, navigate, showError])

  const validate = (): boolean => {
    const errs: Record<string, string> = {}
    if (!name.trim()) errs.name = 'Speaker name is required.'
    if (!designation.trim()) errs.designation = 'Professional title / designation is required.'
    if (!organization.trim()) errs.organization = 'Institution or organization is required.'
    if (!country.trim()) errs.country = 'Country is required.'
    if (!biography.trim()) errs.biography = 'Full biography is required.'
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
      const expertise = expertiseText
        .split(',')
        .map((x) => x.trim())
        .filter(Boolean)

      await adminSpeakerService.update(id, {
        name: name.trim(),
        slug: slug.trim(),
        title: title.trim(),
        designation: designation.trim(),
        organization: organization.trim(),
        country: country.trim(),
        city: city.trim(),
        image: image.trim(),
        shortBio: shortBio.trim() || biography.slice(0, 140),
        biography: biography.trim(),
        expertise,
        featured,
        socialLinks: {
          linkedin: linkedin.trim() || undefined,
          website: website.trim() || undefined,
        },
      })

      showSuccess(`Speaker "${name}" updated successfully!`)
      navigate(ROUTES.adminSpeakers)
    } catch {
      showError('Failed to update speaker.')
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
          { label: 'Speakers', to: ROUTES.adminSpeakers },
          { label: 'Edit Speaker' },
        ]}
      />

      <div className="az-admin-page__header">
        <div>
          <h1 className="az-admin-page__title">Edit Speaker</h1>
          <p className="az-admin-page__subtitle">
            Update profile information for {speaker?.name}.
          </p>
        </div>
        <div className="az-admin-page__header-actions">
          <Link to={ROUTES.adminSpeakers}>
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
          <h2 className="az-admin-form-section__title">Speaker Identity</h2>
          <div className="az-admin-form-grid">
            <div>
              <Input
                label="Honorific / Title Prefix"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <Input
                label="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
              />
            </div>

            <div>
              <Input
                label="URL Slug"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>

            <div>
              <Input
                label="Professional Designation"
                required
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                error={errors.designation}
              />
            </div>

            <div>
              <Input
                label="Affiliated Organization"
                required
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                error={errors.organization}
              />
            </div>

            <div>
              <Input
                label="Country"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                error={errors.country}
              />
            </div>

            <div>
              <Input
                label="City / State"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <Input
                label="Profile Picture URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="az-admin-form-section">
          <h2 className="az-admin-form-section__title">Biography & Research Focus</h2>
          <div className="az-admin-form-grid">
            <div className="az-grid-col-2">
              <Input
                label="Short Bio"
                value={shortBio}
                onChange={(e) => setShortBio(e.target.value)}
              />
            </div>

            <div className="az-grid-col-2">
              <Textarea
                label="Complete Biography"
                required
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
                error={errors.biography}
              />
            </div>

            <div className="az-grid-col-2">
              <Input
                label="Expertise Areas (comma separated)"
                value={expertiseText}
                onChange={(e) => setExpertiseText(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="az-admin-form-section">
          <h2 className="az-admin-form-section__title">Social Profiles & Feature State</h2>
          <div className="az-admin-form-grid">
            <div>
              <Input
                label="LinkedIn Profile URL"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>

            <div>
              <Input
                label="Personal Website / Lab Page"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className="az-grid-col-2 az-form-checkbox-wrap">
              <Checkbox
                label="Feature as Keynote Speaker"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
            </div>
          </div>
        </section>

        <div className="az-admin-form__actions">
          <Link to={ROUTES.adminSpeakers}>
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
