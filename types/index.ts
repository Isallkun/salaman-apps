// User Types
export type UserRole = 'buyer' | 'supplier'

export interface User {
  id: string
  email: string
  role: UserRole
  businessName: string
  phone?: string
  address?: string
  createdAt: Date
  updatedAt: Date
}

export interface RegisterInput {
  email: string
  password: string
  role: UserRole
  businessName: string
  phone?: string
  address?: string
}

export interface Session {
  user: User
  accessToken: string
  refreshToken: string
}

// Product Types
export interface Product {
  id: string
  supplierId: string
  name: string
  description?: string
  category: string
  price: number
  unit: string
  imageUrls: string[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ProductInput {
  name: string
  description?: string
  category: string
  price: number
  unit: string
  imageUrls: string[]
}

export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  supplierId?: string
  isActive?: boolean
  search?: string
}

// Order Types
export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'COMPLETED' | 'CANCELLED'

export interface Order {
  id: string
  buyerId: string
  supplierId: string
  status: OrderStatus
  totalAmount: number
  trackingNumber?: string
  notes?: string
  items: OrderItem[]
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  productName: string
  productCategory: string
  quantity: number
  unitPrice: number
  subtotal: number
}

// Cart Types
export interface CartItem {
  productId: string
  productName: string
  productCategory: string
  quantity: number
  unitPrice: number
  supplierId: string
}

// Transaction Types
export type TransactionStatus = 'PENDING' | 'HELD' | 'RELEASED' | 'DISPUTED' | 'REFUNDED'

export interface Transaction {
  id: string
  orderId: string
  status: TransactionStatus
  amount: number
  midtransTransactionId?: string
  midtransOrderId?: string
  paymentType?: string
  paymentStatus?: string
  deliveryProofUrl?: string
  aiVerificationResult?: AIVerificationResult
  aiVerificationStatus?: string
  createdAt: Date
  updatedAt: Date
}

// AI Verification Types
export interface AIVerificationResult {
  isValid: boolean
  confidence: number
  detectedObjects: Array<{
    label: string
    confidence: number
  }>
  expectedCategory: string
  timestamp: Date
}

export interface DetectionResult {
  detections: Array<{
    label: string
    confidence: number
    bounding_box?: {
      x: number
      y: number
      width: number
      height: number
    }
  }>
  processing_time_ms: number
}

// Dispute Types
export type DisputeStatus = 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED'
export type DisputeResolution = 'RELEASE_FUNDS' | 'REFUND_BUYER' | 'PARTIAL_REFUND'

export interface Dispute {
  id: string
  transactionId: string
  reason: string
  status: DisputeStatus
  resolution?: DisputeResolution
  resolutionNotes?: string
  createdAt: Date
  resolvedAt?: Date
}

// Midtrans Types
export interface MidtransNotification {
  transaction_time: string
  transaction_status: string
  transaction_id: string
  status_message: string
  status_code: string
  signature_key: string
  payment_type: string
  order_id: string
  merchant_id: string
  gross_amount: string
  fraud_status: string
  currency: string
}

export interface MidtransTransactionResponse {
  token: string
  redirect_url: string
}

export interface MidtransTransactionStatus {
  status_code: string
  status_message: string
  transaction_id: string
  order_id: string
  gross_amount: string
  payment_type: string
  transaction_time: string
  transaction_status: string
  fraud_status: string
}
