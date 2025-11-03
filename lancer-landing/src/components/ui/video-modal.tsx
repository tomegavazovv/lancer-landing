'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string; // Optional YouTube URL, defaults to hero video
  title?: string; // Optional title for the video
}

export function VideoModal({ isOpen, onClose, videoUrl, title }: VideoModalProps) {
  // Default to hero video if no URL provided
  const defaultVideoUrl = "https://www.youtube.com/embed/2B_q2alwPFA?autoplay=1";
  
  // Convert YouTube URL to embed format with autoplay
  const getEmbedUrl = (url: string) => {
    // Extract video ID from various YouTube URL formats
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    return url; // Fallback to original URL
  };

  const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : defaultVideoUrl;
  const videoTitle = title || "Lancer Demo Video";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden p-0">
        <div className="relative w-full h-full">
          <iframe
            src={embedUrl}
            title={videoTitle}
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