import { useState } from 'react';
import { Bed, Star, MapPin, Plane, Train, Bus } from 'lucide-react';
import type { AccommodationInfo, Conference } from '../../../types/conference';

interface AccommodationSectionProps {
  conference: Conference;
}

export function AccommodationSection({ conference }: AccommodationSectionProps) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const defaultHotels: AccommodationInfo[] = [
    {
      id: 'acc-1',
      name: `${conference.city} Grand Luxury Hotel & Suites`,
      rating: 5,
      distance: '0.3 km from venue (Adjacent)',
      pricePerNight: '$140 / night',
      address: `100 Convention Way, ${conference.city}, ${conference.country}`,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'acc-2',
      name: `Novotel & Suites ${conference.city} Center`,
      rating: 4,
      distance: '1.2 km from venue',
      pricePerNight: '$95 / night',
      address: `45 City Center Avenue, ${conference.city}, ${conference.country}`,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'acc-3',
      name: `City View Premier Inn & Residencies`,
      rating: 4,
      distance: '2.5 km from venue',
      pricePerNight: '$65 / night',
      address: `12 Metro Station Road, ${conference.city}, ${conference.country}`,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const hotels = conference.accommodation && conference.accommodation.length > 0
    ? conference.accommodation
    : defaultHotels;

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="az-conf-section" aria-labelledby="conf-accommodation-heading">
      <div className="az-conf-section__header-row">
        <div className="az-conf-section__header-icon" aria-hidden="true">
          <Bed size={22} />
        </div>
        <h2 id="conf-accommodation-heading" className="az-conf-section__title">
          Accommodation & Travel Logistics
        </h2>
      </div>

      <p className="az-body-sm" style={{ color: 'var(--az-muted)', marginBottom: 'var(--az-space-6)' }}>
        Special discounted delegate tariffs have been negotiated with official partner hotels near the convention center.
      </p>

      {/* Hotel Cards Grid */}
      <div className="az-hotels-grid">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="az-hotel-card">
            <div className="az-hotel-card__img-wrap">
              {hotel.image && !imageErrors[hotel.id] ? (
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="az-hotel-card__img"
                  loading="lazy"
                  onError={() => handleImageError(hotel.id)}
                />
              ) : (
                <div className="az-hotel-card__img-fallback" aria-hidden="true">
                  <Bed size={32} />
                </div>
              )}
              {hotel.rating && (
                <div className="az-hotel-card__rating">
                  <Star size={13} fill="#ffbd2e" color="#ffbd2e" aria-hidden="true" />
                  <span>{hotel.rating}.0 Star</span>
                </div>
              )}
            </div>

            <div className="az-hotel-card__body">
              <h3 className="az-hotel-card__name">{hotel.name}</h3>
              <p className="az-caption az-hotel-card__distance">
                <MapPin size={13} aria-hidden="true" style={{ color: 'var(--az-primary)' }} />
                <span>{hotel.distance}</span>
              </p>
              <p className="az-caption az-hotel-card__address">{hotel.address}</p>

              <div className="az-hotel-card__footer">
                <span className="az-hotel-card__price">{hotel.pricePerNight}</span>
                <span className="az-badge az-badge--success az-badge--sm">Delegate Tariff</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Travel Guidelines Banner */}
      <div className="az-travel-tips">
        <h4 className="az-travel-tips__title">Travel Guidelines for {conference.city}:</h4>
        <div className="az-travel-tips__grid">
          <div className="az-travel-tip-item">
            <Plane size={18} className="az-travel-tip-item__icon" aria-hidden="true" />
            <div>
              <strong>Airport Connectivity</strong>
              <p className="az-caption">
                Direct international flights into {conference.city} International Airport, ~25 mins from venue.
              </p>
            </div>
          </div>

          <div className="az-travel-tip-item">
            <Train size={18} className="az-travel-tip-item__icon" aria-hidden="true" />
            <div>
              <strong>Metro & Rail Transit</strong>
              <p className="az-caption">
                The convention center is connected via express metro and direct light rail transit lines.
              </p>
            </div>
          </div>

          <div className="az-travel-tip-item">
            <Bus size={18} className="az-travel-tip-item__icon" aria-hidden="true" />
            <div>
              <strong>Shuttle Transfers</strong>
              <p className="az-caption">
                Complimentary morning and evening shuttle transfers operate between partner hotels and the venue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccommodationSection;
