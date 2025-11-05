import Image from 'next/image';
import { ContentBlock } from '../types';

interface CaseStudyContentProps {
  blocks: ContentBlock[];
}

export function CaseStudyContent({ blocks }: CaseStudyContentProps) {
  return (
    <section className='py-12'>
      <div className='mx-auto max-w-4xl px-6'>
        <div className='prose prose-lg max-w-none dark:prose-invert prose-headings:text-white prose-p:text-white/80 prose-a:text-white prose-strong:text-white prose-ul:text-white/80 prose-ol:text-white/80'>
          <div className='space-y-8 text-base leading-relaxed'>
            {blocks.map((block, index) => (
              <ContentBlockComponent key={index} block={block} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContentBlockComponent({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'heading':
      const level = block.level || 2;
      const headingClass = `${
        level === 1
          ? 'text-3xl md:text-4xl'
          : level === 3
          ? 'text-xl md:text-2xl'
          : 'text-2xl md:text-3xl'
      } font-bold text-white mt-12 mb-6`;

      if (level === 1) {
        return <h1 className={headingClass}>{block.heading}</h1>;
      } else if (level === 3) {
        return <h3 className={headingClass}>{block.heading}</h3>;
      } else {
        return <h2 className={headingClass}>{block.heading}</h2>;
      }

    case 'paragraph':
      // Check if content contains URLs and render them as links
      const renderContent = () => {
        if (!block.content) return null;
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = block.content.split(urlRegex);

        return (
          <>
            {parts.map((part, index) => {
              if (part.match(urlRegex)) {
                return (
                  <a
                    key={index}
                    href={part}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-400 hover:text-blue-300 underline'
                  >
                    {part}
                  </a>
                );
              }
              return part;
            })}
          </>
        );
      };

      return (
        <p
          className={`text-white/80 ${
            block.heading ? 'text-2xl font-bold' : ''
          }`}
        >
          {renderContent()}
        </p>
      );

    case 'image':
      if (!block.image) return null;
      const imageElement = (
        <Image
          src={block.image.src}
          alt={block.image.alt}
          width={block.image.width || 1000}
          height={block.image.height || 1000}
          className='rounded-lg'
        />
      );

      if (block.image.inContainer) {
        return (
          <div className='bg-white/5 rounded-xl p-6 border border-white/10 mt-4'>
            {imageElement}
          </div>
        );
      }

      return (
        <div className='space-y-3'>
          {block.image.caption && (
            <p className='text-white/60 text-sm italic'>
              {block.image.caption}
            </p>
          )}
          {imageElement}
        </div>
      );

    case 'list':
      return (
        <ul className='list-disc list-inside space-y-2 text-white/90 ml-4 mt-2'>
          {block.listItems?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );

    case 'breakdown':
      return (
        <div className='bg-white/5 rounded-xl p-6 border border-white/10 mt-4'>
          {block.breakdownItems?.map((item, index) => (
            <div
              key={index}
              className='flex justify-between items-center py-2 border-b border-white/10 last:border-0'
            >
              <span className='text-white/80'>{item.label}</span>
              <span className='text-white font-semibold'>{item.value}</span>
            </div>
          ))}
        </div>
      );

    case 'tip':
      return (
        <div className='bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl p-6 md:p-8 border border-blue-500/30 my-6'>
          {block.tipTitle && (
            <h3 className='text-xl font-bold text-white mb-3'>
              {block.tipTitle}
            </h3>
          )}
          {block.tipContent && (
            <p className='text-white/90'>{block.tipContent}</p>
          )}
        </div>
      );

    case 'video':
      if (!block.videoUrl) return null;
      return (
        <div className='my-8'>
          <div className='relative aspect-video w-full overflow-hidden rounded-lg'>
            <iframe
              src={block.videoUrl}
              title='Video player'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              className='absolute inset-0 h-full w-full'
            />
          </div>
        </div>
      );

    case 'testimonial':
      if (!block.testimonial) return null;
      return (
        <div className='bg-white/5 rounded-xl p-6 md:p-8 border border-white/10 my-8'>
          <div className='space-y-4'>
            <p className='text-white/90 text-lg italic leading-relaxed'>
              "{block.testimonial.quote}"
            </p>
            <div className='pt-4 border-t border-white/10'>
              <p className='text-white font-semibold'>
                {block.testimonial.author}
              </p>
              {block.testimonial.authorRole && (
                <p className='text-white/60 text-sm'>
                  {block.testimonial.authorRole}
                </p>
              )}
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
