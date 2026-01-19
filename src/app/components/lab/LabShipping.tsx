import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Truck, 
  Search, 
  Filter, 
  Undo,
  CheckCircle2,
  Package
} from 'lucide-react';
import { 
  INCOMING_SAMPLES_BY_LAB, 
  INTERLAB_TO_RECEIVE, 
  INTERLAB_TO_SEND,
  getInterlabToReceive,
  getInterlabToSend 
} from '@/app/data/labMockData';
import { AdminSection } from './types';

interface LabShippingProps {
  darkMode: boolean;
  setActiveSection: (section: AdminSection) => void;
}

export function LabShipping({ darkMode, setActiveSection }: LabShippingProps) {
  const [shippingView, setShippingView] = useState<'incoming' | 'interlab'>('incoming');
  const [selectedLab, setSelectedLab] = useState('Watertown, WI');
  const [receiveSearchQuery, setReceiveSearchQuery] = useState('');
  const [sendSearchQuery, setSendSearchQuery] = useState('');
  const [receivedSamples, setReceivedSamples] = useState<Set<string>>(new Set());
  const [sentSamples, setSentSamples] = useState<Set<string>>(new Set());

  // Memoized shipping data
  const incomingSamples = useMemo(() => {
    if (!INCOMING_SAMPLES_BY_LAB || !selectedLab) return [];
    return INCOMING_SAMPLES_BY_LAB[selectedLab] || [];
  }, [selectedLab]);
  
  const interlabToReceive = useMemo(() => {
    if (!INTERLAB_TO_RECEIVE || !selectedLab) return [];
    const samples = INTERLAB_TO_RECEIVE[selectedLab] || [];
    return samples.filter(s => !(receivedSamples?.has(s.containerId)));
  }, [selectedLab, receivedSamples]);
  
  const interlabToSend = useMemo(() => {
    if (!INTERLAB_TO_SEND || !selectedLab) return [];
    const samples = INTERLAB_TO_SEND[selectedLab] || [];
    return samples.filter(s => !(sentSamples?.has(s.containerId)));
  }, [selectedLab, sentSamples]);

  // Derived filtered data
  const filteredReceiveSamples = useMemo(() => {
    if (!receiveSearchQuery) return interlabToReceive;
    return interlabToReceive.filter(s => 
      s.containerId.toLowerCase().includes(receiveSearchQuery.toLowerCase()) ||
      s.sampleType.toLowerCase().includes(receiveSearchQuery.toLowerCase()) ||
      s.fromLab.toLowerCase().includes(receiveSearchQuery.toLowerCase())
    );
  }, [interlabToReceive, receiveSearchQuery]);

  const filteredSendSamples = useMemo(() => {
    if (!sendSearchQuery) return interlabToSend;
    return interlabToSend.filter(s => 
      s.containerId.toLowerCase().includes(sendSearchQuery.toLowerCase()) ||
      s.sampleType.toLowerCase().includes(sendSearchQuery.toLowerCase()) ||
      s.toLab.toLowerCase().includes(sendSearchQuery.toLowerCase())
    );
  }, [interlabToSend, sendSearchQuery]);

  // Handlers
  const handleMarkReceived = (containerId: string) => {
    const newReceived = new Set(receivedSamples);
    newReceived.add(containerId);
    setReceivedSamples(newReceived);
  };

  const handleUndoReceived = (containerId: string) => {
    const newReceived = new Set(receivedSamples);
    newReceived.delete(containerId);
    setReceivedSamples(newReceived);
  };

  const handleMarkSent = (containerId: string) => {
    const newSent = new Set(sentSamples);
    newSent.add(containerId);
    setSentSamples(newSent);
  };

  const handleUndoSent = (containerId: string) => {
    const newSent = new Set(sentSamples);
    newSent.delete(containerId);
    setSentSamples(newSent);
  };

  // Theme classes
  const themeClasses = useMemo(() => ({
    cardBg: darkMode ? 'bg-[#252525]' : 'bg-white',
    textPrimary: darkMode ? 'text-[#E0E0E0]' : 'text-gray-800',
    textSecondary: darkMode ? 'text-[#C0C0C0]' : 'text-gray-600',
    borderColor: darkMode ? 'border-[#2C2C2C]' : 'border-gray-200',
    hoverBg: darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-50'
  }), [darkMode]);

  const { cardBg, textPrimary, textSecondary, borderColor, hoverBg } = themeClasses;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Back Button */}
      <button
        onClick={() => setActiveSection('home')}
        className={`flex items-center gap-2 mb-6 -ml-2 p-2 ${textSecondary} transition-colors ${hoverBg} rounded-lg`}
      >
        <ArrowLeft className="size-5" />
        <span className="font-medium">Back</span>
      </button>

      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-bold ${textPrimary}`}>Shipping & Receiving</h2>
        
        {/* View Toggle */}
        <div className={`flex p-1 rounded-lg border ${borderColor} ${cardBg}`}>
          <button
            onClick={() => setShippingView('incoming')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              shippingView === 'incoming'
                ? 'bg-[#1f5527] text-white shadow-sm'
                : `${textSecondary} hover:${textPrimary}`
            }`}
          >
            Incoming Client Samples
          </button>
          <button
            onClick={() => setShippingView('interlab')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              shippingView === 'interlab'
                ? 'bg-[#1f5527] text-white shadow-sm'
                : `${textSecondary} hover:${textPrimary}`
            }`}
          >
            Inter-Lab Transfers
          </button>
        </div>
      </div>

      {/* Incoming Samples View */}
      {shippingView === 'incoming' && (
        <>
          {/* Lab Selector */}
          <div className={`${cardBg} ${borderColor} border rounded-lg p-4 mb-6`}>
            <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
              Select Your Laboratory
            </label>
            <select 
              value={selectedLab}
              onChange={(e) => setSelectedLab(e.target.value)}
              className={`w-full md:w-96 px-3 py-2 ${darkMode ? 'bg-[#2C2C2C]' : 'bg-white'} ${borderColor} border rounded-lg ${textPrimary}`}
            >
              <option>Watertown, WI</option>
              <option>Binghamton, NY</option>
              <option>Colby, WI</option>
              <option>Sioux Falls, SD</option>
              <option>Visalia, CA</option>
              <option>Wooster, OH</option>
              <option>Edmondson, TX</option>
              <option>Marne, MI</option>
              <option>Nampa, ID</option>
              <option>Manheim, PA</option>
            </select>
          </div>

          <div className={`${cardBg} ${borderColor} border rounded-lg overflow-hidden`}>
            <div className={`p-4 border-b ${borderColor} flex justify-between items-center`}>
              <h3 className={`font-semibold ${textPrimary}`}>Expecting {incomingSamples.length} Samples Today</h3>
              <button className={`text-sm text-[#1f5527] hover:underline font-medium`}>
                View All Incoming
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={darkMode ? 'bg-[#2C2C2C]' : 'bg-gray-50'}>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Customer</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Type</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Tests</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Org</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Est. Arrival</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${borderColor}`}>
                  {incomingSamples.map((sample, idx) => (
                    <tr key={idx} className={hoverBg}>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${textPrimary}`}>
                        {sample.customerName}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${textSecondary}`}>
                        {sample.sampleType}
                      </td>
                      <td className={`px-6 py-4 text-sm ${textSecondary}`}>
                        <div className="break-words">{sample.tests}</div>
                      </td>
                      <td className={`px-6 py-4 text-sm ${textSecondary}`}>
                        <div className="break-words">{sample.organization}</div>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${textSecondary}`}>
                        {sample.submittedDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Inter-Lab Samples View */}
      {shippingView === 'interlab' && (
        <>
          {/* Lab Selector */}
          <div className={`${cardBg} ${borderColor} border rounded-lg p-4 mb-6`}>
            <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
              Select Your Laboratory
            </label>
            <select 
              value={selectedLab}
              onChange={(e) => {
                setSelectedLab(e.target.value);
                // Clear received/sent tracking when changing labs
                setReceivedSamples(new Set());
                setSentSamples(new Set());
                setReceiveSearchQuery('');
                setSendSearchQuery('');
              }}
              className={`w-full md:w-96 px-3 py-2 ${darkMode ? 'bg-[#2C2C2C]' : 'bg-white'} ${borderColor} border rounded-lg ${textPrimary}`}
            >
              <option>Watertown, WI</option>
              <option>Binghamton, NY</option>
              <option>Colby, WI</option>
              <option>Sioux Falls, SD</option>
              <option>Visalia, CA</option>
              <option>Wooster, OH</option>
              <option>Edmondson, TX</option>
              <option>Marne, MI</option>
              <option>Nampa, ID</option>
              <option>Manheim, PA</option>
            </select>
          </div>

          {/* Two Columns: To Receive and To Send */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Samples to Receive */}
            <div>
              <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Samples to Receive</h3>
              
              {/* Search and Filter Bar */}
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 size-4 ${textSecondary}`} />
                  <input
                    type="text"
                    placeholder="Search by Container ID, type, or lab..."
                    value={receiveSearchQuery}
                    onChange={(e) => setReceiveSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 ${darkMode ? 'bg-[#2C2C2C]' : 'bg-white'} ${borderColor} border rounded-lg ${textPrimary} text-sm`}
                  />
                </div>
                <button className={`p-2 ${cardBg} ${borderColor} border rounded-lg ${hoverBg} transition-colors`}>
                  <Filter className={`size-5 ${textSecondary}`} />
                </button>
              </div>

              {/* Undo Section - Recently Received */}
              {Array.from(receivedSamples || []).length > 0 && (
                <div className={`${cardBg} ${borderColor} border rounded-lg p-3 mb-4`}>
                  <div className={`text-xs font-medium ${textSecondary} uppercase tracking-wider mb-2`}>Recently Marked as Received</div>
                  <div className="space-y-2">
                    {Array.from(receivedSamples || []).map((containerId) => {
                      const original = selectedLab ? getInterlabToReceive(selectedLab).find(s => s?.containerId === containerId) : undefined;
                      return original ? (
                        <div key={containerId} className={`flex items-center justify-between p-2 rounded ${darkMode ? 'bg-[#1A1A1A]' : 'bg-gray-50'}`}>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="size-4 text-green-500" />
                            <span className={`text-xs font-mono ${textPrimary}`}>{containerId}</span>
                            <span className={`text-xs ${textSecondary}`}>from {original.fromLab}</span>
                          </div>
                          <button
                            onClick={() => handleUndoReceived(containerId)}
                            className={`flex items-center gap-1 px-2 py-1 text-xs ${darkMode ? 'bg-[#2C2C2C] hover:bg-[#3C3C3C]' : 'bg-white hover:bg-gray-100'} rounded transition-colors`}
                          >
                            <Undo className="size-3" />
                            Undo
                          </button>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              <div className={`${cardBg} ${borderColor} border rounded-lg overflow-hidden`}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className={darkMode ? 'bg-[#2C2C2C]' : 'bg-gray-50'}>
                      <tr>
                        <th className={`px-4 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Container ID</th>
                        <th className={`px-4 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Type</th>
                        <th className={`px-4 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>From</th>
                        <th className={`px-4 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Actions</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${borderColor}`}>
                      {filteredReceiveSamples.length === 0 ? (
                        <tr>
                          <td colSpan={4} className={`px-4 py-8 text-center text-sm ${textSecondary}`}>
                            {receiveSearchQuery ? 'No samples match your search' : 'No samples to receive'}
                          </td>
                        </tr>
                      ) : (
                        filteredReceiveSamples.map((sample, idx) => (
                          <tr key={idx} className={hoverBg}>
                            <td className={`px-4 py-3 whitespace-nowrap text-sm font-mono ${textPrimary}`}>
                              {sample.containerId}
                            </td>
                            <td className={`px-4 py-3 whitespace-nowrap text-xs ${textSecondary}`}>
                              {sample.sampleType}
                            </td>
                            <td className={`px-4 py-3 whitespace-nowrap text-xs ${textSecondary}`}>
                              {sample.fromLab}
                            </td>
                            <td className={`px-4 py-3 whitespace-nowrap`}>
                              <button 
                                onClick={() => handleMarkReceived(sample.containerId)}
                                className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                              >
                                Mark Received
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Samples to Send */}
            <div>
              <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Samples to Send</h3>
              
              {/* Search and Filter Bar */}
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 size-4 ${textSecondary}`} />
                  <input
                    type="text"
                    placeholder="Search by Container ID, type, or lab..."
                    value={sendSearchQuery}
                    onChange={(e) => setSendSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 ${darkMode ? 'bg-[#2C2C2C]' : 'bg-white'} ${borderColor} border rounded-lg ${textPrimary} text-sm`}
                  />
                </div>
                <button className={`p-2 ${cardBg} ${borderColor} border rounded-lg ${hoverBg} transition-colors`}>
                  <Filter className={`size-5 ${textSecondary}`} />
                </button>
              </div>

              {/* Undo Section - Recently Sent */}
              {Array.from(sentSamples || []).length > 0 && (
                <div className={`${cardBg} ${borderColor} border rounded-lg p-3 mb-4`}>
                  <div className={`text-xs font-medium ${textSecondary} uppercase tracking-wider mb-2`}>Recently Marked as Sent</div>
                  <div className="space-y-2">
                    {Array.from(sentSamples || []).map((containerId) => {
                      const original = selectedLab ? getInterlabToSend(selectedLab).find(s => s?.containerId === containerId) : undefined;
                      return original ? (
                        <div key={containerId} className={`flex items-center justify-between p-2 rounded ${darkMode ? 'bg-[#1A1A1A]' : 'bg-gray-50'}`}>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="size-4 text-blue-500" />
                            <span className={`text-xs font-mono ${textPrimary}`}>{containerId}</span>
                            <span className={`text-xs ${textSecondary}`}>to {original.toLab}</span>
                          </div>
                          <button
                            onClick={() => handleUndoSent(containerId)}
                            className={`flex items-center gap-1 px-2 py-1 text-xs ${darkMode ? 'bg-[#2C2C2C] hover:bg-[#3C3C3C]' : 'bg-white hover:bg-gray-100'} rounded transition-colors`}
                          >
                            <Undo className="size-3" />
                            Undo
                          </button>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              <div className={`${cardBg} ${borderColor} border rounded-lg overflow-hidden`}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className={darkMode ? 'bg-[#2C2C2C]' : 'bg-gray-50'}>
                      <tr>
                        <th className={`px-4 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Container ID</th>
                        <th className={`px-4 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Type</th>
                        <th className={`px-4 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>To</th>
                        <th className={`px-4 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Actions</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${borderColor}`}>
                      {filteredSendSamples.length === 0 ? (
                        <tr>
                          <td colSpan={4} className={`px-4 py-8 text-center text-sm ${textSecondary}`}>
                            {sendSearchQuery ? 'No samples match your search' : 'No samples to send'}
                          </td>
                        </tr>
                      ) : (
                        filteredSendSamples.map((sample, idx) => (
                          <tr key={idx} className={hoverBg}>
                            <td className={`px-4 py-3 whitespace-nowrap text-sm font-mono ${textPrimary}`}>
                              {sample.containerId}
                            </td>
                            <td className={`px-4 py-3 whitespace-nowrap text-xs ${textSecondary}`}>
                              {sample.sampleType}
                            </td>
                            <td className={`px-4 py-3 whitespace-nowrap text-xs ${textSecondary}`}>
                              {sample.toLab}
                            </td>
                            <td className={`px-4 py-3 whitespace-nowrap`}>
                              <button 
                                onClick={() => handleMarkSent(sample.containerId)}
                                className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                              >
                                Mark Sent
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
