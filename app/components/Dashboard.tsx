'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Package, ShoppingCart, Users, AlertCircle, DollarSign, Truck } from 'lucide-react'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 125430,
    revenueChange: 12.5,
    totalOrders: 342,
    ordersChange: -5.2,
    totalProducts: 1256,
    productsChange: 8.3,
    lowStock: 23,
    stockChange: 15.0
  })

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'order', description: 'New order from Vendor ABC', time: '5 mins ago', status: 'success' },
    { id: 2, type: 'alert', description: 'Low stock alert: Coca Cola 330ml', time: '15 mins ago', status: 'warning' },
    { id: 3, type: 'product', description: 'Added new product: Energy Drink XL', time: '1 hour ago', status: 'info' },
    { id: 4, type: 'order', description: 'Order #1234 delivered', time: '2 hours ago', status: 'success' },
    { id: 5, type: 'alert', description: 'Stock replenished: Milk 1L', time: '3 hours ago', status: 'info' },
  ])

  const [topProducts, setTopProducts] = useState([
    { name: 'Coca Cola 330ml', sold: 456, revenue: 1368 },
    { name: 'Lay\'s Chips 50g', sold: 389, revenue: 778 },
    { name: 'Water 500ml', sold: 567, revenue: 567 },
    { name: 'Energy Drink 250ml', sold: 234, revenue: 936 },
    { name: 'Chocolate Bar', sold: 312, revenue: 936 },
  ])

  const StatCard = ({ title, value, change, icon: Icon, format = 'number' }: any) => {
    const isPositive = change >= 0
    const formattedValue = format === 'currency' ? `$${value.toLocaleString()}` : value.toLocaleString()

    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">{formattedValue}</h3>
            <div className="flex items-center mt-2">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(change)}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
          <div className={`p-3 rounded-lg ${
            title.includes('Revenue') ? 'bg-green-100' :
            title.includes('Orders') ? 'bg-blue-100' :
            title.includes('Products') ? 'bg-purple-100' :
            'bg-orange-100'
          }`}>
            <Icon className={`w-6 h-6 ${
              title.includes('Revenue') ? 'text-green-600' :
              title.includes('Orders') ? 'text-blue-600' :
              title.includes('Products') ? 'text-purple-600' :
              'text-orange-600'
            }`} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value={stats.totalRevenue}
          change={stats.revenueChange}
          icon={DollarSign}
          format="currency"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          change={stats.ordersChange}
          icon={Truck}
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          change={stats.productsChange}
          icon={Package}
        />
        <StatCard
          title="Low Stock Items"
          value={stats.lowStock}
          change={stats.stockChange}
          icon={AlertCircle}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`p-2 rounded-lg ${
                  activity.status === 'success' ? 'bg-green-100' :
                  activity.status === 'warning' ? 'bg-yellow-100' :
                  'bg-blue-100'
                }`}>
                  {activity.type === 'order' && <Truck className={`w-4 h-4 ${
                    activity.status === 'success' ? 'text-green-600' : 'text-blue-600'
                  }`} />}
                  {activity.type === 'alert' && <AlertCircle className="w-4 h-4 text-yellow-600" />}
                  {activity.type === 'product' && <Package className="w-4 h-4 text-blue-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top Selling Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.sold} units sold</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">${product.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-sm p-6 text-white">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors">
            <Package className="w-6 h-6 mb-2" />
            <p className="text-sm font-medium">Add Product</p>
          </button>
          <button className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors">
            <Truck className="w-6 h-6 mb-2" />
            <p className="text-sm font-medium">New Order</p>
          </button>
          <button className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors">
            <Users className="w-6 h-6 mb-2" />
            <p className="text-sm font-medium">Add Vendor</p>
          </button>
          <button className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors">
            <ShoppingCart className="w-6 h-6 mb-2" />
            <p className="text-sm font-medium">Stock Update</p>
          </button>
        </div>
      </div>
    </div>
  )
}
