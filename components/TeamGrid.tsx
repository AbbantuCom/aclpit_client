import Link from 'next/link';
import Img from './Img';
import type { TeamMember } from '@/types';

interface Props {
  members: TeamMember[];
}

/**
 * The team cards, in the order the array arrives — callers sort by `order`, which
 * is the hierarchy set by dragging rows in the admin panel.
 *
 * Each card is the person's photograph with their name, position and a link to
 * their biography laid over it. The biography itself lives on its own page, so
 * card height never depends on how much anyone has written.
 */
export default function TeamGrid({ members }: Props) {
  if (members.length === 0) return null;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {members.map((member) => (
        <Link
          key={member.id}
          href={`/team/${member.id}`}
          aria-label={`Read ${member.name}'s biography`}
          className="team-tile reveal focus:outline-none focus-visible:ring-2 focus-visible:ring-wine focus-visible:ring-offset-2"
        >
          <Img src={member.image} alt={member.name} />
          <div className="team-scrim" aria-hidden="true" />
          <div className="team-caption">
            <h3>{member.name}</h3>
            {member.title && <span className="team-role">{member.title}</span>}
            <span className="team-bio-link">Bio</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
