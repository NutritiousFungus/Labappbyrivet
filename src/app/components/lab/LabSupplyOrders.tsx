import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  ShoppingCart, 
  FlaskConical, 
  FileText, 
  Undo, 
  CheckCircle2, 
  Search, 
  Filter
} from 'lucide-react';
import { AdminSection } from './types';

interface LabSupplyOrdersProps {
  darkMode: boolean;
  setActiveSection: (section: AdminSection) => void;
}

export function LabSupplyOrders({ darkMode, setActiveSection }: LabSupplyOrdersProps) {
  const [supplyOrders, setSupplyOrders] = useState<Record<string, { quantity: number; requested: boolean; received: boolean; requestDate?: string; receivedDate?: string }>>({});

  const supplies = [
    { id: 's1', name: 'Sample Bags (Small) - 100/pk', category: 'Lab' },
    { id: 's2', name: 'Sample Bags (Large) - 50/pk', category: 'Lab' },
    { id: 's3', name: 'Nitrile Gloves (M) - 100/box', category: 'Lab' },
    { id: 's4', name: 'Nitrile Gloves (L) - 100/box', category: 'Lab' },
    { id: 's5', name: 'Shipping Labels - 500/roll', category: 'Office' },
    { id: 's6', name: 'Printer Paper - 500/ream', category: 'Office' },
    { id: 's7', name: 'Toner Cartridge (Black)', category: 'Office' },
    { id: 's8', name: 'Pipette Tips (1000µL) - 960/pk', category: 'Lab' },
    { id: 's9', name: 'Distilled Water (5 gal)', category: 'Lab' },
    { id: 's10', name: 'pH Buffer Solution Set', category: 'Lab' },
  ];

  const handleQuantityChange = (id: string, qty: number) => {
    setSupplyOrders(prev => ({
      ...prev,
      [id]: { ...prev[id], quantity: qty }
    }));
  };

  const handleRequestSupply = (id: string) => {
    setSupplyOrders(prev => ({
      ...prev,
      [id]: { 
        ...prev[id], 
        requested: true, 
        requestDate: new Date().toLocaleDateString() 
      }
    }));
  };

  const handleUndoRequest = (id: string) => {
    setSupplyOrders(prev => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  };

  const themeClasses = useMemo(() => ({
    cardBg: darkMode ? 'bg-[#252525]' : 'bg-white',
    textPrimary: darkMode ? 'text-[#E0E0E0]' : 'text-gray-800',
    textSecondary: darkMode ? 'text-[#C0C0C0]' : 'text-gray-600',
    borderColor: darkMode ? 'border-[#2C2C2C]' : 'border-gray-200',
    hoverBg: darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-50'
  }), [darkMode]);

  const { cardBg, textPrimary, textSecondary, borderColor } = themeClasses;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <button
        onClick={() => setActiveSection('home')}
        className={`flex items-center gap-2 mb-6 -ml-2 p-2 ${textSecondary} transition-colors ${themeClasses.hoverBg} rounded-lg`}
      >
        <ArrowLeft className="size-5" />
        <span className="font-medium">Back</span>
      </button>

      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-bold ${textPrimary}`}>Supply Orders</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 size-4 ${textSecondary}`} />
            <input 
              type="text" 
              placeholder="Search supplies..."
              className={`pl-10 pr-4 py-2 ${darkMode ? 'bg-[#2C2C2C]' : 'bg-white'} border ${borderColor} rounded-lg text-sm ${textPrimary}`}
            />
          </div>
        </div>
      </div>

      <div className={`${cardBg} ${borderColor} border rounded-lg overflow-hidden`}>
        {/* Lab Supplies */}
        <div className={`px-6 py-4 border-b ${borderColor}`}>
          <h3 className={`text-base font-semibold ${textPrimary} mb-3 flex items-center gap-2`}>
            <FlaskConical className="size-4" />
            Lab Supplies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {supplies.filter(s => s.category === 'Lab').map(supply => {
              const order = supplyOrders[supply.id];
              const isRequested = order?.requested && !order?.received;
              const isReceived = order?.received;
              
              return (
                <div 
                  key={supply.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${borderColor} ${
                    isReceived ? 'bg-green-50 dark:bg-green-900/10' : isRequested ? 'bg-orange-50 dark:bg-orange-900/10' : ''
                  }`}
                >
                  <div className="flex-1">
                    <div className={`font-medium text-sm ${textPrimary}`}>{supply.name}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!isRequested && !isReceived && (
                      <>
                        <input
                          type="number"
                          min="1"
                          value={order?.quantity || 1}
                          onChange={(e) => handleQuantityChange(supply.id, parseInt(e.target.value) || 1)}
                          className={`w-16 px-2 py-1 border ${borderColor} rounded text-center text-sm ${darkMode ? 'bg-[#1A1A1A] text-[#E0E0E0]' : 'bg-white text-gray-900'}`}
                        />
                        <button
                          onClick={() => handleRequestSupply(supply.id)}
                          className="px-3 py-1 bg-[#1f5527] hover:bg-[#2d7a3e] text-white rounded text-sm font-medium transition-colors"
                        >
                          Request
                        </button>
                      </>
                    )}
                    {isRequested && (
                      <button
                        onClick={() => handleUndoRequest(supply.id)}
                        className="px-3 py-1 text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center gap-1"
                      >
                        <Undo className="size-3" />
                        Undo
                      </button>
                    )}
                    {isReceived && (
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                        <CheckCircle2 className="size-3" />
                        Received
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Office Supplies */}
        <div className="px-6 py-4">
          <h3 className={`text-base font-semibold ${textPrimary} mb-3 flex items-center gap-2`}>
            <FileText className="size-4" />
            Office Supplies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {supplies.filter(s => s.category === 'Office').map(supply => {
              const order = supplyOrders[supply.id];
              const isRequested = order?.requested && !order?.received;
              const isReceived = order?.received;
              
              return (
                <div 
                  key={supply.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${borderColor} ${
                    isReceived ? 'bg-green-50 dark:bg-green-900/10' : isRequested ? 'bg-orange-50 dark:bg-orange-900/10' : ''
                  }`}
                >
                  <div className="flex-1">
                    <div className={`font-medium text-sm ${textPrimary}`}>{supply.name}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!isRequested && !isReceived && (
                      <>
                        <input
                          type="number"
                          min="1"
                          value={order?.quantity || 1}
                          onChange={(e) => handleQuantityChange(supply.id, parseInt(e.target.value) || 1)}
                          className={`w-16 px-2 py-1 border ${borderColor} rounded text-center text-sm ${darkMode ? 'bg-[#1A1A1A] text-[#E0E0E0]' : 'bg-white text-gray-900'}`}
                        />
                        <button
                          onClick={() => handleRequestSupply(supply.id)}
                          className="px-3 py-1 bg-[#1f5527] hover:bg-[#2d7a3e] text-white rounded text-sm font-medium transition-colors"
                        >
                          Request
                        </button>
                      </>
                    )}
                    {isRequested && (
                      <button
                        onClick={() => handleUndoRequest(supply.id)}
                        className="px-3 py-1 text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center gap-1"
                      >
                        <Undo className="size-3" />
                        Undo
                      </button>
                    )}
                    {isReceived && (
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                        <CheckCircle2 className="size-3" />
                        Received
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
