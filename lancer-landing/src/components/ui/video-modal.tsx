'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden p-0">
        <div className="relative w-full h-full">
          <iframe
            src="https://www.youtube.com/embed/2B_q2alwPFA?autoplay=1"
            title="Lancer Demo Video"
            className="w-full h-[450px] md:h-[500px]"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
} 