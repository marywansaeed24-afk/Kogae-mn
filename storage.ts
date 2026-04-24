
export interface WarehouseItem {
  id: string;
  name: string;
  brand?: string;
  categoryIcon?: string;
  price: number;
  currency: 'IQD' | 'USD';
  quantity: number;
  isBroken: boolean;
  lowStockThreshold: number;
  color?: string;
  sku?: string;
  specifications?: string;
  updatedAt: number;
}

export interface InventoryLog {
  id: string;
  itemId?: string;
  itemName: string;
  actionType: 'create' | 'update' | 'delete' | 'stock_check';
  changeDetails: string;
  timestamp: number;
}

const ITEMS_KEY = 'warehouse_items';
const LOGS_KEY = 'warehouse_logs';

export const storage = {
  getItems: (): WarehouseItem[] => {
    const data = localStorage.getItem(ITEMS_KEY);
    return data ? JSON.parse(data) : [];
  },

  setItems: (items: WarehouseItem[]) => {
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('storage_update_items'));
  },

  getLogs: (): InventoryLog[] => {
    const data = localStorage.getItem(LOGS_KEY);
    return data ? JSON.parse(data) : [];
  },

  setLogs: (logs: InventoryLog[]) => {
    localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
    window.dispatchEvent(new Event('storage_update_logs'));
  },

  addItem: (item: Omit<WarehouseItem, 'id' | 'updatedAt'>) => {
    const items = storage.getItems();
    const newItem: WarehouseItem = {
      ...item,
      id: Math.random().toString(36).substring(2, 9),
      updatedAt: Date.now()
    };
    storage.setItems([newItem, ...items]);
    storage.addLog({
      itemName: newItem.name,
      actionType: 'create',
      changeDetails: `کاڵای نوێ زیادکرا: ${newItem.name}`,
    });
    return newItem;
  },

  updateItem: (id: string, updates: Partial<WarehouseItem>) => {
    const items = storage.getItems();
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) {
      const oldItem = items[index];
      items[index] = { ...oldItem, ...updates, updatedAt: Date.now() };
      storage.setItems([...items]);
      
      // Determine if it was a quantity change or general update
      const actionDetails = updates.quantity !== undefined && updates.quantity !== oldItem.quantity
        ? `بڕ گۆڕدرا لە ${oldItem.quantity} بۆ ${updates.quantity}`
        : 'زانیارییەکان نوێکرانەوە';

      storage.addLog({
        itemId: id,
        itemName: items[index].name,
        actionType: 'update',
        changeDetails: actionDetails,
      });
    }
  },

  deleteItem: (id: string) => {
    const items = storage.getItems();
    const item = items.find(i => i.id === id);
    if (item) {
      storage.setItems(items.filter(i => i.id !== id));
      storage.addLog({
        itemName: item.name,
        actionType: 'delete',
        changeDetails: `کاڵا سڕایەوە: ${item.name}`,
      });
    }
  },

  addLog: (log: Omit<InventoryLog, 'id' | 'timestamp'>) => {
    const logs = storage.getLogs();
    const newLog: InventoryLog = {
      ...log,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now()
    };
    storage.setLogs([newLog, ...logs].slice(0, 50)); // Keep last 50 logs
  }
};
