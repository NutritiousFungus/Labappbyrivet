import { useState } from 'react';
import { ArrowLeft, CreditCard, DollarSign, CheckCircle2, AlertCircle, Calendar, Lock, Clock, Check, Wallet, Download, FileText, TrendingUp, Building2, Zap } from 'lucide-react';

interface PaymentPortalProps {
  onBack: () => void;
  darkMode?: boolean;
  farmName: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  dateIssued: string;
  dateDue: string;
  status: 'paid' | 'unpaid' | 'overdue';
  totalAmount: number;
  samples: InvoiceSample[];
}

interface InvoiceSample {
  id: string;
  sampleName: string;
  testType: string;
  amount: number;
  rushFee?: number;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'ach';
  last4: string;
  brand?: string;
  isDefault: boolean;
}

interface Transaction {
  id: string;
  transactionId: string;
  date: string;
  amount: number;
  method: string;
  invoiceNumber: string;
  status: 'completed' | 'pending' | 'failed';
}

type ViewMode = 'overview' | 'invoices' | 'payment-methods' | 'transactions' | 'make-payment';

export function PaymentPortal({ onBack, darkMode, farmName }: PaymentPortalProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const [selectedInvoices, setSelectedInvoices] = useState<Set<string>>(new Set());
  
  // Mock data - would come from API in production
  const [invoices] = useState<Invoice[]>([
    {
      id: 'inv-001',
      invoiceNumber: 'INV-2026-001',
      dateIssued: 'Jan 15, 2026',
      dateDue: 'Jan 30, 2026',
      status: 'unpaid',
      totalAmount: 144.00,
      samples: [
        { id: '1-026-305', sampleName: 'East Bunker', testType: 'CNCPS Complete', amount: 45.00, rushFee: 25.00 },
        { id: '1-025-298', sampleName: 'West Field', testType: 'Nutritionist Select', amount: 32.00 },
        { id: '1-024-291', sampleName: '', testType: 'Basic Check', amount: 22.00 },
      ]
    },
    {
      id: 'inv-002',
      invoiceNumber: 'INV-2026-002',
      dateIssued: 'Jan 10, 2026',
      dateDue: 'Jan 25, 2026',
      status: 'unpaid',
      totalAmount: 77.00,
      samples: [
        { id: '1-023-284', sampleName: 'South Lot', testType: 'CNCPS Complete', amount: 45.00 },
        { id: '1-022-277', sampleName: '', testType: 'Nutritionist Select', amount: 32.00 },
      ]
    },
    {
      id: 'inv-003',
      invoiceNumber: 'INV-2025-112',
      dateIssued: 'Dec 20, 2025',
      dateDue: 'Jan 5, 2026',
      status: 'paid',
      totalAmount: 99.00,
      samples: [
        { id: '1-019-256', sampleName: 'North Field', testType: 'CNCPS Complete', amount: 45.00 },
        { id: '1-018-249', sampleName: '', testType: 'Nutritionist Select', amount: 32.00 },
        { id: '1-017-242', sampleName: 'Center Bunker', testType: 'Basic Check', amount: 22.00 },
      ]
    }
  ]);

  const [paymentMethods] = useState<PaymentMethod[]>([
    { id: 'pm-1', type: 'card', last4: '4242', brand: 'Visa', isDefault: true },
    { id: 'pm-2', type: 'ach', last4: '6789', isDefault: false },
  ]);

  const [transactions] = useState<Transaction[]>([
    { id: 'txn-1', transactionId: 'TXN-1736785234-ABC123', date: 'Jan 5, 2026', amount: 99.00, method: 'Visa •••• 4242', invoiceNumber: 'INV-2025-112', status: 'completed' },
    { id: 'txn-2', transactionId: 'TXN-1735580834-DEF456', date: 'Dec 15, 2025', amount: 131.00, method: 'ACH •••• 6789', invoiceNumber: 'INV-2025-098', status: 'completed' },
    { id: 'txn-3', transactionId: 'TXN-1734371234-GHI789', date: 'Nov 28, 2025', amount: 77.00, method: 'Visa •••• 4242', invoiceNumber: 'INV-2025-085', status: 'completed' },
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
  const divideBorder = darkMode ? 'divide-[#2C2C2C]' : 'divide-gray-100';

  const totalUnpaid = invoices.filter(inv => inv.status === 'unpaid').reduce((sum, inv) => sum + inv.totalAmount, 0);
  const totalOverdue = invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.totalAmount, 0);

  const handleToggleInvoice = (id: string) => {
    const newSelected = new Set(selectedInvoices);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedInvoices(newSelected);
  };

  const selectedTotal = invoices
    .filter(inv => selectedInvoices.has(inv.id))
    .reduce((sum, inv) => sum + inv.totalAmount, 0);

  return (
    <div className={`min-h-screen ${bgColor} pb-24`}>
      {/* Header */}
      <header className={`${headerBg} ${headerBorder} sticky top-0 z-10`}>
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={viewMode === 'overview' ? onBack : () => setViewMode('overview')}
            className={`p-2 ${hoverBg} rounded-full transition-colors -ml-2`}
          >
            <ArrowLeft className={`size-5 ${textSecondary}`} />
          </button>
          <div className="flex-1">
            <h1 className={`font-semibold ${textPrimary}`}>Payment Portal</h1>
            <p className={`text-sm ${textSecondary}`}>{farmName}</p>
          </div>
        </div>
      </header>

      {/* Overview Mode */}
      {viewMode === 'overview' && (
        <main className="px-4 py-4 space-y-4">
          {/* Account Summary */}
          <div className={`${cardBg} ${cardBorder} rounded-xl p-5`}>
            <h2 className={`text-sm font-medium ${textSecondary} mb-4`}>Account Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className={`text-xs ${textTertiary} mb-1`}>Outstanding Balance</div>
                <div className={`text-2xl font-bold ${darkMode ? 'text-orange-400' : 'text-orange-600'} flex items-baseline gap-1`}>
                  <DollarSign className="size-5" />
                  {totalUnpaid.toFixed(2)}
                </div>
                <div className={`text-xs ${textTertiary} mt-1`}>
                  {invoices.filter(inv => inv.status === 'unpaid').length} unpaid invoices
                </div>
              </div>
              <div>
                <div className={`text-xs ${textTertiary} mb-1`}>Overdue</div>
                <div className={`text-2xl font-bold ${totalOverdue > 0 ? 'text-red-500' : (darkMode ? 'text-green-400' : 'text-green-600')} flex items-baseline gap-1`}>
                  <DollarSign className="size-5" />
                  {totalOverdue.toFixed(2)}
                </div>
                <div className={`text-xs ${textTertiary} mt-1`}>
                  {invoices.filter(inv => inv.status === 'overdue').length} overdue invoices
                </div>
              </div>
            </div>
            
            {/* Quick Pay Button */}
            {totalUnpaid > 0 && (
              <button
                onClick={() => setViewMode('make-payment')}
                className={`w-full mt-4 py-3 ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700'} text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2`}
              >
                <Zap className="size-4" />
                Pay ${totalUnpaid.toFixed(2)} Now
              </button>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setViewMode('invoices')}
              className={`${cardBg} ${cardBorder} rounded-xl p-4 ${hoverBg} transition-colors`}
            >
              <FileText className={`size-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'} mb-2`} />
              <div className={`text-sm font-semibold ${textPrimary}`}>Invoices</div>
              <div className={`text-xs ${textTertiary} mt-0.5`}>View & download</div>
            </button>

            <button
              onClick={() => setViewMode('payment-methods')}
              className={`${cardBg} ${cardBorder} rounded-xl p-4 ${hoverBg} transition-colors`}
            >
              <CreditCard className={`size-6 ${darkMode ? 'text-green-400' : 'text-green-600'} mb-2`} />
              <div className={`text-sm font-semibold ${textPrimary}`}>Payment Methods</div>
              <div className={`text-xs ${textTertiary} mt-0.5`}>Manage cards</div>
            </button>

            <button
              onClick={() => setViewMode('transactions')}
              className={`${cardBg} ${cardBorder} rounded-xl p-4 ${hoverBg} transition-colors`}
            >
              <TrendingUp className={`size-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'} mb-2`} />
              <div className={`text-sm font-semibold ${textPrimary}`}>Transactions</div>
              <div className={`text-xs ${textTertiary} mt-0.5`}>Payment history</div>
            </button>

            <button
              className={`${cardBg} ${cardBorder} rounded-xl p-4 ${hoverBg} transition-colors`}
            >
              <Building2 className={`size-6 ${darkMode ? 'text-amber-400' : 'text-amber-600'} mb-2`} />
              <div className={`text-sm font-semibold ${textPrimary}`}>Billing Info</div>
              <div className={`text-xs ${textTertiary} mt-0.5`}>Update details</div>
            </button>
          </div>

          {/* Recent Invoices Preview */}
          <div className={`${cardBg} ${cardBorder} rounded-xl overflow-hidden`}>
            <div className={`px-4 py-3 ${borderColor} border-b flex items-center justify-between`}>
              <h3 className={`font-semibold ${textPrimary}`}>Recent Invoices</h3>
              <button
                onClick={() => setViewMode('invoices')}
                className={`text-sm font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}
              >
                View All
              </button>
            </div>
            <div className={`divide-y ${divideBorder}`}>
              {invoices.slice(0, 3).map((invoice) => (
                <div key={invoice.id} className={`px-4 py-3 flex items-center justify-between ${hoverBg} cursor-pointer transition-colors`}>
                  <div className="flex-1">
                    <div className={`text-sm font-semibold ${textPrimary} mb-0.5`}>{invoice.invoiceNumber}</div>
                    <div className={`text-xs ${textTertiary}`}>Due {invoice.dateDue}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold ${textPrimary}`}>${invoice.totalAmount.toFixed(2)}</div>
                    <div className={`text-xs ${
                      invoice.status === 'paid' ? (darkMode ? 'text-green-400' : 'text-green-600') :
                      invoice.status === 'overdue' ? 'text-red-500' :
                      darkMode ? 'text-orange-400' : 'text-orange-600'
                    }`}>
                      {invoice.status.toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* Invoices View */}
      {viewMode === 'invoices' && (
        <main className="px-4 py-4 space-y-4">
          <div className={`${cardBg} ${cardBorder} rounded-xl overflow-hidden`}>
            <div className={`px-4 py-3 ${borderColor} border-b`}>
              <h3 className={`font-semibold ${textPrimary}`}>All Invoices</h3>
            </div>
            <div className={`divide-y ${divideBorder}`}>
              {invoices.map((invoice) => (
                <div key={invoice.id} className={`p-4`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className={`text-sm font-bold ${textPrimary} mb-1`}>{invoice.invoiceNumber}</div>
                      <div className={`text-xs ${textTertiary}`}>Issued: {invoice.dateIssued}</div>
                      <div className={`text-xs ${textTertiary}`}>Due: {invoice.dateDue}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${textPrimary} mb-1`}>${invoice.totalAmount.toFixed(2)}</div>
                      <div className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                        invoice.status === 'paid' 
                          ? `${darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'}`
                          : invoice.status === 'overdue'
                          ? 'bg-red-500/20 text-red-400'
                          : `${darkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-700'}`
                      }`}>
                        {invoice.status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  
                  {/* Sample breakdown */}
                  <div className={`${darkMode ? 'bg-[#1E1E1E]' : 'bg-gray-50'} rounded-lg p-3 space-y-2`}>
                    {invoice.samples.map((sample) => (
                      <div key={sample.id} className="flex items-center justify-between text-xs">
                        <div>
                          <span className={`font-mono font-medium ${textPrimary}`}>{sample.id}</span>
                          {sample.sampleName && <span className={`ml-2 ${textSecondary}`}>{sample.sampleName}</span>}
                          <div className={`${textTertiary} mt-0.5`}>{sample.testType}</div>
                        </div>
                        <div className="text-right">
                          <div className={`font-semibold ${textPrimary}`}>${sample.amount.toFixed(2)}</div>
                          {sample.rushFee && (
                            <div className={`${darkMode ? 'text-amber-400' : 'text-amber-600'} flex items-center gap-1 text-xs`}>
                              <Zap className="size-3" />
                              +${sample.rushFee.toFixed(2)} rush
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-3">
                    <button className={`flex-1 py-2 ${darkMode ? 'bg-[#2C2C2C] hover:bg-[#333]' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg text-sm font-medium ${textPrimary} transition-colors flex items-center justify-center gap-1.5`}>
                      <Download className="size-4" />
                      Download PDF
                    </button>
                    {invoice.status !== 'paid' && (
                      <button 
                        onClick={() => {
                          setSelectedInvoices(new Set([invoice.id]));
                          setViewMode('make-payment');
                        }}
                        className={`flex-1 py-2 ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700'} text-white rounded-lg text-sm font-medium transition-colors`}
                      >
                        Pay Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* Payment Methods View */}
      {viewMode === 'payment-methods' && (
        <main className="px-4 py-4 space-y-4">
          <div className={`${cardBg} ${cardBorder} rounded-xl overflow-hidden`}>
            <div className={`px-4 py-3 ${borderColor} border-b`}>
              <h3 className={`font-semibold ${textPrimary}`}>Saved Payment Methods</h3>
            </div>
            <div className={`divide-y ${divideBorder}`}>
              {paymentMethods.map((method) => (
                <div key={method.id} className={`p-4 flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    {method.type === 'card' ? (
                      <CreditCard className={`size-5 ${textSecondary}`} />
                    ) : (
                      <Building2 className={`size-5 ${textSecondary}`} />
                    )}
                    <div>
                      <div className={`text-sm font-semibold ${textPrimary}`}>
                        {method.type === 'card' ? `${method.brand} •••• ${method.last4}` : `ACH •••• ${method.last4}`}
                      </div>
                      {method.isDefault && (
                        <div className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-600'} flex items-center gap-1 mt-0.5`}>
                          <Check className="size-3" />
                          Default
                        </div>
                      )}
                    </div>
                  </div>
                  <button className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'} font-medium`}>
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button className={`w-full py-3 ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700'} text-white rounded-xl font-semibold transition-colors`}>
            + Add Payment Method
          </button>
        </main>
      )}

      {/* Transactions View */}
      {viewMode === 'transactions' && (
        <main className="px-4 py-4 space-y-4">
          <div className={`${cardBg} ${cardBorder} rounded-xl overflow-hidden`}>
            <div className={`px-4 py-3 ${borderColor} border-b`}>
              <h3 className={`font-semibold ${textPrimary}`}>Transaction History</h3>
            </div>
            <div className={`divide-y ${divideBorder}`}>
              {transactions.map((txn) => (
                <div key={txn.id} className={`p-4`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className={`text-sm font-semibold ${textPrimary} mb-1`}>{txn.invoiceNumber}</div>
                      <div className={`text-xs ${textTertiary} mb-0.5`}>{txn.date}</div>
                      <div className={`text-xs ${textTertiary}`}>{txn.method}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                        ${txn.amount.toFixed(2)}
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-600'} mt-1`}>
                        {txn.status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div className={`text-xs font-mono ${textTertiary}`}>{txn.transactionId}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* Make Payment View */}
      {viewMode === 'make-payment' && (
        <main className="px-4 py-4 space-y-4">
          <div className={`${cardBg} ${cardBorder} rounded-xl p-5`}>
            <div className={`text-sm ${textSecondary} mb-2`}>Total Amount Due</div>
            <div className={`text-4xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'} flex items-baseline gap-1`}>
              <DollarSign className="size-7" />
              {totalUnpaid.toFixed(2)}
            </div>
            <div className={`text-sm ${textTertiary} mt-2`}>
              {invoices.filter(inv => inv.status === 'unpaid').length} unpaid invoices
            </div>
          </div>

          <div className={`${cardBg} ${cardBorder} rounded-xl p-5`}>
            <h3 className={`text-sm font-semibold ${textPrimary} mb-3`}>Select Payment Method</h3>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  className={`w-full p-3 rounded-lg border-2 ${darkMode ? 'border-[#2C2C2C] hover:border-green-500' : 'border-gray-200 hover:border-green-500'} transition-colors text-left flex items-center justify-between`}
                >
                  <div className="flex items-center gap-3">
                    {method.type === 'card' ? (
                      <CreditCard className={`size-5 ${textSecondary}`} />
                    ) : (
                      <Building2 className={`size-5 ${textSecondary}`} />
                    )}
                    <div>
                      <div className={`text-sm font-semibold ${textPrimary}`}>
                        {method.type === 'card' ? `${method.brand} •••• ${method.last4}` : `ACH •••• ${method.last4}`}
                      </div>
                      {method.isDefault && (
                        <div className={`text-xs ${textTertiary}`}>Default</div>
                      )}
                    </div>
                  </div>
                  {method.isDefault && (
                    <Check className={`size-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          <button className={`w-full py-4 ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700'} text-white rounded-xl font-bold text-lg transition-colors`}>
            Pay ${totalUnpaid.toFixed(2)}
          </button>

          <div className={`${cardBg} ${cardBorder} rounded-lg p-3.5`}>
            <div className="flex gap-2.5">
              <Lock className={`size-4 ${textTertiary} flex-shrink-0 mt-0.5`} />
              <div className={`text-xs ${textTertiary}`}>
                Your payment information is encrypted and secure. We never store your full card details.
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
