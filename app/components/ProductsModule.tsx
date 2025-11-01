'use client'

import { useState } from 'react'
import { Search, Plus, Edit, Trash2, Package, DollarSign, Tag, Barcode } from 'lucide-react'

export default function ProductsModule() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  const [products, setProducts] = useState([
    { id: 1, sku: 'SKU001', barcode: '8901234567890', name: 'Coca Cola 330ml', category: 'Beverages', brand: 'Coca Cola', costPrice: 0.80, sellingPrice: 1.20, margin: 50, supplier: 'Coca Cola Co.', fmcg: true },
    { id: 2, sku: 'SKU002', barcode: '8901234567891', name: 'Lay\'s Chips 50g', category: 'Snacks', brand: 'Lay\'s', costPrice: 1.20, sellingPrice: 2.00, margin: 67, supplier: 'PepsiCo', fmcg: true },
    { id: 3, sku: 'SKU003', barcode: '8901234567892', name: 'Water 500ml', category: 'Beverages', brand: 'Aquafina', costPrice: 0.30, sellingPrice: 1.00, margin: 233, supplier: 'Aqua Corp', fmcg: true },
    { id: 4, sku: 'SKU004', barcode: '8901234567893', name: 'Energy Drink 250ml', category: 'Beverages', brand: 'Red Bull', costPrice: 2.50, sellingPrice: 4.00, margin: 60, supplier: 'Red Bull GmbH', fmcg: true },
    { id: 5, sku: 'SKU005', barcode: '8901234567894', name: 'Chocolate Bar', category: 'Confectionery', brand: 'Cadbury', costPrice: 1.50, sellingPrice: 3.00, margin: 100, supplier: 'Mondelez', fmcg: true },
    { id: 6, sku: 'SKU006', barcode: '8901234567895', name: 'Milk 1L', category: 'Dairy', brand: 'Fresh Dairy', costPrice: 1.80, sellingPrice: 2.50, margin: 39, supplier: 'Local Dairy Farm', fmcg: true },
    { id: 7, sku: 'SKU007', barcode: '8901234567896', name: 'Bread Loaf', category: 'Bakery', brand: 'Wonder Bread', costPrice: 1.20, sellingPrice: 2.20, margin: 83, supplier: 'Bakery Supply Co.', fmcg: false },
    { id: 8, sku: 'SKU008', barcode: '8901234567897', name: 'Instant Noodles', category: 'FMCG', brand: 'Maggi', costPrice: 0.60, sellingPrice: 1.50, margin: 150, supplier: 'Nestle', fmcg: true },
  ])

  const categories = ['all', 'Beverages', 'Snacks', 'Dairy', 'Bakery', 'FMCG', 'Confectionery']

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.barcode.includes(searchTerm)
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
        <p className="text-gray-600 mt-1">Manage your product catalog and FMCG items</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{products.length}</h3>
            </div>
            <Package className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">FMCG Products</p>
              <h3 className="text-2xl font-bold text-purple-600 mt-1">
                {products.filter(p => p.fmcg).length}
              </h3>
            </div>
            <Tag className="w-10 h-10 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <h3 className="text-2xl font-bold text-green-600 mt-1">{categories.length - 1}</h3>
            </div>
            <Package className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Margin</p>
              <h3 className="text-2xl font-bold text-orange-600 mt-1">
                {Math.round(products.reduce((acc, p) => acc + p.margin, 0) / products.length)}%
              </h3>
            </div>
            <DollarSign className="w-10 h-10 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, SKU, or barcode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
              ))}
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {product.fmcg && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">FMCG</span>
                    )}
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">{product.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.brand}</p>
                </div>
                <Package className="w-8 h-8 text-gray-400" />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Barcode className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 font-mono">{product.barcode}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 font-mono">{product.sku}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Cost Price</p>
                    <p className="text-lg font-bold text-gray-900">${product.costPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Selling Price</p>
                    <p className="text-lg font-bold text-green-600">${product.sellingPrice.toFixed(2)}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Margin</span>
                    <span className="font-semibold text-gray-900">{product.margin}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(product.margin, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500 mb-4">
                <span className="font-medium">Supplier:</span> {product.supplier}
              </div>

              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium text-sm flex items-center justify-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}
