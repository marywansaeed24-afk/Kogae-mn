import React, { useState, useEffect } from 'react';
import { Search, Plus, Package, Grid, AlertTriangle, Zap } from 'lucide-react';

const App = () => {
  // لێرەدا داتاکان لە ناو میمۆری مۆبایلەکە دەخوێنینەوە
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('koga-data');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  
  const [searchTerm, setSearchTerm] = useState('');

  // هەر کاتێک کاڵایەک زیاد کرا، یەکسەر لە ناو میمۆری پاشەکەوتی دەکەین
  useEffect(() => {
    localStorage.setItem('koga-data', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: `کاڵای نوێ ${items.length + 1}`,
      category: 'گشتی'
    };
    setItems([...items, newItem]);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 p-4 font-sans text-right">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 mt-4">
        <h1 className="text-2xl font-bold text-slate-800">کۆگای من</h1>
        <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100">
          <Package className="text-blue-600" size={24} />
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="گەڕان بۆ کاڵاکان..."
          className="w-full bg-white p-4 pr-12 rounded-2xl shadow-sm border-none focus:ring-2 focus:ring-blue-500 outline-none text-slate-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute right-4 top-4 text-slate-400" size={20} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-600 p-4 rounded-3xl shadow-lg shadow-blue-200 text-white flex flex-col items-center">
          <div className="bg-blue-500/30 p-2 rounded-xl mb-2">
            <Package size={24} />
          </div>
          <span className="text-sm font-medium opacity-90">جۆر</span>
        </div>
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-green-600">
          <div className="bg-green-50 p-2 rounded-xl mb-2">
            <Grid size={24} />
          </div>
          <span className="text-sm font-medium text-slate-600">بەشەکان</span>
        </div>
        <div className="bg-orange-50 p-4 rounded-3xl border border-orange-100 flex flex-col items-center text-orange-600">
          <div className="bg-orange-100 p-2 rounded-xl mb-2">
            <AlertTriangle size={24} />
          </div>
          <span className="text-sm font-medium text-slate-600">ئاگاداری</span>
        </div>
        <div className="bg-pink-50 p-4 rounded-3xl border border-pink-100 flex flex-col items-center text-pink-600">
          <div className="bg-pink-100 p-2 rounded-xl mb-2">
            <Zap size={24} />
          </div>
          <span className="text-sm font-medium text-slate-600">شکاوەکان</span>
        </div>
      </div>

      {/* Items List */}
      <div className="bg-white rounded-3xl p-6 min-h-[300px] shadow-sm border border-slate-100 relative">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={addItem}
            className="bg-blue-600 text-white p-3 rounded-xl shadow-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
        
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-10 text-slate-400">
            <Package size={64} className="mb-4 opacity-20" />
            <p>هیچ داتایەک لەم بەشەدا نییە</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredItems.map(item => (
              <div key={item.id} className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center border border-slate-100">
                <span className="font-medium text-slate-700">{item.name}</span>
                <span className="text-xs bg-white px-2 py-1 rounded-lg border text-slate-400">{item.category}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
