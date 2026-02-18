import { PlaybookFormView } from '@/sections/playbook/views';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Top 1% Upwork Blueprint | Lancer',
  description:
    'Download the free playbook used by 150+ freelancers and agencies to rank higher, get more invites, and close high-value clients on Upwork.',
  alternates: { canonical: '/upwork-playbook' },
};

export default function PlaybookPage() {
  return <PlaybookFormView />;
}
