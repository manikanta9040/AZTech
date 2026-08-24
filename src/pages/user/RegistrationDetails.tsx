import { Link, useParams } from 'react-router-dom'
import { Button } from '../../components/common/Button'
import { Card, CardContent } from '../../components/common/Card'
import { mockConferences } from '../../data/conferences'
import { mockRegistrations } from '../../data/registrations'
import { useAuth } from '../../hooks/useAuth'
export default function RegistrationDetails() { const { id } = useParams(); const { user } = useAuth(); const item = mockRegistrations.find((registration) => registration.id === id && registration.userId === user?.id); if (!item) return <p>Registration not found.</p>; const conference = mockConferences.find((entry) => entry.id === item.conferenceId); return <><section className="az-user-page__intro"><p className="az-auth__eyebrow">Registration details</p><h2>{item.id}</h2></section><Card><CardContent className="az-details">{[['Conference', conference?.title], ['Participant', user?.name], ['Registration Type', item.registrationType], ['Amount', `$${item.amount}`], ['Payment Status', item.paymentStatus], ['Registration Date', item.registeredAt], ['Status', item.status]].map(([key, value]) => <p key={key}><strong>{key}</strong><span>{value}</span></p>)}<Link to={`/conferences/${conference?.slug}`}><Button>View Conference</Button></Link></CardContent></Card></> }
