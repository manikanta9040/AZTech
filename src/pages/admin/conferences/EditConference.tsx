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
import { adminConferenceService } from '../../../services/adminConferenceService'
import type { Conference, ConferenceStatus } from '../../../types/conference'

const CATEGORIES = [
  'Artificial Intelligence',
  'Healthcare',
  'Engineering',
  'Computer Science',
  'Renewable Energy',
  'Cybersecurity',
  'Data Science',
  'Education',
  'Robotics',
]

const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'AED', 'SGD']

const STATUSES: { label: string; value: ConferenceStatus }[] = [
  { label: 'Registration Open', value: 'registration_open' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Closing Soon', value: 'closing_soon' },
  { label: 'Call for Papers', value: 'call_for_papers' },
  { label: 'Closed / Archived', value: 'closed' },
  { label: 'Completed', value: 'completed' },
]

export default function EditConference() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { showSuccess, showError } = useAdminToast()

  const [loading, setLoading] = useState(true)
  const [conference, setConference] = useState<Conference | null>(null)

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [description, setDescription] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [image, setImage] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [venue, setVenue] = useState('')
  const [registrationDeadline, setRegistrationDeadline] = useState('')
  const [abstractDeadline, setAbstractDeadline] = useState('')
  const [price, setPrice] = useState('499')
  const [currency, setCurrency] = useState('USD')
  const [status, setStatus] = useState<ConferenceStatus>('registration_open')
  const [featured, setFeatured] = useState(false)
  const [topicsText, setTopicsText] = useState('')

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function load() {
      if (!id) return
      try {
        setLoading(true)
        const found = await adminConferenceService.getById(id)
        if (!found) {
          showError('Conference not found.')
          navigate(ROUTES.adminConferences)
          return
        }
        setConference(found)
        setTitle(found.title)
        setSlug(found.slug)
        setCategory(found.category)
        setDescription(found.description)
        setShortDescription(found.shortDescription || '')
        setImage(found.image || '')
        setStartDate(found.startDate)
        setEndDate(found.endDate)
        setCountry(found.country)
        setCity(found.city)
        setVenue(found.venue || '')
        setRegistrationDeadline(found.registrationDeadline || '')
        setAbstractDeadline(found.abstractDeadline || '')
        setPrice(String(found.price || 0))
        setStatus(found.status)
        setFeatured(Boolean(found.featured))
        setTopicsText((found.topics || []).join(', '))
      } catch {
        showError('Failed to load conference.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id, navigate, showError])

  const validate = (): boolean => {
    const errs: Record<string, string> = {}
    if (!title.trim()) errs.title = 'Title is required.'
    if (!slug.trim()) errs.slug = 'URL slug is required.'
    if (!description.trim()) errs.description = 'Full description is required.'
    if (!startDate) errs.startDate = 'Start date is required.'
    if (!endDate) errs.endDate = 'End date is required.'
    if (startDate && endDate && endDate < startDate) {
      errs.endDate = 'End date cannot be before start date.'
    }
    if (registrationDeadline && startDate && registrationDeadline > startDate) {
      errs.registrationDeadline = 'Registration deadline cannot be after start date.'
    }
    if (abstractDeadline && startDate && abstractDeadline > startDate) {
      errs.abstractDeadline = 'Abstract deadline cannot be after start date.'
    }
    if (!country.trim()) errs.country = 'Country is required.'
    if (!city.trim()) errs.city = 'City is required.'
    if (price === '' || isNaN(Number(price)) || Number(price) < 0) {
      errs.price = 'Registration fee must be a valid non-negative number.'
    }

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
      const topics = topicsText
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)

      await adminConferenceService.update(id, {
        title: title.trim(),
        slug: slug.trim(),
        category,
        description: description.trim(),
        shortDescription: shortDescription.trim() || description.slice(0, 100),
        image: image.trim(),
        startDate,
        endDate,
        country: country.trim(),
        city: city.trim(),
        location: `${venue.trim() || city.trim()}, ${country.trim()}`,
        venue: venue.trim(),
        registrationDeadline: registrationDeadline || undefined,
        abstractDeadline: abstractDeadline || undefined,
        price: Number(price),
        status,
        featured,
        topics,
      })

      showSuccess(`Conference "${title}" updated successfully!`)
      navigate(ROUTES.adminConferences)
    } catch {
      showError('Failed to update conference. Please try again.')
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
          { label: 'Conferences', to: ROUTES.adminConferences },
          { label: 'Edit Conference' },
        ]}
      />

      <div className="az-admin-page__header">
        <div>
          <h1 className="az-admin-page__title">Edit Conference</h1>
          <p className="az-admin-page__subtitle">
            Update {conference?.title} details, schedule parameters, and publishing state.
          </p>
        </div>
        <div className="az-admin-page__header-actions">
          <Link to={ROUTES.adminConferences}>
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
            <p><strong>Please correct the following errors before submitting:</strong></p>
            <ul>
              {Object.values(errors).map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Section 1: Basic Information */}
        <section className="az-admin-form-section">
          <h2 className="az-admin-form-section__title">Basic Information</h2>
          <div className="az-admin-form-grid">
            <div className="az-grid-col-2">
              <Input
                label="Conference Title"
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
                label="Scientific Category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={CATEGORIES.map((c) => ({ label: c, value: c }))}
              />
            </div>

            <div className="az-grid-col-2">
              <Input
                label="Short Summary / Subtitle"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
              />
            </div>

            <div className="az-grid-col-2">
              <Textarea
                label="Full Conference Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={errors.description}
              />
            </div>

            <div className="az-grid-col-2">
              <Input
                label="Banner Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Section 2: Dates & Deadlines */}
        <section className="az-admin-form-section">
          <h2 className="az-admin-form-section__title">Dates & Timelines</h2>
          <div className="az-admin-form-grid">
            <div>
              <Input
                label="Start Date"
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                error={errors.startDate}
              />
            </div>

            <div>
              <Input
                label="End Date"
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                error={errors.endDate}
              />
            </div>

            <div>
              <Input
                label="Registration Deadline"
                type="date"
                value={registrationDeadline}
                onChange={(e) => setRegistrationDeadline(e.target.value)}
                error={errors.registrationDeadline}
              />
            </div>

            <div>
              <Input
                label="Abstract Submission Deadline"
                type="date"
                value={abstractDeadline}
                onChange={(e) => setAbstractDeadline(e.target.value)}
                error={errors.abstractDeadline}
              />
            </div>
          </div>
        </section>

        {/* Section 3: Location & Venue */}
        <section className="az-admin-form-section">
          <h2 className="az-admin-form-section__title">Location & Venue</h2>
          <div className="az-admin-form-grid">
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
                label="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                error={errors.city}
              />
            </div>

            <div className="az-grid-col-2">
              <Input
                label="Venue / Convention Centre Name"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Section 4: Pricing & Status */}
        <section className="az-admin-form-section">
          <h2 className="az-admin-form-section__title">Pricing, Status & Visibility</h2>
          <div className="az-admin-form-grid">
            <div>
              <Input
                label="Registration Fee"
                type="number"
                min="0"
                step="1"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                error={errors.price}
              />
            </div>

            <div>
              <Select
                label="Currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                options={CURRENCIES.map((cur) => ({ label: cur, value: cur }))}
              />
            </div>

            <div>
              <Select
                label="Publication Status"
                required
                value={status}
                onChange={(e) => setStatus(e.target.value as ConferenceStatus)}
                options={STATUSES}
              />
            </div>

            <div>
              <Input
                label="Key Scientific Topics"
                value={topicsText}
                onChange={(e) => setTopicsText(e.target.value)}
                placeholder="Comma separated topics"
              />
            </div>

            <div className="az-grid-col-2 az-form-checkbox-wrap">
              <Checkbox
                label="Feature on AZTech Home Page (Highlight as flagship summit)"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="az-admin-form__actions">
          <Link to={ROUTES.adminConferences}>
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
