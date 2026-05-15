import { readFileSync, writeFileSync } from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const filePath = path.resolve('server/data/orders.json')
  const fileData = readFileSync(filePath, 'utf-8')
  const orders = JSON.parse(fileData || '[]')
  const newOrder = {
    id: Date.now(),
    order_number: 'ORD-' + Math.floor(Math.random() * 100000),
    items: body.checkout_items,
    customer: body.customer_info,
    billing: body.billing_info,
    total: body.checkout_items.reduce(
      (sum, item) => sum + item.unit_price * item.quantity,
      0
    ),
    created_at: new Date()
  }

  orders.push(newOrder)
  writeFileSync(filePath, JSON.stringify(orders, null, 2))

  return {
    success: true,
    message: 'Order saved successfully',
    order: newOrder
  }
})