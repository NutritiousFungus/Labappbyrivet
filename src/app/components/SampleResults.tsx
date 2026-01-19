import { ArrowLeft, Share2, Download, FileText, Code, Table, ChevronDown, ChevronUp, X, Info, StickyNote, BookOpen, Save, Trash2, Camera, Plus, AlertCircle, Beaker, FlaskConical, Beef, CheckCircle2, Circle, FolderOpen, Pencil, Check, Lightbulb } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface Organization {
  name: string;
  color: string;
}

interface Project {
  id: string;
  name: string;
  sampleCount: number;
  sharedWith: Organization[];
  isShared: boolean;
  createdDate: string;
}

interface SampleResultsProps {
  sampleId: string;
  onBack: () => void;
  darkMode?: boolean;
  sampleName?: string;
  bagLabelId?: string;
  testPackage: string;
  sampleType: string;
  addOns?: string[];
  testingMode?: 'feeds' | 'soil';
  sampleStatus?: string;
  availableProjects?: Project[];
  currentProjectId?: string | null | string[]; // Support both single and array
  onProjectAssign?: (projectIds: string[] | null) => void;
  createdDate?: string;
  pendingTests?: string[];
  completedTests?: string[];
}

interface AnalysisParameter {
  name: string;
  asFed: string;
  dryMatter: string;
  unit: string;
}

interface ParameterInfo {
  name: string;
  description: string;
  animalBenefits: string[];
  idealRange: string;
  concerns: {
    low: string;
    high: string;
  };
  sampleTypeSpecific?: Record<string, string>;
}

