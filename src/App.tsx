import React from 'react';
import { Package, WashingMachine, Snowflake, Tv, Microwave, Fan, Speaker, Smartphone, Zap, Search, LayoutGrid, AlertCircle, Plus } from 'lucide-react';

const CATEGORIES = [
  { id: 'Package', icon: <Package />, label: 'گشتی' },
  { id: 'WashingMachine', icon: <WashingMachine />, label: 'غەسالە' },
  { id: 'Snowflake', icon: <Snowflake />, label: 'بەفرگرە' },
  { id: 'Tv', icon: <Tv />, label: 'تەلەفزیۆن' },
  { id: 'Microwave', icon: <Microwave />, label: 'فرن' },
  { id: 'Fan', icon: <Fan />, label: 'پانەکە' },
  { id: 'Speaker', icon: <Speaker />, label: 'سپیکەر' },
  { id: 'Smartphone', icon: <Smartphone />, label: 'مۆبایل' },
  { id: 'Zap', icon: <Zap />, label: 'کارەبایی' },
];

export default function App() {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 p-4 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">کۆگای من</h1>
        <div className="relative w-64">
          <input 
            type="text" 
            placeholder="گەڕان بۆ کاڵاکان..." 
            className="w-full pr-10 pl-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Grid Menu */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:bg-green-50 transition-colors">
          <div className="bg-green-100 p-3 rounded-xl text-green-600">
            <LayoutGrid className="w-8 h-8" />
          </div>
          <span className="font-bold text-green-700">بەشەکان</span>
        </div>
        
        <div className="bg-blue-600 p-6 rounded-2xl shadow-md flex flex-col items-center justify-center space-y-2 cursor-pointer hover:bg-blue-700 transition-colors">
          <div className="bg-blue-500/30 p-3 rounded-xl text-white">
            <Package className="w-8 h-8" />
          </div>
          <span className="font-bold text-white">جۆر</span>
        </div>

        <div className="bg-pink-50 p-6 rounded-2xl shadow-sm border border-pink-100 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:bg-pink-100 transition-colors">
          <div className="bg-pink-100 p-3 rounded-xl text-pink-600">
            <Zap className="w-8 h-8" />
          </div>
          <span className="font-bold text-pink-700">شکاوەکان</span>
        </div>

        <div className="bg-orange-50 p-6 rounded-2xl shadow-sm border border-orange-100 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:bg-orange-100 transition-colors">
          <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
            <AlertCircle className="w-8 h-8" />
          </div>
          <span className="font-bold text-orange-700">ئاگاداری</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 min-h-[300px] flex flex-col items-center justify-center relative shadow-sm">
        <button className="absolute top-4 right-4 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-6 h-6" />
        </button>
        
        <div className="text-gray-300 mb-4">
          <Package className="w-16 h-16" />
        </div>
        <p className="text-gray-400 font-medium">هیچ داتایەک لەم بەشەدا نییە</p>
      </div>

      {/* Recent Changes Footer */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4 text-gray-600">
          <Zap className="w-5 h-5" />
          <h2 className="font-bold">دواین گۆڕانکارییەکان</h2>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center text-gray-400">
          هیچ گۆڕانکارییەک تۆمار نەکراوە
        </div>
      </div>
    </div>
  );
}
