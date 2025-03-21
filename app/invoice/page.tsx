"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useForm, useWatch } from "react-hook-form"
import { jsPDF } from "jspdf"
import { Button } from "@/components/ui/button"
import { AdBanner } from "@/components/ad-banner"
import { saveInvoice } from "@/lib/appwrite"
import { useAppwrite } from "@/contexts/AppwriteContext"
import { IndieBoostingWrapper as IndieBoosting } from "@/components/indie-boosting-wrapper"

// Invoice form interface
interface InvoiceFormData {
  invoiceNumber: string
  date: string
  dueDate: string
  fromName: string
  fromEmail: string
  fromAddress: string
  toName: string
  toEmail: string
  toAddress: string
  items: Array<{
    description: string
    quantity: number
    price: number
  }>
  notes: string
}

export default function InvoicePage() {
  const router = useRouter()
  const { user } = useAppwrite()
  const [items, setItems] = useState([{ description: "", quantity: 1, price: 0 }])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const previewContainerRef = useRef<HTMLDivElement>(null)
  
  const { register, handleSubmit, control, formState: { errors } } = useForm<InvoiceFormData>({
    defaultValues: {
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      fromName: user?.name || '',
      fromEmail: user?.email || '',
      items: items
    }
  })

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0 }])
  }

  const removeItem = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    setItems(newItems)
  }

  const generatePDF = (data: InvoiceFormData, shouldDownload = true) => {
    if (!data) return 0
    
    try {
      const doc = new jsPDF()
      
      // Add company logo/header
      doc.setFontSize(20)
      doc.text("INVOICE", 105, 20, { align: "center" })
      
      // Add invoice details
      doc.setFontSize(10)
      doc.text(`Invoice Number: ${data.invoiceNumber || ''}`, 20, 40)
      doc.text(`Date: ${data.date || ''}`, 20, 45)
      doc.text(`Due Date: ${data.dueDate || ''}`, 20, 50)
      
      // Add from details
      doc.setFontSize(12)
      doc.text("From:", 20, 65)
      doc.setFontSize(10)
      doc.text(data.fromName || '', 20, 70)
      doc.text(data.fromEmail || '', 20, 75)
      doc.text((data.fromAddress || '').split('\n'), 20, 80)
      
      // Add to details
      doc.setFontSize(12)
      doc.text("To:", 120, 65)
      doc.setFontSize(10)
      doc.text(data.toName || '', 120, 70)
      doc.text(data.toEmail || '', 120, 75)
      doc.text((data.toAddress || '').split('\n'), 120, 80)
      
      // Add items table
      doc.setFontSize(12)
      doc.text("Items", 20, 110)
      
      // Table headers
      doc.setFontSize(10)
      doc.text("Description", 20, 120)
      doc.text("Quantity", 120, 120)
      doc.text("Price", 150, 120)
      doc.text("Total", 180, 120)
      
      // Table content
      let y = 130
      let total = 0
      
      if (data.items && Array.isArray(data.items)) {
        data.items.forEach((item, index) => {
          const quantity = Number(item.quantity) || 0
          const price = Number(item.price) || 0
          const itemTotal = quantity * price
          total += itemTotal
          
          doc.text(item.description || '', 20, y)
          doc.text(quantity.toString(), 120, y)
          doc.text(`$${price.toFixed(2)}`, 150, y)
          doc.text(`$${itemTotal.toFixed(2)}`, 180, y)
          
          y += 10
        })
      }
      
      // Add total
      doc.line(20, y, 190, y)
      y += 10
      doc.setFontSize(12)
      doc.text(`Total: $${total.toFixed(2)}`, 150, y)
      
      // Add notes
      if (data.notes) {
        y += 20
        doc.setFontSize(12)
        doc.text("Notes:", 20, y)
        y += 10
        doc.setFontSize(10)
        doc.text(data.notes.split('\n'), 20, y)
      }
      
      if (shouldDownload) {
        // Save the PDF
        doc.save(`invoice-${data.invoiceNumber}.pdf`)
      } else {
        // For preview, return the blob URL
        const blobUrl = doc.output('bloburl')
        if (!shouldDownload) {
          setPreviewUrl(blobUrl.toString())
        }
      }
      
      return total
    } catch (err) {
      console.error("Error generating PDF:", err)
      return 0
    }
  }

  const previewInvoice = (data: InvoiceFormData) => {
    generatePDF(data, false)
  }
  
  // Watch form changes and update preview
  const formValues = useWatch({
    control,
    defaultValue: {
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      fromName: user?.name || '',
      fromEmail: user?.email || '',
      items: items
    }
  })
  
  // Update preview when form values change
  useEffect(() => {
    // Debounce the preview generation to avoid too many renders
    const timer = setTimeout(() => {
      if (formValues) {
        generatePDF(formValues as InvoiceFormData, false)
      }
    }, 500)
    
    return () => clearTimeout(timer)
  }, [formValues])

  const onSubmit = async (data: InvoiceFormData) => {
    setError(null)
    setSaving(true)
    
    try {
      // Generate PDF
      const total = generatePDF(data)
      
      // Try to save to Appwrite if user is authenticated
      try {
        await saveInvoice({
          ...data,
          total,
          status: 'generated',
          items: data.items.map(item => ({
            ...item,
            total: item.quantity * item.price
          }))
        })
        console.log("Invoice saved successfully")
      } catch (err) {
        // Silently handle authentication errors - just generate PDF without saving
        console.log("Invoice generated but not saved (user not authenticated)")
      }
    } catch (err: any) {
      console.error("Error generating invoice:", err)
      setError(err.message || "Failed to generate invoice")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Create Your Invoice</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Invoice Details</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Invoice Number</label>
                    <input
                      type="text"
                      {...register("invoiceNumber", { required: true })}
                      className="w-full p-2 border rounded-md"
                    />
                    {errors.invoiceNumber && <span className="text-red-500 text-sm">Required</span>}
                  </div>
                  
                  <div className="col-span-1">
                    <label className="block text-sm font-medium mb-1">Date</label>
                    <input
                      type="date"
                      {...register("date", { required: true })}
                      className="w-full p-2 border rounded-md"
                    />
                    {errors.date && <span className="text-red-500 text-sm">Required</span>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Due Date</label>
                  <input
                    type="date"
                    {...register("dueDate", { required: true })}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.dueDate && <span className="text-red-500 text-sm">Required</span>}
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Your Information</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Your Name/Company</label>
                  <input
                    type="text"
                    {...register("fromName", { required: true })}
                    className="w-full p-2 border rounded-md"
                    defaultValue={user?.name || ""}
                  />
                  {errors.fromName && <span className="text-red-500 text-sm">Required</span>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Your Email</label>
                  <input
                    type="email"
                    {...register("fromEmail", { required: true })}
                    className="w-full p-2 border rounded-md"
                    defaultValue={user?.email || ""}
                  />
                  {errors.fromEmail && <span className="text-red-500 text-sm">Required</span>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Your Address</label>
                  <textarea
                    {...register("fromAddress", { required: true })}
                    className="w-full p-2 border rounded-md"
                    rows={3}
                  ></textarea>
                  {errors.fromAddress && <span className="text-red-500 text-sm">Required</span>}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Client Information</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Client Name/Company</label>
                  <input
                    type="text"
                    {...register("toName", { required: true })}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.toName && <span className="text-red-500 text-sm">Required</span>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Client Email</label>
                  <input
                    type="email"
                    {...register("toEmail", { required: true })}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.toEmail && <span className="text-red-500 text-sm">Required</span>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Client Address</label>
                <textarea
                  {...register("toAddress", { required: true })}
                  className="w-full p-2 border rounded-md"
                  rows={3}
                ></textarea>
                {errors.toAddress && <span className="text-red-500 text-sm">Required</span>}
              </div>
            </div>
            
            {/* Items section and side ad banner */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-4">
                {/* Items section */}
                <div className="space-y-4">
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <h2 className="text-xl font-semibold">Items</h2>
                    <Button type="button" onClick={addItem} variant="outline">Add Item</Button>
                  </div>
                  
                  {/* Mobile-friendly header for items */}
                  <div className="hidden sm:grid sm:grid-cols-12 gap-4 text-sm font-medium text-gray-500 pb-2">
                    <div className="sm:col-span-6">Description</div>
                    <div className="sm:col-span-2">Quantity</div>
                    <div className="sm:col-span-3">Price</div>
                    <div className="sm:col-span-1"></div>
                  </div>
                  
                  {items.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 items-end border-b pb-4">
                      <div className="col-span-12 sm:col-span-6">
                        <label className="block text-sm font-medium mb-1 sm:hidden">Description</label>
                        <input
                          type="text"
                          {...register(`items.${index}.description` as const, { required: true })}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      
                      <div className="col-span-6 sm:col-span-2">
                        <label className="block text-sm font-medium mb-1 sm:hidden">Quantity</label>
                        <input
                          type="number"
                          min="1"
                          {...register(`items.${index}.quantity` as const, { 
                            required: true,
                            valueAsNumber: true,
                            min: 1
                          })}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium mb-1 sm:hidden">Price</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          {...register(`items.${index}.price` as const, { 
                            required: true,
                            valueAsNumber: true,
                            min: 0
                          })}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      
                      <div className="col-span-12 sm:col-span-1 flex justify-end mt-2 sm:mt-0">
                        {index > 0 && (
                          <Button 
                            type="button" 
                            onClick={() => removeItem(index)}
                            variant="destructive"
                            size="sm"
                          >
                            X
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium mb-1">Notes (Optional)</label>
                  <textarea
                    {...register("notes")}
                    className="w-full p-2 border rounded-md"
                    rows={4}
                  ></textarea>
                </div>
                
                <div className="mt-8 flex gap-4">
                  <Button 
                    type="submit" 
                    className="flex-1"
                    disabled={saving}
                  >
                    {saving ? "Generating..." : "Generate & Download PDF"}
                  </Button>
                </div>
              </div>
              
              {/* Side ad banner */}
              {/* <div className="lg:col-span-1">
                <IndieBoosting id="40SXDKOTS3" direction="vertical" maxProducts={3}/>
              </div> */}
            </div>
          </form>
            </div>
          
            {/* PDF Preview */}
            <div className="lg:col-span-1 border rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 min-h-[600px] flex flex-col">
              <div className="bg-gray-200 dark:bg-gray-600 p-3 font-medium">Real-time Preview</div>
              <div className="flex-1 p-4 flex items-center justify-center" ref={previewContainerRef}>
                {previewUrl ? (
                  <iframe 
                    src={previewUrl} 
                    className="w-full h-full border-0" 
                    title="Invoice Preview"
                  />
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <p>Fill out the form to see a real-time preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom ad banner */}
        <IndieBoosting id="40SXDKOTS3" title="Check out these apps" maxColumns={3} />
      </div>
    </div>
  )
}