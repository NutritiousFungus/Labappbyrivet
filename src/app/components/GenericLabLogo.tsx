interface GenericLabLogoProps {
  className?: string;
  variant?: 'full' | 'icon';
  labId?: 'laboratory' | 'greenleaf' | 'terratech';
}

export function GenericLabLogo({ className = '', variant = 'full', labId = 'laboratory' }: GenericLabLogoProps) {
  if (variant === 'icon') {
    // Icon variants for each lab
    if (labId === 'greenleaf') {
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="20" fill="#059669"/>
          <path d="M50 25C50 25 35 35 35 50C35 57 40 62 45 63V75H55V63C60 62 65 57 65 50C65 35 50 25 50 25Z" fill="white"/>
          <path d="M48 25V75" stroke="#D1FAE5" strokeWidth="2" strokeLinecap="round"/>
          <path d="M35 45C35 45 28 48 28 55C28 58 30 60 32 61" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path d="M65 45C65 45 72 48 72 55C72 58 70 60 68 61" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
        </svg>
      );
    } else if (labId === 'terratech') {
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="20" fill="#92400E"/>
          <circle cx="50" cy="45" r="22" fill="white"/>
          <path d="M35 45L40 38L45 42L50 35L55 40L60 37L65 42" stroke="#92400E" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="30" y="60" width="40" height="15" rx="2" fill="#FEF3C7"/>
          <line x1="35" y1="65" x2="40" y2="65" stroke="#92400E" strokeWidth="1.5"/>
          <line x1="45" y1="65" x2="50" y2="65" stroke="#92400E" strokeWidth="1.5"/>
          <line x1="55" y1="65" x2="60" y2="65" stroke="#92400E" strokeWidth="1.5"/>
        </svg>
      );
    } else {
      // Original laboratory icon
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="20" fill="#2563EB"/>
          <path d="M40 25H60V40L70 70C71 73 69 75 66 75H34C31 75 29 73 30 70L40 40V25Z" fill="white"/>
          <path d="M42 25H58V27H42V25Z" fill="#E0E7FF"/>
          <circle cx="45" cy="60" r="4" fill="#3B82F6" opacity="0.6"/>
          <circle cx="55" cy="65" r="3" fill="#60A5FA" opacity="0.6"/>
          <circle cx="50" cy="55" r="2" fill="#93C5FD" opacity="0.6"/>
        </svg>
      );
    }
  }

  // Full logo variants
  if (labId === 'greenleaf') {
    return (
      <svg className={className} viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Leaf Icon */}
        <g transform="translate(10, 10)">
          <rect width="80" height="80" rx="16" fill="#059669"/>
          <path d="M40 15C40 15 22 27 22 45C22 54 28 60 34 62V75H46V62C52 60 58 54 58 45C58 27 40 15 40 15Z" fill="white"/>
          <path d="M38 15V75" stroke="#D1FAE5" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M22 38C22 38 13 42 13 50C13 54 16 57 19 58" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          <path d="M58 38C58 38 67 42 67 50C67 54 64 57 61 58" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        </g>
        
        {/* Text */}
        <text x="105" y="45" fontFamily="system-ui, -apple-system, sans-serif" fontSize="32" fontWeight="700" fill="white">
          GreenLeaf
        </text>
        <text x="105" y="72" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="500" fill="rgba(255, 255, 255, 0.8)">
          Agricultural Analytics
        </text>
      </svg>
    );
  } else if (labId === 'terratech') {
    return (
      <svg className={className} viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Earth/Soil Icon */}
        <g transform="translate(10, 10)">
          <rect width="80" height="80" rx="16" fill="#92400E"/>
          <circle cx="40" cy="35" r="18" fill="white"/>
          <path d="M25 35L31 27L37 32L43 24L49 30L55 26L61 32" stroke="#92400E" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="20" y="50" width="40" height="15" rx="2" fill="#FEF3C7"/>
          <line x1="26" y1="56" x2="32" y2="56" stroke="#92400E" strokeWidth="1.8"/>
          <line x1="37" y1="56" x2="43" y2="56" stroke="#92400E" strokeWidth="1.8"/>
          <line x1="48" y1="56" x2="54" y2="56" stroke="#92400E" strokeWidth="1.8"/>
        </g>
        
        {/* Text */}
        <text x="105" y="45" fontFamily="system-ui, -apple-system, sans-serif" fontSize="32" fontWeight="700" fill="white">
          TerraTech
        </text>
        <text x="105" y="72" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="500" fill="rgba(255, 255, 255, 0.8)">
          Soil Science Labs
        </text>
      </svg>
    );
  } else {
    // Original laboratory logo - modernized design
    return (
      <svg className={className} viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Modern icon container with gradient */}
        <g transform="translate(10, 10)">
          <defs>
            <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#2563EB', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="flaskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#E0E7FF', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          
          {/* Rounded square background */}
          <rect width="80" height="80" rx="18" fill="url(#iconGrad)"/>
          
          {/* Modern flask design */}
          <path d="M32 20H48V34L56 56C56.5 59 55 61 53 61H27C25 61 23.5 59 24 56L32 34V20Z" fill="url(#flaskGrad)"/>
          <rect x="32" y="18" width="16" height="4" rx="1" fill="#DBEAFE"/>
          
          {/* Liquid bubbles with better positioning */}
          <circle cx="36" cy="47" r="3" fill="#60A5FA" opacity="0.8"/>
          <circle cx="44" cy="51" r="2.5" fill="#93C5FD" opacity="0.8"/>
          <circle cx="40" cy="43" r="2" fill="#BFDBFE" opacity="0.8"/>
          <circle cx="47" cy="46" r="1.5" fill="#DBEAFE" opacity="0.8"/>
          
          {/* Shine effect */}
          <path d="M34 25L36 30L34 35" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        </g>
        
        {/* Modern text styling */}
        <text x="105" y="48" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif" fontSize="36" fontWeight="700" fill="white" letterSpacing="-0.5">
          AgriLab
        </text>
        <text x="105" y="73" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif" fontSize="16" fontWeight="500" fill="rgba(255, 255, 255, 0.85)" letterSpacing="0.5">
          ANALYTICAL SERVICES
        </text>
      </svg>
    );
  }
}