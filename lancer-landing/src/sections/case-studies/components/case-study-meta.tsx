interface CaseStudyMetaProps {
  publishedDate: string;
}

export function CaseStudyMeta({ publishedDate }: CaseStudyMetaProps) {
  return (
    <div className='pt-12 mt-12 border-t border-white/10'>
      <div className='space-y-4'>
        <div className='text-sm text-white/60'>
          Published on {publishedDate}
        </div>
      </div>
    </div>
  );
}

