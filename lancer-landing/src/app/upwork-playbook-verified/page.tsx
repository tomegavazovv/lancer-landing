import { PlaybookVerifiedView } from '@/sections/playbook/views';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Top 1% Upwork Blueprint | Lancer',
  description:
    'A practical system to rank higher, get more invites, and close high-value clients on Upwork consistently. Built from Lancer data across 200K+ proposals.',
  alternates: { canonical: '/upwork-playbook-verified' },
};

export default function PlaybookVerifiedPage() {
  return <PlaybookVerifiedView />;
}
