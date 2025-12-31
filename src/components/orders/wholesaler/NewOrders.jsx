import React, { useState, useEffect } from "react";
import { 
  ShoppingCart, Package, Info, CheckCircle, AlertCircle, Star, 
  Clock, Plus, Minus, ArrowRight, X, Save, Filter, Search, 
  Truck, Edit3 
} from "lucide-react";

const PRODUCTS = [
  { id: 1, name: "20L Water Jar", pack: "Single Unit", packSize: 1, moq: 5, stock: 250, lowStockThreshold: 20, favorite: false, warehouse: "Main" },
  { id: 2, name: "1L Water Bottle", pack: "Case of 12", packSize: 12, moq: 3, stock: 15, lowStockThreshold: 20, favorite: true, warehouse: "Main" },
  { id: 3, name: "500ml Water Bottle", pack: "Case of 24", packSize: 24, moq: 2, stock: 89, lowStockThreshold: 20, favorite: false, warehouse: "Main" },
  { id: 4, name: "300ml Mini Bottle", pack: "Case of 30", packSize: 30, moq: 5, stock: 0, lowStockThreshold: 20, favorite: false, warehouse: "Main" },
];

const NewOrders = () => {
  // Core state
  const [quantities, setQuantities] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [favorites, setFavorites] = useState(new Set([2]));
  const [specialNotes, setSpecialNotes] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("Main");
  const [cutoffTime, setCutoffTime] = useState(null);
  const [creditLimitWarning, setCreditLimitWarning] = useState(false);

  // Last order (from localStorage simulation)
  const lastOrder = { 1: 10, 2: 5, 3: 2 };

  // Effects
  useEffect(() => {
    // Simulate cut-off time (2 hours from now)
    const now = new Date();
    const cutoff = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    setCutoffTime(cutoff);
  }, []);

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFavorites = !onlyFavorites || favorites.has(product.id);
    const matchesStock = !onlyInStock || product.stock > 0;
    return matchesSearch && matchesFavorites && matchesStock;
  });

  const handleQuantityChange = (id, value) => {
    const product = PRODUCTS.find(p => p.id === id);
    let qty = Math.max(0, parseInt(value) || 0);
    
    // Enforce MOQ
    if (qty > 0 && qty < product.moq) {
      qty = product.moq;
    }
    
    // Round to pack multiples
    if (qty > 0) {
      qty = Math.ceil(qty / product.packSize) * product.packSize;
    }
    
    setQuantities(prev => ({ ...prev, [id]: qty }));
  };

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const repeatLastOrder = () => {
    setQuantities(lastOrder);
  };

  const saveDraft = () => {
    localStorage.setItem("orderDraft", JSON.stringify({ quantities, notes: specialNotes }));
    setIsDraftSaved(true);
    setTimeout(() => setIsDraftSaved(false), 3000);
  };

  const totalCases = Object.entries(quantities).reduce((sum, [id, qty]) => {
    const product = PRODUCTS.find(p => p.id == id);
    return sum + (qty || 0) / (product?.packSize || 1);
  }, 0);

  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);

  const isPastCutoff = cutoffTime && new Date() > cutoffTime;

  const validationErrors = filteredProducts
    .filter(p => quantities[p.id] && quantities[p.id] < p.moq)
    .map(p => `${p.name}: Minimum ${p.moq} required`);

  const canSubmit = totalItems > 0 && !isPastCutoff && validationErrors.length === 0 && !creditLimitWarning;

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <ShoppingCart className="text-indigo-600" size={32} />
            New Purchase Order
          </h2>
          <p className="text-slate-500 mt-1">Select quantities for your next shipment</p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={repeatLastOrder}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 font-medium transition-all"
          >
            <Clock size={16} />
            Repeat Last Order
          </button>
          
          {/* Cut-off Timer */}
          <div className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
            isPastCutoff 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}>
            <Clock size={14} />
            {isPastCutoff ? 'Orders Closed' : `Closes in ${Math.round((cutoffTime - new Date()) / 60000)}m`}
          </div>

          {/* Contract Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-xl text-xs font-semibold border border-blue-100">
            <Info size={14} />
            Contract Rates
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 ${
                onlyFavorites
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Star size={14} />
              {onlyFavorites ? 'Favorites' : 'All'}
            </button>
            <button
              onClick={() => setOnlyInStock(!onlyInStock)}
              className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 ${
                onlyInStock
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <CheckCircle size={14} />
              In Stock
            </button>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
              <th className="py-4 px-6">Product</th>
              <th className="py-4 px-6 text-center">Stock</th>
              <th className="py-4 px-6 text-center">Qty</th>
              <th className="py-4 px-6 text-center w-32">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className={`p-1.5 rounded-lg transition-all ${
                        favorites.has(product.id)
                          ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                          : 'text-slate-400 hover:bg-slate-100 hover:text-yellow-600'
                      }`}
                    >
                      <Star size={18} fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
                    </button>
                    <div>
                      <p className="font-bold text-slate-800">{product.name}</p>
                      <p className="text-xs text-slate-500">{product.pack}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Min: {product.moq} | Pack: {product.packSize}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Stock Status */}
                <td className="py-4 px-6 text-center">
                  {product.stock === 0 ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-bold">
                      <AlertCircle size={12} />
                      Out of Stock
                    </span>
                  ) : product.stock <= product.lowStockThreshold ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold">
                      <AlertCircle size={12} />
                      Only {product.stock} left
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">
                      <CheckCircle size={12} />
                      {product.stock}+ available
                    </span>
                  )}
                </td>

                {/* Quantity */}
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 0) - product.packSize)}
                      disabled={product.stock === 0}
                      className="p-2 hover:bg-slate-100 rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      min={product.moq}
                      value={quantities[product.id] || ""}
                      onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                      disabled={product.stock === 0}
                      className="w-20 text-center border-0 font-bold text-lg focus:outline-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 0) + product.packSize)}
                      disabled={product.stock === 0}
                      className="p-2 hover:bg-slate-100 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  {quantities[product.id] && quantities[product.id] < product.moq && (
                    <p className="text-xs text-red-600 mt-1">Min {product.moq} required</p>
                  )}
                </td>

                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-xs text-slate-500">
                      {Math.floor((quantities[product.id] || 0) / product.packSize)} cases
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Special Notes */}
      <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-6">
        <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
          <Edit3 size={16} />
          Special Instructions (Optional)
        </label>
        <textarea
          value={specialNotes}
          onChange={(e) => setSpecialNotes(e.target.value)}
          rows={3}
          placeholder="Delivery time preferences, packaging instructions, etc..."
          className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 resize-vertical"
        />
      </div>

      {/* Footer */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 text-sm">
          <div>
            <p className="text-slate-500">Total Cases</p>
            <p className="text-2xl font-bold text-slate-800">{totalCases.toFixed(1)}</p>
          </div>
          <div>
            <p className="text-slate-500">Total Items</p>
            <p className="text-2xl font-bold text-slate-800">{totalItems}</p>
          </div>
          <div>
            <p className="text-slate-500">ETA</p>
            <p className="text-xl font-bold text-indigo-600">
              {cutoffTime ? new Date(cutoffTime.getTime() + 24*60*60*1000).toLocaleDateString() : 'TBD'}
            </p>
          </div>
          <div>
            <p className="text-slate-500">Warehouse</p>
            <select
              value={selectedWarehouse}
              onChange={(e) => setSelectedWarehouse(e.target.value)}
              className="mt-1 block w-full rounded-lg border-slate-200 p-2"
            >
              <option>Main</option>
              <option>North</option>
              <option>South</option>
            </select>
          </div>
        </div>

        {/* Warnings */}
        {creditLimitWarning && (
          <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex items-center gap-2">
              <AlertCircle className="text-amber-600" size={20} />
              <div>
                <p className="font-semibold text-amber-800">Credit Limit Warning</p>
                <p className="text-sm text-amber-700">This order may exceed your current credit limit</p>
              </div>
            </div>
          </div>
        )}

        {validationErrors.length > 0 && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="font-semibold text-red-800 mb-1">Please fix these issues:</p>
            <ul className="text-sm text-red-700 space-y-1">
              {validationErrors.map((error, i) => (
                <li key={i} className="flex items-center gap-1.5">• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end items-stretch sm:items-center pt-4 border-t">
          <button
            onClick={saveDraft}
            className="flex-1 sm:flex-none px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
          >
            <Save size={18} />
            {isDraftSaved ? 'Saved!' : 'Save Draft'}
          </button>
          <button
            onClick={() => setShowSummary(true)}
            disabled={!canSubmit || isPastCutoff}
            className={`
              px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-3 justify-center transition-all
              ${canSubmit && !isPastCutoff
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-500/30 hover:-translate-y-0.5'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }
            `}
          >
            <ShoppingCart size={20} />
            Review & Submit Order
          </button>
        </div>
      </div>

      {/* Order Summary Modal */}
      {showSummary && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-slate-800">Order Summary</h3>
                <button onClick={() => setShowSummary(false)} className="p-2 hover:bg-slate-100 rounded-xl">
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-4">
                {Object.entries(quantities).map(([id, qty]) => {
                  if (!qty) return null;
                  const product = PRODUCTS.find(p => p.id == id);
                  return (
                    <div key={id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-semibold text-slate-800">{product.name}</p>
                        <p className="text-sm text-slate-500">{product.pack}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-2xl text-indigo-600">{qty}</p>
                        <p className="text-xs text-slate-500">{Math.floor(qty / product.packSize)} cases</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {specialNotes && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="font-medium text-blue-800 mb-2">Special Instructions:</p>
                  <p className="text-sm text-blue-700 whitespace-pre-wrap">{specialNotes}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm font-medium">
                <div>Total Cases: <span className="font-bold text-slate-800">{totalCases.toFixed(1)}</span></div>
                <div>Total Items: <span className="font-bold text-slate-800">{totalItems}</span></div>
                <div>ETA: <span className="font-bold text-indigo-600">{cutoffTime ? new Date(cutoffTime.getTime() + 24*60*60*1000).toLocaleDateString() : 'TBD'}</span></div>
                <div>Warehouse: <span className="font-bold text-slate-800">{selectedWarehouse}</span></div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSummary(false)}
                  className="flex-1 px-6 py-3 border border-slate-200 hover:bg-slate-50 rounded-xl font-semibold transition-all"
                >
                  Edit Order
                </button>
                <button className="flex-1 px-6 py-3 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl font-bold shadow-lg hover:shadow-emerald-500/30 transition-all">
                  Confirm & Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewOrders;
