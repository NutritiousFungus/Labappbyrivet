import { useState } from 'react';
import { ArrowLeft, CreditCard, DollarSign, CheckCircle2, AlertCircle, Calendar, Lock, Clock, Check, Wallet } from 'lucide-react';

interface AccountBalanceProps {
  onBack: () => void;
  darkMode?: boolean;
  farmName: string;
}

interface UnpaidSample {
  id: string;
  sampleName: string;
  testType: string;
  dateReceived: string;
  amount: number;
  selected: boolean;
}

interface PaidSample {
  id: string;
  sampleName: string;
  testType: string;
  datePaid: string;
  amount: number;
  transactionId: string;
}

type PaymentStep = 'overview' | 'payment' | 'confirmation';
type PaymentMethod = 'card' | 'venmo' | 'paypal';

export function AccountBalance({ onBack, darkMode, farmName }: AccountBalanceProps) {
  const [paymentStep, setPaymentStep] = useState<PaymentStep>('overview');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [unpaidSamples, setUnpaidSamples] = useState<UnpaidSample[]>([
    { id: '1-026-305', sampleName: 'East Bunker', testType: 'CNCPS Complete', dateReceived: 'Jan 10, 2026', amount: 45.00, selected: false },
    { id: '1-025-298', sampleName: 'West Field', testType: 'Nutritionist Select', dateReceived: 'Jan 9, 2026', amount: 32.00, selected: false },
    { id: '1-024-291', sampleName: '', testType: 'Basic Check', dateReceived: 'Jan 8, 2026', amount: 22.00, selected: false },
    { id: '1-023-284', sampleName: 'South Lot', testType: 'CNCPS Complete', dateReceived: 'Jan 7, 2026', amount: 45.00, selected: false },
    { id: '1-022-277', sampleName: '', testType: 'Nutritionist Select', dateReceived: 'Jan 6, 2026', amount: 32.00, selected: false },
  ]);

  const [paidSamples] = useState<PaidSample[]>([
    { id: '1-019-256', sampleName: 'North Field', testType: 'CNCPS Complete', datePaid: 'Jan 3, 2026', amount: 45.00, transactionId: 'TXN-1736785234-ABC123' },
    { id: '1-018-249', sampleName: '', testType: 'Nutritionist Select', datePaid: 'Jan 2, 2026', amount: 32.00, transactionId: 'TXN-1736698834-DEF456' },
    { id: '1-017-242', sampleName: 'Center Bunker', testType: 'Basic Check', datePaid: 'Jan 1, 2026', amount: 22.00, transactionId: 'TXN-1736612434-GHI789' },
    { id: '1-016-235', sampleName: 'East Pasture', testType: 'CNCPS Complete', datePaid: 'Dec 30, 2025', amount: 45.00, transactionId: 'TXN-1736526034-JKL012' },
    { id: '1-015-228', sampleName: '', testType: 'Nutritionist Select', datePaid: 'Dec 29, 2025', amount: 32.00, transactionId: 'TXN-1736439634-MNO345' },
  ]);

  // Payment form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const bgColor = darkMode ? 'bg-[#181818]' : 'bg-stone-200';
  const cardBg = darkMode ? 'bg-[#252525]' : 'bg-white';
  const cardBorder = darkMode ? 'border border-[#2C2C2C]' : 'shadow-md';
  const headerBg = darkMode ? 'bg-[#252525]' : 'bg-white';
  const headerBorder = darkMode ? 'border-b border-[#2C2C2C]' : 'shadow-sm';
  const textPrimary = darkMode ? 'text-[#E0E0E0]' : 'text-gray-800';
  const textSecondary = darkMode ? 'text-[#C0C0C0]' : 'text-gray-600';
  const textTertiary = darkMode ? 'text-[#909090]' : 'text-gray-500';
  const hoverBg = darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-50';
  const inputBg = darkMode ? 'bg-[#1A1A1A]' : 'bg-white';
  const inputBorder = darkMode ? 'border-[#3C3C3C]' : 'border-gray-300';
  const borderColor = darkMode ? 'border-[#2C2C2C]' : 'border-gray-100';
  const checkboxBorder = darkMode ? 'border-[#3C3C3C]' : 'border-gray-300';
  const divideBorder = darkMode ? 'divide-[#2C2C2C]' : 'divide-gray-100';
  const rowBg = darkMode ? 'bg-[#222222]' : 'bg-stone-100';

  const totalBalance = unpaidSamples.reduce((sum, sample) => sum + sample.amount, 0);
  const selectedTotal = unpaidSamples.filter(s => s.selected).reduce((sum, sample) => sum + sample.amount, 0);
  const selectedCount = unpaidSamples.filter(s => s.selected).length;

  const handleToggleSample = (id: string) => {
    setUnpaidSamples(unpaidSamples.map(sample => 
      sample && sample.id === id ? { ...sample, selected: !sample.selected } : sample
    ));
  };

  const handleSelectAll = () => {
    const allSelected = unpaidSamples.every(s => s?.selected);
    setUnpaidSamples(unpaidSamples.map(sample => sample ? ({ ...sample, selected: !allSelected }) : sample));
  };

  const handleProceedToPayment = () => {
    if (selectedCount > 0) {
      setPaymentStep('payment');
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiryDate(formatted);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    if (value.length <= 4) {
      setCvv(value);
    }
  };

  const handleSubmitPayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate transaction ID
    const txId = `TXN-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    setTransactionId(txId);
    
    setIsProcessing(false);
    setPaymentStep('confirmation');
  };

  const handleFinish = () => {
    // Remove paid samples
    setUnpaidSamples(unpaidSamples.filter(s => !s.selected));
    
    // Reset form
    setCardNumber('');
    setCardName('');
    setExpiryDate('');
    setCvv('');
    setSaveCard(false);
    setPaymentStep('overview');
  };

  const isPaymentFormValid = 
    cardNumber.replace(/\s/g, '').length === 16 &&
    cardName.trim().length > 0 &&
    expiryDate.length === 5 &&
    cvv.length >= 3;

  return (
    <div className={`min-h-screen ${bgColor} pb-24`}>
      {/* Header */}
      <header className={`${headerBg} ${headerBorder} sticky top-0 z-10`}>
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={paymentStep === 'overview' ? onBack : () => setPaymentStep('overview')}
            className={`p-2 ${hoverBg} rounded-full transition-colors -ml-2`}
          >
            <ArrowLeft className={`size-5 ${textSecondary}`} />
          </button>
          <div className="flex-1">
            <h1 className={`font-semibold ${textPrimary}`}>Account Balance</h1>
            <p className={`text-sm ${textSecondary}`}>{farmName}</p>
          </div>
        </div>
      </header>

      {/* Overview Step */}
      {paymentStep === 'overview' && (
        <main className="px-4 py-4">
          {/* Compact Balance Summary */}
          <div className={`${cardBg} ${cardBorder} rounded-xl p-4 mb-4`}>
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-sm font-medium ${textSecondary} mb-1 flex items-center gap-1.5`}>
                  <AlertCircle className="size-4 text-red-600" />
                  Outstanding Balance
                </div>
                <div className={`text-3xl font-bold ${textPrimary}`}>${totalBalance.toFixed(2)}</div>
              </div>
              <div className="text-right">
                <div className={`${textTertiary} text-sm`}>{unpaidSamples.length} unpaid</div>
                {selectedCount > 0 && (
                  <div className={`${darkMode ? 'text-green-400' : 'text-green-600'} font-semibold text-lg mt-1`}>
                    ${selectedTotal.toFixed(2)} selected
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Unpaid Samples List */}
          <div className={`${cardBg} ${cardBorder} rounded-xl overflow-hidden mb-4`}>
            <div className={`px-4 py-3 ${borderColor} border-b flex items-center justify-between`}>
              <h3 className={`font-semibold ${textPrimary}`}>Unpaid Samples</h3>
              <button
                onClick={handleSelectAll}
                className={`text-sm font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}
              >
                {unpaidSamples.every(s => s.selected) ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            <div className={`divide-y ${divideBorder}`}>
              {unpaidSamples.map((sample, index) => (
                <button
                  key={sample.id}
                  onClick={() => handleToggleSample(sample.id)}
                  className={`w-full px-4 py-3 text-left transition-colors ${index % 2 === 0 ? '' : rowBg} ${hoverBg} border-l-4 ${sample.selected ? 'border-l-green-600' : 'border-l-transparent'}`}
                >
                  <div className="flex items-center gap-3">
                    {/* Checkbox */}
                    <div className={`size-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                      sample.selected
                        ? 'bg-green-600 border-green-600'
                        : `${inputBg} ${checkboxBorder}`
                    }`}>
                      {sample.selected && <Check className="size-3.5 text-white" strokeWidth={3} />}
                    </div>

                    {/* Sample Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className={`font-mono text-sm font-bold ${textPrimary}`}>{sample.id}</span>
                        {sample.sampleName && (
                          <>
                            <span className={`text-xs ${textTertiary}`}>•</span>
                            <span className={`text-sm ${textSecondary} truncate`}>{sample.sampleName}</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs ${textTertiary}`}>{sample.testType}</span>
                        <span className={`text-xs ${textTertiary}`}>•</span>
                        <span className={`text-xs ${textTertiary} flex items-center gap-1`}>
                          <Clock className="size-3" />
                          {sample.dateReceived}
                        </span>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className={`font-bold ${textPrimary} text-lg flex-shrink-0`}>
                      ${sample.amount.toFixed(2)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Paid Samples Section */}
          <div className={`${cardBg} ${cardBorder} rounded-xl overflow-hidden`}>
            <div className={`px-4 py-3 ${borderColor} border-b`}>
              <h3 className={`font-semibold ${textPrimary} flex items-center gap-2`}>
                <CheckCircle2 className={`size-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                Recent Payments
              </h3>
            </div>

            <div className={`divide-y ${divideBorder}`}>
              {paidSamples.map((sample, index) => (
                <div
                  key={sample.id}
                  className={`px-4 py-3 ${index % 2 === 0 ? '' : rowBg} border-l-4 border-l-green-600/30`}
                >
                  <div className="flex items-start justify-between gap-3">
                    {/* Sample Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className={`font-mono text-sm font-bold ${textPrimary}`}>{sample.id}</span>
                        {sample.sampleName && (
                          <>
                            <span className={`text-xs ${textTertiary}`}>•</span>
                            <span className={`text-sm ${textSecondary} truncate`}>{sample.sampleName}</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`text-xs ${textTertiary}`}>{sample.testType}</span>
                        <span className={`text-xs ${textTertiary}`}>•</span>
                        <span className={`text-xs ${textTertiary}`}>Paid {sample.datePaid}</span>
                      </div>
                      <div className={`text-xs ${textTertiary} font-mono`}>
                        {sample.transactionId}
                      </div>
                    </div>

                    {/* Amount - Paid style */}
                    <div className="flex-shrink-0 text-right">
                      <div className={`font-bold ${darkMode ? 'text-green-400' : 'text-green-600'} text-lg`}>
                        ${sample.amount.toFixed(2)}
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-green-400/60' : 'text-green-600/60'} font-medium`}>
                        PAID
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* Payment Step */}
      {paymentStep === 'payment' && (
        <main className="px-4 py-4">
          {/* Payment Summary - Redesigned */}
          <div className={`${cardBg} ${cardBorder} rounded-xl p-5 mb-4`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${textSecondary}`}>Total Payment</span>
              <span className={`text-xs ${textTertiary}`}>{selectedCount} sample{selectedCount !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <DollarSign className={`size-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              <span className={`text-5xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                {selectedTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className={`${cardBg} ${cardBorder} rounded-xl p-5 mb-4`}>
            <h3 className={`text-sm font-semibold ${textPrimary} mb-3`}>Select Payment Method</h3>
            
            <div className="grid grid-cols-3 gap-2">
              {/* Credit Card Option */}
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  paymentMethod === 'card'
                    ? `${darkMode ? 'border-green-500 bg-green-500/10' : 'border-green-600 bg-green-50'}`
                    : `${inputBorder} ${hoverBg}`
                }`}
              >
                <CreditCard className={`size-6 mx-auto mb-1.5 ${
                  paymentMethod === 'card'
                    ? darkMode ? 'text-green-400' : 'text-green-600'
                    : textSecondary
                }`} />
                <div className={`text-xs font-medium ${paymentMethod === 'card' ? (darkMode ? 'text-green-400' : 'text-green-600') : textSecondary}`}>
                  Card
                </div>
              </button>

              {/* Venmo Option */}
              <button
                onClick={() => setPaymentMethod('venmo')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  paymentMethod === 'venmo'
                    ? `${darkMode ? 'border-blue-500 bg-blue-500/10' : 'border-blue-600 bg-blue-50'}`
                    : `${inputBorder} ${hoverBg}`
                }`}
              >
                <Wallet className={`size-6 mx-auto mb-1.5 ${
                  paymentMethod === 'venmo'
                    ? darkMode ? 'text-blue-400' : 'text-blue-600'
                    : textSecondary
                }`} />
                <div className={`text-xs font-medium ${paymentMethod === 'venmo' ? (darkMode ? 'text-blue-400' : 'text-blue-600') : textSecondary}`}>
                  Venmo
                </div>
              </button>

              {/* PayPal Option */}
              <button
                onClick={() => setPaymentMethod('paypal')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  paymentMethod === 'paypal'
                    ? `${darkMode ? 'border-blue-500 bg-blue-500/10' : 'border-blue-600 bg-blue-50'}`
                    : `${inputBorder} ${hoverBg}`
                }`}
              >
                <DollarSign className={`size-6 mx-auto mb-1.5 ${
                  paymentMethod === 'paypal'
                    ? darkMode ? 'text-blue-400' : 'text-blue-600'
                    : textSecondary
                }`} />
                <div className={`text-xs font-medium ${paymentMethod === 'paypal' ? (darkMode ? 'text-blue-400' : 'text-blue-600') : textSecondary}`}>
                  PayPal
                </div>
              </button>
            </div>
          </div>

          {/* Credit Card Form - Only show if card is selected */}
          {paymentMethod === 'card' && (
            <div className={`${cardBg} ${cardBorder} rounded-xl p-5 mb-4`}>
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className={`size-5 ${textSecondary}`} />
                <h3 className={`font-semibold ${textPrimary}`}>Card Details</h3>
              </div>

              <div className="space-y-3">
                {/* Card Number */}
                <div>
                  <label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    className={`w-full ${inputBg} border ${inputBorder} rounded-lg px-3 py-2.5 ${textPrimary} placeholder-gray-400 focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-green-500/50' : 'focus:ring-green-500'}`}
                  />
                </div>

                {/* Cardholder Name */}
                <div>
                  <label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Austin Russell"
                    className={`w-full ${inputBg} border ${inputBorder} rounded-lg px-3 py-2.5 ${textPrimary} placeholder-gray-400 focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-green-500/50' : 'focus:ring-green-500'}`}
                  />
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>
                      <Calendar className="size-3.5 inline mr-1" />
                      Expiry
                    </label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      className={`w-full ${inputBg} border ${inputBorder} rounded-lg px-3 py-2.5 ${textPrimary} placeholder-gray-400 focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-green-500/50' : 'focus:ring-green-500'}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>
                      <Lock className="size-3.5 inline mr-1" />
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={handleCvvChange}
                      placeholder="123"
                      className={`w-full ${inputBg} border ${inputBorder} rounded-lg px-3 py-2.5 ${textPrimary} placeholder-gray-400 focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-green-500/50' : 'focus:ring-green-500'}`}
                    />
                  </div>
                </div>

                {/* Save Card Checkbox */}
                <button
                  onClick={() => setSaveCard(!saveCard)}
                  className="flex items-center gap-2.5 w-full pt-1"
                >
                  <div className={`w-5 h-5 rounded border-2 ${saveCard ? (darkMode ? 'bg-green-500 border-green-500' : 'bg-green-600 border-green-600') : `${inputBg} ${checkboxBorder}`} flex items-center justify-center transition-colors`}>
                    {saveCard && <Check className="size-3.5 text-white" strokeWidth={3} />}
                  </div>
                  <span className={`text-sm ${textSecondary}`}>Save card for future payments</span>
                </button>
              </div>
            </div>
          )}

          {/* Venmo Form */}
          {paymentMethod === 'venmo' && (
            <div className={`${cardBg} ${cardBorder} rounded-xl p-5 mb-4`}>
              <div className="flex items-center gap-2 mb-4">
                <Wallet className={`size-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <h3 className={`font-semibold ${textPrimary}`}>Venmo Details</h3>
              </div>
              <div className={`text-center py-8 ${textSecondary}`}>
                <div className="mb-3">You'll be redirected to Venmo to complete your payment</div>
                <div className={`text-sm ${textTertiary}`}>Payment amount: ${selectedTotal.toFixed(2)}</div>
              </div>
            </div>
          )}

          {/* PayPal Form */}
          {paymentMethod === 'paypal' && (
            <div className={`${cardBg} ${cardBorder} rounded-xl p-5 mb-4`}>
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className={`size-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <h3 className={`font-semibold ${textPrimary}`}>PayPal Details</h3>
              </div>
              <div className={`text-center py-8 ${textSecondary}`}>
                <div className="mb-3">You'll be redirected to PayPal to complete your payment</div>
                <div className={`text-sm ${textTertiary}`}>Payment amount: ${selectedTotal.toFixed(2)}</div>
              </div>
            </div>
          )}

          {/* Security Notice */}
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

      {/* Confirmation Step */}
      {paymentStep === 'confirmation' && (
        <main className="px-4 py-6">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className={`w-20 h-20 rounded-full ${darkMode ? 'bg-green-500/20' : 'bg-green-100'} flex items-center justify-center mx-auto mb-4`}>
              <CheckCircle2 className={`size-10 ${darkMode ? 'text-green-400' : 'text-green-600'}`} strokeWidth={2} />
            </div>
            <h2 className={`text-2xl font-bold ${textPrimary} mb-2`}>Payment Successful!</h2>
            <p className={`${textSecondary}`}>Your payment has been processed</p>
          </div>

          {/* Transaction Details */}
          <div className={`${cardBg} ${cardBorder} rounded-xl overflow-hidden mb-6`}>
            <div className={`px-5 py-4 ${borderColor} border-b`}>
              <h3 className={`text-lg font-semibold ${textPrimary}`}>Transaction Details</h3>
            </div>
            
            <div className="p-5 space-y-3">
              <div className="flex justify-between">
                <span className={`${textSecondary}`}>Transaction ID</span>
                <span className={`font-mono text-sm ${textPrimary}`}>{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className={`${textSecondary}`}>Date</span>
                <span className={`${textPrimary}`}>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex justify-between">
                <span className={`${textSecondary}`}>Payment Method</span>
                <span className={`${textPrimary}`}>•••• {cardNumber.slice(-4)}</span>
              </div>
              <div className={`border-t ${borderColor} pt-3 mt-3`}>
                <div className="flex justify-between items-center">
                  <span className={`font-semibold ${textPrimary}`}>Amount Paid</span>
                  <span className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                    ${selectedTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Paid Samples */}
          <div className={`${cardBg} ${cardBorder} rounded-xl overflow-hidden`}>
            <div className={`px-5 py-4 ${borderColor} border-b`}>
              <h3 className={`text-lg font-semibold ${textPrimary}`}>Paid Samples</h3>
            </div>
            
            <div className={`divide-y ${divideBorder}`}>
              {unpaidSamples.filter(s => s.selected).map((sample) => (
                <div key={sample.id} className="px-5 py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-mono font-semibold ${textPrimary}`}>{sample.id}</span>
                        {sample.sampleName && (
                          <>
                            <span className={`text-xs ${textTertiary}`}>•</span>
                            <span className={`text-sm ${textSecondary}`}>{sample.sampleName}</span>
                          </>
                        )}
                      </div>
                      <div className={`text-sm ${textTertiary}`}>{sample.testType}</div>
                    </div>
                    <div className={`font-bold ${textPrimary}`}>${sample.amount.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* Fixed Bottom Button */}
      {paymentStep === 'overview' && (
        <div className={`fixed bottom-0 left-0 right-0 ${cardBg} border-t ${borderColor} p-4 shadow-lg`}>
          <button
            onClick={handleProceedToPayment}
            disabled={selectedCount === 0}
            className={`w-full ${selectedCount > 0 ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'} text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-md ${selectedCount > 0 ? 'active:scale-98' : ''}`}
          >
            <DollarSign className="size-5" />
            <span>Pay ${selectedTotal.toFixed(2)}</span>
          </button>
        </div>
      )}

      {paymentStep === 'payment' && (
        <div className={`fixed bottom-0 left-0 right-0 ${cardBg} border-t ${borderColor} p-4 shadow-lg`}>
          <button
            onClick={handleSubmitPayment}
            disabled={!isPaymentFormValid || isProcessing}
            className={`w-full ${isPaymentFormValid && !isProcessing ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'} text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-md ${isPaymentFormValid && !isProcessing ? 'active:scale-98' : ''}`}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Processing Payment...</span>
              </>
            ) : (
              <>
                <Lock className="size-5" />
                <span>Pay ${selectedTotal.toFixed(2)}</span>
              </>
            )}
          </button>
        </div>
      )}

      {paymentStep === 'confirmation' && (
        <div className={`fixed bottom-0 left-0 right-0 ${cardBg} border-t ${borderColor} p-4 shadow-lg`}>
          <button
            onClick={handleFinish}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-semibold transition-all shadow-md active:scale-98"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}