'use client'

import { useState } from 'react'
import { FileText, Download, Calendar, Filter, TrendingUp, Package, DollarSign, Users } from 'lucide-react'
import { generateInventoryReport, generateSalesReport, generateVendorReport, generateProductReport } from '../utils/reportGenerator'

export default function ReportsModule() {
  const [reportType, setReportType] = useState('inventory')
  const [dateRange, setDateRange] = useState('month')
  const [generating, setGenerating] = useState(false)

  const reportTypes = [
    { id: 'inventory', name: 'Inventory Report', icon: Package, description: 'Stock levels, low stock alerts, and inventory value' },
    { id: 'sales', name: 'Sales Report', icon: DollarSign, description: 'Revenue, top products, and sales trends' },
    { id: 'vendor', name: 'Vendor Report', icon: Users, description: 'Vendor performance and order history' },
    { id: 'product', name: 'Product Report', icon: TrendingUp, description: 'Product performance and profitability' },
  ]

  const dateRanges = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' },
    { id: 'year', label: 'This Year' },
    { id: 'custom', label: 'Custom Range' },
  ]

  const handleGenerateReport = async () => {
    setGenerating(true)

    // Simulate report generation
    setTimeout(() => {
      let reportData
      switch (reportType) {
        case 'inventory':
          reportData = {
            title: 'Inventory Report',
            dateRange,
            data: [
              { sku: 'SKU001', name: 'Coca Cola 330ml', quantity: 145, value: 174, status: 'In Stock' },
              { sku: 'SKU002', name: 'Lay\'s Chips 50g', quantity: 89, value: 178, status: 'In Stock' },
              { sku: 'SKU003', name: 'Water 500ml', quantity: 23, value: 23, status: 'Low Stock' },
            ]
          }
          generateInventoryReport(reportData)
          break
        case 'sales':
          reportData = {
            title: 'Sales Report',
            dateRange,
            totalRevenue: 125430,
            totalOrders: 342,
            data: [
              { product: 'Coca Cola 330ml', units: 456, revenue: 1368 },
              { product: 'Lay\'s Chips 50g', units: 389, revenue: 778 },
            ]
          }
          generateSalesReport(reportData)
          break
        case 'vendor':
          reportData = {
            title: 'Vendor Report',
            dateRange,
            data: [
              { name: 'Coca Cola Co.', orders: 156, total: 24680, reliability: 98 },
              { name: 'PepsiCo', orders: 142, total: 22180, reliability: 97 },
            ]
          }
          generateVendorReport(reportData)
          break
        case 'product':
          reportData = {
            title: 'Product Report',
            dateRange,
            data: [
              { name: 'Coca Cola 330ml', sold: 456, revenue: 1368, margin: 50 },
              { name: 'Lay\'s Chips 50g', sold: 389, revenue: 778, margin: 67 },
            ]
          }
          generateProductReport(reportData)
          break
      }
      setGenerating(false)
    }, 1500)
  }

  const quickStats = [
    { label: 'Total Products', value: '1,256', icon: Package, color: 'blue' },
    { label: 'Total Revenue', value: '$125,430', icon: DollarSign, color: 'green' },
    { label: 'Active Vendors', value: '8', icon: Users, color: 'purple' },
    { label: 'Reports Generated', value: '47', icon: FileText, color: 'orange' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600 mt-1">Generate comprehensive reports in document format</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon
          const colorClasses = {
            blue: 'bg-blue-100 text-blue-600',
            green: 'bg-green-100 text-green-600',
            purple: 'bg-purple-100 text-purple-600',
            orange: 'bg-orange-100 text-orange-600',
          }
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Configuration */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Report Configuration</h2>

            <div className="space-y-6">
              {/* Report Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Report Type</label>
                <div className="space-y-2">
                  {reportTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <button
                        key={type.id}
                        onClick={() => setReportType(type.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                          reportType === type.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className={`w-5 h-5 mt-0.5 ${reportType === type.id ? 'text-blue-600' : 'text-gray-400'}`} />
                          <div>
                            <p className={`font-medium ${reportType === type.id ? 'text-blue-900' : 'text-gray-900'}`}>
                              {type.name}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">{type.description}</p>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {dateRanges.map((range) => (
                    <option key={range.id} value={range.id}>{range.label}</option>
                  ))}
                </select>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerateReport}
                disabled={generating}
                className={`w-full py-3 rounded-lg font-medium text-white flex items-center justify-center gap-2 ${
                  generating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <Download className="w-5 h-5" />
                {generating ? 'Generating...' : 'Generate Report'}
              </button>
            </div>
          </div>
        </div>

        {/* Report Preview */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Report Preview</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 min-h-[500px]">
              <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8 border border-gray-200">
                <div className="text-center mb-8 pb-6 border-b border-gray-200">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {reportTypes.find(r => r.id === reportType)?.name}
                  </h1>
                  <p className="text-gray-600">Convenience Store ERP System</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                  </p>
                </div>

                <div className="space-y-6">
                  {reportType === 'inventory' && (
                    <>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Summary</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Total Items</p>
                            <p className="text-2xl font-bold text-gray-900">1,256</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Low Stock Items</p>
                            <p className="text-2xl font-bold text-yellow-600">23</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Stock Levels</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <span className="text-sm text-gray-700">In Stock</span>
                            <span className="font-semibold text-green-600">892</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <span className="text-sm text-gray-700">Low Stock</span>
                            <span className="font-semibold text-yellow-600">23</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <span className="text-sm text-gray-700">Critical</span>
                            <span className="font-semibold text-red-600">5</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {reportType === 'sales' && (
                    <>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Revenue Summary</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                            <p className="text-2xl font-bold text-green-600">$125,430</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                            <p className="text-2xl font-bold text-blue-600">342</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Top Products</h3>
                        <div className="space-y-2">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                              <span className="text-sm text-gray-700">Product {i}</span>
                              <span className="font-semibold text-gray-900">$5,420</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {reportType === 'vendor' && (
                    <>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Vendor Overview</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Active Vendors</p>
                            <p className="text-2xl font-bold text-purple-600">8</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                            <p className="text-2xl font-bold text-blue-600">1,294</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance Metrics</h3>
                        <div className="space-y-2">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                              <span className="text-sm text-gray-700">Vendor {i}</span>
                              <span className="font-semibold text-green-600">98%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {reportType === 'product' && (
                    <>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Performance</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Total Products</p>
                            <p className="text-2xl font-bold text-blue-600">1,256</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Avg. Margin</p>
                            <p className="text-2xl font-bold text-green-600">85%</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Profitability Analysis</h3>
                        <div className="space-y-2">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                              <span className="text-sm text-gray-700">Product {i}</span>
                              <span className="font-semibold text-gray-900">{80 + i * 10}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
                  <p>This is an automated report generated by Convenience Store ERP</p>
                  <p className="mt-1">© 2025 All Rights Reserved</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Export Options</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Reports are generated in PDF format with professional formatting, headers, and footers.
                    Click "Generate Report" to download your document.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
