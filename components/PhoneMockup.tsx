import Image from 'next/image';

interface PhoneMockupProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function PhoneMockup({ src, alt, width = 300, height = 650, className = '' }: PhoneMockupProps) {
  return (
    <div className={`relative ${className}`}>
      {/* iPhone frame */}
      <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10"></div>
        
        {/* Screen */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
