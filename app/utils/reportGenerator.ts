import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { format } from 'date-fns'

const addHeader = (doc: jsPDF, title: string) => {
  doc.setFillColor(37, 99, 235)
  doc.rect(0, 0, doc.internal.pageSize.width, 40, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text(title, 20, 25)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('Convenience Store ERP System', 20, 33)
}

const addFooter = (doc: jsPDF, pageNumber: number) => {
  const pageHeight = doc.internal.pageSize.height
  const pageWidth = doc.internal.pageSize.width

  doc.setFillColor(243, 244, 246)
  doc.rect(0, pageHeight - 20, pageWidth, 20, 'F')

  doc.setTextColor(107, 114, 128)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text(`Generated on ${format(new Date(), 'PPpp')}`, 20, pageHeight - 10)
  doc.text(`Page ${pageNumber}`, pageWidth - 40, pageHeight - 10)
  doc.text('© 2025 Convenience Store ERP', pageWidth / 2, pageHeight - 10, { align: 'center' })
}

export const generateInventoryReport = (data: any) => {
  const doc = new jsPDF()

  addHeader(doc, 'Inventory Report')

  doc.setTextColor(0, 0, 0)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Summary', 20, 55)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Report Period: ${data.dateRange}`, 20, 65)
  doc.text(`Generated: ${format(new Date(), 'PPP')}`, 20, 72)

  // Summary boxes
  doc.setFillColor(239, 246, 255)
  doc.roundedRect(20, 80, 80, 30, 3, 3, 'F')
  doc.setFontSize(10)
  doc.setTextColor(107, 114, 128)
  doc.text('Total Items', 25, 90)
  doc.setFontSize(18)
  doc.setTextColor(0, 0, 0)
  doc.setFont('helvetica', 'bold')
  doc.text('1,256', 25, 103)

  doc.setFillColor(254, 243, 199)
  doc.roundedRect(110, 80, 80, 30, 3, 3, 'F')
  doc.setFontSize(10)
  doc.setTextColor(107, 114, 128)
  doc.setFont('helvetica', 'normal')
  doc.text('Low Stock Items', 115, 90)
  doc.setFontSize(18)
  doc.setTextColor(217, 119, 6)
  doc.setFont('helvetica', 'bold')
  doc.text('23', 115, 103)

  // Inventory table
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  doc.text('Inventory Details', 20, 125)

  autoTable(doc, {
    startY: 130,
    head: [['SKU', 'Product Name', 'Quantity', 'Value ($)', 'Status']],
    body: data.data.map((item: any) => [
      item.sku,
      item.name,
      item.quantity.toString(),
      item.value.toFixed(2),
      item.status
    ]),
    theme: 'grid',
    headStyles: {
      fillColor: [37, 99, 235],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 10
    },
    styles: {
      fontSize: 9,
      cellPadding: 5
    },
    alternateRowStyles: {
      fillColor: [249, 250, 251]
    }
  })

  addFooter(doc, 1)

  doc.save(`inventory-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`)
}

export const generateSalesReport = (data: any) => {
  const doc = new jsPDF()

  addHeader(doc, 'Sales Report')

  doc.setTextColor(0, 0, 0)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Summary', 20, 55)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Report Period: ${data.dateRange}`, 20, 65)
  doc.text(`Generated: ${format(new Date(), 'PPP')}`, 20, 72)

  // Summary boxes
  doc.setFillColor(220, 252, 231)
  doc.roundedRect(20, 80, 80, 30, 3, 3, 'F')
  doc.setFontSize(10)
  doc.setTextColor(107, 114, 128)
  doc.text('Total Revenue', 25, 90)
  doc.setFontSize(18)
  doc.setTextColor(22, 163, 74)
  doc.setFont('helvetica', 'bold')
  doc.text(`$${data.totalRevenue.toLocaleString()}`, 25, 103)

  doc.setFillColor(219, 234, 254)
  doc.roundedRect(110, 80, 80, 30, 3, 3, 'F')
  doc.setFontSize(10)
  doc.setTextColor(107, 114, 128)
  doc.setFont('helvetica', 'normal')
  doc.text('Total Orders', 115, 90)
  doc.setFontSize(18)
  doc.setTextColor(37, 99, 235)
  doc.setFont('helvetica', 'bold')
  doc.text(data.totalOrders.toString(), 115, 103)

  // Sales table
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  doc.text('Top Products', 20, 125)

  autoTable(doc, {
    startY: 130,
    head: [['Product Name', 'Units Sold', 'Revenue ($)']],
    body: data.data.map((item: any) => [
      item.product,
      item.units.toString(),
      item.revenue.toFixed(2)
    ]),
    theme: 'grid',
    headStyles: {
      fillColor: [37, 99, 235],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 10
    },
    styles: {
      fontSize: 9,
      cellPadding: 5
    },
    alternateRowStyles: {
      fillColor: [249, 250, 251]
    }
  })

  addFooter(doc, 1)

  doc.save(`sales-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`)
}

export const generateVendorReport = (data: any) => {
  const doc = new jsPDF()

  addHeader(doc, 'Vendor Performance Report')

  doc.setTextColor(0, 0, 0)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Summary', 20, 55)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Report Period: ${data.dateRange}`, 20, 65)
  doc.text(`Generated: ${format(new Date(), 'PPP')}`, 20, 72)

  // Summary boxes
  doc.setFillColor(243, 232, 255)
  doc.roundedRect(20, 80, 80, 30, 3, 3, 'F')
  doc.setFontSize(10)
  doc.setTextColor(107, 114, 128)
  doc.text('Active Vendors', 25, 90)
  doc.setFontSize(18)
  doc.setTextColor(147, 51, 234)
  doc.setFont('helvetica', 'bold')
  doc.text(data.data.length.toString(), 25, 103)

  doc.setFillColor(219, 234, 254)
  doc.roundedRect(110, 80, 80, 30, 3, 3, 'F')
  doc.setFontSize(10)
  doc.setTextColor(107, 114, 128)
  doc.setFont('helvetica', 'normal')
  doc.text('Total Orders', 115, 90)
  doc.setFontSize(18)
  doc.setTextColor(37, 99, 235)
  doc.setFont('helvetica', 'bold')
  const totalOrders = data.data.reduce((acc: number, v: any) => acc + v.orders, 0)
  doc.text(totalOrders.toString(), 115, 103)

  // Vendor table
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  doc.text('Vendor Performance', 20, 125)

  autoTable(doc, {
    startY: 130,
    head: [['Vendor Name', 'Total Orders', 'Total Value ($)', 'Reliability (%)']],
    body: data.data.map((item: any) => [
      item.name,
      item.orders.toString(),
      item.total.toFixed(2),
      item.reliability.toString()
    ]),
    theme: 'grid',
    headStyles: {
      fillColor: [37, 99, 235],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 10
    },
    styles: {
      fontSize: 9,
      cellPadding: 5
    },
    alternateRowStyles: {
      fillColor: [249, 250, 251]
    }
  })

  addFooter(doc, 1)

  doc.save(`vendor-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`)
}

export const generateProductReport = (data: any) => {
  const doc = new jsPDF()

  addHeader(doc, 'Product Performance Report')

  doc.setTextColor(0, 0, 0)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Summary', 20, 55)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Report Period: ${data.dateRange}`, 20, 65)
  doc.text(`Generated: ${format(new Date(), 'PPP')}`, 20, 72)

  // Summary boxes
  doc.setFillColor(219, 234, 254)
  doc.roundedRect(20, 80, 80, 30, 3, 3, 'F')
  doc.setFontSize(10)
  doc.setTextColor(107, 114, 128)
  doc.text('Total Products', 25, 90)
  doc.setFontSize(18)
  doc.setTextColor(37, 99, 235)
  doc.setFont('helvetica', 'bold')
  doc.text(data.data.length.toString(), 25, 103)

  doc.setFillColor(220, 252, 231)
  doc.roundedRect(110, 80, 80, 30, 3, 3, 'F')
  doc.setFontSize(10)
  doc.setTextColor(107, 114, 128)
  doc.setFont('helvetica', 'normal')
  doc.text('Avg. Margin', 115, 90)
  doc.setFontSize(18)
  doc.setTextColor(22, 163, 74)
  doc.setFont('helvetica', 'bold')
  const avgMargin = data.data.reduce((acc: number, p: any) => acc + p.margin, 0) / data.data.length
  doc.text(`${avgMargin.toFixed(0)}%`, 115, 103)

  // Product table
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  doc.text('Product Details', 20, 125)

  autoTable(doc, {
    startY: 130,
    head: [['Product Name', 'Units Sold', 'Revenue ($)', 'Margin (%)']],
    body: data.data.map((item: any) => [
      item.name,
      item.sold.toString(),
      item.revenue.toFixed(2),
      item.margin.toString()
    ]),
    theme: 'grid',
    headStyles: {
      fillColor: [37, 99, 235],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 10
    },
    styles: {
      fontSize: 9,
      cellPadding: 5
    },
    alternateRowStyles: {
      fillColor: [249, 250, 251]
    }
  })

  addFooter(doc, 1)

  doc.save(`product-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`)
}