const parameterDatabase: Record<string, ParameterInfo> = {
  'Dry Matter': {
    name: 'Dry Matter (DM)',
    description: 'The portion of feed remaining after all moisture is removed. Critical for accurate ration formulation and comparing feeds.',
    animalBenefits: [
      'Ensures accurate feed intake calculations',
      'Helps maintain consistent dry matter intake across the herd',
      'Essential for proper nutrient density in rations'
    ],
    idealRange: 'Varies by feed type: Silages 30-40%, Haylage 40-60%, Dry hay 85-90%',
    concerns: {
      low: 'Too wet feeds can limit dry matter intake, reduce storage stability, and increase risk of spoilage or leachate losses.',
      high: 'Overly dry forages may indicate heat damage, reduced palatability, or poor fermentation in ensiled feeds.'
    },
    sampleTypeSpecific: {
      'Corn Silage': 'Target 32-38% DM. Lower DM silages pack better but risk seepage. Higher DM improves intake but may have poor fermentation.',
      'Hay/Haylage': 'Haylage: 45-55% DM ideal for stable fermentation. Dry hay: >85% DM to prevent mold.',
      'TMR': 'Target 50-55% DM for lactating cows. Maintains consistent intake and prevents sorting.',
      'Grains/Commodities': 'Most grains 85-90% DM. Moisture above 14% increases storage risk and mold growth.'
    }
  },
  'Crude Protein': {
    name: 'Crude Protein (CP)',
    description: 'Total nitrogen content multiplied by 6.25. Represents all protein forms including true protein, non-protein nitrogen, and bound proteins.',
    animalBenefits: [
      'Supports milk production and composition',
      'Essential for muscle growth and maintenance',
      'Required for microbial protein synthesis in the rumen',
      'Critical for reproduction and immune function'
    ],
    idealRange: 'Dairy: 16-18% of diet DM, Beef: 12-14% of diet DM (varies by production stage)',
    concerns: {
      low: 'Inadequate protein limits milk production, reduces feed efficiency, impairs reproduction, and compromises immune response.',
      high: 'Excess protein increases feed costs, nitrogen excretion, and environmental impact. May reduce feed efficiency and increase metabolic stress.'
    },
    sampleTypeSpecific: {
      'Corn Silage': 'Typically 7-9% CP. Whole plant corn silage is an energy feed, not a protein source.',
      'Hay/Haylage': 'Alfalfa: 18-22% CP (excellent protein). Grass hay: 8-12% CP. Quality depends on maturity at harvest.',
      'TMR': 'Should be balanced to herd needs: 16-18% for lactating dairy, 12-14% for dry cows.',
      'Grains/Commodities': 'Corn: 8-10% CP. Soybean meal: 44-48% CP. Use to balance ration protein levels.'
    }
  },
  'NDF': {
    name: 'Neutral Detergent Fiber (NDF)',
    description: 'Measures total plant cell wall material including cellulose, hemicellulose, and lignin. Represents the "bulk" or slowly digestible fiber fraction.',
    animalBenefits: [
      'Stimulates rumination and saliva production',
      'Maintains proper rumen pH and prevents acidosis',
      'Provides slow-release energy from fiber digestion',
      'Promotes gut fill and satiety'
    ],
    idealRange: 'Dairy rations: 28-35% of diet DM, with 18-22% from forage',
    concerns: {
      low: 'Insufficient NDF increases acidosis risk, reduces butterfat, causes digestive upset, and lowers overall herd health.',
      high: 'Excessive NDF limits dry matter intake and energy density, reducing milk production and performance.'
    },
    sampleTypeSpecific: {
      'Corn Silage': 'Target 40-45% NDF. Lower NDF allows higher inclusion rates. Brown midrib (BMR) varieties offer more digestible NDF.',
      'Hay/Haylage': 'Legumes: 35-45% NDF. Grasses: 50-65% NDF. Lower NDF indicates earlier maturity and higher quality.',
      'TMR': 'Balance total ration NDF to support intake while maintaining rumen health.',
      'Grains/Commodities': 'Grains are low NDF feeds (corn ~10% NDF). Used to dilute high-fiber forages.'
    }
  },
  'ADF': {
    name: 'Acid Detergent Fiber (ADF)',
    description: 'Measures the less digestible portion of plant cell walls, mainly cellulose and lignin. Strong predictor of forage energy value.',
    animalBenefits: [
      'Lower ADF means higher energy availability',
      'Predicts feed digestibility and animal performance',
      'Helps estimate total digestible nutrients (TDN)'
    ],
    idealRange: 'Forages: <30% for high-quality dairy forage, <40% for beef cattle',
    concerns: {
      low: 'Very low ADF in forages may indicate inadequate effective fiber for rumination.',
      high: 'High ADF reduces digestibility, energy content, and voluntary intake. Limits production potential.'
    },
    sampleTypeSpecific: {
      'Corn Silage': 'Target <26% ADF for high-quality silage. Above 28% indicates mature plants with lower energy.',
      'Hay/Haylage': 'Premium alfalfa: <31% ADF. Grass hay: <35% ADF. Higher ADF = lower quality and energy.',
      'TMR': 'Monitor ADF to ensure adequate energy density in the total ration.',
      'Grains/Commodities': 'Grains naturally low in ADF. High ADF in commodities suggests poor quality or contamination.'
    }
  },
  'Starch': {
    name: 'Starch',
    description: 'Primary storage carbohydrate in grains and energy-dense forages. Rapidly fermentable energy source in the rumen.',
    animalBenefits: [
      'Provides readily available energy for milk production',
      'Supports microbial growth and protein synthesis',
      'Cost-effective energy source',
      'Improves body condition when managed properly'
    ],
    idealRange: 'Dairy: 24-28% of diet DM, Beef finishing: 35-45% of diet DM',
    concerns: {
      low: 'Insufficient starch can limit milk production and microbial protein synthesis.',
      high: 'Excess starch increases acidosis risk, reduces fiber digestion, and causes digestive upset and laminitis.'
    },
    sampleTypeSpecific: {
      'Corn Silage': 'Typically 30-35% starch. High-moisture corn silage offers excellent starch availability.',
      'Hay/Haylage': 'Minimal starch content. Hay is primarily a fiber source.',
      'TMR': 'Balance starch levels based on herd production and forage NDF digestibility.',
      'Grains/Commodities': 'Corn grain: 70-73% starch. Primary starch source in most rations.'
    }
  },
  'Ash': {
    name: 'Ash',
    description: 'Total mineral content remaining after complete combustion. Indicates overall mineral levels and soil contamination.',
    animalBenefits: [
      'Essential minerals for bone development',
      'Supports enzyme function and metabolism',
      'Required for milk production and reproduction'
    ],
    idealRange: 'Forages: 6-10%, Grains: 1-3%',
    concerns: {
      low: 'Very low ash suggests minimal mineral content, requiring supplementation.',
      high: 'Elevated ash often indicates soil contamination, reducing feed quality and potentially introducing harmful contaminants.'
    },
    sampleTypeSpecific: {
      'Corn Silage': 'Target 3-4% ash. Above 5% suggests soil contamination from harvest.',
      'Hay/Haylage': 'Typical range 7-10%. Legumes naturally higher than grasses.',
      'TMR': 'Monitor total ash to detect contamination in feedstuffs.',
      'Grains/Commodities': 'Very low ash (1-3%). High ash indicates foreign material.'
    }
  },
  'Fat': {
    name: 'Fat (Ether Extract)',
    description: 'Total lipid content including true fats, oils, waxes, and pigments. Concentrated energy source providing 2.25x more energy than carbohydrates.',
    animalBenefits: [
      'Increases energy density of ration',
      'Improves feed efficiency and milk fat percentage',
      'Reduces heat increment in hot weather',
      'Provides essential fatty acids'
    ],
    idealRange: 'Total diet: 5-7% of DM (maximum ~7% to avoid fiber digestion issues)',
    concerns: {
      low: 'Low-fat diets may lack energy density for high-producing animals.',
      high: 'Excess fat (>7% of diet DM) can reduce fiber digestibility and cause digestive upset.'
    },
    sampleTypeSpecific: {
      'Corn Silage': 'Typically 3-4% fat, relatively high for a forage.',
      'Hay/Haylage': 'Low fat content, usually 2-3%.',
      'TMR': 'Balance to achieve 5-7% total diet fat for optimal energy.',
      'Grains/Commodities': 'Corn: 3-4%. Whole soybeans/seeds used as fat sources: 18-20%.'
    }
  },
  'Sugar': {
    name: 'Sugar (WSC - Water Soluble Carbohydrates)',
    description: 'Simple carbohydrates that are rapidly fermented in the rumen. Includes glucose, fructose, and sucrose.',
    animalBenefits: [
      'Quick energy source for rumen microbes',
      'Improves silage fermentation',
      'Enhances palatability',
      'Supports immediate energy needs'
    ],
    idealRange: 'Forages: 5-10% of DM in ration',
    concerns: {
      low: 'Low sugar may reduce silage fermentation quality and microbial energy.',
      high: 'Very high sugar (>15% total diet) can increase acidosis risk and reduce fat test in milk.'
    },
    sampleTypeSpecific: {
      'Corn Silage': 'Variable: 1-5%, higher in immature plants. Supports good fermentation.',
      'Hay/Haylage': 'Cool-season grasses: 8-15% WSC. Legumes lower: 4-8%.',
      'TMR': 'Monitor total sugar to balance rapid vs. slow rumen fermentation.',
      'Grains/Commodities': 'Low sugar in most grains. Molasses added for palatability: 45-60% sugar.'
    }
  },
  'NFC': {
    name: 'Non-Fiber Carbohydrates (NFC)',
    description: 'Includes starch, sugars, pectin, and organic acids. Calculated as: 100 - (NDF + CP + Fat + Ash). Highly fermentable energy fraction.',
    animalBenefits: [
      'Primary energy source for high production',
      'Supports microbial protein synthesis',
      'More digestible than fiber carbohydrates',
      'Cost-effective energy for performance'
    ],
    idealRange: 'Dairy: 35-45% of diet DM',
    concerns: {
      low: 'Low NFC limits energy intake and production potential.',
      high: 'Excess NFC (>45%) increases acidosis risk and reduces forage utilization.'
    },
    sampleTypeSpecific: {
      'Corn Silage': 'Typically 35-45% NFC, primarily from starch.',
      'Hay/Haylage': 'Lower NFC (20-35%), mostly from pectin and sugars.',
      'TMR': 'Balance NFC and NDF for optimal rumen function and production.',
      'Grains/Commodities': 'Very high NFC (75-80%), used to increase diet energy density.'
    }
  },
  'NDFD30': {
    name: 'NDF Digestibility (30-hour)',
    description: 'Percentage of NDF digested after 30 hours of in vitro fermentation. Indicates fiber quality and usability.',
    animalBenefits: [
      'Higher NDFD means more energy from forages',
      'Allows higher forage inclusion in rations',
      'Improves feed efficiency',
      'Supports greater milk production from forage'
    ],
    idealRange: 'Corn silage: >50%, Hay: >40%',
    concerns: {
      low: 'Poor NDF digestibility limits energy intake from forages and overall production.',
      high: 'Excellent digestibility allows maximum forage utilization and reduced grain costs.'
    },
    sampleTypeSpecific: {
      'Corn Silage': 'Target >55% NDFD30. BMR varieties: 60-70%. Higher digestibility = more energy.',
      'Hay/Haylage': 'Alfalfa: 40-50%. Grass: 50-60%. Early-cut forages have higher NDFD.',
      'TMR': 'High NDFD forages reduce need for grain supplementation.',
      'Grains/Commodities': 'Not typically measured in grains.'
    }
  },
  'NDFD48': {
    name: 'NDF Digestibility (48-hour)',
    description: 'Percentage of NDF digested after 48 hours. Represents potential maximum fiber digestion with extended rumen retention.',
    animalBenefits: [
      'Indicates long-term fiber digestibility',
      'Helps predict forage quality for longer retention times',
      'Valuable for rations with high forage levels'
    ],
    idealRange: 'Generally 5-10% higher than NDFD30',
    concerns: {
      low: 'Low 48-hour digestibility indicates poor forage quality and lignification.',
      high: 'High values indicate excellent forage quality and feeding value.'
    },
    sampleTypeSpecific: {
      'Corn Silage': 'Typically 60-70% NDFD48. Longer fermentation shows fiber potential.',
      'Hay/Haylage': 'Early-cut hay: 55-65%. Later maturity: 40-50%.',
      'TMR': 'Use to evaluate forage quality in stored feeds.',
      'Grains/Commodities': 'Not applicable.'
    }
  },
  'uNDF240': {
    name: 'Undigestible NDF (240-hour)',
    description: 'Portion of NDF that remains undigested after 240 hours (10 days) of fermentation. Represents the "woody" fraction that passes through undigested.',
    animalBenefits: [
      'Lower uNDF means more energy availability',
      'Helps predict gut fill and intake potential',
      'Guides forage inclusion rates for maximum intake'
    ],
    idealRange: 'Corn silage: 8-11% of DM, Hay: 10-13% of DM',
    concerns: {
      low: 'Very low uNDF may not provide adequate rumen mat and gut fill.',
      high: 'High uNDF limits intake capacity and energy availability from forage.'
    },
    sampleTypeSpecific: {
      'Corn Silage': 'Target <10% uNDF240. Lower is better for maximum energy.',
      'Hay/Haylage': 'Mature forages have higher uNDF, limiting intake.',
      'TMR': 'Calculate total diet uNDF to predict intake limits.',
      'Grains/Commodities': 'Very low uNDF in grains.'
    }
  },
  'Lignin': {
    name: 'Lignin',
    description: 'Indigestible component of plant cell walls. Acts as cement binding cellulose fibers. Major factor limiting forage digestibility.',
    animalBenefits: [
      'Lower lignin means higher digestibility',
      'Affects all fiber digestion and energy availability',
      'Key predictor of forage quality'
    ],
    idealRange: 'High-quality forages: <3% of DM',
    concerns: {
      low: 'Low lignin forages offer excellent digestibility and energy.',
      high: 'High lignin (>5%) severely reduces digestibility and energy value.'
    },
    sampleTypeSpecific: {
      'Corn Silage': 'Typically 2-4% lignin. BMR varieties: 1.5-2.5% (more digestible).',
      'Hay/Haylage': 'Alfalfa: 6-9%. Grass hay: 4-7%. Increases rapidly with maturity.',
      'TMR': 'Monitor lignin to assess overall forage quality.',
      'Grains/Commodities': 'Very low lignin in grains and seeds.'
    }
  },
  'NDICP': {
    name: 'Neutral Detergent Insoluble Crude Protein',
    description: 'Protein bound to the fiber fraction. Slowly degraded in the rumen and partially available in the intestine.',
    animalBenefits: [
      'Provides bypass protein for intestinal digestion',
      'Slower rumen degradation can improve protein efficiency',
      'Contributes to metabolizable protein supply'
    ],
    idealRange: 'Typically 10-15% of total CP',
    concerns: {
      low: 'Normal - indicates protein is readily available.',
      high: 'Excessive NDICP (>20% of CP) suggests heat damage or over-maturity, reducing protein availability.'
    },
    sampleTypeSpecific: {
      'Corn Silage': 'Generally low NDICP, most protein is available.',
      'Hay/Haylage': 'Can be higher in over-heated hay. Indicates heat damage from storage.',
      'TMR': 'High NDICP in TMR suggests heat damage from mixing or storage.',
      'Grains/Commodities': 'Monitor in heat-processed feeds like roasted soybeans.'
    }
  },
  'ADICP': {
    name: 'Acid Detergent Insoluble Crude Protein',
    description: 'Protein bound to lignin. Largely unavailable to the animal - passes through undigested.',
    animalBenefits: [
      'Not beneficial - represents unusable protein',
      'Lower ADICP is always better',
      'Indicator of feed damage or over-maturity'
    ],
    idealRange: '<10% of total CP',
    concerns: {
      low: 'Excellent - protein is available and usable.',
      high: 'High ADICP (>15% of CP) indicates severe heat damage or over-maturity. Protein is wasted.'
    },
    sampleTypeSpecific: {
      'Corn Silage': 'Should be very low. High ADICP indicates heating or mold.',
      'Hay/Haylage': 'Over-heated or moldy hay shows elevated ADICP.',
      'TMR': 'Elevated ADICP suggests poor quality ingredients or heat damage.',
      'Grains/Commodities': 'Monitor in heat-processed feeds. High values indicate over-processing.'
    }
  },
  'Soluble Protein': {
    name: 'Soluble Protein',
    description: 'Rapidly degradable protein fraction in the rumen. Immediately available for microbial use.',
    animalBenefits: [
      'Quick nitrogen source for rumen microbes',
      'Supports rapid microbial growth',
      'Improves fiber digestion when synchronized with energy'
    ],
    idealRange: '30-40% of total CP (varies by feed type)',
    concerns: {
      low: 'May limit microbial protein synthesis if energy is available.',
      high: 'Very high soluble protein (>60%) can be wasteful, increasing ammonia and urea losses.'
    },
    sampleTypeSpecific: {
      'Corn Silage': 'Moderate soluble protein fraction.',
      'Hay/Haylage': 'Fresh alfalfa: high soluble protein. Older hay: lower.',
      'TMR': 'Balance soluble and bypass protein for optimal milk production.',
      'Grains/Commodities': 'Soybean meal: very high soluble protein fraction.'
    }
  },
  'kd Rate': {
    name: 'Degradation Rate (kd)',
    description: 'Speed at which fiber or protein is broken down in the rumen. Expressed as % per hour. Critical for modeling rumen fermentation.',
    animalBenefits: [
      'Faster kd means more energy is captured before passage',
      'Helps balance ration for optimal rumen function',
      'Used in precision feeding models (CNCPS, NRC)'
    ],
    idealRange: 'Varies by feed: forages 3-6%/hr, concentrates 10-20%/hr',
    concerns: {
      low: 'Slow degradation reduces energy capture if passage rate is high.',
      high: 'Very rapid degradation can cause acidosis if not balanced properly.'
    },
    sampleTypeSpecific: {
      'Corn Silage': 'NDF kd: 4-6%/hr. Higher kd in BMR varieties.',
      'Hay/Haylage': 'Legumes faster kd than grasses. Early-cut faster than mature.',
      'TMR': 'Balance kd of feeds for stable rumen pH.',
      'Grains/Commodities': 'Starch kd varies: ground corn faster than whole corn.'
    }
  },
  'In Situ Digestibility': {
    name: 'In Situ Digestibility',
    description: 'Digestibility measured by incubating feed in nylon bags inside the rumen of fistulated animals. Gold standard for measuring true digestibility.',
    animalBenefits: [
      'Most accurate prediction of nutrient availability',
      'Accounts for individual feed characteristics',
      'Guides precision ration formulation'
    ],
    idealRange: 'Varies by component measured - higher is better',
    concerns: {
      low: 'Low in situ digestibility indicates poor feed quality or availability.',
      high: 'Excellent digestibility maximizes feed value and performance.'
    },
    sampleTypeSpecific: {
      'Corn Silage': 'Measures true fiber and starch digestibility under real rumen conditions.',
      'Hay/Haylage': 'Reveals actual nutrient availability vs. predicted values.',
      'TMR': 'Useful for validating mixed ration digestibility.',
      'Grains/Commodities': 'Determines effectiveness of processing methods.'
    }
  },
  'Fermentation pH': {
    name: 'Fermentation pH',
    description: 'Acidity of ensiled feed. Indicates fermentation quality and stability. Lower pH preserves feed and prevents spoilage.',
    animalBenefits: [
      'Proper pH ensures stable, palatable feed',
      'Prevents harmful bacteria growth',
      'Maintains nutrient quality during storage'
    ],
    idealRange: 'Corn silage: 3.7-4.2, Haylage: 4.5-5.5',
    concerns: {
      low: 'Very low pH (<3.5) may indicate clostridial fermentation or poor management.',
      high: 'High pH (>4.5 in corn silage) indicates poor fermentation, spoilage risk, and potential for mold growth.'
    },
    sampleTypeSpecific: {
      'Corn Silage': 'Target 3.8-4.0. Lower pH preserves feed longer.',
      'Hay/Haylage': 'Haylage: 4.5-5.0. Higher DM requires less acidification.',
      'TMR': 'Not typically measured in TMR.',
      'Grains/Commodities': 'Not applicable unless ensiled (high-moisture corn).'
    }
  },
  'Lactic Acid': {
    name: 'Lactic Acid',
    description: 'Primary acid produced during good silage fermentation. Strong acid that rapidly lowers pH and preserves feed.',
    animalBenefits: [
      'Indicates successful fermentation',
      'Preserves nutrients and feed quality',
      'Improves palatability when in proper range'
    ],
    idealRange: '4-8% of DM (in silage)',
    concerns: {
      low: 'Low lactic acid suggests poor fermentation or aerobic deterioration.',
      high: 'Very high lactic acid (>12%) can reduce intake and palatability.'
    },
    sampleTypeSpecific: {
      'Corn Silage': '5-8% lactic acid indicates excellent fermentation.',
      'Hay/Haylage': 'Similar to silage - higher in drier haylage.',
      'TMR': 'Can develop lactic acid if TMR sits too long in warm weather.',
      'Grains/Commodities': 'Only relevant in ensiled grains (high-moisture corn).'
    }
  },
  'Acetic Acid': {
    name: 'Acetic Acid',
    description: 'Secondary fermentation acid. Weaker than lactic acid but provides aerobic stability and reduces mold growth upon feedout.',
    animalBenefits: [
      'Improves silage stability after opening',
      'Reduces heating and spoilage',
      'Provides some energy value'
    ],
    idealRange: '1-3% of DM (in silage)',
    concerns: {
      low: 'Very low acetic acid may reduce bunk stability.',
      high: 'Excessive acetic acid (>5%) indicates heterofermentation, reduces energy, and can decrease intake.'
    },
    sampleTypeSpecific: {
      'Corn Silage': '1.5-3% ideal. Higher levels improve aerobic stability.',
      'Hay/Haylage': 'Moderate levels beneficial for stability.',
      'TMR': 'Can indicate beginning of spoilage if TMR heats.',
      'Grains/Commodities': 'Only in ensiled grains.'
    }
  }
};

