<script setup>
const route = useRoute()
const orderDataFromState = history.state?.orderData

const order = ref(orderDataFromState || null)
const error = ref(null)
if (!order.value && route.params.id) {
  try {
    const { data, error: fetchError } = await useFetch(`/api/orders/${route.params.id}`)
    if (data.value) {
      order.value = data.value.order
    }
    if (fetchError.value) {
      error.value = fetchError.value
    }
  } catch (err) {
    console.warn('API fetch failed, but you may still have order data')
  }
}

if (!order.value && !orderDataFromState) {
  error.value = 'No order data available'
}

const formatDate = (date) => {
  return new Date(date).toLocaleString()
}

const printInvoice = () => {
  window.print()
}

const goToShop = () => {
  navigateTo('/')
}
</script>

<template>
  <div v-if="order" class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold text-white">Order Confirmation</h1>
              <p class="text-blue-100 mt-1">Thank you for your purchase!</p>
            </div>
            <div class="text-right">
              <div class="text-white text-sm">Invoice</div>
              <div class="text-blue-100 text-xs mt-1">#{{ order.order_number }}</div>
            </div>
          </div>
        </div>
        <div class="px-8 py-6">
          <div class="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
            <div>
              <p class="text-sm text-gray-500">Order Date</p>
              <p class="font-semibold text-gray-900">{{ formatDate(order.created_at) }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-500">Order Status</p>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Confirmed
              </span>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="bg-gray-50 rounded-lg p-5">
              <div class="flex items-center mb-3">
                <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <h3 class="font-semibold text-gray-900">Customer Information</h3>
              </div>
              <div class="space-y-2">
                <p class="text-sm"><span class="font-medium text-gray-700">Name:</span> {{ order.customer.name }}</p>
                <p class="text-sm"><span class="font-medium text-gray-700">Email:</span> {{ order.customer.email }}</p>
                <p class="text-sm"><span class="font-medium text-gray-700">Mobile:</span> {{ order.customer.mobile }}</p>
              </div>
            </div>
            <div class="bg-gray-50 rounded-lg p-5">
              <div class="flex items-center mb-3">
                <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
                <h3 class="font-semibold text-gray-900">Billing Information</h3>
              </div>
              <div class="space-y-2">
                <p class="text-sm"><span class="font-medium text-gray-700">Name:</span> {{ order.billing.name }}</p>
                <p class="text-sm"><span class="font-medium text-gray-700">Email:</span> {{ order.billing.email }}</p>
                <p class="text-sm"><span class="font-medium text-gray-700">Mobile:</span> {{ order.billing.mobile }}</p>
              </div>
            </div>
          </div>

          <div class="mb-8">
            <h3 class="font-semibold text-gray-900 mb-4">Order Items</h3>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                    <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(item, index) in order.items" :key="index" class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.name }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{{ item.quantity }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">${{ item.unit_price.toFixed(2) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 text-right">${{ (item.quantity * item.unit_price).toFixed(2) }}</td>
                  </tr>
                </tbody>
                <tfoot class="bg-gray-50">
                  <tr>
                    <td colspan="3" class="px-6 py-4 text-right font-bold text-gray-900">Grand Total</td>
                    <td class="px-6 py-4 text-right font-bold text-2xl text-blue-600">${{ order.total.toFixed(2) }}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-200">
            <button 
              @click="printInvoice" 
              class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
              </svg>
              Print Invoice
            </button>
            <button 
              @click="goToShop" 
              class="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="!order && !error" class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <p class="text-gray-600">Loading order details...</p>
    </div>
  </div>
  <div v-else class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div class="bg-white rounded-lg shadow-xl p-8 max-w-md text-center">
      <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Failed to Load Order</h3>
      <p class="text-gray-600 mb-6">{{ error }}</p>
      <button 
        @click="goToShop" 
        class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Return to Shop
      </button>
    </div>
  </div>
</template>
  



