import { useState } from 'react';
import { ArrowLeft, Key, Copy, Check, Eye, EyeOff, TrendingUp, Code, Zap, DollarSign, Book } from 'lucide-react';

interface APIAccessProps {
  onBack: () => void;
  darkMode?: boolean;
  farmName: string;
}

interface APIKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  requestCount: number;
}

type ViewMode = 'overview' | 'documentation' | 'pricing';

export function APIAccess({ onBack, darkMode, farmName }: APIAccessProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showKeys, setShowKeys] = useState<Set<string>>(new Set());

  const [apiKeys] = useState<APIKey[]>([
    {
      id: 'key-1',
      name: 'Production API Key',
      key: 'ggl_live_a8f3k2j9d8s7h6g5f4d3s2a1',
      created: 'Jan 15, 2026',
      lastUsed: '2 hours ago',
      requestCount: 1247
    },
    {
      id: 'key-2',
      name: 'Development API Key',
      key: 'ggl_test_x9y8z7w6v5u4t3s2r1q0p9o8',
      created: 'Dec 10, 2025',
      lastUsed: '1 day ago',
      requestCount: 423
    }
  ]);

  const bgColor = darkMode ? 'bg-[#181818]' : 'bg-stone-200';
  const cardBg = darkMode ? 'bg-[#252525]' : 'bg-white';
  const cardBorder = darkMode ? 'border border-[#2C2C2C]' : 'shadow-md';
  const headerBg = darkMode ? 'bg-[#252525]' : 'bg-white';
  const headerBorder = darkMode ? 'border-b border-[#2C2C2C]' : 'shadow-sm';
  const textPrimary = darkMode ? 'text-[#E0E0E0]' : 'text-gray-800';
  const textSecondary = darkMode ? 'text-[#C0C0C0]' : 'text-gray-600';
  const textTertiary = darkMode ? 'text-[#909090]' : 'text-gray-500';
  const hoverBg = darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-50';
  const borderColor = darkMode ? 'border-[#2C2C2C]' : 'border-gray-100';
  const codeBg = darkMode ? 'bg-[#1A1A1A]' : 'bg-gray-100';

  const handleCopyKey = (key: string, keyId: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleKeyVisibility = (keyId: string) => {
    const newShowKeys = new Set(showKeys);
    if (newShowKeys.has(keyId)) {
      newShowKeys.delete(keyId);
    } else {
      newShowKeys.add(keyId);
    }
    setShowKeys(newShowKeys);
  };

  const maskKey = (key: string) => {
    const prefix = key.substring(0, 9); // "ggl_live_" or "ggl_test_"
    return `${prefix}${'•'.repeat(24)}`;
  };

  const totalRequests = apiKeys.reduce((sum, key) => sum + key.requestCount, 0);

  return (
    <div className={`min-h-screen ${bgColor} pb-24`}>
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
            <h1 className={`font-semibold ${textPrimary}`}>API Access</h1>
            <p className={`text-sm ${textSecondary}`}>{farmName}</p>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className={`${cardBg} ${darkMode ? 'border-b border-[#2C2C2C]' : ''} sticky top-[61px] z-10`}>
        <div className="flex">
          <button
            onClick={() => setViewMode('overview')}
            className={`flex-1 py-3 text-sm font-semibold transition-colors relative ${
              viewMode === 'overview'
                ? `${darkMode ? 'text-green-400' : 'text-green-600'}`
                : textSecondary
            }`}
          >
            Overview
            {viewMode === 'overview' && (
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${darkMode ? 'bg-green-400' : 'bg-green-600'}`} />
            )}
          </button>
          <button
            onClick={() => setViewMode('documentation')}
            className={`flex-1 py-3 text-sm font-semibold transition-colors relative ${
              viewMode === 'documentation'
                ? `${darkMode ? 'text-green-400' : 'text-green-600'}`
                : textSecondary
            }`}
          >
            Documentation
            {viewMode === 'documentation' && (
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${darkMode ? 'bg-green-400' : 'bg-green-600'}`} />
            )}
          </button>
          <button
            onClick={() => setViewMode('pricing')}
            className={`flex-1 py-3 text-sm font-semibold transition-colors relative ${
              viewMode === 'pricing'
                ? `${darkMode ? 'text-green-400' : 'text-green-600'}`
                : textSecondary
            }`}
          >
            Pricing
            {viewMode === 'pricing' && (
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${darkMode ? 'bg-green-400' : 'bg-green-600'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Overview Tab */}
      {viewMode === 'overview' && (
        <main className="px-4 py-4 space-y-4">
          {/* Usage Stats */}
          <div className={`${cardBg} ${cardBorder} rounded-xl p-5`}>
            <h2 className={`text-sm font-medium ${textSecondary} mb-4`}>API Usage This Month</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className={`text-xs ${textTertiary} mb-1`}>Total Requests</div>
                <div className={`text-2xl font-bold ${textPrimary}`}>{totalRequests.toLocaleString()}</div>
                <div className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-600'} mt-1 flex items-center gap-1`}>
                  <TrendingUp className="size-3" />
                  +12% vs last month
                </div>
              </div>
              <div>
                <div className={`text-xs ${textTertiary} mb-1`}>Active Keys</div>
                <div className={`text-2xl font-bold ${textPrimary}`}>{apiKeys.length}</div>
                <div className={`text-xs ${textTertiary} mt-1`}>2 of 5 keys used</div>
              </div>
            </div>
          </div>

          {/* API Keys */}
          <div className={`${cardBg} ${cardBorder} rounded-xl overflow-hidden`}>
            <div className={`px-4 py-3 ${borderColor} border-b flex items-center justify-between`}>
              <h3 className={`font-semibold ${textPrimary}`}>API Keys</h3>
              <button className={`text-sm font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                + Create New
              </button>
            </div>
            <div className="p-4 space-y-3">
              {apiKeys.map((apiKey) => (
                <div key={apiKey.id} className={`${darkMode ? 'bg-[#1E1E1E]' : 'bg-gray-50'} rounded-lg p-4`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className={`text-sm font-semibold ${textPrimary} mb-1`}>{apiKey.name}</div>
                      <div className={`text-xs ${textTertiary}`}>Created {apiKey.created}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                        className={`p-1.5 ${hoverBg} rounded transition-colors`}
                        title={showKeys.has(apiKey.id) ? 'Hide key' : 'Show key'}
                      >
                        {showKeys.has(apiKey.id) ? (
                          <EyeOff className={`size-4 ${textSecondary}`} />
                        ) : (
                          <Eye className={`size-4 ${textSecondary}`} />
                        )}
                      </button>
                      <button
                        onClick={() => handleCopyKey(apiKey.key, apiKey.id)}
                        className={`p-1.5 ${hoverBg} rounded transition-colors`}
                        title="Copy to clipboard"
                      >
                        {copiedKey === apiKey.id ? (
                          <Check className={`size-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                        ) : (
                          <Copy className={`size-4 ${textSecondary}`} />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className={`${codeBg} rounded px-3 py-2 mb-3`}>
                    <code className={`text-xs font-mono ${textPrimary}`}>
                      {showKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                    </code>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className={`${textTertiary}`}>
                      Last used: {apiKey.lastUsed}
                    </div>
                    <div className={`${textSecondary} font-semibold`}>
                      {apiKey.requestCount.toLocaleString()} requests
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className={`${cardBg} ${cardBorder} rounded-xl p-4`}>
            <h3 className={`text-sm font-semibold ${textPrimary} mb-3`}>Quick Links</h3>
            <div className="space-y-2">
              <button
                onClick={() => setViewMode('documentation')}
                className={`w-full p-3 ${hoverBg} rounded-lg text-left flex items-center gap-3 transition-colors`}
              >
                <Book className={`size-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <div className="flex-1">
                  <div className={`text-sm font-semibold ${textPrimary}`}>API Documentation</div>
                  <div className={`text-xs ${textTertiary}`}>View endpoints and examples</div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('pricing')}
                className={`w-full p-3 ${hoverBg} rounded-lg text-left flex items-center gap-3 transition-colors`}
              >
                <DollarSign className={`size-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                <div className="flex-1">
                  <div className={`text-sm font-semibold ${textPrimary}`}>Pricing & Limits</div>
                  <div className={`text-xs ${textTertiary}`}>View rate limits and costs</div>
                </div>
              </button>
            </div>
          </div>
        </main>
      )}

      {/* Documentation Tab */}
      {viewMode === 'documentation' && (
        <main className="px-4 py-4 space-y-4">
          <div className={`${cardBg} ${cardBorder} rounded-xl p-5`}>
            <h2 className={`text-lg font-bold ${textPrimary} mb-4 flex items-center gap-2`}>
              <Code className="size-5" />
              Getting Started
            </h2>
            <p className={`text-sm ${textSecondary} mb-4`}>
              The Goeser's Grazers API allows you to programmatically access sample results, submit new samples, and manage your account.
            </p>
            
            <div className={`${codeBg} rounded-lg p-4 mb-4`}>
              <div className={`text-xs ${textTertiary} mb-2`}>Base URL</div>
              <code className={`text-sm font-mono ${textPrimary}`}>
                https://api.goeserslab.com/v1
              </code>
            </div>

            <div className={`${codeBg} rounded-lg p-4`}>
              <div className={`text-xs ${textTertiary} mb-2`}>Authentication Header</div>
              <code className={`text-sm font-mono ${textPrimary}`}>
                Authorization: Bearer YOUR_API_KEY
              </code>
            </div>
          </div>

          {/* Endpoints */}
          <div className={`${cardBg} ${cardBorder} rounded-xl overflow-hidden`}>
            <div className={`px-4 py-3 ${borderColor} border-b`}>
              <h3 className={`font-semibold ${textPrimary}`}>Available Endpoints</h3>
            </div>
            <div className="p-4 space-y-4">
              {/* Get Samples */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                    GET
                  </span>
                  <code className={`text-sm font-mono ${textPrimary}`}>
                    /samples
                  </code>
                </div>
                <p className={`text-sm ${textSecondary} mb-2 ml-12`}>
                  Retrieve all samples for your account
                </p>
                <div className={`${codeBg} rounded p-3 ml-12`}>
                  <code className={`text-xs font-mono ${textPrimary}`}>
{`{
  "samples": [
    {
      "id": "1-026-305",
      "name": "East Bunker",
      "status": "completed",
      "results": {...}
    }
  ]
}`}
                  </code>
                </div>
              </div>

              {/* Get Sample by ID */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                    GET
                  </span>
                  <code className={`text-sm font-mono ${textPrimary}`}>
                    /samples/:id
                  </code>
                </div>
                <p className={`text-sm ${textSecondary} ml-12`}>
                  Get detailed results for a specific sample
                </p>
              </div>

              {/* Submit Sample */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'}`}>
                    POST
                  </span>
                  <code className={`text-sm font-mono ${textPrimary}`}>
                    /samples
                  </code>
                </div>
                <p className={`text-sm ${textSecondary} mb-2 ml-12`}>
                  Submit a new sample for testing
                </p>
                <div className={`${codeBg} rounded p-3 ml-12`}>
                  <code className={`text-xs font-mono ${textPrimary}`}>
{`{
  "sampleName": "North Field",
  "sampleType": "corn-silage",
  "testPackage": "cncps-complete",
  "rushProcessing": false
}`}
                  </code>
                </div>
              </div>

              {/* Get Projects */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                    GET
                  </span>
                  <code className={`text-sm font-mono ${textPrimary}`}>
                    /projects
                  </code>
                </div>
                <p className={`text-sm ${textSecondary} ml-12`}>
                  List all projects and associated samples
                </p>
              </div>
            </div>
          </div>

          {/* Example Code */}
          <div className={`${cardBg} ${cardBorder} rounded-xl p-5`}>
            <h3 className={`font-semibold ${textPrimary} mb-3`}>Example Request (JavaScript)</h3>
            <div className={`${codeBg} rounded p-4 overflow-x-auto`}>
              <code className={`text-xs font-mono ${textPrimary}`}>
{`const response = await fetch(
  'https://api.goeserslab.com/v1/samples',
  {
    headers: {
      'Authorization': 'Bearer ggl_live_...',
      'Content-Type': 'application/json'
    }
  }
);

const data = await response.json();
console.log(data.samples);`}
              </code>
            </div>
          </div>
        </main>
      )}

      {/* Pricing Tab */}
      {viewMode === 'pricing' && (
        <main className="px-4 py-4 space-y-4">
          {/* Pricing Tiers */}
          <div className={`${cardBg} ${cardBorder} rounded-xl overflow-hidden`}>
            <div className={`px-4 py-3 ${borderColor} border-b`}>
              <h3 className={`font-semibold ${textPrimary}`}>API Pricing Tiers</h3>
            </div>
            <div className="p-4 space-y-3">
              {/* Free Tier */}
              <div className={`${darkMode ? 'bg-[#1E1E1E]' : 'bg-gray-50'} rounded-lg p-4`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className={`text-lg font-bold ${textPrimary}`}>Free</h4>
                    <div className={`text-xs ${textTertiary} mt-1`}>For testing and development</div>
                  </div>
                  <div className={`text-2xl font-bold ${textPrimary}`}>$0</div>
                </div>
                <ul className={`space-y-2 text-sm ${textSecondary}`}>
                  <li className="flex items-start gap-2">
                    <Check className={`size-4 ${darkMode ? 'text-green-400' : 'text-green-600'} mt-0.5 flex-shrink-0`} />
                    <span>1,000 requests/month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className={`size-4 ${darkMode ? 'text-green-400' : 'text-green-600'} mt-0.5 flex-shrink-0`} />
                    <span>10 requests/minute rate limit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className={`size-4 ${darkMode ? 'text-green-400' : 'text-green-600'} mt-0.5 flex-shrink-0`} />
                    <span>Read-only access</span>
                  </li>
                </ul>
              </div>

              {/* Pro Tier */}
              <div className={`${darkMode ? 'bg-green-500/10 border-2 border-green-500/50' : 'bg-green-50 border-2 border-green-200'} rounded-lg p-4`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className={`text-lg font-bold ${textPrimary}`}>Professional</h4>
                    <div className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-600'} mt-1 font-semibold`}>
                      Most Popular
                    </div>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${textPrimary}`}>$200</div>
                    <div className={`text-xs ${textTertiary} text-right`}>/month</div>
                  </div>
                </div>
                <ul className={`space-y-2 text-sm ${textSecondary}`}>
                  <li className="flex items-start gap-2">
                    <Check className={`size-4 ${darkMode ? 'text-green-400' : 'text-green-600'} mt-0.5 flex-shrink-0`} />
                    <span>50,000 requests/month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className={`size-4 ${darkMode ? 'text-green-400' : 'text-green-600'} mt-0.5 flex-shrink-0`} />
                    <span>100 requests/minute rate limit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className={`size-4 ${darkMode ? 'text-green-400' : 'text-green-600'} mt-0.5 flex-shrink-0`} />
                    <span>Full read/write access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className={`size-4 ${darkMode ? 'text-green-400' : 'text-green-600'} mt-0.5 flex-shrink-0`} />
                    <span>Webhook notifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className={`size-4 ${darkMode ? 'text-green-400' : 'text-green-600'} mt-0.5 flex-shrink-0`} />
                    <span>Priority support</span>
                  </li>
                </ul>
                <button className={`w-full mt-4 py-2.5 ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700'} text-white rounded-lg font-semibold transition-colors`}>
                  Upgrade to Pro
                </button>
              </div>

              {/* Enterprise Tier */}
              <div className={`${darkMode ? 'bg-[#1E1E1E]' : 'bg-gray-50'} rounded-lg p-4`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className={`text-lg font-bold ${textPrimary}`}>Enterprise</h4>
                    <div className={`text-xs ${textTertiary} mt-1`}>For large operations</div>
                  </div>
                  <div className={`text-lg font-bold ${textPrimary}`}>Custom</div>
                </div>
                <ul className={`space-y-2 text-sm ${textSecondary}`}>
                  <li className="flex items-start gap-2">
                    <Check className={`size-4 ${darkMode ? 'text-green-400' : 'text-green-600'} mt-0.5 flex-shrink-0`} />
                    <span>Unlimited requests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className={`size-4 ${darkMode ? 'text-green-400' : 'text-green-600'} mt-0.5 flex-shrink-0`} />
                    <span>Custom rate limits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className={`size-4 ${darkMode ? 'text-green-400' : 'text-green-600'} mt-0.5 flex-shrink-0`} />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className={`size-4 ${darkMode ? 'text-green-400' : 'text-green-600'} mt-0.5 flex-shrink-0`} />
                    <span>SLA guarantees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className={`size-4 ${darkMode ? 'text-green-400' : 'text-green-600'} mt-0.5 flex-shrink-0`} />
                    <span>Custom integrations</span>
                  </li>
                </ul>
                <button className={`w-full mt-4 py-2.5 ${darkMode ? 'bg-[#2C2C2C] hover:bg-[#333]' : 'bg-gray-200 hover:bg-gray-300'} ${textPrimary} rounded-lg font-semibold transition-colors`}>
                  Contact Sales
                </button>
              </div>
            </div>
          </div>

          {/* Rate Limit Info */}
          <div className={`${cardBg} ${cardBorder} rounded-xl p-5`}>
            <h3 className={`font-semibold ${textPrimary} mb-3 flex items-center gap-2`}>
              <Zap className="size-5" />
              Rate Limits
            </h3>
            <p className={`text-sm ${textSecondary} mb-3`}>
              All API requests are subject to rate limiting based on your subscription tier. Rate limit headers are included in every response:
            </p>
            <div className={`${codeBg} rounded p-3`}>
              <code className={`text-xs font-mono ${textPrimary}`}>
{`X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1736875200`}
              </code>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}