// Soil parameter database
const soilParameterDatabase: Record<string, ParameterInfo> = {
  'pH': {
    name: 'Soil pH',
    description: 'Measure of soil acidity or alkalinity. Affects nutrient availability and microbial activity in the soil.',
    animalBenefits: [
      'Optimal pH ensures maximum nutrient availability',
      'Supports beneficial soil microorganisms',
      'Affects fertilizer efficiency and crop uptake',
      'Critical for plant health and yield potential'
    ],
    idealRange: 'Most crops: 6.0-7.0, Alfalfa/Clover: 6.5-7.5, Corn/Soybeans: 6.0-7.0',
    concerns: {
      low: 'Low pH (acidic) reduces availability of N, P, K, S, Ca, and Mg. Increases aluminum and manganese toxicity risk.',
      high: 'High pH (alkaline) reduces availability of Fe, Mn, Zn, Cu, and B. May indicate excess lime application.'
    }
  },
  'Phosphorus': {
    name: 'Phosphorus (P)',
    description: 'Essential macronutrient for root development, flowering, and seed production. Measured as plant-available phosphorus.',
    animalBenefits: [
      'Critical for early root development',
      'Supports energy transfer in plants',
      'Essential for flowering and grain fill',
      'Improves crop maturity and quality'
    ],
    idealRange: 'Medium-High: 30-50 ppm Bray P1 or Olsen P',
    concerns: {
      low: 'Phosphorus deficiency limits root growth, delays maturity, and reduces yield significantly.',
      high: 'Excessive P increases environmental runoff risk but generally does not harm crops.'
    }
  },
  'Potassium': {
    name: 'Potassium (K)',
    description: 'Essential for plant water regulation, disease resistance, and stalk strength. Measured as exchangeable potassium.',
    animalBenefits: [
      'Improves drought tolerance and water use',
      'Strengthens stalks and reduces lodging',
      'Enhances disease and pest resistance',
      'Critical for protein and starch synthesis'
    ],
    idealRange: 'Medium-High: 150-250 ppm exchangeable K',
    concerns: {
      low: 'Potassium deficiency causes weak stalks, increased disease, poor drought tolerance, and lower yields.',
      high: 'Very high K can interfere with Mg uptake (grass tetany risk in forages).'
    }
  },
  'Calcium': {
    name: 'Calcium (Ca)',
    description: 'Important for cell wall structure, root growth, and nutrient uptake. Part of cation exchange capacity.',
    animalBenefits: [
      'Essential for cell wall development',
      'Improves soil structure and tilth',
      'Supports root hair development',
      'Reduces soil acidity when applied as lime'
    ],
    idealRange: '60-80% of CEC base saturation',
    concerns: {
      low: 'Calcium deficiency causes poor root growth and increased susceptibility to diseases.',
      high: 'Excess Ca rarely harmful but may reduce Mg and K availability.'
    }
  },
  'Magnesium': {
    name: 'Magnesium (Mg)',
    description: 'Central component of chlorophyll. Essential for photosynthesis and enzyme activation.',
    animalBenefits: [
      'Required for chlorophyll and photosynthesis',
      'Activates many plant enzymes',
      'Supports protein synthesis',
      'Important for forage animal health (prevents grass tetany)'
    ],
    idealRange: '10-15% of CEC base saturation',
    concerns: {
      low: 'Magnesium deficiency causes yellowing between leaf veins and reduced photosynthesis.',
      high: 'Excess Mg can reduce Ca and K uptake.'
    }
  },
  'CEC': {
    name: 'Cation Exchange Capacity (CEC)',
    description: 'Measure of soil\'s ability to hold and exchange nutrients. Indicates nutrient-holding capacity.',
    animalBenefits: [
      'Higher CEC holds more nutrients',
      'Reduces nutrient leaching losses',
      'Indicates soil buffering capacity',
      'Guides fertilizer application rates'
    ],
    idealRange: 'Sands: 5-10, Loams: 10-20, Clays: 20-40 meq/100g',
    concerns: {
      low: 'Low CEC soils require more frequent, smaller fertilizer applications to prevent leaching.',
      high: 'High CEC soils can hold nutrients well but may require higher amendment rates to change pH.'
    }
  },
  'Organic Matter': {
    name: 'Organic Matter (OM%)',
    description: 'Decomposed plant and animal residues. Foundation of soil health and fertility.',
    animalBenefits: [
      'Improves soil structure and water holding',
      'Supplies slow-release nitrogen',
      'Supports beneficial soil biology',
      'Reduces erosion and compaction'
    ],
    idealRange: 'Cropland: 3-6%, Pasture: 4-8%',
    concerns: {
      low: 'Low OM reduces nutrient supply, water holding, and soil structure.',
      high: 'Very high OM (>10%) may indicate poor drainage or peat soils.'
    }
  },
  'Sulfur': {
    name: 'Sulfur (S)',
    description: 'Essential for protein synthesis and enzyme function. Often deficient in high-yielding crops.',
    animalBenefits: [
      'Required for protein and amino acid formation',
      'Supports chlorophyll production',
      'Enhances nitrogen use efficiency',
      'Improves crop quality and oil content'
    ],
    idealRange: '10-20 ppm available sulfur',
    concerns: {
      low: 'Sulfur deficiency causes yellowing of young leaves and reduced protein content.',
      high: 'Excess sulfur rarely occurs but may lower soil pH over time.'
    }
  },
  'Zinc': {
    name: 'Zinc (Zn)',
    description: 'Essential micronutrient for enzyme systems and growth hormone production.',
    animalBenefits: [
      'Critical for auxin production and growth',
      'Required for protein synthesis',
      'Supports reproductive development',
      'Enhances stress tolerance'
    ],
    idealRange: '1.0-3.0 ppm DTPA-extractable',
    concerns: {
      low: 'Zinc deficiency causes stunted growth, white bud, and delayed maturity.',
      high: 'Excess Zn is toxic to plants and can occur near galvanized structures.'
    }
  },
  'Iron': {
    name: 'Iron (Fe)',
    description: 'Essential for chlorophyll formation and enzyme systems. Often unavailable in high pH soils.',
    animalBenefits: [
      'Required for chlorophyll synthesis',
      'Critical for photosynthesis and respiration',
      'Supports nitrogen fixation in legumes',
      'Essential for enzyme function'
    ],
    idealRange: '4.5-20 ppm DTPA-extractable',
    concerns: {
      low: 'Iron deficiency causes interveinal chlorosis, especially in high pH soils.',
      high: 'Excess Fe rarely occurs except in very acidic or waterlogged soils.'
    }
  },
  'Manganese': {
    name: 'Manganese (Mn)',
    description: 'Important for photosynthesis, nitrogen metabolism, and disease resistance.',
    animalBenefits: [
      'Activates enzymes in photosynthesis',
      'Supports nitrogen assimilation',
      'Enhances disease resistance',
      'Required for chloroplast formation'
    ],
    idealRange: '5-20 ppm DTPA-extractable',
    concerns: {
      low: 'Manganese deficiency causes interveinal chlorosis and reduced disease resistance.',
      high: 'Mn toxicity can occur in acidic soils, causing brown spots on leaves.'
    }
  },
  'Copper': {
    name: 'Copper (Cu)',
    description: 'Essential micronutrient for reproduction, disease resistance, and grain fill.',
    animalBenefits: [
      'Critical for pollen formation and grain fill',
      'Enhances disease resistance',
      'Supports lignin formation',
      'Required for enzyme activation'
    ],
    idealRange: '0.2-1.0 ppm DTPA-extractable',
    concerns: {
      low: 'Copper deficiency causes poor grain fill, white tip, and reduced reproductive success.',
      high: 'Excess Cu is toxic and can occur in areas with repeated fungicide use.'
    }
  },
  'Boron': {
    name: 'Boron (B)',
    description: 'Essential for cell wall formation, reproduction, and calcium uptake.',
    animalBenefits: [
      'Critical for pollen viability and seed set',
      'Supports calcium uptake and movement',
      'Required for cell division and elongation',
      'Enhances nitrogen fixation in legumes'
    ],
    idealRange: '0.5-1.5 ppm hot water extractable',
    concerns: {
      low: 'Boron deficiency causes hollow stems, poor seed set, and heart rot in root crops.',
      high: 'Boron has a narrow optimal range - excess causes leaf burn and toxicity.'
    }
  },
  'Nitrate-N': {
    name: 'Nitrate Nitrogen (NO3-N)',
    description: 'Plant-available nitrogen in the soil. Highly mobile and subject to leaching.',
    animalBenefits: [
      'Immediately available for plant uptake',
      'Supports vegetative growth and protein',
      'Indicates residual N from previous crops',
      'Guides nitrogen fertilizer needs'
    ],
    idealRange: 'Pre-sidedress: 20-30 ppm for corn',
    concerns: {
      low: 'Low nitrate indicates need for nitrogen fertilizer to achieve yield goals.',
      high: 'Excess nitrate increases leaching risk, environmental concerns, and luxury consumption.'
    }
  }
};

