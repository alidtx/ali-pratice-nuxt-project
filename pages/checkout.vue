<script setup>
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/product'
import { toast } from 'vue-sonner'
const store = useProductStore();
const { selectedProducts } = storeToRefs(store)
const totalPrice = computed(() => store.calculateTotalPrice(selectedProducts.value))
const checkoutItem = computed(() => selectedProducts?.value.map((item) => {
    return {
        name: item.name,
        unit_price: item.price,
        quantity: item.quantity
    }
}))

const formData = ref({
    checkout_items: checkoutItem.value,
    billing_info: {
        name: 'Ali Abu Taleb',
        mobile: '01638912320',
        email: 'alirimon5@gmail.com',
        address_line: 'Dhaka Bangladesh Block 12',
        city: 'Dhaka',
        post_code: '1212',
        country: 'Bangladesh'
    },
    customer_info: {
        name: 'Ali Abu Taleb',
        mobile: '01638912320',
        email: 'alirimon5@gmail.com',
        address_line: 'Dhaka Bangladesh Block 12',
        city: 'Dhaka',
        post_code: '1212',
        country: 'Bangladesh'
    }
})

async function onSubmit () {
  try {
    const payload = {
      checkout_items: selectedProducts.value.map(item => ({
        name: item.name,
        unit_price: item.price,
        quantity: item.quantity
      })),
      billing_info: formData.value.billing_info,
      customer_info: formData.value.customer_info
    }

    const res = await $fetch('/api/orders', {
      method: 'POST',
      body: payload
    })

    await navigateTo({
      path: `/invoice/${res.order.id}`,
      state: { orderData: res.order }
    })


  } catch (error) {
    toast.error('Order failed')
  }
}

</script>

<template>
    <div class="bg-gray-50 px-4 pb-24 pt-24 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:max-w-none">
          <h1 class="sr-only">Checkout</h1>
          <form class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16" @submit.prevent="onSubmit()">
            <div>
              <div>
                <h2 class="text-lg cursor-pointer font-medium text-gray-900">Customer information</h2>

                <div class="mt-4 grid grid-cols-1 gap-y-2 sm:grid-cols-3 sm:gap-x-4">
                  <div class="sm:col-span-3">
                    <InputLabel value="Full Name" />
                    <BaseInput v-model="formData.customer_info.name" />
                  </div>
                  <div class="sm:col-span-3">
                    <InputLabel value="Email" />
                    <BaseInput v-model="formData.customer_info.email"  type="email"/>
                  </div>
                  <div class="sm:col-span-3">
                    <InputLabel value="Mobile" />
                    <BaseInput v-model="formData.customer_info.mobile"/>
                  </div>
                  <div class="sm:col-span-3">
                    <InputLabel value="Address Line" />
                    <BaseInput v-model="formData.customer_info.address_line"/>
                  </div>

                  <div >
                    <InputLabel value="City" />
                    <BaseInput v-model="formData.customer_info.city"/>
                  </div>

                  <div >
                    <InputLabel value="Post code" />
                    <BaseInput v-model="formData.customer_info.post_code"/>
                  </div>

                  <div>
                    <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                    <div class="mt-1">
                      <select id="country" name="country" autocomplete="country-name" class="block py-2.5 px-3 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        <option selected value="bangladesh">Bangladesh</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-10 border-t border-gray-200 pt-4">
                <h2 class="text-lg font-medium text-gray-900">Billing information</h2>

                <div class="mt-4 grid grid-cols-1 gap-y-2 sm:grid-cols-3 sm:gap-x-4">
                  <div class="sm:col-span-3">
                    <InputLabel value="Full Name" />
                    <BaseInput v-model="formData.billing_info.name" />
                  </div>
                  <div class="sm:col-span-3">
                    <InputLabel value="Email" />
                    <BaseInput v-model="formData.billing_info.email"  type="email"/>
                  </div>
                  <div class="sm:col-span-3">
                    <InputLabel value="Mobile" />
                    <BaseInput v-model="formData.billing_info.mobile"/>
                  </div>
                  <div class="sm:col-span-3">
                    <InputLabel value="Address Line" />
                    <BaseInput v-model="formData.billing_info.address_line"/>
                  </div>

                  <div >
                    <InputLabel value="City" />
                    <BaseInput v-model="formData.billing_info.city"/>
                  </div>

                  <div >
                    <InputLabel value="Post code" />
                    <BaseInput v-model="formData.billing_info.post_code"/>
                  </div>

                  <div>
                    <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                    <div class="mt-1">
                      <select id="country" name="country" autocomplete="country-name" class="block py-2.5 px-3 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        <option selected value="bangladesh">Bangladesh</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-10 lg:mt-0">
              <h2 class="text-lg font-medium text-gray-900">Order summary</h2>

              <div class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 class="sr-only">Items in your cart</h3>
                <ul role="list" class="divide-y divide-gray-200 max-h-[15rem] overflow-y-auto">
                  <li v-for="product in selectedProducts" :key="product.id" class="flex px-4 py-6 sm:px-6">
                    <div class="flex-shrink-0">
                      <img :src="product.imageSrc" :alt="product.imageAlt" class="w-20 rounded-md" />
                    </div>

                    <div class="ml-6 flex flex-1 flex-col">
                      <div class="flex">
                        <div class="min-w-0 flex-1">
                          <h4 class="text-sm">
                            <a :href="product.href" class="font-medium text-gray-700 hover:text-gray-800">{{ product.name }}</a>
                          </h4>
                        </div>

                        <div class="ml-4 flow-root flex-shrink-0">
                          <button  @click="store.removeProduct(product.id)" type="button" class="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500">
                            <span class="sr-only">Remove</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div class="flex flex-1 items-end justify-between pt-2">
                        <p class="mt-1 text-sm font-medium text-gray-900">৳{{ product.price }}</p>
                      </div>
                    </div>
                  </li>
                </ul>
                <dl class="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div class="flex items-center justify-between">
                    <dt class="text-sm">Subtotal</dt>
                    <dd class="text-sm font-medium text-gray-900">৳{{ totalPrice }}</dd>
                  </div>
                </dl>

                <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <button type="submit" class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">Confirm order</button>
                </div>
              </div>
            </div>
          </form>
        </div>
    </div>
  </template>
