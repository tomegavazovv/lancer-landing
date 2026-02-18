import { PlaybookDownloadView } from '@/sections/playbook/views';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download Your Playbook | Lancer',
  description:
    'Your Upwork Blueprint is ready. Download the PDF and discover the system used by top 1% freelancers to dominate Upwork.',
  alternates: { canonical: '/playbook-download' },
};

export default function PlaybookDownloadPage() {
  return <PlaybookDownloadView />;
}
