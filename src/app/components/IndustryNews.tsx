import { X, TrendingUp, Calendar, BookOpen, ArrowRight } from 'lucide-react';

interface IndustryNewsProps {
  onClose: () => void;
  testingMode: 'feeds' | 'soil';
}

export function IndustryNews({ onClose, testingMode }: IndustryNewsProps) {
  const feedsNews = [
    {
      title: "Corn Silage Harvest Shows Excellent Yields Across Wisconsin",
      date: "January 10, 2026",
      category: "Harvest Report",
      preview: "Wisconsin dairy farmers report exceptional corn silage yields this season, with many operations seeing 25+ tons per acre. Quality metrics remain strong despite weather challenges in September.",
      content: "The 2025 corn silage harvest has concluded with impressive results across Wisconsin's dairy regions. Despite concerns about late-season moisture, most operations achieved excellent tonnage with solid quality metrics. Our laboratory has processed over 15,000 corn silage samples this season, showing average starch levels of 32-35% and NDFD30 digestibility values in the 55-60% range."
    },
    {
      title: "New NIR Calibration Equations Released for Improved Protein Accuracy",
      date: "January 5, 2026",
      category: "Laboratory Update",
      preview: "Enhanced NIR calibration equations announced that improve crude protein accuracy by 12% for dairy forages.",
      content: "Following extensive validation work with over 10,000 wet chemistry reference samples, we're pleased to announce updated NIR calibration equations for crude protein analysis. These new equations show marked improvement in accuracy for both corn silage and alfalfa haylage, particularly in the 15-20% CP range that's critical for dairy ration formulation. All samples submitted after January 15, 2026 will automatically use these improved calibrations."
    },
    {
      title: "NDFD Research Reveals Impact on Milk Production Efficiency",
      date: "December 28, 2025",
      category: "Research",
      preview: "University of Wisconsin study quantifies the economic value of NDF digestibility in dairy rations, showing 2-3 lb/day milk response per 5-point NDFD improvement.",
      content: "New research from UW-Madison demonstrates the significant impact of neutral detergent fiber digestibility (NDFD) on milk production. The multi-farm study tracked 500 cows over 12 months, showing that herds feeding high-NDFD forages (58%+ at 30 hours) produced 2-3 pounds more milk daily compared to those feeding lower digestibility forages, even when CP and starch levels were equalized. This translates to substantial economic advantages for operations prioritizing forage digestibility."
    },
    {
      title: "Drought Conditions Affecting Hay Quality in Southern Regions",
      date: "December 20, 2025",
      category: "Weather Alert",
      preview: "Extended dry conditions in Illinois and Indiana are impacting first-cutting hay quality, with protein levels running 2-3 points below historical averages.",
      content: "Dairy nutritionists should be aware of quality variations in purchased hay from southern regions. Drought stress during May-June growing periods has resulted in lower protein levels and increased fiber maturity in many first-cutting lots. We recommend testing all purchased hay lots before feeding, as visual assessment may not accurately reflect nutritional value this year. Some operations are successfully using feed-grade urea to compensate for protein deficits."
    },
    {
      title: "Mycotoxin Levels Remain Low in 2025 Corn Crop",
      date: "December 15, 2025",
      category: "Quality Assurance",
      preview: "Comprehensive mycotoxin screening of 2025 corn shows minimal issues, with less than 3% of samples exceeding action thresholds.",
      content: "Excellent news for dairy and beef producers: the 2025 corn crop shows very low mycotoxin levels across major growing regions. Our mycotoxin screening program has tested over 8,000 corn and silage samples, with less than 3% showing concerning levels of aflatoxin, vomitoxin, or zearalenone. This is significantly better than 2023-2024, when weather patterns created more favorable conditions for mold growth. Producers should still test high-risk feeds, but overall outlook is positive."
    },
    {
      title: "Feed Efficiency: The Role of Bypass Starch in High-Production Herds",
      date: "December 10, 2025",
      category: "Nutrition Science",
      preview: "Latest research on starch digestibility reveals opportunities for optimizing energy delivery in lactating dairy cows.",
      content: "Nutritionists are increasingly focusing on starch digestion site as a key factor in optimizing dairy rations. While total starch content is important, research now shows that the proportion of starch digested in the rumen versus small intestine significantly impacts milk production and feed efficiency. High-moisture corn and finely processed dry corn deliver more ruminal starch, while whole shelled corn and certain corn silage hybrids provide more bypass starch for intestinal digestion. Understanding your herd's specific needs based on production level and fiber digestibility can help fine-tune energy delivery."
    }
  ];

  const soilNews = [
    {
      title: "New Soil Health Incentive Programs Announced for 2026 Growing Season",
      date: "January 8, 2026",
      category: "Policy Update",
      preview: "USDA announces expanded funding for soil health practices, including cover crops, reduced tillage, and nutrient management planning.",
      content: "The USDA has announced significant expansion of soil health incentive programs for the 2026 growing season. New funding streams will support farmers adopting cover crop systems, implementing reduced-tillage practices, and developing comprehensive nutrient management plans. Applications open February 1st, with priority given to operations in watersheds with impaired water quality. Our soil testing services can provide the baseline data needed for many program applications."
    },
    {
      title: "Phosphorus Management Regulations Updated in Great Lakes States",
      date: "January 3, 2026",
      category: "Regulatory",
      preview: "Michigan, Wisconsin, and Minnesota implement stricter phosphorus application limits to protect water quality in sensitive watersheds.",
      content: "Agricultural producers in the Great Lakes region should be aware of updated phosphorus management regulations taking effect this spring. The new rules require soil testing within the past 4 years before manure or fertilizer application in designated sensitive areas, with application rates limited based on soil test levels. Fields testing above 50 ppm Bray-P1 will have restricted phosphorus applications. These regulations are designed to reduce algae blooms and protect drinking water sources, while still allowing productive agriculture through precision nutrient management."
    },
    {
      title: "Cover Crop Benefits Documented in Long-Term CEC Improvement Studies",
      date: "December 27, 2025",
      category: "Research",
      preview: "Ten-year study shows continuous cover cropping increases cation exchange capacity by 15-20%, improving nutrient retention and drought resilience.",
      content: "Exciting results from long-term soil health research demonstrate the profound impact of continuous cover cropping on soil cation exchange capacity (CEC). Fields maintained in cover crops for 10+ years showed CEC increases of 1.5-3.0 meq/100g compared to conventional tillage systems. Higher CEC translates to better nutrient retention, reduced fertilizer losses, and improved moisture-holding capacity during drought periods. The study tracked 40 farm fields across the Midwest, with benefits becoming statistically significant after just 5 years of consistent cover crop use."
    },
    {
      title: "Micronutrient Deficiencies Increasingly Common in High-Yield Corn",
      date: "December 18, 2025",
      category: "Agronomy",
      preview: "Zinc and manganese deficiencies are limiting yield potential in high-producing fields, particularly in high-pH soils.",
      content: "As corn yields push toward 250+ bushels per acre, micronutrient deficiencies are emerging as yield-limiting factors. Our agronomic team has identified zinc and manganese deficiencies in 25% of high-yield corn fields tested this season, particularly in fields with soil pH above 7.2. Visual symptoms often don't appear until significant yield loss has occurred. Soil testing with micronutrient analysis, coupled with tissue testing at V6-V8 growth stages, can identify deficiencies early enough for corrective action."
    },
    {
      title: "Precision Ag Technology Shows 15% Improvement in Fertilizer Efficiency",
      date: "December 12, 2025",
      category: "Technology",
      preview: "Variable-rate fertilizer application based on grid soil sampling reduces input costs while maintaining yields.",
      content: "Precision agriculture adoption continues to deliver measurable returns for crop producers. A comprehensive study of 100 commercial farms using variable-rate fertilizer application, guided by intensive soil sampling, showed an average 15% reduction in fertilizer costs over three years, with no yield penalty. The key was identifying field areas that were over-fertilized (often low-lying areas with higher organic matter) and reallocating those nutrients to deficient zones. Our GPS-referenced soil sampling program can provide the detailed field maps needed for effective variable-rate application."
    },
    {
      title: "Organic Matter Trends: Building Soil Carbon Through Regenerative Practices",
      date: "December 5, 2025",
      category: "Soil Health",
      preview: "Farms implementing regenerative agriculture practices show measurable increases in soil organic matter within 5-7 years.",
      content: "The movement toward regenerative agriculture is showing quantifiable results in soil organic matter (OM) accumulation. Farms combining no-till or strip-till with diverse cover crop mixes and integrated livestock grazing are seeing OM increases of 0.2-0.3% per year in the top 6 inches of soil. While this may seem modest, it represents significant carbon sequestration and improved soil function. Fields that have increased OM from 2.5% to 3.5% over seven years show better water infiltration, reduced erosion, and more stable yields during drought stress. Regular soil testing every 2-3 years helps track progress and validate management practices."
    }
  ];

  const news = testingMode === 'feeds' ? feedsNews : soilNews;
  const accentColor = testingMode === 'feeds' ? 'green' : 'orange';

  return (
    <div className="min-h-screen bg-stone-300">
      {/* Header */}
      <div className={`bg-gradient-to-br from-[#1E3A5F] to-[#2C5282] text-white py-8 border-l-8 ${testingMode === 'feeds' ? 'border-l-green-700' : 'border-l-orange-600'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-start justify-between">
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                testingMode === 'feeds' ? 'bg-green-600' : 'bg-orange-600'
              }`}>
                <TrendingUp className="size-4" />
                {testingMode === 'feeds' ? 'Feed & Forage' : 'Soil & Agronomy'}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Industry News</h1>
              <p className="text-blue-100 text-sm md:text-base">
                Latest updates and insights from our laboratory
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="size-6" />
            </button>
          </div>
        </div>
      </div>

      {/* News Articles */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-6">
          {news.map((article, index) => (
            <article
              key={index}
              className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-4 ${
                testingMode === 'feeds' ? 'border-l-green-600' : 'border-l-orange-600'
              } hover:shadow-xl transition-shadow`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    testingMode === 'feeds' 
                      ? 'bg-green-50 text-green-700' 
                      : 'bg-orange-50 text-orange-700'
                  }`}>
                    <BookOpen className="size-3.5" />
                    {article.category}
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                    <Calendar className="size-4" />
                    {article.date}
                  </div>
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {article.title}
                </h2>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {article.preview}
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {article.content}
                  </p>
                </div>

                <button
                  className={`inline-flex items-center gap-2 text-sm font-semibold ${
                    testingMode === 'feeds' ? 'text-green-600 hover:text-green-700' : 'text-orange-600 hover:text-orange-700'
                  } transition-colors`}
                >
                  Read full article
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className={`mt-8 bg-gradient-to-br from-[#1E3A5F] to-[#2C5282] rounded-xl p-8 text-white text-center border-l-8 ${
          testingMode === 'feeds' ? 'border-l-green-700' : 'border-l-orange-600/60'
        }`}>
          <h3 className="text-2xl font-bold mb-2">Stay Informed</h3>
          <p className="text-blue-100 mb-6">
            Subscribe to our monthly newsletter for the latest industry insights, research updates, and testing tips.
          </p>
          <button
            onClick={() => alert('Newsletter signup would open here. You would receive monthly updates on agricultural testing, research findings, and industry news.')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              testingMode === 'feeds'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-orange-600 hover:bg-orange-700'
            }`}
          >
            Subscribe to Newsletter
          </button>
        </div>
      </div>
    </div>
  );
}
