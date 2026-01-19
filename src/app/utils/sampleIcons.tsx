import React from 'react';
import { Wheat, Sprout, ShoppingBag, Leaf, Package } from 'lucide-react';

export function getSampleTypeIcon(sampleType: string, testingMode: 'feeds' | 'soil', darkMode: boolean) {
  // For soil mode, don't show any icon
  if (testingMode === 'soil') {
    return null;
  }
  
  // Return placeholder image with blue color for all types
  let Icon = Wheat;
  
  switch (sampleType) {
    case 'Corn Silage':
      Icon = Wheat;
      break;
    case 'Hay/Haylage':
      Icon = Sprout;
      break;
    case 'TMR':
      Icon = Sprout;
      break;
    case 'Grains/Commodities':
      Icon = ShoppingBag;
      break;
    case 'Field/Pasture':
      Icon = Wheat;
      break;
    case 'Garden/Lawn':
      Icon = Leaf;
      break;
    case 'Commercial':
      Icon = Package;
      break;
    default:
      Icon = Wheat;
  }
  
  return (
    <div className={`size-12 flex items-center justify-center flex-shrink-0`}>
      <Icon className={`size-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} strokeWidth={1.5} />
    </div>
  );
}

export function getSampleTypeSmallIcon(sampleType: string, testingMode: 'feeds' | 'soil' = 'feeds') {
  const iconClass = `size-3 text-yellow-500`;
  switch (sampleType) {
    case 'Corn Silage':
      return <Wheat className={iconClass} />;
    case 'Hay/Haylage':
      return <Sprout className={iconClass} />;
    case 'TMR':
      return <Sprout className={iconClass} />;
    case 'Grains/Commodities':
      return <ShoppingBag className={iconClass} />;
    case 'Field/Pasture':
    case 'Garden/Lawn':
    case 'Commercial':
      // No icon for soil samples usually, but if called, return null or default
      return null;
    default:
      return <Wheat className={iconClass} />;
  }
}
