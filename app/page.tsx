'use client'

import { useState, useEffect } from 'react'
import {
  Package, ShoppingCart, Users, TrendingUp, AlertCircle,
  FileText, Settings, BarChart3, Truck, Building2,
  Plus, Search, Filter, Download, Calendar, DollarSign
} from 'lucide-react'
import InventoryModule from './components/InventoryModule'
import VendorModule from './components/VendorModule'
import OrdersModule from './components/OrdersModule'
import ProductsModule from './components/ProductsModule'
import ReportsModule from './components/ReportsModule'
import Dashboard from './components/Dashboard'

export default function Home() {
  const [activeModule, setActiveModule] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'inventory', name: 'Inventory', icon: Package },
    { id: 'products', name: 'Products', icon: ShoppingCart },
    { id: 'vendors', name: 'Vendors', icon: Building2 },
    { id: 'orders', name: 'Orders', icon: Truck },
    { id: 'reports', name: 'Reports', icon: FileText },
  ]

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />
      case 'inventory':
        return <InventoryModule />
      case 'products':
        return <ProductsModule />
      case 'vendors':
        return <VendorModule />
      case 'orders':
        return <OrdersModule />
      case 'reports':
        return <ReportsModule />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-blue-900 to-blue-700 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-2xl font-bold">Store ERP</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-blue-800 rounded-lg"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3">
          {modules.map((module) => {
            const Icon = module.icon
            return (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  activeModule === module.id
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-blue-800 text-blue-100'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{module.name}</span>}
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-blue-600">
          {sidebarOpen && (
            <div className="text-xs text-blue-200">
              <p>Convenience Store ERP v1.0</p>
              <p className="mt-1">© 2025 All Rights Reserved</p>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {renderModule()}
      </main>
    </div>
  )
}
