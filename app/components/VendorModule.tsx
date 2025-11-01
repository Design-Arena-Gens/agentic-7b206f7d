'use client'

import { useState } from 'react'
import { Search, Plus, Edit, Trash2, Building2, Mail, Phone, MapPin, Star } from 'lucide-react'

export default function VendorModule() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRating, setFilterRating] = useState('all')

  const [vendors, setVendors] = useState([
    { id: 1, name: 'Coca Cola Co.', contact: 'John Smith', email: 'john@cocacola.com', phone: '+1-555-0101', address: '123 Beverage St, Atlanta, GA', category: 'Beverages', rating: 5, activeOrders: 3, totalOrders: 156, reliability: 98 },
    { id: 2, name: 'PepsiCo', contact: 'Sarah Johnson', email: 'sarah@pepsico.com', phone: '+1-555-0102', address: '456 Snack Ave, Purchase, NY', category: 'Snacks & Beverages', rating: 5, activeOrders: 2, totalOrders: 142, reliability: 97 },
    { id: 3, name: 'Nestle', contact: 'Mike Brown', email: 'mike@nestle.com', phone: '+1-555-0103', address: '789 Food Blvd, Vevey, Switzerland', category: 'FMCG', rating: 4, activeOrders: 5, totalOrders: 198, reliability: 95 },
    { id: 4, name: 'Mondelez', contact: 'Emily Davis', email: 'emily@mondelez.com', phone: '+1-555-0104', address: '321 Confection Way, Chicago, IL', category: 'Confectionery', rating: 5, activeOrders: 1, totalOrders: 87, reliability: 99 },
    { id: 5, name: 'Local Dairy Farm', contact: 'Robert Wilson', email: 'rob@localdairy.com', phone: '+1-555-0105', address: '654 Farm Road, Local Town', category: 'Dairy', rating: 4, activeOrders: 4, totalOrders: 234, reliability: 92 },
    { id: 6, name: 'Bakery Supply Co.', contact: 'Lisa Anderson', email: 'lisa@bakerysupply.com', phone: '+1-555-0106', address: '987 Baker St, Boston, MA', category: 'Bakery', rating: 3, activeOrders: 2, totalOrders: 76, reliability: 88 },
    { id: 7, name: 'Red Bull GmbH', contact: 'Thomas Mueller', email: 'thomas@redbull.com', phone: '+1-555-0107', address: '147 Energy Dr, Fuschl am See, Austria', category: 'Beverages', rating: 5, activeOrders: 2, totalOrders: 112, reliability: 96 },
    { id: 8, name: 'Aqua Corp', contact: 'Jennifer Lee', email: 'jen@aquacorp.com', phone: '+1-555-0108', address: '258 Water Way, Phoenix, AZ', category: 'Beverages', rating: 4, activeOrders: 3, totalOrders: 189, reliability: 94 },
  ])

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRating = filterRating === 'all' || vendor.rating === parseInt(filterRating)
    return matchesSearch && matchesRating
  })

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  const getReliabilityColor = (reliability: number) => {
    if (reliability >= 95) return 'text-green-600'
    if (reliability >= 90) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Vendor Management</h1>
        <p className="text-gray-600 mt-1">Manage your suppliers and vendor relationships</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Vendors</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{vendors.length}</h3>
            </div>
            <Building2 className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Orders</p>
              <h3 className="text-2xl font-bold text-green-600 mt-1">
                {vendors.reduce((acc, v) => acc + v.activeOrders, 0)}
              </h3>
            </div>
            <Building2 className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">5-Star Vendors</p>
              <h3 className="text-2xl font-bold text-yellow-600 mt-1">
                {vendors.filter(v => v.rating === 5).length}
              </h3>
            </div>
            <Star className="w-10 h-10 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Reliability</p>
              <h3 className="text-2xl font-bold text-purple-600 mt-1">
                {Math.round(vendors.reduce((acc, v) => acc + v.reliability, 0) / vendors.length)}%
              </h3>
            </div>
            <Building2 className="w-10 h-10 text-purple-600" />
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
              placeholder="Search vendors by name, contact, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Vendor
            </button>
          </div>
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredVendors.map((vendor) => (
          <div key={vendor.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{vendor.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{vendor.category}</p>
                    <div className="flex items-center gap-1">
                      {getRatingStars(vendor.rating)}
                      <span className="text-sm text-gray-600 ml-2">({vendor.rating}/5)</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{vendor.contact}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{vendor.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{vendor.email}</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="text-gray-600">{vendor.address}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Active Orders</p>
                    <p className="text-lg font-bold text-blue-600">{vendor.activeOrders}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total Orders</p>
                    <p className="text-lg font-bold text-gray-900">{vendor.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Reliability</p>
                    <p className={`text-lg font-bold ${getReliabilityColor(vendor.reliability)}`}>
                      {vendor.reliability}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
                    Create Order
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVendors.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
          <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No vendors found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}
