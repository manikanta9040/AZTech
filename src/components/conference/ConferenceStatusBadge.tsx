import { Badge } from '../common/Badge';
import type { ConferenceStatus } from '../../types/conference';

interface ConferenceStatusBadgeProps {
  status: ConferenceStatus | string;
  className?: string;
}

export function ConferenceStatusBadge({ status }: ConferenceStatusBadgeProps) {
  const normalized = status.toLowerCase().replace('-', '_');

  switch (normalized) {
    case 'registration_open':
    case 'open':
      return <Badge variant="success">Registration Open</Badge>;
    case 'closing_soon':
      return <Badge variant="warning">Closing Soon</Badge>;
    case 'call_for_papers':
      return <Badge variant="warning">Call For Papers</Badge>;
    case 'upcoming':
      return <Badge variant="info">Upcoming</Badge>;
    case 'ongoing':
      return <Badge variant="primary">In Session</Badge>;
    case 'completed':
    case 'closed':
      return <Badge variant="neutral">Concluded</Badge>;
    default:
      return <Badge variant="neutral">{status}</Badge>;
  }
}

export default ConferenceStatusBadge;
