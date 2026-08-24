import { useState } from 'react';
import { Building2, MapPin, Check, ExternalLink, Navigation } from 'lucide-react';
import type { Conference, VenueDetails } from '../../../types/conference';

interface ConferenceVenueProps {
  conference: Conference;
}

export function ConferenceVenue({ conference }: ConferenceVenueProps) {
  const [showNotification, setShowNotification] = useState(false);

  const defaultVenue: VenueDetails = {
    name: conference.location || `${conference.city} International Convention Centre`,
    address: conference.venue || `Convention Boulevard, Sector 4, ${conference.city}`,
    city: conference.city,
    country: conference.country,
    postalCode: '500081',
    description: `A world-class convention center located conveniently in ${conference.city}, equipped with high-tech acoustic auditoriums, executive boardrooms, and seamless public transit accessibility.`,
    amenities: [
      'High-Speed Gigabit WiFi',
      'Dual 4K Laser Projection',
      'Simultaneous Translation Booths',
      'Executive Dining & Banquet Hall',
      'Dedicated On-Site Parking (1000+ slots)',
      '100% Wheelchair & ADA Accessible',
    ],
  };

  const venue = conference.venueDetails || defaultVenue;

  const handleViewLocation = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <section className="az-conf-section" aria-labelledby="conf-venue-heading">
      <div className="az-conf-section__header-row">
        <div className="az-conf-section__header-icon" aria-hidden="true">
          <Building2 size={22} />
        </div>
        <h2 id="conf-venue-heading" className="az-conf-section__title">
          Conference Venue & Location
        </h2>
      </div>

      <div className="az-venue-card">
        <div className="az-venue-card__body">
          <div className="az-venue-card__header">
            <div>
              <h3 className="az-venue-card__name">{venue.name}</h3>
              <p className="az-venue-card__address">
                <MapPin size={15} aria-hidden="true" style={{ color: 'var(--az-primary)', flexShrink: 0 }} />
                <span>
                  {venue.address}, {venue.city}, {venue.country} {venue.postalCode && `(${venue.postalCode})`}
                </span>
              </p>
            </div>

            <button
              type="button"
              className="az-button az-button--outline az-button--sm az-venue-card__btn"
              onClick={handleViewLocation}
            >
              <Navigation size={14} aria-hidden="true" />
              <span>View Location</span>
            </button>
          </div>

          {showNotification && (
            <div className="az-venue-toast" role="status">
              <ExternalLink size={14} />
              <span>Venue coordinates registered: {venue.city}, {venue.country}. Interactive map will open here.</span>
            </div>
          )}

          {venue.description && (
            <p className="az-body-sm az-venue-card__desc">{venue.description}</p>
          )}

          {venue.amenities && venue.amenities.length > 0 && (
            <div className="az-venue-card__amenities">
              <h4 className="az-venue-card__amenities-title">Facility Highlights & Amenities:</h4>
              <div className="az-venue-card__amenities-grid">
                {venue.amenities.map((amenity, idx) => (
                  <div key={idx} className="az-venue-amenity-item">
                    <Check size={14} className="az-venue-amenity-item__icon" aria-hidden="true" />
                    <span className="az-caption">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ConferenceVenue;
