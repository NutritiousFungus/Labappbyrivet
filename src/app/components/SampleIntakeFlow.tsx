import React, { useState, useEffect } from 'react';
import { X, Leaf, Beef, Sprout, MoreHorizontal, CheckCircle2, Circle, Sparkles, Star, Copy, Trash2, Plus, AlertTriangle, Barcode, Zap, Target, TrendingUp, MessageCircle, ChevronDown, ChevronUp, Mail, MapPin, Truck, Package, Droplets, Edit3, Check, Beaker, ScanBarcode, ShoppingBag, Wheat, Info, Award, Trophy, Medal, Camera, Clock, Calendar, ArrowLeft, User } from 'lucide-react';
import { Project } from '@/app/types';
import logoImage from 'figma:asset/70a773257adca7df2225bb5f63c4e668abae4133.png';

interface SampleIntakeFlowProps {
  onClose: () => void;
  darkMode?: boolean;
  onSubmit?: (samples: Sample[]) => void;
  userFarms?: string[];
  testingMode?: 'feeds' | 'soil';
  availableProjects?: Project[];
  onProjectAssign?: (sampleId: string, projectId: string | null) => void;
  onShowDropboxMap?: () => void;
  onShowCustomPackages?: () => void;
  customPackages?: Array<{
    id: string;
    name: string;
    analytes: string[];
    createdAt: Date;
  }>;
  headerTheme?: 'blue' | 'grey';
}

type Category = 'corn-silage' | 'alfalfa' | 'hay-haylage' | 'tmr' | 'corn-grain' | 'grains-commodities' | 'water' | 'fecal' | 'misc-other' | 'field-pasture' | 'garden-lawn' | 'commercial' | null;
type Package = 'standard' | 'nutritionist' | 'premium' | 'water-basic' | 'water-complete' | 'fecal-basic' | 'fecal-complete' | 'soil-basic' | 'soil-standard' | 'soil-complete' | null;

interface Sample {
  id: string;
  category: Category;
  categoryName: string;
  package: Package;
  packageName: string;
  miscType?: string;
  sampleName: string;
  farm: string;
  addOns: string[];
  projectIds?: string[]; // Changed to array for multiple projects
}

