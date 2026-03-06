import Image from 'next/image';

interface PhoneMockupProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function PhoneMockup({ src, alt, width = 340, height = 680, className = '' }: PhoneMockupProps) {
  return (
    <div className={`relative inline-block ${className}`} style={{ width: `${width}px` }}>
      {/* iPhone frame */}
      <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl" style={{ aspectRatio: '9/19.5' }}>
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[22px] bg-gray-900 rounded-b-3xl z-10"></div>
        
        {/* Screen */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white h-full">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