export function SampleResults({ 
  sampleId, 
  onBack, 
  darkMode, 
  sampleName = 'East Bunker', 
  bagLabelId,
  testPackage = 'Nutritionist Select',
  sampleType = 'Corn Silage',
  addOns = [],
  testingMode = 'feeds',
  sampleStatus = 'completed',
  availableProjects = [],
  currentProjectId = null,
  onProjectAssign,
  createdDate = 'Just now',
  pendingTests = [],
  completedTests = []
}: SampleResultsProps) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedParameter, setSelectedParameter] = useState<string | null>(null);
  const [isInternalNotesOpen, setIsInternalNotesOpen] = useState(false);
  const [isWeaverNotesOpen, setIsWeaverNotesOpen] = useState(false);
  const [internalNotes, setInternalNotes] = useState('');
  const [weaverNotes, setWeaverNotes] = useState('');
  const [internalNotesSaved, setInternalNotesSaved] = useState('');
  const [weaverNotesSaved, setWeaverNotesSaved] = useState('');
  const [showAddTestsModal, setShowAddTestsModal] = useState(false);
  const [selectedAdditionalTests, setSelectedAdditionalTests] = useState<string[]>([]);
  const [isEditingSampleName, setIsEditingSampleName] = useState(false);
  const [editedSampleName, setEditedSampleName] = useState(sampleName);
  const [showInsights, setShowInsights] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);

  // Mock function to check if sample is less than a week old (hardcoded to true for demo)
  const isSampleEligibleForAdditionalTests = () => {
    // In real app, compare sample date with current date
    // For now, always return true for demo purposes
    return true;
  };

  const toggleTestSelection = (testId: string) => {
    setSelectedAdditionalTests(prev => 
      prev.includes(testId) 
        ? prev.filter(id => id !== testId)
        : [...prev, testId]
    );
  };

  const handleSubmitAdditionalTests = () => {
    if (selectedAdditionalTests.length === 0) return;
    alert(`Additional tests request submitted for: ${selectedAdditionalTests.join(', ')}. Our lab will contact you to confirm sample availability and processing timeline.`);
    setShowAddTestsModal(false);
    setSelectedAdditionalTests([]);
  };

  const handleSaveSampleName = () => {
    if (editedSampleName.trim()) {
      // In a real app, this would save to backend
      setIsEditingSampleName(false);
      alert(`Sample name updated to: ${editedSampleName}`);
    }
  };

  const handleCancelEditSampleName = () => {
    setEditedSampleName(sampleName);
    setIsEditingSampleName(false);
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Determine which parameters to show based on test package
  const getParametersForPackage = (): AnalysisParameter[] => {
    // Soil test data
    if (testingMode === 'soil') {
      const soilBaseData: Record<string, { asFed: string; dryMatter: string; unit: string }> = {
        'pH': { asFed: '6.4', dryMatter: '6.4', unit: '' },
        'Phosphorus': { asFed: '38', dryMatter: '38', unit: 'ppm' },
        'Potassium': { asFed: '185', dryMatter: '185', unit: 'ppm' },
        'Calcium': { asFed: '1850', dryMatter: '1850', unit: 'ppm' },
        'Magnesium': { asFed: '245', dryMatter: '245', unit: 'ppm' },
        'CEC': { asFed: '14.2', dryMatter: '14.2', unit: 'meq/100g' },
        'Organic Matter': { asFed: '4.2', dryMatter: '4.2', unit: '%' },
        'Sulfur': { asFed: '12', dryMatter: '12', unit: 'ppm' },
        'Zinc': { asFed: '1.8', dryMatter: '1.8', unit: 'ppm' },
        'Iron': { asFed: '48', dryMatter: '48', unit: 'ppm' },
        'Manganese': { asFed: '22', dryMatter: '22', unit: 'ppm' },
        'Copper': { asFed: '0.8', dryMatter: '0.8', unit: 'ppm' },
        'Boron': { asFed: '0.9', dryMatter: '0.9', unit: 'ppm' },
        'Nitrate-N': { asFed: '18', dryMatter: '18', unit: 'ppm' },
      };

      const soilPackageParameters: Record<string, string[]> = {
        'Basic Soil Test': ['pH', 'Phosphorus', 'Potassium', 'Organic Matter'],
        'Standard Soil': ['pH', 'Phosphorus', 'Potassium', 'Calcium', 'Magnesium', 'CEC', 'Organic Matter'],
        'Complete Soil': ['pH', 'Phosphorus', 'Potassium', 'Calcium', 'Magnesium', 'CEC', 'Organic Matter', 'Sulfur', 'Zinc', 'Iron', 'Manganese', 'Copper', 'Boron'],
        'Soil + Nitrate': ['pH', 'Phosphorus', 'Potassium', 'Calcium', 'Magnesium', 'CEC', 'Organic Matter', 'Nitrate-N'],
      };

      const parameters = soilPackageParameters[testPackage] || soilPackageParameters['Standard Soil'];
      
      return parameters.map(name => ({
        name,
        ...(soilBaseData[name] || {})
      }));
    }
    
    // Feed test data
    const baseData: Record<string, { asFed: string; dryMatter: string; unit: string }> = {
      'Dry Matter': { asFed: '34.8', dryMatter: '100', unit: '%' },
      'Crude Protein': { asFed: '2.9', dryMatter: '8.4', unit: '%' },
      'ADF': { asFed: '8.5', dryMatter: '24.4', unit: '%' },
      'NDF': { asFed: '14.6', dryMatter: '42.1', unit: '%' },
      'Starch': { asFed: '9.8', dryMatter: '28.2', unit: '%' },
      'Ash': { asFed: '1.8', dryMatter: '5.2', unit: '%' },
      'Fat': { asFed: '1.2', dryMatter: '3.4', unit: '%' },
      'Sugar': { asFed: '0.8', dryMatter: '2.3', unit: '%' },
      'NFC': { asFed: '13.5', dryMatter: '38.8', unit: '%' },
      'NDFD30': { asFed: '18.2', dryMatter: '52.3', unit: '% of NDF' },
      'NDFD48': { asFed: '22.5', dryMatter: '64.7', unit: '% of NDF' },
      'uNDF240': { asFed: '3.2', dryMatter: '9.2', unit: '%' },
      'Lignin': { asFed: '0.9', dryMatter: '2.6', unit: '%' },
      'NDICP': { asFed: '0.3', dryMatter: '0.9', unit: '%' },
      'ADICP': { asFed: '0.2', dryMatter: '0.6', unit: '%' },
      'Soluble Protein': { asFed: '1.2', dryMatter: '3.4', unit: '%' },
      'kd Rate': { asFed: '5.2', dryMatter: '5.2', unit: '%/hr' },
      'In Situ Digestibility': { asFed: '74.2', dryMatter: '74.2', unit: '%' },
      'Fermentation pH': { asFed: '3.85', dryMatter: '3.85', unit: '' },
      'Lactic Acid': { asFed: '2.4', dryMatter: '6.9', unit: '%' },
      'Acetic Acid': { asFed: '0.8', dryMatter: '2.3', unit: '%' },
    };

    const packageParameters: Record<string, string[]> = {
      'Basic Check': ['Dry Matter', 'Crude Protein', 'ADF', 'NDF'],
      'Standard Profile': ['Dry Matter', 'Crude Protein', 'ADF', 'NDF', 'Starch', 'Ash', 'Fat'],
      'Nutritionist Select': ['Dry Matter', 'Crude Protein', 'ADF', 'NDF', 'Starch', 'Ash', 'Fat', 'Sugar', 'NFC', 'NDFD30'],
      'Advanced Plus': ['Dry Matter', 'Crude Protein', 'ADF', 'NDF', 'Starch', 'Ash', 'Fat', 'Sugar', 'NFC', 'NDFD30', 'NDFD48', 'uNDF240', 'Lignin', 'NDICP', 'ADICP'],
      'CNCPS Complete': ['Dry Matter', 'Crude Protein', 'ADF', 'NDF', 'Starch', 'Ash', 'Fat', 'Sugar', 'NFC', 'NDFD30', 'NDFD48', 'uNDF240', 'Lignin', 'NDICP', 'ADICP', 'Soluble Protein', 'kd Rate'],
      'Premium Research': ['Dry Matter', 'Crude Protein', 'ADF', 'NDF', 'Starch', 'Ash', 'Fat', 'Sugar', 'NFC', 'NDFD30', 'NDFD48', 'uNDF240', 'Lignin', 'NDICP', 'ADICP', 'Soluble Protein', 'kd Rate', 'In Situ Digestibility', 'Fermentation pH', 'Lactic Acid', 'Acetic Acid'],
    };

    const parameters = packageParameters[testPackage] || packageParameters['Nutritionist Select'];
    
    return parameters.map(name => ({
      name,
      ...(baseData[name] || {})
    }));
  };

  const analysisParameters = getParametersForPackage();

  // Top 3 KPIs based on test package
  const getTopKPIs = () => {
    const allParams = analysisParameters;
    if (testingMode === 'soil') {
      // For soil, show pH, P, K
      if (allParams.length >= 3) {
        return [
          { label: allParams[0].name, value: allParams[0].asFed, unit: allParams[0].unit },
          { label: allParams[1].name, value: allParams[1].asFed, unit: allParams[1].unit },
          { label: allParams[2].name, value: allParams[2].asFed, unit: allParams[2].unit },
        ];
      }
      return [
        { label: 'pH', value: '6.4', unit: '' },
        { label: 'P', value: '38', unit: 'ppm' },
        { label: 'K', value: '185', unit: 'ppm' },
      ];
    }
    // For feeds
    if (allParams.length >= 3) {
      return [
        { label: 'Moisture', value: (100 - parseFloat(allParams[0].asFed)).toFixed(1), unit: '%' },
        { label: allParams[1].name, value: allParams[1].dryMatter, unit: allParams[1].unit },
        { label: allParams[3].name, value: allParams[3].dryMatter, unit: allParams[3].unit },
      ];
    }
    return [
      { label: 'Moisture', value: '65.2', unit: '%' },
      { label: 'Crude Protein', value: '8.4', unit: '% DM' },
      { label: 'NDF', value: '42.1', unit: '% DM' },
    ];
  };

  const kpis = getTopKPIs();

  const shareOptions = [
    {
      id: 'message',
      icon: Share2,
      label: 'Share via Message',
      description: 'Send link to report',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      id: 'email',
      icon: Share2,
      label: 'Share via Email',
      description: 'Send link to report',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
  ];

  const downloadOptions = [
    {
      id: 'pdf',
      icon: FileText,
      label: 'Download PDF',
      description: 'Formatted report document',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      id: 'csv',
      icon: Table,
      label: 'Download CSV',
      description: 'Spreadsheet data format',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
    {
      id: 'xml',
      icon: Code,
      label: 'Download XML',
      description: 'Structured data format',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  const bgColor = darkMode ? 'bg-[#181818]' : 'bg-stone-200';
  const cardBg = darkMode ? 'bg-[#252525]' : 'bg-white';
  const cardBorder = darkMode ? 'border border-[#2C2C2C]' : 'shadow-md';
  const headerBg = darkMode ? 'bg-[#252525]' : 'bg-white';
  const headerBorder = darkMode ? 'border-b border-[#2C2C2C]' : 'shadow-sm';
  const textPrimary = darkMode ? 'text-[#E0E0E0]' : 'text-gray-800';
  const textSecondary = darkMode ? 'text-[#C0C0C0]' : 'text-gray-600';
  const textTertiary = darkMode ? 'text-[#909090]' : 'text-gray-500';
  const hoverBg = darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-100';
  const borderColor = darkMode ? 'border-[#2C2C2C]' : 'border-gray-200';
  const divideBorder = darkMode ? 'divide-[#2C2C2C]' : 'divide-gray-100';

  const selectedParamInfo = selectedParameter ? (testingMode === 'soil' ? soilParameterDatabase[selectedParameter] : parameterDatabase[selectedParameter]) : null;

  return (
    <div className={`min-h-screen ${bgColor}`}>
      {/* Header */}
      <header className={`${headerBg} ${headerBorder} sticky top-0 z-10`}>
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className={`p-2 ${hoverBg} rounded-full transition-colors -ml-2`}
          >
            <ArrowLeft className={`size-5 ${textSecondary}`} />
          </button>
          <div className="flex-1">
            {isEditingSampleName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editedSampleName}
                  onChange={(e) => setEditedSampleName(e.target.value)}
                  className={`flex-1 px-3 py-1.5 rounded-lg border ${darkMode ? 'bg-[#2C2C2C] border-[#3C3C3C] text-[#E0E0E0]' : 'bg-white border-gray-300 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveSampleName();
                    if (e.key === 'Escape') handleCancelEditSampleName();
                  }}
                />
                <button
                  onClick={handleSaveSampleName}
                  className={`p-2 ${darkMode ? 'bg-green-700 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} text-white rounded-full transition-colors`}
                >
                  <Check className="size-4" />
                </button>
                <button
                  onClick={handleCancelEditSampleName}
                  className={`p-2 ${hoverBg} rounded-full transition-colors`}
                >
                  <X className={`size-4 ${textSecondary}`} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div>
                  <div className={`text-xl md:text-2xl font-bold ${textPrimary} mb-1`}>{editedSampleName}</div>
                  <div className={`text-sm ${textTertiary}`}>
                    {sampleStatus === 'pending' ? `Container ID: ${bagLabelId}` : `Lab Number: ${sampleId}`}
                  </div>
                </div>
                <button
                  onClick={() => setIsEditingSampleName(true)}
                  className={`p-2 ${hoverBg} rounded-full transition-colors opacity-60 hover:opacity-100`}
                  title="Edit sample name"
                >
                  <Pencil className={`size-5 ${textSecondary}`} />
                </button>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowShareModal(true)}
              className={`p-2 ${hoverBg} rounded-full transition-colors`}
            >
              <Share2 className={`size-5 ${textSecondary}`} />
            </button>
            <button
              className={`p-2 ${hoverBg} rounded-full transition-colors`}
            >
              <Download className={`size-5 ${textSecondary}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 max-w-2xl mx-auto">
        {/* Testing Not Complete Disclaimer */}
        {sampleStatus !== 'completed' && (
          <div className={`rounded-xl p-4 flex gap-3 mb-6 ${darkMode ? 'bg-blue-900/20 border-2 border-blue-700' : 'bg-blue-50 border-2 border-blue-300'}`}>
            <Info className={`size-5 flex-shrink-0 mt-0.5 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`} />
            <div>
              <h4 className={`font-semibold mb-1 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                {sampleStatus === 'pending' && 'Awaiting Sample Receipt'}
                {sampleStatus === 'intransit' && 'Sample In Transit'}
                {sampleStatus === 'processing' && 'Testing In Progress'}
                {sampleStatus === 'partial' && 'Partial Results Available'}
              </h4>
              <p className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                {sampleStatus === 'pending' && `This sample has not yet been received by our laboratory. Please ensure we receive it within 30 days of the creation date (${createdDate}).`}
                {sampleStatus === 'intransit' && 'This sample is currently in transit to our laboratory. Results will be available once testing is complete.'}
                {sampleStatus === 'processing' && 'This sample is currently being tested at our laboratory. Results will be updated as testing progresses.'}
                {sampleStatus === 'partial' && 'Some test results are available. Additional parameters are still being processed.'}
              </p>
              <p className={`text-xs mt-2 font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                {sampleStatus === 'pending' && 'Estimated completion: 3-5 business days after receipt'}
                {sampleStatus === 'intransit' && 'Estimated completion: 3-5 business days after receipt'}
                {sampleStatus === 'processing' && 'Estimated completion: 2-3 business days'}
                {sampleStatus === 'partial' && 'Estimated completion: 1-2 business days'}
              </p>
            </div>
          </div>
        )}

        {/* Sample Info */}
        <div className={`${cardBg} ${cardBorder} rounded-2xl p-5 mb-6`}>
          {/* Container ID in italics */}
          <div className="text-center mb-4">
            <div className={`text-sm ${textTertiary} italic`}>
              Container ID: {bagLabelId}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-5">
            <div className="flex-1">
              <div className={`text-sm ${textTertiary} mb-1`}>Sample Type</div>
              <div className={`font-semibold ${textPrimary} mb-2`}>{sampleType}</div>
              <div className={`text-sm ${textTertiary} mb-1`}>Test Package</div>
              <div className={`font-semibold ${textPrimary}`}>{testPackage}</div>
              {addOns.length > 0 && (
                <>
                  <div className={`text-sm ${textTertiary} mb-1 mt-2`}>Add-Ons</div>
                  <div className={`text-sm ${textSecondary}`}>{addOns.join(', ')}</div>
                </>
              )}
            </div>
          </div>

          {/* Image Upload Placeholder */}
          <div className="flex justify-center">
            <button 
              onClick={() => setShowPhotoUpload(true)}
              className={`flex items-center gap-2 px-4 py-2.5 border ${darkMode ? 'border-[#3C3C3C]' : 'border-gray-300'} rounded-lg ${darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-100'} transition-colors text-sm ${textSecondary}`}
            >
              <Camera className={`size-4 ${textTertiary}`} />
              <span>Add Photo (optional)</span>
            </button>
          </div>
        </div>

        {/* Project Assignment - Only for feeds mode */}
        {testingMode === 'feeds' && availableProjects.length > 0 && onProjectAssign && (() => {
          const selectedProjectIds = Array.isArray(currentProjectId) ? currentProjectId : (currentProjectId ? [currentProjectId] : []);
          
          const handleToggleProject = (projectId: string) => {
            if (selectedProjectIds.includes(projectId)) {
              // Remove project
              const updated = selectedProjectIds.filter(id => id !== projectId);
              onProjectAssign(updated.length > 0 ? updated : null);
            } else {
              // Add project
              onProjectAssign([...selectedProjectIds, projectId]);
            }
          };
          
          return (
            <div className={`${cardBg} ${cardBorder} rounded-2xl p-5 mb-6`}>
              <div className="flex items-center gap-3 mb-3">
                <FolderOpen className={`size-5 ${textSecondary}`} />
                <h3 className={`font-semibold ${textPrimary}`}>Project Assignment</h3>
              </div>
              
              {/* Selected Projects Display */}
              {selectedProjectIds.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {selectedProjectIds.map(projId => {
                    const project = availableProjects.find(p => p.id === projId);
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
                          onClick={() => handleToggleProject(projId)}
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
                    handleToggleProject(e.target.value);
                  }
                }}
                className={`w-full px-4 py-3 ${darkMode ? 'bg-[#2C2C2C] border-[#3C3C3C] text-[#E0E0E0]' : 'bg-white border-gray-300 text-gray-800'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
              >
                <option value="">Add to project...</option>
                {availableProjects.map(project => {
                  const isSelected = selectedProjectIds.includes(project.id);
                  if (isSelected) return null; // Hide already selected projects
                  return (
                    <option key={project.id} value={project.id}>
                      {project.name} ({project.sampleCount} samples)
                    </option>
                  );
                })}
              </select>
              <p className={`text-xs ${textTertiary} mt-2`}>
                Assign this sample to one or more projects to organize and share results with your team.
              </p>
            </div>
          );
        })()}

        {/* Only show results for partial or completed samples */}
        {(sampleStatus === 'completed' || sampleStatus === 'partial') && (
        <>
        {/* Key Metrics */}
        <div className="mb-6">
          <h2 className={`text-sm font-semibold ${textPrimary} mb-3 text-center`}>Key Metrics</h2>
          <div className="flex gap-4 justify-center">
            {kpis.map((kpi) => (
              <button
                key={kpi.label}
                onClick={() => setSelectedParameter(kpi.label)}
                className={`${darkMode ? 'bg-[#2C2C2C] border border-[#3C3C3C] hover:bg-[#333]' : 'bg-gray-100 border border-gray-200 hover:bg-gray-200'} rounded-xl w-24 h-24 flex flex-col items-center justify-center p-2 transition-colors cursor-pointer`}
              >
                <div className={`text-[9px] ${textTertiary} mb-1 text-center leading-tight`}>{kpi.label}</div>
                <div className={`text-lg font-bold ${textPrimary} flex items-baseline gap-0.5`}>
                  <span>{kpi.value}</span>
                  <span className={`text-[9px] ${textTertiary}`}>{kpi.unit}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Full Analysis Accordion */}
        <div className={`${cardBg} ${cardBorder} rounded-2xl overflow-hidden`}>
          <button
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className={`w-full px-5 py-4 flex items-center justify-between ${hoverBg} transition-colors`}
          >
            <div>
              <h2 className={`text-lg font-semibold ${textPrimary} text-left`}>Full Analysis</h2>
              <p className={`text-sm ${textTertiary} text-left mt-0.5`}>
                {analysisParameters.length} parameters • Click any parameter for details
              </p>
            </div>
            {isAccordionOpen ? (
              <ChevronUp className={`size-5 ${textSecondary}`} />
            ) : (
              <ChevronDown className={`size-5 ${textSecondary}`} />
            )}
          </button>

          {isAccordionOpen && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`${darkMode ? 'bg-[#2C2C2C]' : 'bg-gray-50'} border-t ${borderColor}`}>
                    <th className={`px-5 py-3 text-left text-xs font-semibold ${textTertiary} uppercase tracking-wide`}>
                      Parameter
                    </th>
                    {testingMode === 'soil' ? (
                      <th className={`px-4 py-3 text-right text-xs font-semibold ${textTertiary} uppercase tracking-wide`}>
                        Value
                      </th>
                    ) : (
                      <>
                        <th className={`px-4 py-3 text-right text-xs font-semibold ${textTertiary} uppercase tracking-wide`}>
                          As Fed
                        </th>
                        <th className={`px-4 py-3 text-right text-xs font-semibold ${textTertiary} uppercase tracking-wide`}>
                          Dry Matter
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className={`divide-y ${divideBorder}`}>
                  {analysisParameters.map((param, index) => (
                    <tr 
                      key={index} 
                      onClick={() => setSelectedParameter(param.name)}
                      className={`${hoverBg} cursor-pointer transition-colors`}
                    >
                      <td className={`px-5 py-3 text-sm ${textPrimary} font-medium`}>
                        {param.name}
                      </td>
                      {testingMode === 'soil' ? (
                        <td className={`px-4 py-3 text-sm ${textPrimary} text-right font-mono font-semibold`}>
                          {param.asFed} {param.unit}
                        </td>
                      ) : (
                        <>
                          <td className={`px-4 py-3 text-sm ${textSecondary} text-right font-mono`}>
                            {param.asFed} {param.unit}
                          </td>
                          <td className={`px-4 py-3 text-sm ${textPrimary} text-right font-mono font-semibold`}>
                            {param.dryMatter} {param.unit}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Still Testing Section - Only for partial samples */}
        {sampleStatus === 'partial' && pendingTests && pendingTests.length > 0 && (
          <div className={`${cardBg} ${cardBorder} rounded-2xl overflow-hidden mt-6`}>
            <div className={`px-5 py-4 ${darkMode ? 'bg-yellow-900/20 border-b border-yellow-900/30' : 'bg-yellow-50 border-b border-yellow-200'}`}>
              <div className="flex items-center gap-3">
                <FlaskConical className={`size-5 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                <div>
                  <h2 className={`text-lg font-semibold ${darkMode ? 'text-yellow-300' : 'text-yellow-900'}`}>Still Testing</h2>
                  <p className={`text-sm ${darkMode ? 'text-yellow-400/80' : 'text-yellow-700'} mt-0.5`}>
                    The following analytes are currently being processed in our lab
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {pendingTests.map((test, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${darkMode ? 'bg-[#2C2C2C]' : 'bg-stone-100'}`}
                  >
                    <div className={`size-2 rounded-full ${darkMode ? 'bg-yellow-400' : 'bg-yellow-500'} animate-pulse`}></div>
                    <span className={`text-sm ${textPrimary}`}>{test}</span>
                  </div>
                ))}
              </div>
              <div className={`mt-4 p-3 rounded-lg ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                <p className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                  💡 <strong>Expected completion:</strong> Results for these tests will be available within 2-3 business days. You'll be notified via email when they're ready.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Internal Notes Accordion */}
        <div className={`${cardBg} ${cardBorder} rounded-2xl overflow-hidden mt-6`}>
          <button
            onClick={() => setIsInternalNotesOpen(!isInternalNotesOpen)}
            className={`w-full px-5 py-4 flex items-center justify-between ${hoverBg} transition-colors`}
          >
            <div className="flex items-center gap-3">
              <StickyNote className={`size-5 ${textTertiary}`} />
              <div>
                <h2 className={`text-lg font-semibold ${textPrimary} text-left`}>Internal Notes</h2>
                <p className={`text-sm ${textTertiary} text-left mt-0.5`}>
                  For internal use only • Not included in reports
                </p>
              </div>
            </div>
            {isInternalNotesOpen ? (
              <ChevronUp className={`size-5 ${textSecondary}`} />
            ) : (
              <ChevronDown className={`size-5 ${textSecondary}`} />
            )}
          </button>

          {isInternalNotesOpen && (
            <div className={`p-5 border-t ${borderColor}`}>
              {internalNotesSaved ? (
                <div>
                  <div className={`${darkMode ? 'bg-[#1E1E1E] border-[#3C3C3C]' : 'bg-gray-50 border-gray-200'} border rounded-lg px-4 py-3 text-sm ${textPrimary}`}>
                    {internalNotesSaved}
                  </div>
                  <div className={`mt-3 flex items-center justify-between`}>
                    <div className={`text-xs ${textTertiary} flex items-center gap-2`}>
                      <div className={`${darkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'} ${darkMode ? 'text-yellow-400' : 'text-yellow-700'} rounded px-2 py-1 font-medium`}>
                        Internal Only
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setInternalNotesSaved('')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 ${darkMode ? 'bg-blue-900/20 text-blue-400 hover:bg-blue-900/30' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'} rounded-lg text-xs font-medium transition-colors`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setInternalNotes('');
                          setInternalNotesSaved('');
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 ${darkMode ? 'bg-red-900/20 text-red-400 hover:bg-red-900/30' : 'bg-red-50 text-red-600 hover:bg-red-100'} rounded-lg text-xs font-medium transition-colors`}
                      >
                        <Trash2 className="size-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <textarea
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                    placeholder="Add internal notes here (quality concerns, sample issues, processing notes, etc.)..."
                    rows={6}
                    className={`w-full ${darkMode ? 'bg-[#1A1A1A] border-[#3C3C3C] text-[#E0E0E0] placeholder-[#707070]' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'} border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-green-500/50' : 'focus:ring-green-500'} resize-none`}
                  />
                  <div className={`mt-3 flex items-center justify-between`}>
                    <div className={`text-xs ${textTertiary} flex items-center gap-2`}>
                      <div className={`${darkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'} ${darkMode ? 'text-yellow-400' : 'text-yellow-700'} rounded px-2 py-1 font-medium`}>
                        Internal Only
                      </div>
                    </div>
                    <button
                      onClick={() => setInternalNotesSaved(internalNotes)}
                      disabled={!internalNotes}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        !internalNotes
                          ? darkMode ? 'bg-[#2C2C2C] text-[#606060] cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : darkMode ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      <Save className="size-3.5" />
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Weaver Notes / Agronomist Recommendations Accordion - Hide for soil */}
        {testingMode !== 'soil' && (
        <div className={`${cardBg} ${cardBorder} rounded-2xl overflow-hidden mt-4`}>
          <button
            onClick={() => setIsWeaverNotesOpen(!isWeaverNotesOpen)}
            className={`w-full px-5 py-4 flex items-center justify-between ${hoverBg} transition-colors`}
          >
            <div className="flex items-center gap-3">
              <BookOpen className={`size-5 ${textTertiary}`} />
              <div>
                <h2 className={`text-lg font-semibold ${textPrimary} text-left`}>Nutritionist Recommendations</h2>
                <p className={`text-sm ${textTertiary} text-left mt-0.5`}>
                  Professional guidance • Included in PDFs
                </p>
              </div>
            </div>
            {isWeaverNotesOpen ? (
              <ChevronUp className={`size-5 ${textSecondary}`} />
            ) : (
              <ChevronDown className={`size-5 ${textSecondary}`} />
            )}
          </button>

          {isWeaverNotesOpen && (
            <div className={`p-5 border-t ${borderColor}`}>
              {weaverNotesSaved ? (
                <div>
                  <div className={`${darkMode ? 'bg-[#1E1E1E] border-[#3C3C3C]' : 'bg-gray-50 border-gray-200'} border rounded-lg px-4 py-3 text-sm ${textPrimary}`}>
                    {weaverNotesSaved}
                  </div>
                  <div className={`mt-3 flex items-center justify-between`}>
                    <div className={`text-xs ${textTertiary} flex items-center gap-2`}>
                      <div className={`${darkMode ? 'bg-green-900/30' : 'bg-green-100'} ${darkMode ? 'text-green-400' : 'text-green-700'} rounded px-2 py-1 font-medium`}>
                        Included in PDFs
                      </div>
                      <span>Appears on reports</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setWeaverNotesSaved('')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 ${darkMode ? 'bg-blue-900/20 text-blue-400 hover:bg-blue-900/30' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'} rounded-lg text-xs font-medium transition-colors`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setWeaverNotes('');
                          setWeaverNotesSaved('');
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 ${darkMode ? 'bg-red-900/20 text-red-400 hover:bg-red-900/30' : 'bg-red-50 text-red-600 hover:bg-red-100'} rounded-lg text-xs font-medium transition-colors`}
                      >
                        <Trash2 className="size-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <textarea
                    value={weaverNotes}
                    onChange={(e) => setWeaverNotes(e.target.value)}
                    placeholder="Add nutritionist recommendations and feeding suggestions (ration formulation notes, feeding rate recommendations, quality assessment, etc.)..."
                    rows={8}
                    className={`w-full ${darkMode ? 'bg-[#1A1A1A] border-[#3C3C3C] text-[#E0E0E0] placeholder-[#707070]' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'} border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-green-500/50' : 'focus:ring-green-500'} resize-none`}
                  />
                  <div className={`mt-3 flex items-center justify-between`}>
                    <div className={`text-xs ${textTertiary} flex items-center gap-2`}>
                      <div className={`${darkMode ? 'bg-green-900/30' : 'bg-green-100'} ${darkMode ? 'text-green-400' : 'text-green-700'} rounded px-2 py-1 font-medium`}>
                        Included in PDFs
                      </div>
                      <span>Appears on reports</span>
                    </div>
                    <button
                      onClick={() => setWeaverNotesSaved(weaverNotes)}
                      disabled={!weaverNotes}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        !weaverNotes
                          ? darkMode ? 'bg-[#2C2C2C] text-[#606060] cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : darkMode ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      <Save className="size-3.5" />
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        )}

        {/* Add Additional Tests Button - Only for completed samples less than a week old */}
        {isSampleEligibleForAdditionalTests() && (
          <div className={`${cardBg} ${cardBorder} rounded-2xl p-5 mt-4`}>
            <button
              onClick={() => setShowAddTestsModal(true)}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 ${darkMode ? 'bg-[#1E3A5F] hover:bg-[#2A4A75]' : 'bg-[#1E3A5F] hover:bg-[#2A4A75]'} text-white rounded-lg transition-colors font-medium`}
            >
              <Plus className="size-5" />
              Add Additional Tests
            </button>
            <p className={`text-xs ${textTertiary} text-center mt-3`}>
              We will notify you if we are unable to accommodate requests for additional testing.
            </p>
          </div>
        )}
        </>
        )}
      </main>

      {/* Add Additional Tests Modal */}
      {showAddTestsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`${cardBg} rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto`}>
            <div className={`px-6 py-4 border-b ${borderColor} flex items-center justify-between sticky top-0 ${cardBg} z-10`}>
              <h2 className={`text-xl font-semibold ${textPrimary}`}>
                Add Additional Tests
              </h2>
              <button
                onClick={() => setShowAddTestsModal(false)}
                className={`p-2 ${hoverBg} rounded-full transition-colors`}
              >
                <X className={`size-5 ${textSecondary}`} />
              </button>
            </div>

            {/* Disclaimer */}
            <div className={`mx-6 mt-6 ${darkMode ? 'bg-amber-900/20 border-amber-600/30' : 'bg-amber-50 border-amber-200'} border rounded-xl p-4`}>
              <div className="flex gap-3">
                <AlertCircle className={`size-5 ${darkMode ? 'text-amber-400' : 'text-amber-600'} flex-shrink-0 mt-0.5`} />
                <div>
                  <h3 className={`text-sm font-semibold ${darkMode ? 'text-amber-400' : 'text-amber-800'} mb-1`}>
                    Important Notice
                  </h3>
                  <p className={`text-xs ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
                    Additional testing is only available for samples completed within the last 7 days. Some samples may not have sufficient material remaining for all tests. Our lab will contact you if your sample cannot accommodate the requested tests.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-3">
              <div className={`text-sm ${textSecondary} mb-4`}>
                Select additional tests to add to sample <span className={`font-semibold ${textPrimary}`}>{sampleId}</span>:
              </div>

              {/* Available Add-On Categories */}
              <div className="space-y-3">
                {testingMode === 'soil' ? (
                  <>
                    {/* Soil Micronutrients */}
                    <button
                      onClick={() => toggleTestSelection('Micronutrient Panel')}
                      className={`w-full p-4 border-2 ${
                        selectedAdditionalTests.includes('Micronutrient Panel') 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                          : borderColor
                      } rounded-xl ${hoverBg} transition-all cursor-pointer text-left`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex-shrink-0 ${
                          selectedAdditionalTests.includes('Micronutrient Panel')
                            ? 'text-blue-600 dark:text-blue-400'
                            : textSecondary
                        }`}>
                          {selectedAdditionalTests.includes('Micronutrient Panel') ? (
                            <CheckCircle2 className="size-6" strokeWidth={2.5} />
                          ) : (
                            <Circle className="size-6" strokeWidth={2} />
                          )}
                        </div>
                        <div className={`${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'} rounded-lg p-2`}>
                          <Beaker className={`size-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${textPrimary}`}>Micronutrient Panel</h4>
                          <p className={`text-xs ${textTertiary}`}>Zn, Fe, Mn, Cu, B</p>
                        </div>
                        <div className={`text-sm font-medium ${textSecondary}`}>+$22</div>
                      </div>
                    </button>

                    {/* Heavy Metals */}
                    <button
                      onClick={() => toggleTestSelection('Heavy Metals Screen')}
                      className={`w-full p-4 border-2 ${
                        selectedAdditionalTests.includes('Heavy Metals Screen') 
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                          : borderColor
                      } rounded-xl ${hoverBg} transition-all cursor-pointer text-left`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex-shrink-0 ${
                          selectedAdditionalTests.includes('Heavy Metals Screen')
                            ? 'text-red-600 dark:text-red-400'
                            : textSecondary
                        }`}>
                          {selectedAdditionalTests.includes('Heavy Metals Screen') ? (
                            <CheckCircle2 className="size-6" strokeWidth={2.5} />
                          ) : (
                            <Circle className="size-6" strokeWidth={2} />
                          )}
                        </div>
                        <div className={`${darkMode ? 'bg-red-900/30' : 'bg-red-100'} rounded-lg p-2`}>
                          <AlertCircle className={`size-5 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${textPrimary}`}>Heavy Metals Screen</h4>
                          <p className={`text-xs ${textTertiary}`}>Pb, Cd, As, Cr, Ni</p>
                        </div>
                        <div className={`text-sm font-medium ${textSecondary}`}>+$38</div>
                      </div>
                    </button>

                    {/* Soil Biology */}
                    <button
                      onClick={() => toggleTestSelection('Organic Matter & Biology')}
                      className={`w-full p-4 border-2 ${
                        selectedAdditionalTests.includes('Organic Matter & Biology') 
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                          : borderColor
                      } rounded-xl ${hoverBg} transition-all cursor-pointer text-left`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex-shrink-0 ${
                          selectedAdditionalTests.includes('Organic Matter & Biology')
                            ? 'text-green-600 dark:text-green-400'
                            : textSecondary
                        }`}>
                          {selectedAdditionalTests.includes('Organic Matter & Biology') ? (
                            <CheckCircle2 className="size-6" strokeWidth={2.5} />
                          ) : (
                            <Circle className="size-6" strokeWidth={2} />
                          )}
                        </div>
                        <div className={`${darkMode ? 'bg-green-900/30' : 'bg-green-100'} rounded-lg p-2`}>
                          <FlaskConical className={`size-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${textPrimary}`}>Organic Matter & Biology</h4>
                          <p className={`text-xs ${textTertiary}`}>Active C, respiration</p>
                        </div>
                        <div className={`text-sm font-medium ${textSecondary}`}>+$32</div>
                      </div>
                    </button>

                    {/* Soil Physical Properties */}
                    <button
                      onClick={() => toggleTestSelection('Texture Analysis')}
                      className={`w-full p-4 border-2 ${
                        selectedAdditionalTests.includes('Texture Analysis') 
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                          : borderColor
                      } rounded-xl ${hoverBg} transition-all cursor-pointer text-left`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex-shrink-0 ${
                          selectedAdditionalTests.includes('Texture Analysis')
                            ? 'text-purple-600 dark:text-purple-400'
                            : textSecondary
                        }`}>
                          {selectedAdditionalTests.includes('Texture Analysis') ? (
                            <CheckCircle2 className="size-6" strokeWidth={2.5} />
                          ) : (
                            <Circle className="size-6" strokeWidth={2} />
                          )}
                        </div>
                        <div className={`${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'} rounded-lg p-2`}>
                          <Beaker className={`size-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${textPrimary}`}>Texture Analysis</h4>
                          <p className={`text-xs ${textTertiary}`}>Sand, silt, clay %</p>
                        </div>
                        <div className={`text-sm font-medium ${textSecondary}`}>+$28</div>
                      </div>
                    </button>
                  </>
                ) : (
                  <>
                {/* Mineral Tests */}
                <button
                  onClick={() => toggleTestSelection('Mineral Panel')}
                  className={`w-full p-4 border-2 ${
                    selectedAdditionalTests.includes('Mineral Panel') 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : borderColor
                  } rounded-xl ${hoverBg} transition-all cursor-pointer text-left`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex-shrink-0 ${
                      selectedAdditionalTests.includes('Mineral Panel')
                        ? 'text-blue-600 dark:text-blue-400'
                        : textSecondary
                    }`}>
                      {selectedAdditionalTests.includes('Mineral Panel') ? (
                        <CheckCircle2 className="size-6" strokeWidth={2.5} />
                      ) : (
                        <Circle className="size-6" strokeWidth={2} />
                      )}
                    </div>
                    <div className={`${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'} rounded-lg p-2`}>
                      <Beaker className={`size-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${textPrimary}`}>Mineral Panel</h4>
                      <p className={`text-xs ${textTertiary}`}>Ca, P, Mg, K, Na, S</p>
                    </div>
                    <div className={`text-sm font-medium ${textSecondary}`}>+$24</div>
                  </div>
                </button>

                {/* Hygiene Tests */}
                <button
                  onClick={() => toggleTestSelection('Yeast & Mold Count')}
                  className={`w-full p-4 border-2 ${
                    selectedAdditionalTests.includes('Yeast & Mold Count') 
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                      : borderColor
                  } rounded-xl ${hoverBg} transition-all cursor-pointer text-left`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex-shrink-0 ${
                      selectedAdditionalTests.includes('Yeast & Mold Count')
                        ? 'text-green-600 dark:text-green-400'
                        : textSecondary
                    }`}>
                      {selectedAdditionalTests.includes('Yeast & Mold Count') ? (
                        <CheckCircle2 className="size-6" strokeWidth={2.5} />
                      ) : (
                        <Circle className="size-6" strokeWidth={2} />
                      )}
                    </div>
                    <div className={`${darkMode ? 'bg-green-900/30' : 'bg-green-100'} rounded-lg p-2`}>
                      <FlaskConical className={`size-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${textPrimary}`}>Yeast & Mold Count</h4>
                      <p className={`text-xs ${textTertiary}`}>Feed hygiene analysis</p>
                    </div>
                    <div className={`text-sm font-medium ${textSecondary}`}>+$18</div>
                  </div>
                </button>

                {/* Toxin Tests */}
                <button
                  onClick={() => toggleTestSelection('Mycotoxin Screen')}
                  className={`w-full p-4 border-2 ${
                    selectedAdditionalTests.includes('Mycotoxin Screen') 
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                      : borderColor
                  } rounded-xl ${hoverBg} transition-all cursor-pointer text-left`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex-shrink-0 ${
                      selectedAdditionalTests.includes('Mycotoxin Screen')
                        ? 'text-red-600 dark:text-red-400'
                        : textSecondary
                    }`}>
                      {selectedAdditionalTests.includes('Mycotoxin Screen') ? (
                        <CheckCircle2 className="size-6" strokeWidth={2.5} />
                      ) : (
                        <Circle className="size-6" strokeWidth={2} />
                      )}
                    </div>
                    <div className={`${darkMode ? 'bg-red-900/30' : 'bg-red-100'} rounded-lg p-2`}>
                      <AlertCircle className={`size-5 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${textPrimary}`}>Mycotoxin Screen</h4>
                      <p className={`text-xs ${textTertiary}`}>Aflatoxin, DON, Zearalenone</p>
                    </div>
                    <div className={`text-sm font-medium ${textSecondary}`}>+$45</div>
                  </div>
                </button>

                {/* In Situ */}
                <button
                  onClick={() => toggleTestSelection('In Situ Digestibility')}
                  className={`w-full p-4 border-2 ${
                    selectedAdditionalTests.includes('In Situ Digestibility') 
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                      : borderColor
                  } rounded-xl ${hoverBg} transition-all cursor-pointer text-left`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex-shrink-0 ${
                      selectedAdditionalTests.includes('In Situ Digestibility')
                        ? 'text-purple-600 dark:text-purple-400'
                        : textSecondary
                    }`}>
                      {selectedAdditionalTests.includes('In Situ Digestibility') ? (
                        <CheckCircle2 className="size-6" strokeWidth={2.5} />
                      ) : (
                        <Circle className="size-6" strokeWidth={2} />
                      )}
                    </div>
                    <div className={`${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'} rounded-lg p-2`}>
                      <Beef className={`size-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${textPrimary}`}>In Situ Digestibility</h4>
                      <p className={`text-xs ${textTertiary}`}>Gold standard analysis</p>
                    </div>
                    <div className={`text-sm font-medium ${textSecondary}`}>+$85</div>
                  </div>
                </button>

                {/* Other */}
                <button
                  onClick={() => toggleTestSelection('Starch Availability')}
                  className={`w-full p-4 border-2 ${
                    selectedAdditionalTests.includes('Starch Availability') 
                      ? 'border-gray-500 bg-gray-50 dark:bg-gray-700/20' 
                      : borderColor
                  } rounded-xl ${hoverBg} transition-all cursor-pointer text-left`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex-shrink-0 ${
                      selectedAdditionalTests.includes('Starch Availability')
                        ? 'text-gray-600 dark:text-gray-400'
                        : textSecondary
                    }`}>
                      {selectedAdditionalTests.includes('Starch Availability') ? (
                        <CheckCircle2 className="size-6" strokeWidth={2.5} />
                      ) : (
                        <Circle className="size-6" strokeWidth={2} />
                      )}
                    </div>
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-2`}>
                      <Plus className={`size-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${textPrimary}`}>Starch Availability</h4>
                      <p className={`text-xs ${textTertiary}`}>7-hour starch digestibility</p>
                    </div>
                    <div className={`text-sm font-medium ${textSecondary}`}>+$32</div>
                  </div>
                </button>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setShowAddTestsModal(false);
                    setSelectedAdditionalTests([]);
                  }}
                  className={`flex-1 px-4 py-3 ${darkMode ? 'bg-[#2C2C2C] hover:bg-[#333]' : 'bg-gray-200 hover:bg-gray-300'} ${textPrimary} rounded-lg transition-colors font-medium`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitAdditionalTests}
                  disabled={selectedAdditionalTests.length === 0}
                  className={`flex-1 px-4 py-3 ${
                    selectedAdditionalTests.length === 0
                      ? 'bg-gray-400 cursor-not-allowed opacity-50'
                      : darkMode 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-green-600 hover:bg-green-700'
                  } text-white rounded-lg transition-colors font-medium`}
                >
                  Submit Request {selectedAdditionalTests.length > 0 && `(${selectedAdditionalTests.length})`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Parameter Info Modal */}
      {selectedParamInfo && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className={`${cardBg} rounded-2xl shadow-2xl max-w-2xl w-full my-8`}>
            {/* Modal Header */}
            <div className={`px-6 py-4 border-b ${borderColor} flex items-start justify-between`}>
              <div className="flex-1">
                <h2 className={`text-xl font-semibold ${textPrimary} mb-1`}>
                  {selectedParamInfo.name}
                </h2>
                <p className={`text-sm ${textSecondary}`}>
                  {selectedParamInfo.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedParameter(null)}
                className={`p-2 ${hoverBg} rounded-full transition-colors ml-2 flex-shrink-0`}
              >
                <X className={`size-5 ${textSecondary}`} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-5 space-y-5 max-h-[60vh] overflow-y-auto">
              {/* Animal Benefits */}
              <div>
                <h3 className={`text-sm font-semibold ${textPrimary} mb-2 flex items-center gap-2`}>
                  <div className={`${darkMode ? 'bg-green-900/30' : 'bg-green-100'} ${darkMode ? 'text-green-400' : 'text-green-700'} rounded-lg px-2 py-1 text-xs font-semibold`}>
                    Benefits to Animals
                  </div>
                </h3>
                <ul className="space-y-2">
                  {selectedParamInfo.animalBenefits.map((benefit, idx) => (
                    <li key={idx} className={`text-sm ${textSecondary} flex gap-2`}>
                      <span className={textTertiary}>•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ideal Range */}
              <div className={`${darkMode ? 'bg-[#2C2C2C]' : 'bg-blue-50'} rounded-xl p-4`}>
                <h3 className={`text-sm font-semibold ${textPrimary} mb-2`}>
                  Ideal Range
                </h3>
                <p className={`text-sm ${textSecondary}`}>
                  {selectedParamInfo.idealRange}
                </p>
              </div>

              {/* Concerns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className={`${darkMode ? 'bg-[#2C2C2C]' : 'bg-orange-50'} rounded-xl p-4`}>
                  <h3 className={`text-sm font-semibold ${textPrimary} mb-2`}>
                    ⚠️ If Too Low
                  </h3>
                  <p className={`text-sm ${textSecondary}`}>
                    {selectedParamInfo.concerns.low}
                  </p>
                </div>
                <div className={`${darkMode ? 'bg-[#2C2C2C]' : 'bg-red-50'} rounded-xl p-4`}>
                  <h3 className={`text-sm font-semibold ${textPrimary} mb-2`}>
                    ⚠️ If Too High
                  </h3>
                  <p className={`text-sm ${textSecondary}`}>
                    {selectedParamInfo.concerns.high}
                  </p>
                </div>
              </div>

              {/* Sample Type Specific Info */}
              {selectedParamInfo.sampleTypeSpecific && selectedParamInfo.sampleTypeSpecific[sampleType] && (
                <div className={`${darkMode ? 'bg-[#1E1E1E] border border-[#3C3C3C]' : 'bg-gray-50 border-2 border-gray-200'} rounded-xl p-4`}>
                  <h3 className={`text-sm font-semibold ${textPrimary} mb-2 flex items-center gap-2`}>
                    <div className={`${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'} ${darkMode ? 'text-purple-400' : 'text-purple-700'} rounded-lg px-2 py-1 text-xs font-semibold`}>
                      {sampleType} Specific
                    </div>
                  </h3>
                  <p className={`text-sm ${textSecondary}`}>
                    {selectedParamInfo.sampleTypeSpecific[sampleType]}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className={`px-6 py-4 border-t ${borderColor}`}>
              <button
                onClick={() => setSelectedParameter(null)}
                className={`w-full px-4 py-3 ${darkMode ? 'bg-[#2C2C2C] hover:bg-[#333]' : 'bg-gray-800 hover:bg-gray-900'} text-white rounded-lg transition-colors font-medium`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`${cardBg} rounded-2xl shadow-2xl max-w-md w-full`}>
            <div className={`px-6 py-4 border-b ${borderColor} flex items-center justify-between`}>
              <h2 className={`text-xl font-semibold ${textPrimary}`}>
                Share Results
              </h2>
              <button
                onClick={() => setShowShareModal(false)}
                className={`p-2 ${hoverBg} rounded-full transition-colors`}
              >
                <X className={`size-5 ${textSecondary}`} />
              </button>
            </div>

            <div className="p-6 space-y-3">
              {[...shareOptions, ...downloadOptions].map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    className={`w-full p-4 rounded-xl border-2 ${borderColor} ${hoverBg} transition-all flex items-center gap-4`}
                  >
                    <div className={`${option.bgColor} rounded-lg p-3`}>
                      <Icon className={`size-6 ${option.color}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className={`font-semibold ${textPrimary} mb-0.5`}>
                        {option.label}
                      </div>
                      <div className={`text-sm ${textTertiary}`}>
                        {option.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* AI Insights Modal */}
      {showInsights && (() => {
        // Generate bullshit insights based on sample data
        const insights = testingMode === 'soil' 
          ? [
              `Based on your ${sampleType} results, the pH level of 6.4 suggests optimal nutrient availability in the slightly acidic range, which is excellent for most row crops.`,
              `The phosphorus level at 38 ppm indicates medium availability. Consider a modest P application of 20-30 lbs/acre to maintain optimal levels for next season.`,
              `Your CEC reading of 14.2 meq/100g shows good nutrient-holding capacity. This soil will respond well to split nitrogen applications.`,
              `Organic matter at 4.2% is above average for this region - this is contributing to excellent soil structure and water retention characteristics.`,
              `The micronutrient profile shows zinc at borderline levels (1.8 ppm). Monitor early season crop growth for zinc deficiency symptoms.`
            ]
          : [
              `This ${sampleType} sample shows a crude protein level of 8.4% DM, which is typical for corn silage but on the lower end. Consider supplementing with a high-protein feed source.`,
              `The NDF at 42.1% is within the acceptable range for corn silage, indicating good fiber content that will support rumination and rumen health.`,
              `With an ADF of 24.4%, this feed offers moderate digestibility. Animals should maintain steady energy intake when properly balanced in the ration.`,
              `The starch content of 28.2% DM is excellent for an energy-dense feed. This makes it ideal for high-producing dairy cows or finishing beef cattle.`,
              `Dry matter at 34.8% indicates this silage was harvested at optimal moisture. Storage losses should be minimal if properly packed and sealed.`
            ];
        
        return (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className={`${cardBg} rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col`}>
              <div className={`px-6 py-4 border-b ${borderColor} flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg">
                    <Lightbulb className="size-6 text-yellow-600 dark:text-yellow-400 fill-yellow-400" />
                  </div>
                  <div>
                    <h2 className={`text-xl font-semibold ${textPrimary}`}>
                      AI-Generated Insights
                    </h2>
                    <p className={`text-sm ${textTertiary}`}>Sample {sampleId} • {editedSampleName}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowInsights(false)}
                  className={`p-2 ${hoverBg} rounded-full transition-colors`}
                >
                  <X className={`size-5 ${textSecondary}`} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4">
                <div className={`rounded-lg p-3 ${darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
                  <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                    <strong>Note:</strong> These insights are AI-generated interpretations based on your test results. Always consult with a certified nutritionist or agronomist for final recommendations.
                  </p>
                </div>

                {insights.map((insight, index) => (
                  <div key={index} className={`p-4 rounded-xl border ${borderColor} ${darkMode ? 'bg-[#1E1E1E]' : 'bg-gray-50'}`}>
                    <div className="flex gap-3">
                      <div className={`size-6 rounded-full ${darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'} flex items-center justify-center flex-shrink-0 mt-0.5 font-semibold text-sm`}>
                        {index + 1}
                      </div>
                      <p className={`text-sm ${textPrimary} flex-1 leading-relaxed`}>
                        {insight}
                      </p>
                    </div>
                  </div>
                ))}

                <div className={`rounded-lg p-4 ${darkMode ? 'bg-amber-900/20 border border-amber-800' : 'bg-amber-50 border border-amber-200'}`}>
                  <div className="flex gap-2">
                    <Beaker className={`size-5 ${darkMode ? 'text-amber-400' : 'text-amber-600'} flex-shrink-0`} />
                    <div>
                      <p className={`text-sm font-semibold ${darkMode ? 'text-amber-300' : 'text-amber-900'} mb-1`}>
                        Want Expert Analysis?
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-amber-200' : 'text-amber-800'}`}>
                        Our certified nutritionists can review your complete feeding program and provide personalized recommendations. Contact us at (800) 555-FEED.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`px-6 py-4 border-t ${borderColor}`}>
                <button
                  onClick={() => setShowInsights(false)}
                  className={`w-full px-4 py-3 ${darkMode ? 'bg-[#2C2C2C] hover:bg-[#333]' : 'bg-gray-800 hover:bg-gray-900'} text-white rounded-lg transition-colors font-medium`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Photo Upload Modal */}
      {showPhotoUpload && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`${cardBg} rounded-2xl shadow-2xl max-w-md w-full`}>
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
                className={`flex-1 px-4 py-3 ${darkMode ? 'bg-green-700 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} text-white rounded-lg transition-colors font-medium`}
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

      {/* Floating AI Insights Button */}
      <button
        onClick={() => setShowInsights(!showInsights)}
        className={`group fixed bottom-6 right-6 flex items-center gap-2 px-4 py-4 ${darkMode ? 'bg-[#3A3A3A] hover:bg-[#454545]' : 'bg-gray-700 hover:bg-gray-800'} text-white rounded-full shadow-xl transition-all hover:pr-6 z-40`}
        title="Generate AI Insights"
      >
        <Lightbulb className={`size-6 flex-shrink-0 ${showInsights ? 'fill-yellow-400 text-yellow-400' : ''}`} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-sm font-medium">
          Generate Insights
        </span>
      </button>
    </div>
  );
}