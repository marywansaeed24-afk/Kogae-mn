import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Plus, Tag, ClipboardCheck, Bell, Hammer, Package, Boxes, 
  TrendingDown, Calendar, X, DollarSign, ArrowRightLeft, Trash2, 
  Settings, BarChart2, UserCircle, LogOut, AlertTriangle, Zap, Grid
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const App = () => {
  // پاشەکەوتکردنی داتا لە مۆبایل
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('koga-data-pro');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [usdRate, setUsdRate] = useState(150000);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', price: '', quantity: '', category: 'گشتی' });

  useEffect(() => {
    localStorage.setItem('koga-data-pro', JSON.stringify(items));
  }, [items]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name) return;
    const item = { ...newItem, id: Date.now(), price: Number(newItem.price), quantity: Number(newItem.quantity) };
    setItems([item, ...items]);
    setNewItem({ name: '', price: '', quantity: '', category: 'گشتی' });
    setIsModalOpen(false);
  };

  const deleteItem = (id) => {
    if(window.confirm('ئایا دڵنیایت؟')) setItems(items.filter(i => i.id !== id));
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#F8FAFC] font-sans pb-24 text-right">
      {/* Header */}
      <div className="bg-white p-6 shadow-sm flex justify-between items-center">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">کۆگای من <span className="text-blue-600 text-sm">PRO</span></h1>
        <div className="flex gap-2">
           <div className="p-2 bg-slate-100 rounded-xl text-slate-400"><Bell size={20} /></div>
           <div className="p-2 bg-blue-50 rounded-xl text-blue-600"><UserCircle size={20} /></div>
        </div>
      </div>

      <div className="p-4">
        {/* Search */}
        <div className="relative mb-6">
          <input 
            type="text" placeholder="گەڕان بۆ کاڵاکان..." 
            className="w-full bg-white p-4 pr-12 rounded-2xl shadow-sm border-none focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-4 top-4 text-slate-300" size={20} />
        </div>

        {/* Stats Grid - ڕێک وەک وێنەکەت */}
        <div className="grid grid-cols-2 gap-4 mb-8">
           <motion.div whileTap={{ scale: 0.95 }} className="bg-blue-600 p-5 rounded-[32px] shadow-lg shadow-blue-200 text-white flex flex-col items-center">
              <div className="bg-blue-500/30 p-3 rounded-2xl mb-3"><Tag size={28} /></div>
              <span className="font-bold text-lg">نرخ</span>
           </motion.div>
           <motion.div whileTap={{ scale: 0.95 }} className="bg-emerald-50 p-5 rounded-[32px] border border-emerald-100 flex flex-col items-center text-emerald-600">
              <div className="bg-emerald-100 p-3 rounded-2xl mb-3"><ClipboardCheck size={28} /></div>
              <span className="font-bold text-lg text-slate-700">پشکنین</span>
           </motion.div>
           <motion.div whileTap={{ scale: 0.95 }} className="bg-orange-50 p-5 rounded-[32px] border border-orange-100 flex flex-col items-center text-orange-600">
              <div className="bg-orange-100 p-3 rounded-2xl mb-3"><AlertTriangle size={28} /></div>
              <span className="font-bold text-lg text-slate-700">ئاگاداری</span>
           </motion.div>
           <motion.div whileTap={{ scale: 0.95 }} className="bg-rose-50 p-5 rounded-[32px] border border-rose-100 flex flex-col items-center text-rose-600">
              <div className="bg-rose-100 p-3 rounded-2xl mb-3"><Hammer size={28} /></div>
              <span className="font-bold text-lg text-slate-700">شکاوەکان</span>
           </motion.div>
        </div>

        {/* Items List */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-slate-800">هەموو کاڵاکان</h2>
            <span className="text-sm bg-slate-100 px-3 py-1 rounded-full text-slate-500 font-bold">{items.length} دانە</span>
          </div>

          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-2 rounded-xl shadow-sm"><Package className="text-blue-600" size={24} /></div>
                  <div>
                    <h3 className="font-bold text-slate-700">{item.name}</h3>
                    <p className="text-xs text-slate-400">بڕ: {item.quantity} | نرخ: {item.price}$</p>
                  </div>
                </div>
                <button onClick={() => deleteItem(item.id)} className="text-rose-400 p-2"><Trash2 size={18} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 left-8 bg-blue-600 text-white p-5 rounded-full shadow-2xl z-50 hover:scale-110 transition-transform"
      >
        <Plus size={32} />
      </button>

      {/* Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-center justify-center p-6">
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white w-full max-w-sm rounded-[40px] p-8 shadow-2xl">
              <h3 className="text-2xl font-black mb-6">کاڵای نوێ</h3>
              <form onSubmit={handleAddItem} className="space-y-4">
                <input type="text" placeholder="ناوی کاڵا" className="w-full bg-slate-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} />
                <input type="number" placeholder="نرخ ($)" className="w-full bg-slate-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} />
                <input type="number" placeholder="بڕ (ژمارە)" className="w-full bg-slate-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" value={newItem.quantity} onChange={e => setNewItem({...newItem, quantity: e.target.value})} />
                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 bg-blue-600 text-white p-4 rounded-2xl font-bold shadow-lg shadow-blue-200">تۆمارکردن</button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 bg-slate-100 text-slate-500 rounded-2xl font-bold">لابردن</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