export function SampleIntakeFlow({ onClose, darkMode, onSubmit, userFarms = ['Standard Dairy Consultants', 'Friendly Illinois Brothers', 'Goeser\'s Grazers'], testingMode = 'feeds', availableProjects = [], onProjectAssign, onShowDropboxMap, onShowCustomPackages, customPackages = [], headerTheme = 'blue' }: SampleIntakeFlowProps) {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package>(null);
  const [selectedCustomPackage, setSelectedCustomPackage] = useState<{
    id: string;
    name: string;
    analytes: string[];
    createdAt: Date;
  } | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [miscType, setMiscType] = useState('');
  const [sampleName, setSampleName] = useState('');
  const [selectedFarm, setSelectedFarm] = useState(userFarms[0]);
  const [samples, setSamples] = useState<Sample[]>([]);
  const [showTestOptions, setShowTestOptions] = useState(false);
  const [expandedPackage, setExpandedPackage] = useState<Package | null>(null);
  const [editingSampleId, setEditingSampleId] = useState<string | null>(null);
  const [selectedLab, setSelectedLab] = useState('watertown');
  const [showAdvancedAddons, setShowAdvancedAddons] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [localCustomPackages, setLocalCustomPackages] = useState(customPackages);
  const [isHeaderMinimized, setIsHeaderMinimized] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [generatedSampleIds, setGeneratedSampleIds] = useState<string[]>([]);
  const [showRecreatePreviousModal, setShowRecreatePreviousModal] = useState(false);
  const [showRecreateButton, setShowRecreateButton] = useState(true);

  // Scroll listener for hiding header on scroll down - DISABLED to prevent jitter
  useEffect(() => {
    // Disabled to prevent jittery behavior when scrolling
  }, []);

  // Helper component for info tooltip to avoid button nesting
  const InfoTooltip = ({ tests }: { tests: string[] }) => (
    <div className="relative group">
      <span
        className="inline-block p-1 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
      >
        <Info className="size-3.5 text-stone-500" />
      </span>
      <div className="absolute left-0 top-full mt-2 hidden group-hover:block z-[100] bg-white border-2 border-stone-300 shadow-xl rounded-lg p-3 min-w-[220px]">
        <div className="text-xs text-stone-600 space-y-0.5">
          {tests.map((test, idx) => (
            <div key={idx}>• {test}</div>
          ))}
        </div>
        <div className="absolute bottom-full left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-b-white border-l-transparent border-r-transparent"></div>
      </div>
    </div>
  );

  const labLocations = {
    watertown: {
      name: 'Watertown, WI',
      address: 'Laboratory Facility\n710 Commerce Dr\nWatertown, WI 53094',
    },
    binghamton: {
      name: 'Binghamton, NY',
      address: 'Laboratory Facility\\n123 Main Street\\nBinghamton, NY 13901',
    },
    colby: {
      name: 'Colby, WI',
      address: 'Laboratory Facility\\n456 Farm Road\\nColby, WI 54421',
    },
    siouxfalls: {
      name: 'Sioux Falls, SD',
      address: 'Laboratory Facility\n123 Prairie Ave\nSioux Falls, SD 57104',
    },
    newyork: {
      name: 'New York Lab',
      address: 'Laboratory Facility\n456 Valley Rd\nSyracuse, NY 13201',
    },
    ohio: {
      name: 'Ohio Lab',
      address: 'Laboratory Facility\n789 Farm Blvd\nColumbus, OH 43215',
    },
    visalia: {
      name: 'Visalia, CA',
      address: 'Laboratory Facility\n321 Orchard St\nVisalia, CA 93291',
    },
    wooster: {
      name: 'Wooster, OH',
      address: 'Laboratory Facility\\n567 County Road\\nWooster, OH 44691',
    },
    edmondson: {
      name: 'Edmondson, TX',
      address: 'Laboratory Facility\\n890 Ranch Drive\\nEdmondson, TX 79032',
    },
    marne: {
      name: 'Marne, MI',
      address: 'Laboratory Facility\\n234 Lake Street\\nMarne, MI 49435',
    },
    nampa: {
      name: 'Nampa, ID',
      address: 'Laboratory Facility\\n678 Valley Road\\nNampa, ID 83651',
    },
    manheim: {
      name: 'Manheim, PA',
      address: 'Laboratory Facility\\n345 Lancaster Pike\\nManheim, PA 17545',
    },
  };

  const categories = [
    {
      id: 'corn-silage' as const,
      name: 'Corn Silage',
      icon: Wheat,
      color: darkMode ? 'bg-[#411900]/40 border-[#3A3A3A] hover:border-[#411900]' : 'bg-amber-50/30 border-stone-200 hover:border-amber-300',
      selectedColor: darkMode ? 'border-amber-600 bg-[#411900]/60' : 'border-amber-500 bg-amber-50',
      iconColor: darkMode ? 'text-amber-500' : 'text-amber-600',
    },
    {
      id: 'alfalfa' as const,
      name: 'Alfalfa',
      icon: Leaf,
      color: darkMode ? 'bg-emerald-950/40 border-[#3A3A3A] hover:border-emerald-800' : 'bg-emerald-50/30 border-stone-200 hover:border-emerald-300',
      selectedColor: darkMode ? 'border-emerald-600 bg-emerald-950/60' : 'border-emerald-600 bg-emerald-50',
      iconColor: darkMode ? 'text-emerald-500' : 'text-emerald-600',
    },
    {
      id: 'hay-haylage' as const,
      name: 'Hay/Straw',
      icon: Sprout,
      color: darkMode ? 'bg-yellow-950/40 border-[#3A3A3A] hover:border-yellow-800' : 'bg-yellow-50/30 border-stone-200 hover:border-yellow-300',
      selectedColor: darkMode ? 'border-yellow-600 bg-yellow-950/60' : 'border-yellow-600 bg-yellow-50',
      iconColor: darkMode ? 'text-yellow-500' : 'text-yellow-700',
    },
    {
      id: 'tmr' as const,
      name: 'TMR',
      icon: Sprout,
      color: darkMode ? 'bg-orange-950/40 border-[#3A3A3A] hover:border-orange-800' : 'bg-orange-50/30 border-stone-200 hover:border-orange-300',
      selectedColor: darkMode ? 'border-orange-600 bg-orange-950/60' : 'border-orange-600 bg-orange-50',
      iconColor: darkMode ? 'text-orange-500' : 'text-orange-700',
    },
    {
      id: 'corn-grain' as const,
      name: 'Corn Grain',
      icon: Circle,
      color: darkMode ? 'bg-[#411900]/40 border-[#3A3A3A] hover:border-[#411900]' : 'bg-amber-50/30 border-stone-200 hover:border-amber-300',
      selectedColor: darkMode ? 'border-amber-600 bg-[#411900]/60' : 'border-amber-600 bg-amber-50',
      iconColor: darkMode ? 'text-amber-500' : 'text-amber-700',
    },
    {
      id: 'grains-commodities' as const,
      name: 'Other Grains',
      icon: ShoppingBag,
      color: darkMode ? 'bg-[#411900]/40 border-[#3A3A3A] hover:border-[#411900]' : 'bg-amber-50/30 border-stone-200 hover:border-amber-300',
      selectedColor: darkMode ? 'border-amber-600 bg-[#411900]/60' : 'border-amber-500 bg-amber-50',
      iconColor: darkMode ? 'text-amber-500' : 'text-amber-600',
    },
    {
      id: 'water' as const,
      name: 'Water',
      icon: Droplets,
      color: darkMode ? 'bg-blue-950/40 border-[#3A3A3A] hover:border-blue-800' : 'bg-blue-50/30 border-stone-200 hover:border-blue-300',
      selectedColor: darkMode ? 'border-blue-600 bg-blue-950/60' : 'border-blue-600 bg-blue-50',
      iconColor: darkMode ? 'text-blue-400' : 'text-blue-600',
    },
    {
      id: 'fecal' as const,
      name: 'Fecal',
      icon: Beaker,
      color: darkMode ? 'bg-slate-950/40 border-[#3A3A3A] hover:border-slate-800' : 'bg-slate-50/30 border-stone-200 hover:border-slate-300',
      selectedColor: darkMode ? 'border-slate-500 bg-slate-950/60' : 'border-slate-600 bg-slate-50',
      iconColor: darkMode ? 'text-slate-400' : 'text-slate-600',
    },
    {
      id: 'misc-other' as const,
      name: 'Misc/Other',
      icon: MoreHorizontal,
      color: darkMode ? 'bg-gray-950/40 border-[#3A3A3A] hover:border-gray-700' : 'bg-gray-50/30 border-stone-200 hover:border-gray-300',
      selectedColor: darkMode ? 'border-gray-500 bg-gray-900/60' : 'border-gray-600 bg-gray-50',
      iconColor: darkMode ? 'text-gray-400' : 'text-gray-600',
    },
  ];

  const soilCategories = [
    {
      id: 'field-pasture' as const,
      name: 'Field/Pasture',
      icon: Sprout,
      color: darkMode ? 'bg-[#411900]/40 border-[#3A3A3A] hover:border-[#411900]' : 'bg-amber-50/30 border-stone-200 hover:border-amber-300',
      selectedColor: darkMode ? 'border-amber-600 bg-[#411900]/60' : 'border-amber-500 bg-amber-50',
      iconColor: darkMode ? 'text-amber-500' : 'text-amber-600',
    },
    {
      id: 'garden-lawn' as const,
      name: 'Garden/Lawn',
      icon: Sprout,
      color: darkMode ? 'bg-emerald-950/40 border-[#3A3A3A] hover:border-emerald-800' : 'bg-emerald-50/30 border-stone-200 hover:border-emerald-300',
      selectedColor: darkMode ? 'border-emerald-600 bg-emerald-950/60' : 'border-emerald-600 bg-emerald-50',
      iconColor: darkMode ? 'text-emerald-500' : 'text-emerald-600',
    },
    {
      id: 'commercial' as const,
      name: 'Commercial',
      icon: Sprout,
      color: darkMode ? 'bg-slate-950/40 border-[#3A3A3A] hover:border-slate-800' : 'bg-slate-50/30 border-stone-200 hover:border-slate-300',
      selectedColor: darkMode ? 'border-slate-500 bg-slate-950/60' : 'border-slate-600 bg-slate-50',
      iconColor: darkMode ? 'text-slate-400' : 'text-slate-600',
    },
  ];

  const miscOptions = [
    'Slurry',
    'Silage Juice',
    'Wet Brewers Grain',
    'Distillers Grain',
    'Other Custom',
  ];

  const packages = [
    {
      id: 'premium' as const,
      name: 'Comprehensive',
      tier: 'Most Popular',
      price: '$43.50',
      description: 'Comprehensive analysis for precision feeding and research.',
      badge: Trophy,
      badgeColor: darkMode ? 'text-emerald-500' : 'text-emerald-600',
      popular: true,
      color: darkMode ? 'bg-emerald-900/30' : 'bg-emerald-50',
      borderColor: darkMode ? 'border-[#3A3A3A]' : 'border-emerald-200',
      hoverBorder: darkMode ? 'hover:border-emerald-700' : 'hover:border-emerald-300',
      selectedBorder: darkMode ? 'border-emerald-600' : 'border-emerald-600',
      iconColor: darkMode ? 'text-emerald-500' : 'text-emerald-600',
      baseTests: ['Dry Matter', 'Crude Protein', 'ADF', 'NDF', 'Starch', 'Ash', 'Fat'],
      extras: ['Sugar', 'NFC', 'NDFD30', 'NDFD48', 'uNDF240', 'Lignin', 'NDICP', 'ADICP', 'Soluble Protein', 'kd Rate']
    },
    {
      id: 'nutritionist' as const,
      name: 'NIR Select',
      tier: 'Professional',
      price: '$25.50',
      description: 'Ideal for ration balancing with advanced digestibility metrics.',
      badge: Award,
      badgeColor: darkMode ? 'text-amber-500' : 'text-amber-600',
      popular: false,
      color: darkMode ? 'bg-amber-900/30' : 'bg-amber-50',
      borderColor: darkMode ? 'border-[#3A3A3A]' : 'border-amber-200',
      hoverBorder: darkMode ? 'hover:border-amber-700' : 'hover:border-amber-300',
      selectedBorder: darkMode ? 'border-amber-600' : 'border-amber-600',
      iconColor: darkMode ? 'text-amber-500' : 'text-amber-600',
      baseTests: ['Dry Matter', 'Crude Protein', 'ADF', 'NDF', 'Starch', 'Ash', 'Fat'],
      extras: ['Sugar', 'NFC', 'NDFD30']
    },
    {
      id: 'standard' as const,
      name: 'Basic',
      tier: 'Essential',
      price: '$16.50',
      description: 'Core nutritional analysis for routine monitoring.',
      badge: Medal,
      badgeColor: darkMode ? 'text-slate-400' : 'text-slate-600',
      popular: false,
      color: darkMode ? 'bg-slate-900/40' : 'bg-slate-50',
      borderColor: darkMode ? 'border-[#3A3A3A]' : 'border-slate-200',
      hoverBorder: darkMode ? 'hover:border-slate-700' : 'hover:border-slate-300',
      selectedBorder: darkMode ? 'border-slate-500' : 'border-slate-600',
      iconColor: darkMode ? 'text-slate-400' : 'text-slate-600',
      baseTests: ['Dry Matter', 'Crude Protein', 'ADF', 'NDF', 'Starch', 'Ash', 'Fat'],
      extras: []
    },
  ];

  const waterPackages = [
    {
      id: 'water-basic' as const,
      name: 'Standard',
      tier: 'Essential',
      price: '$21.00',
      description: 'Standard water quality parameters for livestock.',
      badge: Droplets,
      badgeColor: 'text-blue-600',
      popular: false,
      color: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverBorder: 'hover:border-blue-300',
      selectedBorder: 'border-blue-600',
      iconColor: 'text-blue-600',
      baseTests: ['pH', 'TDS', 'Hardness', 'Nitrate', 'Sulfate', 'Iron'],
      extras: []
    },
    {
      id: 'water-complete' as const,
      name: 'Complete',
      tier: 'Premium',
      price: '$45.00',
      description: 'Comprehensive mineral and contaminant screening.',
      badge: Trophy,
      badgeColor: 'text-blue-700',
      popular: true,
      color: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverBorder: 'hover:border-blue-300',
      selectedBorder: 'border-blue-700',
      iconColor: 'text-blue-700',
      baseTests: ['pH', 'TDS', 'Hardness', 'Nitrate', 'Sulfate', 'Iron'],
      extras: ['Calcium', 'Magnesium', 'Sodium', 'Chloride', 'Copper', 'Zinc', 'Manganese', 'Bacteria Count']
    },
  ];

  const fecalPackages = [
    {
      id: 'fecal-basic' as const,
      name: 'Standard',
      tier: 'Essential',
      price: '$13.20',
      description: 'Core fecal nutrient evaluation.',
      badge: Medal,
      badgeColor: 'text-stone-600',
      popular: false,
      color: 'bg-stone-50',
      borderColor: 'border-stone-200',
      hoverBorder: 'hover:border-stone-300',
      selectedBorder: 'border-stone-600',
      iconColor: 'text-stone-600',
      baseTests: ['Dry Matter', 'pH', 'Starch', 'Nitrogen'],
      extras: []
    },
    {
      id: 'fecal-complete' as const,
      name: 'Complete',
      tier: 'Premium',
      price: '$27.00',
      description: 'Detailed digestive efficiency assessment.',
      badge: Trophy,
      badgeColor: 'text-purple-600',
      popular: true,
      color: 'bg-purple-50',
      borderColor: 'border-purple-200',
      hoverBorder: 'hover:border-purple-300',
      selectedBorder: 'border-purple-600',
      iconColor: 'text-purple-600',
      baseTests: ['Dry Matter', 'pH', 'Starch', 'Nitrogen'],
      extras: ['NDF', 'ADF', 'Ash', 'Phosphorus', 'Particle Size']
    },
  ];

  const soilPackages = [
    {
      id: 'soil-basic' as const,
      name: 'Basic',
      tier: 'Essential',
      price: '$18.00',
      description: 'Core soil nutrients for basic fertility monitoring.',
      badge: Medal,
      badgeColor: 'text-stone-600',
      popular: false,
      color: 'bg-stone-50',
      borderColor: 'border-stone-200',
      hoverBorder: 'hover:border-stone-300',
      selectedBorder: 'border-stone-600',
      iconColor: 'text-stone-600',
      baseTests: ['pH', 'Organic Matter', 'P (Phosphorus)', 'K (Potassium)'],
      extras: []
    },
    {
      id: 'soil-standard' as const,
      name: 'Standard',
      tier: 'Most Popular',
      price: '$28.50',
      description: 'Comprehensive nutrient profile for crop planning.',
      badge: Award,
      badgeColor: 'text-amber-600',
      popular: true,
      color: 'bg-amber-50',
      borderColor: 'border-amber-200',
      hoverBorder: 'hover:border-amber-300',
      selectedBorder: 'border-amber-600',
      iconColor: 'text-amber-600',
      baseTests: ['pH', 'Organic Matter', 'P (Phosphorus)', 'K (Potassium)'],
      extras: ['Ca (Calcium)', 'Mg (Magnesium)', 'CEC', 'Base Saturation']
    },
    {
      id: 'soil-complete' as const,
      name: 'Complete',
      tier: 'Premium',
      price: '$45.00',
      description: 'Full macro and micronutrient analysis for precision agriculture.',
      badge: Trophy,
      badgeColor: 'text-emerald-600',
      popular: false,
      color: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      hoverBorder: 'hover:border-emerald-300',
      selectedBorder: 'border-emerald-600',
      iconColor: 'text-emerald-600',
      baseTests: ['pH', 'Organic Matter', 'P (Phosphorus)', 'K (Potassium)'],
      extras: ['Ca (Calcium)', 'Mg (Magnesium)', 'CEC', 'Base Saturation', 'S (Sulfur)', 'Zn (Zinc)', 'Mn (Manganese)', 'Fe (Iron)', 'Cu (Copper)', 'B (Boron)', 'Na (Sodium)']
    },
  ];

  // Mineral add-ons
  const mineralAddOns = [
    {
      id: 'minerals',
      name: 'Mineral Panel',
      price: '$9',
      tests: ['Calcium', 'Phosphorus', 'Magnesium', 'Potassium', 'Sodium', 'Sulfur', 'Iron', 'Zinc', 'Copper', 'Manganese'],
      category: 'mineral' as const,
    },
    {
      id: 'dcad',
      name: 'DCAD Analysis',
      price: '$7',
      tests: ['Sodium', 'Potassium', 'Chloride', 'Sulfur'],
      category: 'mineral' as const,
    },
    {
      id: 'trace-minerals',
      name: 'Trace Minerals',
      price: '$8',
      tests: ['Cobalt', 'Molybdenum', 'Selenium', 'Iodine'],
      category: 'mineral' as const,
    },
    {
      id: 'heavy-metals',
      name: 'Heavy Metals',
      price: '$16',
      tests: ['Lead', 'Cadmium', 'Arsenic', 'Mercury'],
      category: 'mineral' as const,
    },
  ];

  // Hygiene add-ons
  const hygieneAddOns = [
    {
      id: 'yeast-mold',
      name: 'Yeast & Mold Count',
      price: '$15',
      tests: ['Yeast Count', 'Mold Count', 'Total Microbes'],
      category: 'hygiene' as const,
    },
    {
      id: 'fermentation',
      name: 'Fermentation Profile',
      price: '$13',
      tests: ['pH', 'Lactic Acid', 'Acetic Acid', 'Butyric Acid', 'NH3-N'],
      category: 'hygiene' as const,
    },
    {
      id: 'bacterial-count',
      name: 'Bacterial Count',
      price: '$12',
      tests: ['Total Bacteria', 'Coliform', 'E. coli'],
      category: 'hygiene' as const,
    },
    {
      id: 'storage-stability',
      name: 'Storage Stability',
      price: '$10',
      tests: ['Heating Score', 'Water Activity', 'Temperature Stability'],
      category: 'hygiene' as const,
    },
  ];

  // Toxin add-ons
  const toxinAddOns = [
    {
      id: 'mycotoxin',
      name: 'Mycotoxin Screen',
      price: '$27',
      tests: ['Aflatoxin', 'Vomitoxin', 'T-2 Toxin', 'Zearalenone'],
      category: 'toxin' as const,
    },
    {
      id: 'aflatoxin-only',
      name: 'Aflatoxin Only',
      price: '$14',
      tests: ['Aflatoxin B1', 'Aflatoxin B2', 'Aflatoxin G1', 'Aflatoxin G2'],
      category: 'toxin' as const,
    },
    {
      id: 'fumonisin',
      name: 'Fumonisin Test',
      price: '$18',
      tests: ['Fumonisin B1', 'Fumonisin B2', 'Total Fumonisins'],
      category: 'toxin' as const,
    },
    {
      id: 'ergot-alkaloids',
      name: 'Ergot Alkaloids',
      price: '$22',
      tests: ['Total Ergot Alkaloids', 'Ergovaline', 'Ergotamine'],
      category: 'toxin' as const,
    },
    {
      id: 'ochratoxin',
      name: 'Ochratoxin A',
      price: '$20',
      tests: ['Ochratoxin A', 'Total Ochratoxins'],
      category: 'toxin' as const,
    },
    {
      id: 'nitrate-prussic',
      name: 'Nitrate & Prussic Acid',
      price: '$16',
      tests: ['Nitrate-N', 'Nitrite-N', 'Prussic Acid'],
      category: 'toxin' as const,
    },
  ];

  // In Situ add-ons - Multiple hour options
  const inSituAddOns = [
    {
      id: 'insitu-24hr',
      name: 'In Situ 24-Hour',
      price: '$18',
      description: '24-hour NDF digestibility measurement',
      tests: ['24hr NDF Digestibility', 'uNDF24', 'kd Rate'],
      category: 'insitu' as const,
    },
    {
      id: 'insitu-30hr',
      name: 'In Situ 30-Hour',
      price: '$21',
      description: '30-hour NDF digestibility measurement',
      tests: ['30hr NDF Digestibility', 'uNDF30', 'kd Rate'],
      category: 'insitu' as const,
    },
    {
      id: 'insitu-48hr',
      name: 'In Situ 48-Hour',
      price: '$24',
      description: '48-hour NDF digestibility measurement',
      tests: ['48hr NDF Digestibility', 'uNDF48', 'kd Rate'],
      category: 'insitu' as const,
    },
    {
      id: 'insitu-120hr',
      name: 'In Situ 120-Hour',
      price: '$27',
      description: '120-hour (5-day) NDF digestibility measurement',
      tests: ['120hr NDF Digestibility', 'uNDF120', 'kd Rate'],
      category: 'insitu' as const,
    },
    {
      id: 'insitu-complete',
      name: 'Complete In Situ Panel',
      price: '$65',
      description: 'All time points for comprehensive digestibility profile',
      tests: ['24hr', '30hr', '48hr', '120hr', '240hr NDF Digestibility', 'uNDF240', 'kd Rate'],
      category: 'insitu' as const,
    },
  ];

  // Other add-ons
  const otherAddOns = [
    {
      id: 'starch-bypass',
      name: 'Starch Bypass',
      price: '$11',
      description: 'Rumen-protected starch analysis',
      tests: ['Total Starch', 'Rumen Degradable Starch', 'Bypass Starch'],
      category: 'other' as const,
    },
    {
      id: 'amino-acids',
      name: 'Amino Acid Profile',
      price: '$35',
      description: 'Complete amino acid composition',
      tests: ['Lysine', 'Methionine', 'Threonine', 'Leucine', 'Isoleucine', 'Valine', 'Arginine', 'Histidine'],
      category: 'other' as const,
    },
    {
      id: 'fatty-acids',
      name: 'Fatty Acid Profile',
      price: '$19',
      description: 'Detailed fat composition analysis',
      tests: ['C16:0', 'C18:0', 'C18:1', 'C18:2', 'C18:3', 'Total Saturated', 'Total Unsaturated'],
      category: 'other' as const,
    },
    {
      id: 'vitamin-e',
      name: 'Vitamin E Analysis',
      price: '$16',
      description: 'Antioxidant vitamin content',
      tests: ['Alpha-tocopherol', 'Total Vitamin E'],
      category: 'other' as const,
    },
    {
      id: 'carotene',
      name: 'Beta-Carotene',
      price: '$14',
      description: 'Vitamin A precursor',
      tests: ['Beta-Carotene', 'Total Carotenoids'],
      category: 'other' as const,
    },
    {
      id: 'particle-size',
      name: 'Particle Size',
      price: '$12',
      description: 'Physical analysis',
      tests: ['Penn State Separator', 'Effective Fiber', 'peNDF'],
      category: 'other' as const,
    },
    {
      id: 'sugar-profile',
      name: 'Sugar Profile',
      price: '$13',
      description: 'Carbohydrate fractionation',
      tests: ['WSC', 'ESC', 'NFC', 'NSC'],
      category: 'other' as const,
    },
    {
      id: 'buffer-capacity',
      name: 'Buffer Capacity',
      price: '$9',
      description: 'Rumen buffering potential',
      tests: ['DCAD', 'Buffering Capacity', 'Titratable Acidity'],
      category: 'other' as const,
    },
  ];

  // Combined list for reference in other parts of code
  const addOns = [...mineralAddOns, ...hygieneAddOns, ...toxinAddOns, ...inSituAddOns, ...otherAddOns];

  // Soil-specific add-ons
  const soilMicronutrientsAddOns = [
    {
      id: 'soil-micronutrients',
      name: 'Micronutrients Panel',
      price: '$12',
      description: 'Zinc, Manganese, Iron, Copper, Boron analysis',
      tests: ['Zn (Zinc)', 'Mn (Manganese)', 'Fe (Iron)', 'Cu (Copper)', 'B (Boron)'],
      category: 'soil-micronutrients' as const,
    },
  ];

  const soilHeavyMetalsAddOns = [
    {
      id: 'soil-heavy-metals',
      name: 'Heavy Metals Screen',
      price: '$18',
      description: 'Lead, Cadmium, Arsenic, Mercury testing',
      tests: ['Pb (Lead)', 'Cd (Cadmium)', 'As (Arsenic)', 'Hg (Mercury)'],
      category: 'soil-heavy-metals' as const,
    },
  ];

  const soilOrganicAddOns = [
    {
      id: 'soil-organic-matter',
      name: 'Organic Matter Analysis',
      price: '$15',
      description: 'Total organic carbon and organic matter content',
      tests: ['Organic Matter %', 'Total Organic Carbon', 'Active Carbon'],
      category: 'soil-organic' as const,
    },
    {
      id: 'soil-biology',
      name: 'Soil Biology',
      price: '$24',
      description: 'Microbial biomass and activity assessment',
      tests: ['Microbial Biomass', 'Respiration Rate', 'Active Bacteria Count'],
      category: 'soil-organic' as const,
    },
  ];

  const soilTextureAddOns = [
    {
      id: 'soil-texture',
      name: 'Texture Analysis',
      price: '$10',
      description: 'Sand, silt, and clay percentages',
      tests: ['% Sand', '% Silt', '% Clay', 'Soil Classification'],
      category: 'soil-texture' as const,
    },
  ];

  // Get the appropriate package list based on category
  const getPackagesForCategory = () => {
    // For soil mode, always return soil packages (no category needed)
    if (testingMode === 'soil') {
      return soilPackages;
    }
    
    if (selectedCategory === 'water') {
      return waterPackages;
    } else if (selectedCategory === 'fecal') {
      return fecalPackages;
    } else if (selectedCategory === 'field-pasture' || selectedCategory === 'garden-lawn' || selectedCategory === 'commercial') {
      return soilPackages;
    } else {
      return packages;
    }
  };

  const handleCategorySelect = (categoryId: Category) => {
    setSelectedCategory(categoryId);
    setSelectedPackage(null); // Reset package when changing category
    setShowTestOptions(true);
    if (categoryId !== 'misc-other') {
      setMiscType('');
    }
    // Scroll down smoothly to show test packages
    setTimeout(() => {
      const element = document.getElementById('test-packages-section');
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handlePackageSelect = (packageId: Package) => {
    setSelectedPackage(packageId);
    setSelectedCustomPackage(null); // Clear custom package if selecting standard package
    // Scroll to add-ons section after selecting package
    setTimeout(() => {
      const element = document.getElementById('add-ons-section');
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleCustomPackageSelect = (pkg: { id: string; name: string; analytes: string[]; createdAt: Date }) => {
    setSelectedCustomPackage(pkg);
    setSelectedPackage(null); // Clear standard package if selecting custom package
    // Scroll to add-ons section after selecting package
    setTimeout(() => {
      const element = document.getElementById('add-ons-section');
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev =>
      prev.includes(addOnId)
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handleContinueToReview = () => {
    // Allow continue if either a package is selected OR a custom package is selected OR if "addons-only" is selected with at least one add-on
    if (!selectedPackage && !selectedCustomPackage) return;
    if (selectedPackage === 'addons-only' && selectedAddOns.length === 0) return;

    // Create the first sample - use sampleType as default if no name provided
    // For soil mode, we don't use categories
    const allCategories = [...categories, ...soilCategories];
    const categoryName = allCategories.find(c => c.id === selectedCategory)?.name || '';
    const allPackages = [...packages, ...waterPackages, ...fecalPackages, ...soilPackages];
    
    // If custom package is selected, use it; otherwise use standard package
    const packageName = selectedCustomPackage 
      ? `Custom: ${selectedCustomPackage.name}`
      : allPackages.find(p => p.id === selectedPackage)?.name || (selectedPackage === 'addons-only' ? 'Wet Chem Only' : '');
    
    const finalCategoryName = testingMode === 'soil' ? 'Soil Sample' : (selectedCategory === 'misc-other' ? miscType : categoryName);
    const finalSampleName = sampleName.trim() || finalCategoryName;
    
    const newSample: Sample = {
      id: `temp-${Date.now()}`,
      category: testingMode === 'soil' ? 'soil' as any : selectedCategory,
      categoryName: finalCategoryName,
      package: selectedCustomPackage ? ('custom' as Package) : selectedPackage,
      packageName,
      miscType: selectedCategory === 'misc-other' ? miscType : undefined,
      sampleName: finalSampleName,
      farm: selectedFarm,
      addOns: selectedAddOns,
      projectIds: [], // Initialize with empty array
    };

    // Add to existing samples instead of replacing
    setSamples([...samples, newSample]);
    setEditingSampleId(null);
    setStep(2);
    
    // Scroll to top when moving to review
    setTimeout(() => {
      const mainContent = document.querySelector('main.overflow-y-auto');
      if (mainContent) {
        mainContent.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleDuplicate = () => {
    const lastSample = samples[samples.length - 1];
    const newSample: Sample = {
      ...lastSample,
      id: `temp-${Date.now()}-${Math.random()}`,
      sampleName: '', // Clear name for new sample
    };
    setSamples([...samples, newSample]);
  };

  const handleRemoveSample = (id: string) => {
    setSamples(samples.filter(s => s.id !== id));
  };

  const handleUpdateSampleName = (id: string, name: string) => {
    setSamples(samples.map(s => 
      s && s.id === id ? { ...s, sampleName: name } : s
    ));
  };

  const handleUpdateSampleFarm = (id: string, farm: string) => {
    setSamples(samples.map(s => 
      s && s.id === id ? { ...s, farm } : s
    ));
  };

  const handleToggleProjectForSample = (sampleId: string, projectId: string) => {
    setSamples(samples.map(s => {
      if (s.id === sampleId) {
        const currentProjects = s.projectIds || [];
        const isCurrentlySelected = currentProjects.includes(projectId);
        return {
          ...s,
          projectIds: isCurrentlySelected
            ? currentProjects.filter(id => id !== projectId)
            : [...currentProjects, projectId]
        };
      }
      return s;
    }));
  };

  const handleContinueToLabeling = () => {
    // Default empty sample names to category name
    setSamples(samples.map(s => ({
      ...s,
      sampleName: s.sampleName.trim() || s.categoryName
    })));
    
    setStep(3);
    // Scroll to top when arriving at step 3
    setTimeout(() => {
      const mainContent = document.querySelector('main.overflow-y-auto');
      if (mainContent) {
        mainContent.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    } else if (step === 4) {
      setStep(3);
    }
  };

  const handleEditSample = (sampleId: string) => {
    const sampleToEdit = samples.find(s => s.id === sampleId);
    if (sampleToEdit) {
      // Load sample data back into form
      setSelectedCategory(sampleToEdit.category);
      setSelectedPackage(sampleToEdit.package);
      setSelectedAddOns(sampleToEdit.addOns);
      setSampleName(sampleToEdit.sampleName);
      setSelectedFarm(sampleToEdit.farm);
      if (sampleToEdit.miscType) {
        setMiscType(sampleToEdit.miscType);
      }
      setShowTestOptions(true);
      setEditingSampleId(sampleId);
      
      // Remove this sample from the list temporarily
      setSamples(samples.filter(s => s.id !== sampleId));
      
      // Go back to step 1
      setStep(1);
    }
  };

  const handleAddAnotherSample = () => {
    // Reset the form completely for new sample
    setSelectedCategory(null);
    setSelectedPackage(null);
    setSelectedAddOns([]);
    setSampleName('');
    setMiscType('');
    setShowTestOptions(false);
    setExpandedPackage(null);
    setEditingSampleId(null);
    // Don't clear samples array - keep existing ones
    // Go back to step 1
    setStep(1);
  };

  const generateSampleId = () => {
    // Use characters that are visually distinct (no 0/O, 1/I, etc.)
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let id = '';
    for (let i = 0; i < 4; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  // Mock previous samples that can be recreated
  const previousSamples = [
    {
      id: '1',
      date: 'Jan 10, 2026',
      category: 'corn-silage' as Category,
      categoryName: 'Corn Silage',
      package: 'premium' as Package,
      packageName: 'Premium',
      sampleName: 'North Field Harvest 2025',
      farm: userFarms[0],
      addOns: ['Mycotoxin Screen'],
      numSamples: 3,
      samples: [
        { name: 'North Field A', type: 'Corn Silage' },
        { name: 'North Field B', type: 'Corn Silage' },
        { name: 'North Field C', type: 'Corn Silage' },
      ]
    },
    {
      id: '2',
      date: 'Dec 18, 2025',
      category: 'hay-haylage' as Category,
      categoryName: 'Hay/Haylage',
      package: 'nutritionist' as Package,
      packageName: 'Nutritionist',
      sampleName: 'East Pasture Hay',
      farm: userFarms[1],
      addOns: [],
      numSamples: 1,
      samples: [
        { name: 'East Pasture Hay', type: 'Hay/Haylage' },
      ]
    },
    {
      id: '3',
      date: 'Nov 15, 2025',
      category: 'field-pasture' as Category,
      categoryName: 'Field/Pasture',
      package: 'soil-complete' as Package,
      packageName: 'Soil Complete',
      sampleName: 'South 40 Soil Test',
      farm: userFarms[0],
      addOns: ['Micronutrient Panel'],
      numSamples: 5,
      samples: [
        { name: 'South 40 - Zone 1', type: 'Soil' },
        { name: 'South 40 - Zone 2', type: 'Soil' },
        { name: 'South 40 - Zone 3', type: 'Soil' },
        { name: 'South 40 - Zone 4', type: 'Soil' },
        { name: 'South 40 - Zone 5', type: 'Soil' },
      ]
    },
  ];

  // Handler to recreate a previous sample submission
  const handleRecreatePrevious = (prevSample: typeof previousSamples[number]) => {
    setSelectedCategory(prevSample.category);
    setSelectedPackage(prevSample.package);
    setSelectedAddOns(prevSample.addOns);
    setSampleName(prevSample.sampleName + ' (Copy)');
    setSelectedFarm(prevSample.farm);
    setShowTestOptions(true);
    setShowRecreatePreviousModal(false);
    
    // Populate samples array with the recreated samples
    const recreatedSamples: Sample[] = prevSample.samples.map((sample, index) => ({
      id: `sample-${Date.now()}-${index}`,
      category: prevSample.category,
      categoryName: prevSample.categoryName,
      package: prevSample.package,
      packageName: prevSample.packageName,
      sampleName: sample.name,
      farm: prevSample.farm,
      addOns: prevSample.addOns,
      projectIds: [],
    }));
    setSamples(recreatedSamples);
    
    // Auto-advance to review if everything is set
    if (prevSample.category && prevSample.package) {
      // Small delay to show the populated form
      setTimeout(() => {
        setStep(2);
      }, 300);
    }
  };

  // Generate sample IDs only once when reaching step 3
  useEffect(() => {
    if (step === 3 && generatedSampleIds.length !== samples.length) {
      setGeneratedSampleIds(samples.map(() => generateSampleId()));
    }
  }, [step, samples.length]);

  // Use the stable generated IDs
  const samplesWithIds = generatedSampleIds;

  // Dark mode color variables
  const bgPrimary = darkMode ? 'bg-[#0F0F0F]' : 'bg-stone-200';
  const bgSecondary = darkMode ? 'bg-[#1A1A1A]' : 'bg-stone-50';
  const bgCard = darkMode ? 'bg-[#252525]' : 'bg-white';
  const textPrimary = darkMode ? 'text-[#F0F0F0]' : 'text-stone-800';
  const textSecondary = darkMode ? 'text-[#D0D0D0]' : 'text-stone-600';
  const textTertiary = darkMode ? 'text-[#A0A0A0]' : 'text-stone-500';
  const borderColor = darkMode ? 'border-[#2A2A2A]' : 'border-stone-200';
  const borderColorStrong = darkMode ? 'border-[#3A3A3A]' : 'border-stone-400';
  const hoverBg = darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-stone-200';
  const inputBg = darkMode ? 'bg-[#1A1A1A]' : 'bg-white';
  const inputBorder = darkMode ? 'border-[#333333]' : 'border-stone-300';

  return (
    <div className={`fixed inset-0 ${bgPrimary} z-50 flex flex-col`}>
      {/* Header with Step Progress */}
      <header className={`${bgSecondary} shadow-sm px-2 md:px-4 flex items-center justify-between sticky top-0 z-10 border-b ${borderColor} transition-all duration-300 py-4 md:py-6 relative`}>
        <button
          onClick={onClose}
          className={`flex items-center gap-1.5 px-2 py-1.5 ${hoverBg} rounded-lg transition-colors flex-shrink-0`}
        >
          <ArrowLeft className={`size-4 ${textSecondary}`} />
          <span className={`text-xs md:text-sm font-medium ${textSecondary}`}>Back</span>
        </button>
        
        <div className={`flex items-center justify-center transition-all duration-300 ${isHeaderMinimized ? 'gap-1 md:gap-2' : 'gap-1.5 md:gap-3'}`}>
          {[1, 2, 3, 4].map((s) => {
            // Define colors and icons for each step
            const stepColors = [
              { bg: 'bg-[#411900]', bgDark: 'bg-[#411900]' }, // Step 1 - Soil Brown (rich earth) - MATCHES HOMEPAGE
              { bg: 'bg-blue-600', bgDark: 'bg-blue-500' }, // Step 2 - Blue (review)
              { bg: 'bg-[#2d7a3e]', bgDark: 'bg-[#2d7a3e]' }, // Step 3 - Green (labeling)
              { bg: 'bg-yellow-400', bgDark: 'bg-yellow-300' } // Step 4 - Yellow (deliver)
            ];
            const stepIcons = [Sprout, Edit3, Barcode, Truck];
            const color = stepColors[s - 1];
            const Icon = stepIcons[s - 1];
            
            return (
              <div key={s} className="contents">
                <div className="flex flex-col items-center">
                  <div
                    className={`rounded-full flex items-center justify-center transition-all ${
                      isHeaderMinimized ? 'size-6 md:size-8' : 'size-8 md:size-10'
                    } ${
                      s <= step 
                        ? (darkMode ? `${color.bgDark} text-white` : `${color.bg} text-white`) 
                        : (darkMode ? 'bg-[#2A2A2A] text-[#606060]' : 'bg-stone-200 text-stone-400')
                    }`}
                  >
                    <Icon className={isHeaderMinimized ? 'size-3 md:size-4' : 'size-4 md:size-5'} strokeWidth={2.5} />
                  </div>
                  {!isHeaderMinimized && (
                    <div className={`text-xs md:text-sm mt-1.5 font-medium transition-opacity text-center ${s <= step ? textPrimary : textTertiary}`}>
                      {['Select', 'Review', 'Label', 'Deliver'][s - 1]}
                    </div>
                  )}
                </div>
                {s < 4 && (
                  <div className={`flex items-center ${!isHeaderMinimized ? 'self-start' : ''}`} style={!isHeaderMinimized ? { marginTop: '16px' } : undefined}>
                    <div
                      className={`h-0.5 transition-all ${
                        isHeaderMinimized ? 'w-4 md:w-6' : 'w-5 md:w-8'
                      } ${
                        s < step 
                          ? (darkMode ? `${color.bgDark}` : `${color.bg}`)
                          : (darkMode ? 'bg-[#2A2A2A]' : 'bg-stone-300')
                      }`}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Spacer to balance layout */}
        <div className="w-[60px] md:w-[70px]"></div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24">
        {/* STEP 1: Category, Package, Name */}
        {step === 1 && (
          <div className="px-4 py-6 max-w-3xl mx-auto">
            {/* Editing Banner */}
            {editingSampleId && (
              <div className={`mb-6 rounded-xl border-2 p-4 flex items-center gap-3 animate-fade-in ${
                darkMode 
                  ? 'bg-[#411900]/30 border-[#411900]' 
                  : 'bg-amber-50 border-amber-300'
              }`}>
                <Edit3 className={`size-5 flex-shrink-0 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
                <div className="flex-1">
                  <h4 className={`font-semibold ${darkMode ? 'text-amber-300' : 'text-amber-900'}`}>
                    Modifying Sample Tests
                  </h4>
                  <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                    Update the category, package, or add-ons for this sample
                  </p>
                </div>
              </div>
            )}

            {/* Recreate Previous Submission Button - Only show if not editing */}
            {!editingSampleId && showRecreateButton && (
              <div className="relative mb-6">
                <button
                  onClick={() => setShowRecreatePreviousModal(true)}
                  className={`w-full rounded-xl border-2 p-4 flex items-center gap-3 transition-all group ${
                    darkMode 
                      ? 'bg-gradient-to-r from-blue-950/40 to-blue-900/40 border-blue-800 hover:border-blue-600 hover:from-blue-950/60 hover:to-blue-900/60' 
                      : 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-300 hover:border-blue-500 hover:from-blue-100 hover:to-blue-150'
                  }`}>
                  <Zap className={`size-6 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-600'} group-hover:scale-110 transition-transform`} />
                  <div className="flex-1 text-left">
                    <h4 className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                      Save Time - Recreate Previous Submission
                    </h4>
                    <p className={`text-sm ${darkMode ? 'text-blue-400/80' : 'text-blue-700'}`}>
                      Use a past order as a template to quickly submit similar samples
                    </p>
                  </div>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowRecreateButton(false);
                  }}
                  className={`absolute top-2 right-2 p-1 transition-opacity hover:opacity-70`}
                >
                  <X className={`size-4 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`} />
                </button>
              </div>
            )}

            {/* Custom Project Message Button */}
            <div className={`mb-6 rounded-xl border-2 p-4 flex items-start gap-3 ${
              darkMode 
                ? 'bg-green-900/20 border-green-800' 
                : 'bg-green-50 border-green-300'
            }`}>
              <MessageCircle className={`size-5 flex-shrink-0 mt-0.5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              <div className="flex-1">
                <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-900'}`}>
                  Have a large or specific project you'd like to discuss with our team?
                </p>
                <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-900'}`}>
                  Message us using the chat bubble on the main page!
                </p>
              </div>
            </div>

            <h1 className={`text-2xl font-semibold ${textPrimary} mb-2`}>
              {testingMode === 'soil' ? 'Choose Your Soil Test Package' : 'Select Sample Type'}
            </h1>
            
            {/* Info text for feeds mode */}
            {testingMode !== 'soil' && (
              <p className={`${textSecondary} text-sm mb-8`}>
                It's okay if you aren't confident. We confirm before testing begins that the correct type is selected for the most accurate results.
              </p>
            )}
            
            {/* Spacing for soil mode */}
            {testingMode === 'soil' && (
              <div className="mb-8" />
            )}
            
            {/* Info banner for soil mode */}
            {testingMode === 'soil' && (
              <div className={`mb-6 rounded-xl border-2 p-4 flex items-start gap-3 ${
                darkMode 
                  ? 'bg-[#411900]/30 border-[#411900]' 
                  : 'bg-amber-50 border-amber-300'
              }`}>
                <Info className={`size-5 flex-shrink-0 mt-0.5 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
                <div className="flex-1">
                  <h4 className={`font-semibold mb-1 ${darkMode ? 'text-amber-300' : 'text-amber-900'}`}>
                    Submit Multiple Soil Samples
                  </h4>
                  <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                    You can easily add multiple soil samples in one submission. After selecting your test package, you'll be able to add as many samples as needed.
                  </p>
                </div>
              </div>
            )}
            
            {/* Category Grid - Responsive columns - ONLY FOR FEEDS MODE */}
            {testingMode !== 'soil' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {categories.map((category) => {
                const Icon = category.icon;
                const isSelected = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className={`relative rounded-xl transition-all border-2 p-4 flex flex-col items-center gap-2 ${
                      isSelected
                        ? category.selectedColor + ' shadow-md'
                        : category.color + ' shadow-sm hover:brightness-105'
                    }`}
                  >
                    <div className={category.iconColor}>
                      <Icon className="size-9" strokeWidth={1} />
                    </div>
                    <span className={`text-xs font-medium text-center leading-tight ${textPrimary}`}>
                      {category.name}
                    </span>
                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 className={`size-4 ${category.iconColor}`} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            )}

            {/* Misc Dropdown & Warning */}
            {selectedCategory === 'misc-other' && (
              <div className="space-y-4 animate-fade-in mb-8">
                <div>
                  <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                    Specify Sample Type
                  </label>
                  <select
                    value={miscType}
                    onChange={(e) => setMiscType(e.target.value)}
                    className={`w-full px-4 py-3 border-2 ${inputBorder} rounded-xl ${inputBg} ${textPrimary} focus:border-stone-600 focus:outline-none transition-colors`}
                  >
                    <option value="">Select type...</option>
                    {miscOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={`border-2 rounded-xl p-4 flex gap-3 ${darkMode ? 'bg-[#411900]/30 border-[#411900]' : 'bg-amber-50 border-amber-300'}`}>
                  <AlertTriangle className={`size-5 flex-shrink-0 mt-0.5 ${darkMode ? 'text-amber-500' : 'text-amber-700'}`} />
                  <div>
                    <h4 className={`font-semibold mb-1 ${darkMode ? 'text-amber-400' : 'text-amber-900'}`}>Notice</h4>
                    <p className={`text-sm ${darkMode ? 'text-amber-300' : 'text-amber-800'}`}>
                      We can test a lot, but not everything! Our lab team will be in touch if we recommend specific tests for your sample type.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Test Packages - Always show for soil mode, slide down when category selected for feeds */}
            {(testingMode === 'soil' || (showTestOptions && selectedCategory && (selectedCategory !== 'misc-other' || miscType))) && (
              <div id="test-packages-section" className="animate-slide-down space-y-8">
                <div>
                  <h2 className={`text-xl font-semibold ${textPrimary} mb-2`}>
                    {testingMode === 'soil' 
                      ? 'Soil Testing Package' 
                      : (selectedCategory === 'water' || selectedCategory === 'fecal') 
                        ? 'Select Testing Package' 
                        : 'Select NIR Package'}
                  </h2>
                  <p className={`${textSecondary} mb-6`}>
                    {testingMode === 'soil' 
                      ? 'Choose the soil analysis level for your samples' 
                      : 'Choose the analysis level for your sample'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    {getPackagesForCategory().map((pkg) => {
                      const BadgeIcon = pkg.badge;
                      const isSelected = selectedPackage === pkg.id;
                      return (
                        <button
                          key={pkg.id}
                          onClick={() => handlePackageSelect(pkg.id)}
                          className={`relative w-full rounded-2xl transition-all border-3 flex flex-col h-full ${
                            isSelected
                              ? pkg.selectedBorder + ' ' + pkg.color + ' shadow-xl ring-4 ring-offset-2 ' + pkg.selectedBorder.replace('border-', 'ring-')
                              : pkg.borderColor + ' ' + bgCard + ' ' + pkg.hoverBorder + ' hover:shadow-lg hover:-translate-y-1'
                          }`}
                        >
                          {pkg.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
                              <span className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                {pkg.tier}
                              </span>
                            </div>
                          )}
                          
                          <div className="p-3 md:p-5 flex flex-col h-full">
                            {/* Header */}
                            <div className={`text-center mb-3 pb-3 md:mb-4 md:pb-4 border-b-2 ${darkMode ? 'border-[#3C3C3C]' : 'border-stone-100'}`}>
                              <BadgeIcon className={`size-8 md:size-10 ${pkg.badgeColor} mx-auto mb-1.5 md:mb-2`} strokeWidth={2} />
                              <h3 className={`text-xl font-bold mb-0.5 md:mb-1 ${textPrimary}`}>
                                {pkg.name}
                              </h3>
                              {!pkg.popular && (
                                <span className={`text-xs font-medium uppercase tracking-wide ${textSecondary}`}>{pkg.tier}</span>
                              )}
                              {pkg.popular && (
                                <span className={`text-xs font-medium uppercase tracking-wide invisible ${textSecondary}`}>Placeholder</span>
                              )}
                              <p className={`text-xs mt-1.5 md:mt-2 ${textSecondary}`}>
                                {pkg.description}
                              </p>
                            </div>
                            
                            {/* Base Tests - Vertical List */}
                            <div className="mb-3 md:mb-4">
                              <div className={`text-xs font-semibold uppercase tracking-wide mb-2 md:mb-3 flex items-center gap-2 ${textSecondary}`}>
                                <div className={`h-px flex-1 ${darkMode ? 'bg-[#2A2A2A]' : 'bg-stone-200'}`}></div>
                                <span>Base Tests</span>
                                <div className={`h-px flex-1 ${darkMode ? 'bg-[#2A2A2A]' : 'bg-stone-200'}`}></div>
                              </div>
                              <div className="space-y-1 md:space-y-1.5">
                                {pkg.baseTests.map((test, idx) => (
                                  <div key={idx} className={`flex items-center gap-2 text-xs ${textPrimary}`}>
                                    <CheckCircle2 className={`size-3.5 flex-shrink-0 ${darkMode ? 'text-stone-400' : 'text-stone-400'}`} strokeWidth={2.5} />
                                    <span>{test}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* Extras Section */}
                            <div>
                              {pkg.extras.length > 0 ? (
                                <div className={`p-3 rounded-lg border-2 ${pkg.borderColor} ${pkg.color}`}>
                                <div className="flex items-center gap-2 mb-2">
                                  <Sparkles className={`size-4 ${pkg.iconColor}`} strokeWidth={2} />
                                  <span className="text-xs font-bold ${pkg.iconColor} uppercase tracking-wide">
                                    +{pkg.extras.length} Premium
                                  </span>
                                </div>
                                <div className="space-y-1">
                                  {pkg.extras.map((test, idx) => (
                                    <div key={idx} className={`flex items-center gap-2 text-xs ${pkg.iconColor} font-medium`}>
                                      <Star className="size-3 flex-shrink-0" strokeWidth={2.5} fill="currentColor" />
                                      <span>{test}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              ) : (
                                <div className="h-0"></div>
                              )}
                            </div>
                            
                            {/* Price at bottom */}
                            <div className={`mt-auto pt-4 border-t ${darkMode ? 'border-[#2C2C2C]' : 'border-stone-200'}`}>
                              <div className={`text-center text-2xl ${textSecondary}`}>
                                {pkg.price}
                              </div>
                            </div>
                            
                            {/* Selected Indicator */}
                            {isSelected && (
                              <div className={`mt-3 pt-3 border-t-2 ${pkg.borderColor} flex items-center justify-center gap-2`}>
                                <CheckCircle2 className={`size-5 ${pkg.iconColor}`} strokeWidth={2.5} />
                                <span className={`text-sm font-bold ${pkg.iconColor}`}>Selected</span>
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  
                  {/* Custom Packages - Display saved packages */}
                  {testingMode === 'feeds' && selectedCategory !== 'water' && selectedCategory !== 'fecal' && localCustomPackages.length > 0 && (
                    <div className="mt-6">
                      <h3 className={`text-lg font-semibold ${textPrimary} mb-3`}>
                        Your Custom Packages
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {localCustomPackages.map((pkg) => {
                          const isSelected = selectedCustomPackage?.id === pkg.id;
                          return (
                            <button
                              key={pkg.id}
                              onClick={() => handleCustomPackageSelect(pkg)}
                              className={`relative w-full rounded-2xl transition-all border-3 flex flex-col h-full ${
                                isSelected
                                  ? darkMode 
                                    ? 'border-purple-500 bg-purple-900/40 shadow-xl ring-4 ring-offset-2 ring-offset-[#0F0F0F] ring-purple-500'
                                    : 'border-purple-600 bg-purple-50 shadow-xl ring-4 ring-offset-2 ring-purple-600'
                                  : `border-purple-200 dark:border-purple-800/50 ${bgCard} hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-lg hover:-translate-y-1`
                              }`}
                            >
                              <div className="p-5 flex flex-col h-full">
                                {/* Header */}
                                <div className={`text-center mb-4 pb-4 border-b-2 ${darkMode ? 'border-[#3C3C3C]' : 'border-purple-100'}`}>
                                  <Sparkles className={`size-10 ${darkMode ? 'text-purple-400' : 'text-purple-600'} mx-auto mb-2`} strokeWidth={2} />
                                  <h3 className={`text-xl font-bold mb-1 ${textPrimary}`}>
                                    {pkg.name}
                                  </h3>
                                  <span className={`text-xs font-medium uppercase tracking-wide ${textSecondary}`}>Custom</span>
                                  <p className={`text-xs mt-2 ${textSecondary}`}>
                                    {pkg.analytes.length} selected analyte{pkg.analytes.length !== 1 ? 's' : ''}
                                  </p>
                                </div>
                                
                                {/* Analytes List */}
                                <div className="mb-4 flex-1">
                                  <div className={`text-xs font-semibold uppercase tracking-wide mb-3 flex items-center gap-2 ${textSecondary}`}>
                                    <div className={`h-px flex-1 ${darkMode ? 'bg-[#2A2A2A]' : 'bg-stone-200'}`}></div>
                                    <span>Selected Tests</span>
                                    <div className={`h-px flex-1 ${darkMode ? 'bg-[#2A2A2A]' : 'bg-stone-200'}`}></div>
                                  </div>
                                  <div className="flex flex-wrap gap-1.5">
                                    {pkg.analytes.slice(0, 6).map((analyteId) => (
                                      <span
                                        key={analyteId}
                                        className={`text-[10px] px-2 py-1 rounded font-medium ${
                                          darkMode 
                                            ? isSelected 
                                              ? 'bg-purple-700/50 text-purple-200'
                                              : 'bg-purple-900/30 text-purple-300'
                                            : 'bg-purple-100 text-purple-700'
                                        }`}
                                      >
                                        {analyteId.replace(/_/g, ' ').toUpperCase()}
                                      </span>
                                    ))}
                                    {pkg.analytes.length > 6 && (
                                      <span className={`text-[10px] px-2 py-1 ${textTertiary}`}>
                                        +{pkg.analytes.length - 6} more
                                      </span>
                                    )}
                                  </div>
                                </div>
                                
                                {/* Price placeholder */}
                                <div className={`mt-auto pt-4 border-t ${darkMode ? 'border-[#2C2C2C]' : 'border-stone-200'}`}>
                                  <div className={`text-center text-sm ${textSecondary}`}>
                                    Custom pricing
                                  </div>
                                </div>
                                
                                {/* Selected Indicator */}
                                {isSelected && (
                                  <div className={`mt-3 pt-3 border-t-2 ${darkMode ? 'border-purple-600' : 'border-purple-400'} flex items-center justify-center gap-2`}>
                                    <CheckCircle2 className={`size-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} strokeWidth={2.5} />
                                    <span className={`text-sm font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>Selected</span>
                                  </div>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {/* Custom Packages Card - Full Width Below Packages */}
                  {testingMode === 'feeds' && selectedCategory !== 'water' && selectedCategory !== 'fecal' && (
                    <button
                      onClick={() => {
                        if (onShowCustomPackages) {
                          onShowCustomPackages();
                        }
                      }}
                      className={`mt-4 w-full rounded-xl transition-all border-2 p-4 ${
                        darkMode 
                          ? 'bg-purple-950/30 border-purple-800/50 hover:border-purple-700 hover:bg-purple-950/40'
                          : 'bg-purple-50 border-purple-200 hover:border-purple-300 hover:bg-purple-100'
                      } hover:shadow-lg`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Icon */}
                          <Sparkles className={`size-8 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} strokeWidth={2} />
                          
                          <div className="text-left">
                            {/* Header */}
                            <h3 className={`text-lg font-bold ${textPrimary}`}>
                              Build a Custom Package
                            </h3>
                            
                            {/* Description */}
                            <p className={`text-sm ${textSecondary} mt-1`}>
                              Select your own custom analytes from NIR and wet chemistry options
                            </p>
                          </div>
                        </div>
                        
                        {/* Action Button */}
                        <div className={`flex items-center gap-2 ${darkMode ? 'text-purple-400' : 'text-purple-600'} font-semibold px-4`}>
                          <Plus className="size-5" />
                          <span>Build Package</span>
                        </div>
                      </div>
                    </button>
                  )}
                  
                  {/* Wet Chem Only Option - Below Custom Package */}
                  {testingMode === 'feeds' && selectedCategory !== 'water' && selectedCategory !== 'fecal' && (
                    <button
                      onClick={() => setSelectedPackage('addons-only')}
                      className={`mt-4 w-full rounded-xl transition-all border-2 p-4 ${
                        selectedPackage === 'addons-only'
                          ? `${darkMode ? 'bg-blue-900 border-blue-600' : 'bg-blue-600 border-blue-600'} shadow-lg`
                          : `${darkMode ? 'bg-blue-950/30 border-blue-800/50 hover:border-blue-700 hover:bg-blue-950/40' : 'bg-blue-50 border-blue-200 hover:border-blue-300 hover:bg-blue-100'}`
                      } hover:shadow-lg`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Icon */}
                          <Droplets className={`size-8 ${
                            selectedPackage === 'addons-only'
                              ? `${darkMode ? 'text-blue-300' : 'text-white'}`
                              : `${darkMode ? 'text-blue-400' : 'text-blue-600'}`
                          }`} strokeWidth={2} />
                          
                          <div className="text-left">
                            {/* Header */}
                            <h3 className={`text-lg font-bold ${
                              selectedPackage === 'addons-only'
                                ? `${darkMode ? 'text-blue-100' : 'text-white'}`
                                : textPrimary
                            }`}>
                              Wet Chem Only
                            </h3>
                            
                            {/* Description */}
                            <p className={`text-sm mt-1 ${
                              selectedPackage === 'addons-only'
                                ? `${darkMode ? 'text-blue-200' : 'text-blue-100'}`
                                : textSecondary
                            }`}>
                              Skip NIR and select only wet chemistry add-ons
                            </p>
                          </div>
                        </div>
                        
                        {/* Action Button */}
                        <div className={`flex items-center gap-2 font-semibold px-4 ${
                          selectedPackage === 'addons-only'
                            ? `${darkMode ? 'text-blue-300' : 'text-white'}`
                            : `${darkMode ? 'text-blue-400' : 'text-blue-600'}`
                        }`}>
                          <Plus className="size-5" />
                          <span>Select</span>
                        </div>
                      </div>
                    </button>
                  )}
                </div>

                {/* Add-Ons Section - Only for non-water/fecal samples */}
                {selectedPackage && selectedCategory !== 'water' && selectedCategory !== 'fecal' && (
                  <div id="add-ons-section" className="animate-fade-in">
                    <h2 className={`text-xl font-semibold ${textPrimary} mb-6`}>
                      Select Wet Chem
                    </h2>

                    {/* Show feed-specific add-ons for feed samples */}
                    {(selectedCategory !== 'field-pasture' && selectedCategory !== 'garden-lawn' && selectedCategory !== 'commercial') && (
                      <div className="space-y-6">
                        {/* Mineral Subgroup */}
                        <div>
                          <h3 className={`text-sm font-semibold ${textSecondary} mb-3 uppercase tracking-wide`}>Mineral</h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                            {mineralAddOns.map((addOn) => {
                            const isSelected = selectedAddOns.includes(addOn.id);
                            return (
                              <button
                                key={addOn.id}
                                onClick={() => toggleAddOn(addOn.id)}
                                className={`rounded-lg transition-all border-2 p-3 ${
                                  isSelected
                                    ? `border-blue-600 ${darkMode ? 'bg-[#2A2A2A]' : 'bg-blue-50'}`
                                    : `${inputBorder} ${bgCard} ${darkMode ? 'hover:border-blue-600' : 'hover:border-stone-400'}`
                                }`}
                              >
                                <div className="flex flex-col items-center text-center gap-2">
                                  <div className="flex items-center gap-1.5 w-full justify-center">
                                    <h4 className={`text-sm font-semibold ${textPrimary}`}>
                                      {addOn.name}
                                    </h4>
                                    <InfoTooltip tests={addOn.tests} />
                                  </div>
                                  <span className={`text-xs font-bold ${textSecondary}`}>
                                    +{addOn.price}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Hygiene Subgroup */}
                      <div>
                        <h3 className={`text-sm font-semibold ${textSecondary} mb-3 uppercase tracking-wide`}>Hygiene</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                          {hygieneAddOns.map((addOn) => {
                            const isSelected = selectedAddOns.includes(addOn.id);
                            return (
                              <button
                                key={addOn.id}
                                onClick={() => toggleAddOn(addOn.id)}
                                className={`rounded-lg transition-all border-2 p-3 ${
                                  isSelected
                                    ? `border-blue-600 ${darkMode ? 'bg-[#2A2A2A]' : 'bg-blue-50'}`
                                    : `${inputBorder} ${bgCard} ${darkMode ? 'hover:border-blue-600' : 'hover:border-stone-400'}`
                                }`}
                              >
                                <div className="flex flex-col items-center text-center gap-2">
                                  <div className="flex items-center gap-1.5 w-full justify-center">
                                    <h4 className={`text-sm font-semibold ${textPrimary}`}>
                                      {addOn.name}
                                    </h4>
                                    <InfoTooltip tests={addOn.tests} />
                                  </div>
                                  <span className={`text-xs font-bold ${textSecondary}`}>
                                    +{addOn.price}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Toxin Subgroup */}
                      <div>
                        <h3 className={`text-sm font-semibold ${textSecondary} mb-3 uppercase tracking-wide`}>Toxin</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                          {toxinAddOns.map((addOn) => {
                            const isSelected = selectedAddOns.includes(addOn.id);
                            return (
                              <button
                                key={addOn.id}
                                onClick={() => toggleAddOn(addOn.id)}
                                className={`rounded-lg transition-all border-2 p-3 ${
                                  isSelected
                                    ? `border-blue-600 ${darkMode ? 'bg-[#2A2A2A]' : 'bg-blue-50'}`
                                    : `${inputBorder} ${bgCard} ${darkMode ? 'hover:border-blue-600' : 'hover:border-stone-400'}`
                                }`}
                              >
                                <div className="flex flex-col items-center text-center gap-2">
                                  <div className="flex items-center gap-1.5 w-full justify-center">
                                    <h4 className={`text-sm font-semibold ${textPrimary}`}>
                                      {addOn.name}
                                    </h4>
                                    <InfoTooltip tests={addOn.tests} />
                                  </div>
                                  <span className={`text-xs font-bold ${textSecondary}`}>
                                    +{addOn.price}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* In Situ Subgroup */}
                      <div>
                        <h3 className={`text-sm font-semibold ${textSecondary} mb-3 uppercase tracking-wide`}>In Situ</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {inSituAddOns.map((addOn) => {
                            const isSelected = selectedAddOns.includes(addOn.id);
                            return (
                              <button
                                key={addOn.id}
                                onClick={() => toggleAddOn(addOn.id)}
                                className={`w-full rounded-lg transition-all border-2 p-4 ${
                                  isSelected
                                    ? `border-stone-600 ${darkMode ? 'bg-[#2A2A2A]' : 'bg-stone-50'}`
                                    : `${inputBorder} ${bgCard} ${darkMode ? 'hover:border-stone-600' : 'hover:border-stone-400'}`
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="flex-1 text-left">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className={`font-semibold ${textPrimary}`}>
                                        {addOn.name}
                                      </h4>
                                      <InfoTooltip tests={addOn.tests} />
                                      <span className={`text-sm font-bold ${textSecondary} ml-auto`}>
                                        +{addOn.price}
                                      </span>
                                    </div>
                                    <p className={`text-xs ${textSecondary}`}>
                                      {addOn.description}
                                    </p>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Other Subgroup */}
                      <div>
                        <h3 className={`text-sm font-semibold ${textSecondary} mb-3 uppercase tracking-wide`}>Other</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                          {otherAddOns.map((addOn) => {
                            const isSelected = selectedAddOns.includes(addOn.id);
                            return (
                              <button
                                key={addOn.id}
                                onClick={() => toggleAddOn(addOn.id)}
                                className={`w-full rounded-lg transition-all border-2 p-4 ${
                                  isSelected
                                    ? `border-stone-600 ${darkMode ? 'bg-[#2A2A2A]' : 'bg-stone-50'}`
                                    : `${inputBorder} ${bgCard} ${darkMode ? 'hover:border-stone-600' : 'hover:border-stone-400'}`
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="flex-1 text-left">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className={`font-semibold ${textPrimary}`}>
                                        {addOn.name}
                                      </h4>
                                      <InfoTooltip tests={addOn.tests} />
                                      <span className={`text-sm font-bold ${textSecondary} ml-auto`}>
                                        +{addOn.price}
                                      </span>
                                    </div>
                                    <p className={`text-xs ${textSecondary}`}>
                                      {addOn.description}
                                    </p>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    )}

                    {/* Show soil-specific add-ons for soil samples */}
                    {(selectedCategory === 'field-pasture' || selectedCategory === 'garden-lawn' || selectedCategory === 'commercial') && (
                      <div className="space-y-6">
                        {/* Micronutrients */}
                        <div>
                          <h3 className={`text-sm font-semibold ${textSecondary} mb-3 uppercase tracking-wide`}>Micronutrients</h3>
                          <div className="space-y-2">
                            {soilMicronutrientsAddOns.map((addOn) => {
                              const isSelected = selectedAddOns.includes(addOn.id);
                              return (
                                <button
                                  key={addOn.id}
                                  onClick={() => toggleAddOn(addOn.id)}
                                  className={`w-full rounded-lg transition-all border-2 p-4 ${
                                    isSelected
                                      ? `${darkMode ? 'border-[#4A4A4A] bg-[#2A2A2A]' : 'border-stone-600 bg-stone-50'}`
                                      : `${darkMode ? 'border-[#3A3A3A] bg-[#1A1A1A] hover:border-[#4A4A4A]' : 'border-stone-300 bg-white hover:border-stone-400'}`
                                  }`}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="flex-1 text-left">
                                      <div className="flex items-center gap-2 mb-1">
                                        <h4 className={`font-semibold ${textPrimary}`}>
                                          {addOn.name}
                                        </h4>
                                        <InfoTooltip tests={addOn.tests} />
                                        <span className={`text-sm font-bold ml-auto ${textPrimary}`}>
                                          +{addOn.price}
                                        </span>
                                      </div>
                                      <p className={`text-xs ${textSecondary}`}>
                                        {addOn.description}
                                      </p>
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Heavy Metals */}
                        <div>
                          <h3 className={`text-sm font-semibold ${textSecondary} mb-3 uppercase tracking-wide`}>Heavy Metals</h3>
                          <div className="space-y-2">
                            {soilHeavyMetalsAddOns.map((addOn) => {
                              const isSelected = selectedAddOns.includes(addOn.id);
                              return (
                                <button
                                  key={addOn.id}
                                  onClick={() => toggleAddOn(addOn.id)}
                                  className={`w-full rounded-lg transition-all border-2 p-4 ${
                                    isSelected
                                      ? `${darkMode ? 'border-[#4A4A4A] bg-[#2A2A2A]' : 'border-stone-600 bg-stone-50'}`
                                      : `${darkMode ? 'border-[#3A3A3A] bg-[#1A1A1A] hover:border-[#4A4A4A]' : 'border-stone-300 bg-white hover:border-stone-400'}`
                                  }`}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="flex-1 text-left">
                                      <div className="flex items-center gap-2 mb-1">
                                        <h4 className={`font-semibold ${textPrimary}`}>
                                          {addOn.name}
                                        </h4>
                                        <InfoTooltip tests={addOn.tests} />
                                        <span className={`text-sm font-bold ml-auto ${textPrimary}`}>
                                          +{addOn.price}
                                        </span>
                                      </div>
                                      <p className={`text-xs ${textSecondary}`}>
                                        {addOn.description}
                                      </p>
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Organic Matter */}
                        <div>
                          <h3 className={`text-sm font-semibold ${textSecondary} mb-3 uppercase tracking-wide`}>Organic & Biology</h3>
                          <div className="space-y-2">
                            {soilOrganicAddOns.map((addOn) => {
                              const isSelected = selectedAddOns.includes(addOn.id);
                              return (
                                <button
                                  key={addOn.id}
                                  onClick={() => toggleAddOn(addOn.id)}
                                  className={`w-full rounded-lg transition-all border-2 p-4 ${
                                    isSelected
                                      ? `${darkMode ? 'border-[#4A4A4A] bg-[#2A2A2A]' : 'border-stone-600 bg-stone-50'}`
                                      : `${darkMode ? 'border-[#3A3A3A] bg-[#1A1A1A] hover:border-[#4A4A4A]' : 'border-stone-300 bg-white hover:border-stone-400'}`
                                  }`}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="flex-1 text-left">
                                      <div className="flex items-center gap-2 mb-1">
                                        <h4 className={`font-semibold ${textPrimary}`}>
                                          {addOn.name}
                                        </h4>
                                        <InfoTooltip tests={addOn.tests} />
                                        <span className={`text-sm font-bold ml-auto ${textPrimary}`}>
                                          +{addOn.price}
                                        </span>
                                      </div>
                                      <p className={`text-xs ${textSecondary}`}>
                                        {addOn.description}
                                      </p>
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Soil Texture */}
                        <div>
                          <h3 className={`text-sm font-semibold ${textSecondary} mb-3 uppercase tracking-wide`}>Physical Properties</h3>
                          <div className="space-y-2">
                            {soilTextureAddOns.map((addOn) => {
                              const isSelected = selectedAddOns.includes(addOn.id);
                              return (
                                <button
                                  key={addOn.id}
                                  onClick={() => toggleAddOn(addOn.id)}
                                  className={`w-full rounded-lg transition-all border-2 p-4 ${
                                    isSelected
                                      ? `${darkMode ? 'border-[#4A4A4A] bg-[#2A2A2A]' : 'border-stone-600 bg-stone-50'}`
                                      : `${darkMode ? 'border-[#3A3A3A] bg-[#1A1A1A] hover:border-[#4A4A4A]' : 'border-stone-300 bg-white hover:border-stone-400'}`
                                  }`}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="flex-1 text-left">
                                      <div className="flex items-center gap-2 mb-1">
                                        <h4 className={`font-semibold ${textPrimary}`}>
                                          {addOn.name}
                                        </h4>
                                        <InfoTooltip tests={addOn.tests} />
                                        <span className={`text-sm font-bold ml-auto ${textPrimary}`}>
                                          +{addOn.price}
                                        </span>
                                      </div>
                                      <p className={`text-xs ${textSecondary}`}>
                                        {addOn.description}
                                      </p>
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Sample Name Section */}
                {(selectedPackage || selectedCustomPackage) && (
                  <div className="animate-fade-in">
                    <h2 className={`text-xl font-bold ${textPrimary} mb-2`}>
                      Name Your Sample
                    </h2>
                    <p className={`${textSecondary} mb-4`}>
                      Add an identifying name (optional but recommended)
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="sample-name" className={`block text-sm font-semibold ${textPrimary} mb-2`}>
                          Sample Name
                        </label>
                        <input
                          id="sample-name"
                          type="text"
                          value={sampleName}
                          onChange={(e) => setSampleName(e.target.value)}
                          placeholder="e.g., East Bunker, North Field Bunk #3"
                          className={`w-full px-4 py-3 border-2 ${inputBorder} rounded-xl ${inputBg} ${textPrimary} focus:border-stone-600 focus:outline-none transition-colors`}
                        />
                        <p className={`text-xs ${textTertiary} mt-2`}>
                          Example: Field location, bunker number, or batch identifier
                        </p>
                      </div>

                      <div>
                        <label htmlFor="farm-select" className={`flex items-center gap-1.5 text-sm font-semibold ${textPrimary} mb-2`}>
                          <span>Organization</span>
                          <div className="relative group">
                            <Info className={`size-4 ${textTertiary} cursor-help`} />
                            <div className={`absolute left-0 bottom-full mb-2 hidden group-hover:block ${darkMode ? 'bg-[#1A1A1A]' : 'bg-stone-800'} text-white text-xs rounded-lg px-3 py-2 w-64 z-10 shadow-lg`}>
                              The organization is the user or collection of users who will "own" the sample results and receive an invoice.
                              <div className={`absolute top-full left-4 -mt-1 border-4 border-transparent ${darkMode ? 'border-t-[#1A1A1A]' : 'border-t-stone-800'}`}></div>
                            </div>
                          </div>
                        </label>
                        <select
                          id="farm-select"
                          value={selectedFarm}
                          onChange={(e) => setSelectedFarm(e.target.value)}
                          className={`w-full px-4 py-3 border-2 ${inputBorder} rounded-xl ${inputBg} ${textPrimary} focus:border-stone-600 focus:outline-none transition-colors`}
                        >
                          {userFarms.map((farm) => (
                            <option key={farm} value={farm}>
                              {farm}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Review & Duplication with Inline Editing */}
        {step === 2 && (
          <div className="px-4 py-6 max-w-2xl mx-auto">
            <button
              onClick={handleBack}
              className={`flex items-center gap-2 mb-4 -ml-2 p-2 ${textSecondary} transition-colors ${darkMode ? 'hover:text-[#F0F0F0]' : 'hover:text-stone-800'}`}
            >
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Back</span>
            </button>

            <h1 className={`text-2xl font-semibold ${textPrimary} mb-2`}>
              {testingMode === 'soil' ? 'Review Soil Samples' : 'Review Submission'}
            </h1>
            <p className={`${textSecondary} mb-6`}>
              {testingMode === 'soil' 
                ? `${samples.length} soil ${samples.length === 1 ? 'sample' : 'samples'} • Add more samples or edit details below`
                : `${samples.length} ${samples.length === 1 ? 'sample' : 'samples'} • Click to edit sample details`}
            </p>

            {/* Sample List with Inline Editing */}
            <div className="space-y-3 mb-6">
              {samples.map((sample, index) => {
                return (
                <div
                  key={sample.id}
                  className={`${bgCard} border-2 ${borderColor} rounded-xl overflow-hidden`}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`${darkMode ? 'bg-[#2A2A2A] text-[#D0D0D0]' : 'bg-stone-100 text-stone-700'} rounded-lg size-10 flex items-center justify-center font-semibold flex-shrink-0`}>
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-semibold ${textPrimary} mb-1`}>
                          {sample.categoryName}
                        </div>
                        <div className={`text-sm ${textSecondary} mb-1`}>
                          {sample.packageName}
                        </div>
                        {/* Add-ons list - vertical display */}
                        {sample.addOns.length > 0 && (
                          <div className={`text-xs ${textTertiary} mt-2 space-y-1`}>
                            {addOns.filter(a => sample.addOns.includes(a.id)).map(addon => (
                              <div key={addon.id} className="flex items-center gap-1.5">
                                <span className={textTertiary}>+</span>
                                <span>{addon.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {/* Show assigned projects if any */}
                        {testingMode === 'feeds' && sample.projectIds && sample.projectIds.length > 0 && (
                          <div className={`text-xs ${textTertiary} mt-1`}>
                            {sample.projectIds.map(projId => {
                              const project = availableProjects.find(p => p.id === projId);
                              return project ? project.name : null;
                            }).filter(Boolean).join(', ')}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditSample(sample.id)}
                          className={`p-2 ${hoverBg} ${textTertiary} ${darkMode ? 'hover:text-[#D0D0D0]' : 'hover:text-stone-700'} rounded-lg transition-colors flex-shrink-0`}
                          title="Edit sample type or package"
                        >
                          <Edit3 className="size-5" />
                        </button>
                        <button
                          onClick={handleDuplicate}
                          className={`p-2 ${hoverBg} ${textTertiary} ${darkMode ? 'hover:text-[#D0D0D0]' : 'hover:text-stone-700'} rounded-lg transition-colors flex-shrink-0`}
                          title="Copy sample"
                        >
                          <Copy className="size-5" />
                        </button>
                        <button
                          onClick={() => handleRemoveSample(sample.id)}
                          className={`p-2 ${darkMode ? 'hover:bg-red-900/30' : 'hover:bg-red-50'} ${textTertiary} hover:text-red-600 rounded-lg transition-colors flex-shrink-0`}
                          title="Delete sample"
                        >
                          <Trash2 className="size-5" />
                        </button>
                      </div>
                    </div>

                    {/* Inline Editable Fields */}
                    <div className="space-y-3">
                      <div>
                        <label className={`flex items-center gap-1.5 text-xs font-medium ${textSecondary} mb-1.5`}>
                          <span>Sample Name</span>
                          <div className="relative group">
                            <Info className={`size-3.5 ${textTertiary} cursor-help`} />
                            <div className={`absolute left-0 bottom-full mb-2 hidden group-hover:block ${darkMode ? 'bg-[#1A1A1A]' : 'bg-stone-800'} text-white text-xs rounded-lg px-3 py-2 w-64 z-10 shadow-lg`}>
                              The sample name is assigned to help differentiate this sample from other similar samples.
                              <div className={`absolute top-full left-4 -mt-1 border-4 border-transparent ${darkMode ? 'border-t-[#1A1A1A]' : 'border-t-stone-800'}`}></div>
                            </div>
                          </div>
                        </label>
                        <input
                          type="text"
                          value={sample.sampleName}
                          onChange={(e) => handleUpdateSampleName(sample.id, e.target.value)}
                          placeholder="Add sample name..."
                          className={`w-full px-3 py-2 border ${inputBorder} rounded-lg ${inputBg} ${textPrimary} focus:border-stone-600 focus:outline-none transition-colors text-sm`}
                        />
                      </div>

                      <div>
                        <label className={`flex items-center gap-1.5 text-xs font-medium ${textSecondary} mb-1.5`}>
                          <span>Organization</span>
                          <div className="relative group">
                            <Info className={`size-3.5 ${textTertiary} cursor-help`} />
                            <div className={`absolute left-0 bottom-full mb-2 hidden group-hover:block ${darkMode ? 'bg-[#1A1A1A]' : 'bg-stone-800'} text-white text-xs rounded-lg px-3 py-2 w-64 z-10 shadow-lg`}>
                              The organization is the user or collection of users who will "own" the sample results and receive an invoice.
                              <div className={`absolute top-full left-4 -mt-1 border-4 border-transparent ${darkMode ? 'border-t-[#1A1A1A]' : 'border-t-stone-800'}`}></div>
                            </div>
                          </div>
                        </label>
                        <select
                          value={sample.farm}
                          onChange={(e) => handleUpdateSampleFarm(sample.id, e.target.value)}
                          className={`w-full px-3 py-2 border ${inputBorder} rounded-lg ${darkMode ? 'bg-[#1A1A1A]' : 'bg-white'} ${textPrimary} focus:border-stone-600 focus:outline-none transition-colors text-sm`}
                        >
                          {userFarms.map((farm) => (
                            <option key={farm} value={farm} className={`${darkMode ? 'bg-[#1A1A1A] text-[#E0E0E0]' : 'bg-gray-100 text-gray-900'} text-base py-2`}>
                              {farm}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Project Assignment - Only for feeds mode */}
                      {testingMode === 'feeds' && (() => {
                        const farmProjects = availableProjects;
                        if (farmProjects.length === 0) return null;
                        
                        const selectedProjectIds = sample.projectIds || [];
                        
                        return (
                          <div>
                            <label className={`flex items-center gap-1.5 text-xs font-medium ${textSecondary} mb-1.5`}>
                              <span>Projects (Optional)</span>
                              <div className="relative group">
                                <Info className={`size-3.5 ${textTertiary} cursor-help`} />
                                <div className={`absolute left-0 bottom-full mb-2 hidden group-hover:block ${darkMode ? 'bg-[#1A1A1A]' : 'bg-stone-800'} text-white text-xs rounded-lg px-3 py-2 w-64 z-10 shadow-lg`}>
                                  Projects are groupings of samples to better support trending analyses and collaboration between organizations.
                                  <div className={`absolute top-full left-4 -mt-1 border-4 border-transparent ${darkMode ? 'border-t-[#1A1A1A]' : 'border-t-stone-800'}`}></div>
                                </div>
                              </div>
                            </label>
                            
                            {/* Selected Projects Display */}
                            {selectedProjectIds.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mb-2">
                                {selectedProjectIds.map(projId => {
                                  const project = farmProjects.find(p => p.id === projId);
                                  if (!project) return null;
                                  return (
                                    <div
                                      key={projId}
                                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs ${
                                        darkMode ? 'bg-[#2A2A2A] text-[#D0D0D0]' : 'bg-stone-100 text-stone-700'
                                      }`}
                                    >
                                      <span>{project.name}</span>
                                      <button
                                        onClick={() => handleToggleProjectForSample(sample.id, projId)}
                                        className={`${textTertiary} hover:text-red-500 transition-colors`}
                                      >
                                        <X className="size-3" />
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                            
                            {/* Dropdown to add projects */}
                            <select
                              value=""
                              onChange={(e) => {
                                if (e.target.value) {
                                  handleToggleProjectForSample(sample.id, e.target.value);
                                  e.target.value = ''; // Reset dropdown
                                }
                              }}
                              className={`w-full px-3 py-2 border ${inputBorder} rounded-lg ${inputBg} ${textPrimary} focus:border-stone-600 focus:outline-none transition-colors text-sm`}
                            >
                              <option value="">Add to project...</option>
                              {farmProjects.map((project) => {
                                const isSelected = selectedProjectIds.includes(project.id);
                                if (isSelected) return null; // Hide already selected projects
                                return (
                                  <option key={project.id} value={project.id} title={project.description}>
                                    {project.name} ({project.sampleCount} samples)
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              );
              })}
            </div>

            {/* Add Another Sample Button - Rectangle */}
            <div className="flex justify-center mb-4">
              <button
                onClick={handleAddAnotherSample}
                className="h-14 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg bg-[#F7DC6F] hover:bg-[#F4D03F] text-black hover:shadow-xl px-8"
                aria-label={testingMode === 'soil' ? 'Add Another Soil Sample' : 'Add Another Sample'}
              >
                <Plus className="size-6" strokeWidth={2.5} />
                <span className="whitespace-nowrap">
                  Add Another Sample
                </span>
              </button>
            </div>

            <div className={`rounded-xl p-4 border-2 ${darkMode ? 'bg-[#2A2A2A] border-[#3A3A3A]' : 'bg-stone-100 border-stone-300'}`}>
              <p className={`text-sm ${textSecondary}`}>
                <strong className={textPrimary}>Tip:</strong> {testingMode === 'soil' 
                  ? 'Use the copy icon to quickly duplicate samples with the same test package, or add a new sample with different settings.'
                  : 'Use the copy icon next to each sample to duplicate it, or click "Add Another" to configure a different sample type.'}
              </p>
            </div>
          </div>
        )}

        {/* STEP 3: Container ID Instructions & Delivery Options */}
        {step === 3 && (
          <div className="px-4 py-6 max-w-2xl mx-auto">
            <button
              onClick={handleBack}
              className={`flex items-center gap-2 mb-4 -ml-2 p-2 ${textSecondary} transition-colors ${darkMode ? 'hover:text-[#F0F0F0]' : 'hover:text-stone-800'}`}
            >
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Back</span>
            </button>

            {/* LABELING SECTION */}
            <div className="mb-12">
              <h2 className={`text-2xl font-bold ${textPrimary} mb-2`}>
                Label Your Sample Containers
              </h2>
              <p className={`text-sm ${textSecondary} mb-8`}>
                Each sample gets its own unique ID
              </p>

            {/* Sample IDs Display */}
            {samples.length === 1 ? (
              <div className={`${bgCard} border-2 ${borderColorStrong} rounded-2xl p-8 mb-6`}>
                <div className="flex items-start gap-6">
                  {/* Huge Sequential Number on Left */}
                  <div className={`text-8xl font-bold ${darkMode ? 'text-[#3A3A3A]' : 'text-stone-300'} leading-none`}>
                    1
                  </div>
                  
                  {/* Sample Info on Right */}
                  <div className="flex-1">
                    <div className={`text-5xl font-bold ${textPrimary} mb-2 tracking-tight font-mono`}>
                      {samplesWithIds[0]}
                    </div>
                    <div className={`text-sm ${textSecondary} mb-2`}>
                      {samples[0].categoryName} • {samples[0].packageName}
                    </div>
                    {samples[0].addOns.length > 0 && (
                      <div className={`text-xs ${textTertiary} mt-1`}>
                        + {samples[0].addOns.length} add-on{samples[0].addOns.length !== 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>

                {/* Image Upload Placeholder - Only for feeds mode */}
                {testingMode === 'feeds' && (
                  <div className="flex justify-center">
                    <button 
                      onClick={() => setShowPhotoUpload(true)}
                      className={`flex items-center gap-2 px-4 py-2.5 border ${darkMode ? 'border-[#3C3C3C]' : 'border-gray-300'} rounded-lg ${darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-100'} transition-colors text-sm font-medium ${textSecondary}`}
                    >
                      <Camera className="size-4" />
                      <span>Add Photo (optional)</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {samplesWithIds.map((sampleId, index) => (
                  <div key={index} className={`${bgCard} border-2 ${borderColorStrong} rounded-xl p-4`}>
                    <div className="flex items-start gap-4">
                      {/* Huge Number on Left */}
                      <div className={`text-6xl font-bold ${darkMode ? 'text-[#3A3A3A]' : 'text-stone-300'} leading-none`}>
                        {index + 1}
                      </div>
                      
                      {/* Sample Info on Right */}
                      <div className="flex-1">
                        {/* LARGE 4-character bag code */}
                        <div className={`text-4xl font-bold ${textPrimary} mb-2 tracking-tight font-mono`}>
                          {sampleId}
                        </div>
                        
                        {/* Sample Name (prominent) */}
                        <div className={`text-base font-semibold ${textPrimary} mb-2`}>
                          {samples[index].sampleName}
                        </div>
                        
                        {/* Sample type */}
                        <div className={`text-xs ${textSecondary} mb-1`}>
                          {samples[index].categoryName}
                        </div>

                        {/* Package name */}
                        <div className={`text-xs ${textSecondary} mb-1`}>
                          {samples[index].packageName}
                        </div>

                        {/* Add-ons count */}
                        {samples[index].addOns.length > 0 && (
                          <div className={`text-xs ${textTertiary} mb-1`}>
                            + {samples[index].addOns.length} add-on{samples[index].addOns.length !== 1 ? 's' : ''}
                          </div>
                        )}

                        {/* Farm field - Only for feeds mode */}
                        {testingMode === 'feeds' && (
                          <div className={`text-xs ${textSecondary} mb-2`}>
                            {samples[index].farm}
                          </div>
                        )}

                        {/* Image Placeholder - Only for feeds mode */}
                        {testingMode === 'feeds' && (
                          <button 
                            onClick={() => setShowPhotoUpload(true)}
                            className={`flex items-center gap-2 px-3 py-2 border ${darkMode ? 'border-[#3C3C3C]' : 'border-gray-300'} rounded-lg ${darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-100'} transition-colors text-xs font-medium ${textSecondary} mt-2`}
                          >
                            <Camera className="size-3.5" />
                            <span>Add Photo</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Labeling Instructions */}
            <div className={`${bgSecondary} border-2 ${inputBorder} rounded-2xl p-6 mb-6`}>
              <h3 className={`font-semibold ${textPrimary} mb-4`}>
                Labeling Instructions
              </h3>
              
              <div className={`space-y-2 text-sm ${textSecondary}`}>
                <div className="flex gap-3">
                  <span className={textTertiary}>•</span>
                  <span>Write the 4 digit Container ID clearly with a permanent black marker on the sample container (directly on the outside of the bag, jar, bottle, etc.)</span>
                </div>
                <div className="flex gap-3">
                  <span className={textTertiary}>•</span>
                  <span>Place the Container ID where it's clearly visible</span>
                </div>
                <div className="flex gap-3">
                  <span className={textTertiary}>•</span>
                  <span>Please ensure your sample will not leak during transit</span>
                </div>

                <div className={`flex gap-3 mt-4 pt-4 border-t ${darkMode ? 'border-[#3A3A3A]' : 'border-stone-300'}`}>
                  <span className={darkMode ? 'text-amber-500' : 'text-amber-600'}>⚠️</span>
                  <span className={darkMode ? 'text-amber-400' : 'text-amber-800'}><strong>Note:</strong> If the ink becomes illegible during transit, it may affect your turnaround time. Consider using a label or writing the ID on multiple sides.</span>
                </div>
              </div>
            </div>

            {/* ID Expiration Warning */}
            <div className={`rounded-xl p-4 flex gap-3 mb-6 ${darkMode ? 'bg-amber-900/20 border-2 border-amber-700' : 'bg-amber-50 border-2 border-amber-300'}`}>
              <AlertTriangle className={`size-5 flex-shrink-0 mt-0.5 ${darkMode ? 'text-amber-500' : 'text-amber-700'}`} />
              <div>
                <h4 className={`font-semibold mb-1 ${darkMode ? 'text-amber-400' : 'text-amber-900'}`}>Important: ID Expiration</h4>
                <p className={`text-sm ${darkMode ? 'text-amber-300' : 'text-amber-800'}`}>
                  Container IDs expire 30 days after generation. Please ship your samples within this timeframe to avoid re-submission.
                </p>
              </div>
            </div>
            </div>
          </div>
        )}

        {/* STEP 4: Delivery Details */}
        {step === 4 && (
          <div className="px-4 py-6 max-w-2xl mx-auto">
            <button
              onClick={handleBack}
              className={`flex items-center gap-2 mb-4 -ml-2 p-2 ${textSecondary} transition-colors ${darkMode ? 'hover:text-[#F0F0F0]' : 'hover:text-stone-800'}`}
            >
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Back</span>
            </button>

            <h1 className={`text-2xl font-semibold ${textPrimary} mb-8`}>
              Deliver
            </h1>

              {/* Delivery Options */}
              <div className={`${darkMode ? 'bg-[#1A1A1A]' : 'bg-stone-100'} border-2 ${inputBorder} rounded-2xl p-6 mb-6`}>
                <div className="mb-4">
                  <h3 className={`font-semibold ${textPrimary} mb-1`}>
                    Get Your Samples to Us
                  </h3>
                  <p className={`text-sm ${textSecondary}`}>
                    They will be assigned a unique sample identifier once we receive them
                  </p>
                </div>

              {/* Lab Location Selector */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="lab-select" className={`block text-sm font-medium ${textSecondary}`}>
                    Select Testing Lab Location
                  </label>
                  <button
                    type="button"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      darkMode 
                        ? 'bg-[#2A2A2A] text-[#D0D0D0] hover:bg-[#333333] border border-[#3A3A3A]' 
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                    }`}
                    onClick={() => {
                      // In a real implementation, this would use navigator.geolocation
                      alert('Location detection would automatically select your nearest lab location');
                    }}
                  >
                    <MapPin className="size-3.5" />
                    Detect Closest Lab
                  </button>
                </div>
                <select
                  id="lab-select"
                  value={selectedLab}
                  onChange={(e) => setSelectedLab(e.target.value)}
                  className={`w-full px-4 py-3 border-2 ${inputBorder} rounded-xl ${inputBg} ${textPrimary} focus:border-stone-600 focus:outline-none transition-colors`}
                >
                  <option value="watertown">Watertown, WI</option>
                  <option value="binghamton">Binghamton, NY</option>
                  <option value="colby">Colby, WI</option>
                  <option value="siouxfalls">Sioux Falls, SD</option>
                  <option value="visalia">Visalia, CA</option>
                  <option value="wooster">Wooster, OH</option>
                  <option value="edmondson">Edmondson, TX</option>
                  <option value="marne">Marne, MI</option>
                  <option value="nampa">Nampa, ID</option>
                  <option value="manheim">Manheim, PA</option>
                </select>
              </div>

              {/* Selected Lab Address */}
              <div className={`border-2 ${inputBorder} rounded-xl p-4 ${bgCard} transition-colors mb-5`}>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 text-blue-700 rounded-lg p-2.5">
                    <Mail className="size-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${textPrimary} mb-1`}>{labLocations[selectedLab as keyof typeof labLocations].name}</h4>
                    <p className={`text-sm ${textSecondary} mb-2`}>
                      Ship your samples to this lab location
                    </p>
                    <div className={`text-xs ${textSecondary} ${bgSecondary} rounded-lg p-2 font-mono whitespace-pre-line mb-3`}>
                      {labLocations[selectedLab as keyof typeof labLocations].address}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-orange-300' : 'text-orange-700'} ${darkMode ? 'bg-orange-900/20' : 'bg-orange-50'} rounded-lg p-2 border ${darkMode ? 'border-orange-800' : 'border-orange-200'}`}>
                      <strong>Note:</strong> Long delivery times, especially in hot conditions, can affect the integrity of your sample. Ship quickly to ensure accurate results.
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Method Cards */}
              <div className="space-y-3 mb-5">
                {/* Dropboxes */}
                <div className={`border-2 rounded-xl p-4 transition-colors ${darkMode ? 'border-[#3A3A3A] hover:border-[#4A4A4A]' : 'border-stone-200 hover:border-stone-400'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`rounded-lg p-2.5 ${darkMode ? 'bg-[#2d7a3e]/30 text-[#2d7a3e]' : 'bg-[#2d7a3e]/10 text-[#2d7a3e]'}`}>
                      <MapPin className="size-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold mb-1 ${textPrimary}`}>Dropbox Locations</h4>
                      <p className={`text-sm mb-3 ${textSecondary}`}>
                        Convenient dropboxes across the country for local pickup
                      </p>
                      <button 
                        onClick={() => onShowDropboxMap?.()}
                        className={`text-sm font-medium underline ${darkMode ? 'text-[#B0B0B0] hover:text-[#D0D0D0]' : 'text-stone-700 hover:text-stone-900'}`}
                      >
                        View Dropbox Map →
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`rounded-lg p-3 border-2 ${darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'}`}>
                <p className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                  <strong>Fastest turnaround:</strong> Use a dropbox or UPS Next Day Air for the fastest results.
                </p>
              </div>
            </div>

            {/* Minimum Mass Requirements */}
            <div className={`${bgCard} border-2 ${borderColor} rounded-2xl p-6 mb-6`}>
              <h3 className={`font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
                <AlertTriangle className={`size-5 ${textSecondary}`} />
                Minimum Sample Mass Requirements
              </h3>
              
              <p className={`text-sm ${textSecondary} mb-4`}>
                Please ensure your samples meet the minimum mass requirements for accurate testing:
              </p>

              <div className="space-y-3">
                {/* Determine unique sample categories and their requirements */}
                {(() => {
                  const uniqueCategories = new Set(samples.map(s => s.category));
                  const requirements = [];

                  if (Array.from(uniqueCategories).some(cat => ['corn-silage', 'alfalfa', 'hay-haylage', 'tmr'].includes(cat || ''))) {
                    requirements.push({
                      type: 'Forage Samples',
                      details: 'Corn Silage, Alfalfa, Hay/Haylage, TMR',
                      requirement: '500 grams minimum (approximately 2 cups)'
                    });
                  }

                  if (Array.from(uniqueCategories).some(cat => ['corn-grain', 'grains-commodities'].includes(cat || ''))) {
                    requirements.push({
                      type: 'Grain Samples',
                      details: 'Corn Grain, Other Grains',
                      requirement: '1,000 grams minimum (approximately 1 quart)'
                    });
                  }

                  if (uniqueCategories.has('water')) {
                    requirements.push({
                      type: 'Water Samples',
                      details: 'Water',
                      requirement: '500 mL minimum (standard water bottle)'
                    });
                  }

                  if (uniqueCategories.has('fecal')) {
                    requirements.push({
                      type: 'Fecal Samples',
                      details: 'Fecal material',
                      requirement: '200 grams minimum (approximately ¾ cup)'
                    });
                  }

                  if (uniqueCategories.has('misc-other')) {
                    requirements.push({
                      type: 'Miscellaneous Samples',
                      details: 'Other sample types',
                      requirement: 'Contact lab team for specific requirements'
                    });
                  }

                  return requirements.map((req, idx) => (
                    <div key={idx} className={`${bgSecondary} border ${borderColor} rounded-lg p-4`}>
                      <div className="flex items-start gap-3">
                        <div className={`size-2 rounded-full ${darkMode ? 'bg-stone-400' : 'bg-stone-600'} mt-2 flex-shrink-0`}></div>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${textPrimary} mb-1`}>{req.type}</h4>
                          <p className={`text-xs ${textTertiary} mb-2`}>{req.details}</p>
                          <p className={`text-sm ${textSecondary}`}>
                            <strong>Minimum:</strong> {req.requirement}
                          </p>
                        </div>
                      </div>
                    </div>
                  ));
                })()}
              </div>

              <div className={`mt-4 rounded-lg p-3 border ${darkMode ? 'bg-amber-900/20 border-amber-800' : 'bg-amber-50 border-amber-300'}`}>
                <p className={`text-xs ${darkMode ? 'text-amber-300' : 'text-amber-900'}`}>
                  <strong>Important:</strong> Insufficient sample mass may result in incomplete testing or require resubmission. When in doubt, send more material.
                </p>
              </div>
            </div>

            {/* Estimated Turn Around Times */}
            {(() => {
              // Determine turnaround time based on selected packages in samples
              const getTurnaroundInfo = () => {
                // Get all unique packages from samples
                const packageIds = [...new Set(samples.map(s => s.package))];
                
                // Categorize packages
                const standardPackages = ['standard', 'nutritionist', 'water-basic', 'fecal-basic', 'soil-basic', 'soil-standard'];
                const premiumPackages = ['premium', 'water-complete', 'fecal-complete', 'soil-complete'];
                
                // Check if any premium packages are selected
                const hasPremium = packageIds.some(pkg => premiumPackages.includes(pkg));
                const hasStandard = packageIds.some(pkg => standardPackages.includes(pkg));
                
                if (hasPremium) {
                  return {
                    category: 'Premium & Complete Testing',
                    time: '7-10 business days',
                    message: 'Because you selected a Complete/Premium package, your samples will undergo comprehensive analysis.',
                    color: 'bg-purple-600'
                  };
                } else if (hasStandard) {
                  return {
                    category: 'Standard Testing',
                    time: '3-5 business days',
                    message: 'Because you selected a Standard/Basic package, your samples will be processed on our standard timeline.',
                    color: 'bg-green-600'
                  };
                }
                
                return null;
              };
              
              const turnaroundInfo = getTurnaroundInfo();
              
              if (!turnaroundInfo) return null;
              
              return (
                <div className={`${bgCard} border-2 ${borderColor} rounded-2xl p-6 mb-6`}>
                  <h3 className={`font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
                    <Clock className={`size-5 ${textSecondary}`} />
                    Estimated Turn Around Time
                  </h3>
                  
                  <p className={`text-sm ${textSecondary} mb-4`}>
                    {turnaroundInfo.message}
                  </p>

                  <div className={`${bgSecondary} border ${borderColor} rounded-lg p-4`}>
                    <div className="flex items-start gap-3">
                      <div className={`size-2 rounded-full ${turnaroundInfo.color} mt-2 flex-shrink-0`}></div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${textPrimary} mb-1`}>{turnaroundInfo.category}</h4>
                        <p className={`text-sm ${textSecondary}`}>
                          <strong>Expected Turnaround:</strong> {turnaroundInfo.time}
                        </p>
                        <p className={`text-xs ${textTertiary} mt-2`}>
                          Processing time begins when your sample arrives at the lab
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Test Summary & Cost Breakdown */}
            <div className={`${bgCard} border-2 ${borderColor} rounded-2xl p-6`}>
              <h3 className={`font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
                <Package className={`size-5 ${textSecondary}`} />
                Order Summary
              </h3>
              
              <div className="space-y-6">
                {/* Samples Breakdown */}
                <div>
                  <h4 className={`text-sm font-semibold ${textSecondary} mb-3 uppercase tracking-wide`}>
                    Samples ({samples.length})
                  </h4>
                  <div className="space-y-2">
                    {samples.map((sample, idx) => {
                      // Find package details
                      const allPackages = [...packages, ...waterPackages, ...fecalPackages, ...soilPackages];
                      const pkg = allPackages.find(p => p.id === sample.package);
                      const packagePrice = pkg?.price ? parseFloat(pkg.price.replace('$', '')) : 0;
                      
                      // Calculate add-ons cost for this sample
                      const allAddOns = [...mineralAddOns, ...hygieneAddOns, ...toxinAddOns, ...inSituAddOns, ...otherAddOns];
                      const sampleAddOns = (sample.addOns || []).map(addOnId => 
                        allAddOns.find(a => a.id === addOnId)
                      ).filter(Boolean);
                      const addOnsTotal = sampleAddOns.reduce((sum, addOn) => 
                        sum + (addOn?.price ? parseFloat(addOn.price.replace('$', '')) : 0), 0
                      );
                      
                      const sampleTotal = packagePrice + addOnsTotal;
                      
                      return (
                        <div key={idx} className={`${bgSecondary} border ${borderColor} rounded-lg p-3`}>
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex-1">
                              <div className={`font-semibold ${textPrimary} text-sm`}>
                                {sample.name || `Sample ${idx + 1}`}
                              </div>
                              <div className={`text-xs ${textTertiary} mt-0.5`}>
                                {sample.category?.split('-').map(word => 
                                  word.charAt(0).toUpperCase() + word.slice(1)
                                ).join(' ')}
                              </div>
                            </div>
                            <div className={`text-lg font-bold ${textPrimary}`}>
                              ${sampleTotal.toFixed(2)}
                            </div>
                          </div>
                          
                          {/* Package */}
                          <div className={`text-xs ${textSecondary} space-y-1`}>
                            <div className="flex items-center justify-between">
                              <span>• {pkg?.name || 'Package'}</span>
                              <span className={`font-medium ${textPrimary}`}>{pkg?.price || '$0.00'}</span>
                            </div>
                            
                            {/* Add-ons if any */}
                            {sampleAddOns.length > 0 && (
                              <>
                                {sampleAddOns.map((addOn, addOnIdx) => (
                                  <div key={addOnIdx} className="flex items-center justify-between">
                                    <span>• {addOn.name}</span>
                                    <span className={`font-medium ${textPrimary}`}>{addOn.price}</span>
                                  </div>
                                ))}
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Total Cost */}
                <div className={`border-t-2 ${borderColor} pt-4`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-base font-semibold ${textSecondary}`}>Subtotal</span>
                    <span className={`text-base font-semibold ${textPrimary}`}>
                      ${(() => {
                        const allPackages = [...packages, ...waterPackages, ...fecalPackages, ...soilPackages];
                        const allAddOns = [...mineralAddOns, ...hygieneAddOns, ...toxinAddOns, ...inSituAddOns, ...otherAddOns];
                        
                        return samples.reduce((total, sample) => {
                          const pkg = allPackages.find(p => p.id === sample.package);
                          const packagePrice = pkg?.price ? parseFloat(pkg.price.replace('$', '')) : 0;
                          
                          const sampleAddOns = (sample.addOns || []).map(addOnId => 
                            allAddOns.find(a => a.id === addOnId)
                          ).filter(Boolean);
                          const addOnsTotal = sampleAddOns.reduce((sum, addOn) => 
                            sum + (addOn?.price ? parseFloat(addOn.price.replace('$', '')) : 0), 0
                          );
                          
                          return total + packagePrice + addOnsTotal;
                        }, 0).toFixed(2);
                      })()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-sm ${textTertiary}`}>Estimated shipping</span>
                    <span className={`text-sm ${textSecondary}`}>Varies by method</span>
                  </div>
                  
                  <div className={`${darkMode ? 'bg-[#2d7a3e]/20 border-[#2d7a3e]' : 'bg-[#2d7a3e]/10 border-[#2d7a3e]'} border-2 rounded-xl p-4`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-xl font-bold ${textPrimary}`}>Estimated Total</span>
                      <span className={`text-3xl font-bold ${darkMode ? 'text-[#2d7a3e]' : 'text-[#2d7a3e]'}`}>
                        ${(() => {
                          const allPackages = [...packages, ...waterPackages, ...fecalPackages, ...soilPackages];
                          const allAddOns = [...mineralAddOns, ...hygieneAddOns, ...toxinAddOns, ...inSituAddOns, ...otherAddOns];
                          
                          return samples.reduce((total, sample) => {
                            const pkg = allPackages.find(p => p.id === sample.package);
                            const packagePrice = pkg?.price ? parseFloat(pkg.price.replace('$', '')) : 0;
                            
                            const sampleAddOns = (sample.addOns || []).map(addOnId => 
                              allAddOns.find(a => a.id === addOnId)
                            ).filter(Boolean);
                            const addOnsTotal = sampleAddOns.reduce((sum, addOn) => 
                              sum + (addOn?.price ? parseFloat(addOn.price.replace('$', '')) : 0), 0
                            );
                            
                            return total + packagePrice + addOnsTotal;
                          }, 0).toFixed(2);
                        })()}
                      </span>
                    </div>
                    <p className={`text-xs ${textTertiary} mt-2`}>
                      Results will become available immediately as long as your account balance is paid
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Fixed Bottom Action Bar */}
      <div className={`fixed bottom-0 left-0 right-0 ${bgSecondary} border-t-2 ${borderColor} p-4 shadow-lg z-20`}>
        {step === 1 && (
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <button
              onClick={handleContinueToReview}
              disabled={(!selectedPackage && !selectedCustomPackage) || (selectedPackage === 'addons-only' && selectedAddOns.length === 0)}
              className={`flex-1 py-4 rounded-xl font-semibold transition-all ${ 
                (selectedPackage || selectedCustomPackage) && !(selectedPackage === 'addons-only' && selectedAddOns.length === 0)
                  ? 'bg-[#2d7a3e] hover:bg-[#246630] text-white shadow-md active:scale-98'
                  : darkMode
                    ? 'bg-[#2A2A2A] text-[#707070] cursor-not-allowed'
                    : 'bg-stone-300 text-stone-500 cursor-not-allowed'
              }`}
            >
              {editingSampleId ? 'Update Sample' : 'Continue to Review'}
            </button>
            
            {/* Chat Button - Hidden in cannabis mode */}
            {headerTheme !== 'grey' && (
              <button 
                onClick={() => alert('Live chat would open here. Average response time: 3 minutes')}
                className={`group h-16 rounded-full shadow-2xl transition-all duration-300 ease-in-out hover:w-60 hover:rounded-2xl w-16 flex items-center overflow-hidden ${
                  darkMode 
                    ? 'bg-[#252525] hover:bg-[#2C2C2C] border-2 border-[#3A3A3A]'
                    : 'bg-white hover:bg-gray-50 border-2 border-gray-300'
                }`}
              >
                <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className={`w-6 h-6 ${darkMode ? 'text-[#B8B8B8]' : 'text-[#1a1a1a]'}`} strokeWidth={2.5} />
                </div>
                <div className="ml-1 w-0 group-hover:w-auto opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pr-4 overflow-hidden">
                  <div className={`font-bold text-sm text-left ${darkMode ? 'text-[#F0F0F0]' : 'text-gray-900'}`}>Chat with Our Lab Team</div>
                  <div className={`text-xs text-left ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>~3 min response</div>
                </div>
              </button>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={handleContinueToLabeling}
              className="w-full py-4 rounded-xl font-semibold transition-all shadow-md active:scale-98 bg-[#2d7a3e] hover:bg-[#246630] text-white"
            >
              Continue to Labeling
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => {
                setStep(4);
                // Scroll to top when arriving at step 4
                setTimeout(() => {
                  const mainContent = document.querySelector('main.overflow-y-auto');
                  if (mainContent) {
                    mainContent.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }, 100);
              }}
              className="w-full py-4 rounded-xl font-semibold transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 bg-[#2d7a3e] hover:bg-[#245a2f] text-white"
            >
              <CheckCircle2 className="size-5" />
              <span>Samples all clearly labeled</span>
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => {
                if (onSubmit) {
                  onSubmit(samples);
                }
                setShowSuccessAnimation(true);
              }}
              className="w-full py-4 rounded-xl font-semibold transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 bg-[#2d7a3e] hover:bg-[#245a2f] text-white"
            >
              <span>Submit Samples</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.4s ease-out;
        }

        @keyframes checkmark {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes success-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes float-up {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }

        .animate-checkmark {
          animation: checkmark 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .animate-success-fade-in {
          animation: success-fade-in 0.3s ease-out;
        }

        .animate-float-up {
          animation: float-up 3s ease-in-out infinite;
        }

        .animate-float-up-delayed {
          animation: float-up 3.5s ease-in-out infinite;
          animation-delay: 0.5s;
        }

        .animate-float-up-slow {
          animation: float-up 4s ease-in-out infinite;
          animation-delay: 1s;
        }

        @keyframes scale-in {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-scale-in {
          animation: scale-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .delay-100 {
          animation-delay: 0.1s;
        }
      `}</style>



      {/* Success Animation Overlay */}
      {showSuccessAnimation && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center animate-success-fade-in">
          {/* Floating celebration emojis */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[20%] left-[10%] text-4xl animate-float-up opacity-80">🎊</div>
            <div className="absolute top-[30%] right-[15%] text-5xl animate-float-up-delayed opacity-80">🎉</div>
            <div className="absolute top-[15%] left-[70%] text-3xl animate-float-up-slow opacity-80">✨</div>
            <div className="absolute top-[40%] left-[20%] text-4xl animate-float-up-delayed opacity-80">⭐</div>
            <div className="absolute top-[25%] right-[25%] text-3xl animate-float-up opacity-80">🌟</div>
            <div className="absolute top-[35%] right-[60%] text-4xl animate-float-up-slow opacity-80">💚</div>
          </div>
          
          <div className={`${darkMode ? 'bg-[#252525]' : 'bg-white'} rounded-3xl p-10 flex flex-col items-center gap-5 shadow-2xl max-w-md mx-4 relative z-10 animate-scale-in`}>
            {/* Celebratory Icon */}
            <div className="relative">
              <div className="bg-[#2d7a3e] rounded-full p-5 animate-checkmark shadow-xl">
                <CheckCircle2 className="size-20 text-white" strokeWidth={2.5} />
              </div>
              {/* Sparkle effects */}
              <div className="absolute -top-3 -right-3 text-4xl animate-bounce">✨</div>
              <div className="absolute -bottom-3 -left-3 text-4xl animate-bounce" style={{ animationDelay: '0.15s' }}>🎉</div>
            </div>
            
            {/* Success Message */}
            <div className="text-center space-y-3">
              <h3 className={`text-3xl font-bold ${darkMode ? 'text-[#E0E0E0]' : 'text-gray-900'}`}>
                Samples Successfully Submitted!
              </h3>
              <p className={`text-lg ${darkMode ? 'text-[#C0C0C0]' : 'text-gray-600'}`}>
                We can't wait to see them
              </p>
            </div>

            {/* Return Button */}
            <button
              onClick={() => {
                setShowSuccessAnimation(false);
                onClose();
              }}
              className={`mt-2 px-8 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95 ${
                darkMode 
                  ? 'bg-[#2d7a3e] hover:bg-[#246630] text-white' 
                  : 'bg-[#2d7a3e] hover:bg-[#246630] text-white'
              }`}
            >
              Return to Main Screen
            </button>
          </div>
        </div>
      )}

      {/* Photo Upload Modal */}
      {showPhotoUpload && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className={`${bgCard} rounded-2xl shadow-2xl max-w-md w-full`}>
            <div className={`px-6 py-4 border-b ${borderColor} flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className={`${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'} p-2 rounded-lg`}>
                  <Camera className={`size-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <h2 className={`text-xl font-semibold ${textPrimary}`}>
                  Add Sample Photo
                </h2>
              </div>
              <button
                onClick={() => setShowPhotoUpload(false)}
                className={`p-2 ${hoverBg} rounded-full transition-colors`}
              >
                <X className={`size-5 ${textSecondary}`} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className={`border-2 border-dashed ${borderColor} rounded-xl p-8 text-center ${hoverBg} transition-all cursor-pointer`}>
                <Camera className={`size-12 ${textTertiary} mx-auto mb-3`} />
                <p className={`text-sm font-medium ${textPrimary} mb-1`}>
                  Click to upload or drag and drop
                </p>
                <p className={`text-xs ${textTertiary}`}>
                  PNG, JPG or HEIC up to 10MB
                </p>
              </div>

              <div className={`rounded-lg p-3 ${darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
                <p className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                  <strong>Tip:</strong> Photos help our lab team verify sample quality and can be referenced later for quality control.
                </p>
              </div>

              <div className="space-y-2">
                <label className={`text-sm font-medium ${textPrimary}`}>
                  Photo Description (optional)
                </label>
                <textarea
                  placeholder="E.g., Sample taken from top layer of bunker silo..."
                  className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-[#2C2C2C] border-[#3C3C3C] text-[#E0E0E0]' : 'bg-white border-gray-300 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-green-500 text-sm`}
                  rows={3}
                />
              </div>
            </div>

            <div className={`px-6 py-4 border-t ${borderColor} flex gap-2`}>
              <button
                onClick={() => {
                  alert('Photo upload functionality coming soon! This feature will allow you to attach field photos to your samples.');
                  setShowPhotoUpload(false);
                }}
                className={`flex-1 px-4 py-3 ${darkMode ? 'bg-[#2d7a3e] hover:bg-[#246630]' : 'bg-[#2d7a3e] hover:bg-[#246630]'} text-white rounded-lg transition-colors font-medium`}
              >
                Upload Photo
              </button>
              <button
                onClick={() => setShowPhotoUpload(false)}
                className={`px-4 py-3 ${darkMode ? 'bg-[#2C2C2C] hover:bg-[#333]' : 'bg-gray-200 hover:bg-gray-300'} ${textPrimary} rounded-lg transition-colors font-medium`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recreate Previous Submission Modal */}
      {showRecreatePreviousModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowRecreatePreviousModal(false)}>
          <div 
            className={`${bgCard} rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border-2 ${
              darkMode ? 'border-[#2d7a3e]' : 'border-[#2d7a3e]/50'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`px-6 py-4 border-b ${darkMode ? 'border-[#2C2C2C]' : 'border-gray-200'} flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className={`${darkMode ? 'bg-[#2d7a3e]/30' : 'bg-[#2d7a3e]/10'} rounded-full p-2`}>
                  <Clock className={`size-6 ${darkMode ? 'text-[#2d7a3e]' : 'text-[#2d7a3e]'}`} />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${textPrimary}`}>Recreate Previous Submission</h3>
                  <p className={`text-sm ${textSecondary}`}>Select an order to use as a template</p>
                </div>
              </div>
              <button
                onClick={() => setShowRecreatePreviousModal(false)}
                className={`p-2 ${darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-100'} rounded-full transition-colors`}
              >
                <X className={`size-5 ${textSecondary}`} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
              {previousSamples.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleRecreatePrevious(sample)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left group ${
                    darkMode 
                      ? 'bg-[#1E1E1E] border-[#3A3A3A] hover:border-[#2d7a3e] hover:bg-[#252525]' 
                      : 'bg-white border-gray-200 hover:border-[#2d7a3e] hover:bg-[#2d7a3e]/5'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className={`size-4 ${textTertiary}`} />
                        <span className={`text-sm font-semibold ${darkMode ? 'text-[#2d7a3e]' : 'text-[#2d7a3e]'}`}>
                          {sample.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          darkMode ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {sample.packageName}
                        </span>
                        {sample.addOns.length > 0 && sample.addOns.map((addOn, idx) => (
                          <span key={idx} className={`text-xs px-2 py-1 rounded-full ${
                            darkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-700'
                          }`}>
                            +{addOn}
                          </span>
                        ))}
                      </div>
                      {/* Sample list */}
                      <div className={`space-y-1.5 mt-2 ${darkMode ? 'bg-[#252525]' : 'bg-gray-50'} rounded-lg p-2`}>
                        {sample.samples.map((s, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className={`size-1.5 rounded-full ${darkMode ? 'bg-[#2d7a3e]' : 'bg-[#2d7a3e]'}`}></div>
                            <span className={`text-xs ${textPrimary}`}>{s.name}</span>
                            <span className={`text-xs ${textTertiary}`}>•</span>
                            <span className={`text-xs ${textSecondary}`}>{s.type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 ${darkMode ? 'text-[#2d7a3e]' : 'text-[#2d7a3e]'} group-hover:scale-110 transition-transform`}>
                      <Copy className="size-5" />
                    </div>
                  </div>
                  <div className={`text-xs ${textSecondary} flex items-center gap-2 mt-2`}>
                    <MapPin className="size-3" />
                    <span>{sample.farm}</span>
                  </div>
                </button>
              ))}

              {previousSamples.length === 0 && (
                <div className={`text-center py-12 ${textSecondary}`}>
                  <Copy className="size-12 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">No previous submissions found</p>
                  <p className="text-sm mt-1">Your past orders will appear here</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={`px-6 py-4 border-t ${darkMode ? 'border-[#2C2C2C]' : 'border-gray-200'} flex items-center justify-between`}>
              <p className={`text-sm ${textTertiary}`}>
                <Info className="size-4 inline mr-1" />
                Sample names will be copied with "(Copy)" suffix
              </p>
              <button
                onClick={() => setShowRecreatePreviousModal(false)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  darkMode 
                    ? 'bg-[#2C2C2C] hover:bg-[#333] text-[#E0E0E0]' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}