import { useState, type FormEvent } from 'react'
import { ArrowLeft, Save } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AdminBreadcrumbs } from '../../../components/admin/AdminBreadcrumbs'
import { useAdminToast } from '../../../hooks/useAdminToast'
import { Button } from '../../../components/common/Button'
import { Checkbox } from '../../../components/common/FormControls'
import { Input } from '../../../components/common/Input'
import { Textarea } from '../../../components/common/Textarea'
import { ROUTES } from '../../../constants/routes'
import { adminSpeakerService } from '../../../services/adminSpeakerService'

export default function CreateSpeaker() {
  const navigate = useNavigate()
  const { showSuccess, showError } = useAdminToast()

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [title, setTitle] = useState('Dr.')
  const [designation, setDesignation] = useState('')
  const [organization, setOrganization] = useState('')
  const [country, setCountry] = useState('United States')
  const [city, setCity] = useState('')
  const [image, setImage] = useState(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
  )
  const [shortBio, setShortBio] = useState('')
  const [biography, setBiography] = useState('')
  const [expertiseText, setExpertiseText] = useState('Artificial Intelligence, Machine Learning, Deep Learning')
  const [linkedin, setLinkedin] = useState('')
  const [website, setWebsite] = useState('')
  const [featured, setFeatured] = useState(false)

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const handleNameChange = (val: string) => {
    setName(val)
    const generated = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
    setSlug(generated)
  }

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
    if (!validate()) {
      showError('Please resolve all validation errors.')
      return
    }

    try {
      setSubmitting(true)
      const expertise = expertiseText
        .split(',')
        .map((x) => x.trim())
        .filter(Boolean)

      const created = await adminSpeakerService.create({
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

      showSuccess(`Speaker "${created.name}" added successfully!`)
      navigate(ROUTES.adminSpeakers)
    } catch {
      showError('Failed to create speaker profile.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="az-admin-page">
      <AdminBreadcrumbs
        items={[
          { label: 'Dashboard', to: ROUTES.adminDashboard },
          { label: 'Speakers', to: ROUTES.adminSpeakers },
          { label: 'Add Speaker' },
        ]}
      />

      <div className="az-admin-page__header">
        <div>
          <h1 className="az-admin-page__title">Add New Speaker</h1>
          <p className="az-admin-page__subtitle">
            Profile keynote speakers, session chairs, and technical luminaries.
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
                placeholder="e.g. Prof. Dr., Dr., Ms., Mr."
              />
            </div>

            <div>
              <Input
                label="Full Name"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Dr. Sarah Mitchell"
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
                placeholder="e.g. Professor of Computer Science"
                error={errors.designation}
              />
            </div>

            <div>
              <Input
                label="Affiliated Organization / Institution"
                required
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="e.g. Stanford University"
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
                placeholder="e.g. Stanford, California"
              />
            </div>

            <div>
              <Input
                label="Profile Picture URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
        </section>

        <section className="az-admin-form-section">
          <h2 className="az-admin-form-section__title">Biography & Research Focus</h2>
          <div className="az-admin-form-grid">
            <div className="az-grid-col-2">
              <Input
                label="Short Bio (1-2 sentences for card summary)"
                value={shortBio}
                onChange={(e) => setShortBio(e.target.value)}
                placeholder="Key research accomplishments and laboratory leadership..."
              />
            </div>

            <div className="az-grid-col-2">
              <Textarea
                label="Complete Biography"
                required
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
                placeholder="Academic history, major publications, awards, and keynote abstract..."
                error={errors.biography}
              />
            </div>

            <div className="az-grid-col-2">
              <Input
                label="Expertise Areas (comma separated)"
                value={expertiseText}
                onChange={(e) => setExpertiseText(e.target.value)}
                placeholder="Artificial Intelligence, Robotics, Neural Networks"
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
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            <div>
              <Input
                label="Personal Website / Lab Page"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="az-grid-col-2 az-form-checkbox-wrap">
              <Checkbox
                label="Feature as Keynote Speaker (Displays highlighted badge and home page spotlight)"
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
            Save Speaker
          </Button>
        </div>
      </form>
    </div>
  )
}
