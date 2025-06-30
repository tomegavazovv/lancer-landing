'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CalendlyEmbed from './calendly-embed';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CalendlyModal({ isOpen, onClose }: CalendlyModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-semibold">
            Book a Demo with Lancer Specialist
          </DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <CalendlyEmbed
            url="https://calendly.com/ivan-mvp/lancer-1-1-demo-call"
            minimal={true}
            height={600}
            backgroundColor="ffffff"
            primaryColor="3b82f6"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
} 