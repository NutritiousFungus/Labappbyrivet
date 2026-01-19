// Test package analyte definitions
export const testPackageAnalytes: Record<string, string[]> = {
  'Basic Check': ['Dry Matter', 'Crude Protein', 'ADF', 'NDF'],
  'Standard Profile': ['Dry Matter', 'Crude Protein', 'ADF', 'NDF', 'Starch', 'Ash', 'Fat'],
  'Nutritionist Select': ['Dry Matter', 'Crude Protein', 'ADF', 'NDF', 'Starch', 'Ash', 'Fat', 'Sugar', 'NFC', 'NDFD30'],
  'Advanced Plus': ['Dry Matter', 'Crude Protein', 'ADF', 'NDF', 'Starch', 'Ash', 'Fat', 'Sugar', 'NFC', 'NDFD30', 'NDFD48', 'uNDF240', 'Lignin', 'NDICP', 'ADICP'],
  'CNCPS Complete': ['Dry Matter', 'Crude Protein', 'ADF', 'NDF', 'Starch', 'Ash', 'Fat', 'Sugar', 'NFC', 'NDFD30', 'NDFD48', 'uNDF240', 'Lignin', 'NDICP', 'ADICP', 'Soluble Protein', 'kd Rate'],
  'Premium Research': ['Dry Matter', 'Crude Protein', 'ADF', 'NDF', 'Starch', 'Ash', 'Fat', 'Sugar', 'NFC', 'NDFD30', 'NDFD48', 'uNDF240', 'Lignin', 'NDICP', 'ADICP', 'Soluble Protein', 'kd Rate', 'In Situ Digestibility', 'Fermentation pH', 'Lactic Acid', 'Acetic Acid'],
};

export const addOnAnalytes: Record<string, string[]> = {
  'DCAD': ['Sodium', 'Potassium', 'Chloride', 'Sulfur'],
  'Minerals': ['Calcium', 'Phosphorus', 'Magnesium', 'Potassium', 'Sodium', 'Iron', 'Zinc', 'Copper', 'Manganese'],
  'In Situ': ['24hr NDF Digestibility', '30hr NDF Digestibility', 'uNDF30', 'kd Rate'],
};
