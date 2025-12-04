# Implementation Plan

- [ ] 1. Set up project foundation and configuration
  - Initialize Next.js 15 project with TypeScript and App Router
  - Configure Tailwind CSS and install Shadcn/UI components
  - Set up environment variables for Supabase, Midtrans, and Colossal AI
  - Create TypeScript interfaces in `types/index.ts`
  - _Requirements: All requirements depend on this foundation_

- [ ] 2. Set up Supabase database and authentication
  - Create Supabase project and configure connection
  - Write database migration scripts for all tables (users, products, orders, order_items, transactions, disputes)
  - Set up Supabase Auth configuration
  - Create Supabase client utilities in `lib/supabase.ts`
  - Configure Supabase Storage bucket for product and delivery proof images
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 3. Implement authentication system
- [ ] 3.1 Create authentication server actions
  - Implement `registerUser` function with email validation and password hashing
  - Implement `loginUser` function with credential verification
  - Implement `getCurrentUser` and `logoutUser` functions
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ]* 3.2 Write property test for authentication
  - **Property 20: Email uniqueness**
  - **Validates: Requirements 8.1, 8.2**

- [ ]* 3.3 Write property test for invalid credentials
  - **Property 21: Invalid credentials rejection**
  - **Validates: Requirements 8.4**

- [ ] 3.4 Create authentication UI pages
  - Build `/auth/login` page with form validation
  - Build `/auth/register` page with role selection (buyer/supplier)
  - Add error handling and loading states
  - _Requirements: 8.1, 8.3, 8.4_

- [ ]* 3.5 Write property test for role-based access
  - **Property 22: Role-based access control**
  - **Validates: Requirements 8.5**

- [ ] 4. Implement product catalog and search
- [ ] 4.1 Create product server actions
  - Implement `getProducts` with filtering support
  - Implement `searchProducts` with text search
  - Implement `getProductById` for product details
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ]* 4.2 Write property test for search relevance
  - **Property 1: Search result relevance**
  - **Validates: Requirements 1.2**

- [ ]* 4.3 Write property test for category filtering
  - **Property 2: Category filter correctness**
  - **Validates: Requirements 1.4**

- [ ] 4.4 Build marketplace UI components
  - Create `ProductCard` component
  - Create `ProductGrid` component with responsive layout
  - Create `SearchBar` component with filters
  - Build `/marketplace` page integrating all components
  - _Requirements: 1.1, 1.2, 1.4, 1.5_

- [ ]* 4.5 Write property test for product display
  - **Property 3: Product display completeness**
  - **Validates: Requirements 1.3**

- [ ] 4.6 Build product detail page
  - Create `/product/[id]` page with full product information
  - Display product images, description, price, and supplier info
  - Add "Add to Cart" functionality
  - _Requirements: 1.3_

- [ ] 5. Implement supplier product management
- [ ] 5.1 Create supplier product server actions
  - Implement `createProduct` with image upload to Supabase Storage
  - Implement `updateProduct` for editing products
  - Implement `deactivateProduct` for soft deletion
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ]* 5.2 Write property test for product creation
  - **Property 18: Product creation completeness**
  - **Validates: Requirements 7.1**

- [ ]* 5.3 Write property test for product deactivation
  - **Property 19: Product deactivation preserves history**
  - **Validates: Requirements 7.4**

- [ ] 5.4 Build supplier product management UI
  - Create `/supplier/products` page with product list
  - Add product creation form with image upload
  - Add product editing interface
  - Implement product activation/deactivation toggle
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 6. Implement shopping cart and checkout
- [ ] 6.1 Create cart state management
  - Implement cart context or state management
  - Add cart operations (add, remove, update quantity)
  - Persist cart to localStorage
  - _Requirements: 2.1_

- [ ] 6.2 Build cart and checkout UI
  - Create `/cart` page with cart items display
  - Create `CartItem` component
  - Create `/checkout` page with order summary
  - _Requirements: 2.1, 2.5_

- [ ] 7. Implement order creation and payment integration
- [ ] 7.1 Create Midtrans service module
  - Implement `createTransaction` function in `lib/midtrans.ts`
  - Implement `verifyNotification` for signature verification
  - Implement `getTransactionStatus` for status checking
  - _Requirements: 11.1, 11.5_

- [ ]* 7.2 Write property test for Midtrans signature verification
  - **Property 25: Midtrans notification signature verification**
  - **Validates: Requirements 11.5**

- [ ] 7.3 Create order server actions
  - Implement `createOrder` to create order and transaction records
  - Integrate Midtrans Snap token creation
  - Handle order creation with PENDING status
  - _Requirements: 2.1, 2.5, 11.1_

- [ ]* 7.4 Write property test for order creation
  - **Property 4: Order creation with pending status**
  - **Validates: Requirements 2.1, 2.5**

- [ ] 7.4 Implement payment flow in checkout
  - Integrate Midtrans Snap popup in checkout page
  - Handle payment success/failure callbacks
  - Redirect to order confirmation page
  - _Requirements: 2.2, 2.4_

- [ ] 7.5 Create Midtrans webhook handler
  - Create `/api/webhooks/midtrans` API route
  - Verify notification signature
  - Update transaction status based on payment status
  - Handle settlement, pending, and failure statuses
  - _Requirements: 2.3, 2.4, 11.2, 11.3, 11.4, 11.5_

- [ ]* 7.6 Write property test for payment success
  - **Property 5: Payment success triggers escrow**
  - **Validates: Requirements 2.3**

- [ ]* 7.7 Write property test for payment failure
  - **Property 6: Payment failure preserves order state**
  - **Validates: Requirements 2.4**

- [ ]* 7.8 Write property test for payment notification processing
  - **Property 26: Payment success updates transaction**
  - **Validates: Requirements 11.3**

- [ ] 8. Implement supplier order management
- [ ] 8.1 Create supplier order server actions
  - Implement `getSupplierOrders` to fetch orders for supplier
  - Implement `updateOrderStatus` for status transitions
  - Implement `addTrackingInfo` for shipping details
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ]* 8.2 Write property test for supplier order visibility
  - **Property 7: Supplier order visibility**
  - **Validates: Requirements 3.2**

- [ ]* 8.3 Write property test for shipping status update
  - **Property 8: Shipping status update triggers notification**
  - **Validates: Requirements 3.3**

- [ ]* 8.4 Write property test for tracking information
  - **Property 9: Tracking information persistence**
  - **Validates: Requirements 3.4**

- [ ] 8.5 Build supplier order management UI
  - Create `/supplier/orders` page with order list
  - Add order detail view with status update controls
  - Add tracking number input form
  - Implement order status badges
  - _Requirements: 3.2, 3.3, 3.4, 3.5_

- [ ] 8.6 Build supplier dashboard
  - Create `/supplier/dashboard` page
  - Display sales metrics and earnings
  - Show pending orders count
  - _Requirements: 10.1, 10.2_

- [ ] 9. Implement buyer order tracking
- [ ] 9.1 Create buyer order server actions
  - Implement `getBuyerOrders` to fetch buyer's orders
  - Add order filtering by status
  - _Requirements: 9.1, 9.3_

- [ ] 9.2 Build buyer order UI
  - Create `/orders` page with order list
  - Create `/orders/[id]` page with order details
  - Display order status, tracking info, and delivery status
  - _Requirements: 9.1, 9.2, 9.3_

- [ ] 10. Implement delivery proof upload and AI verification
- [ ] 10.1 Create image upload utilities
  - Implement image validation (format, size) in `lib/utils.ts`
  - Create Supabase Storage upload helper
  - _Requirements: 4.2, 4.4_

- [ ]* 10.2 Write property test for image validation
  - **Property 10: Image format and size validation**
  - **Validates: Requirements 4.2**

- [ ] 10.3 Create Colossal AI service module
  - Implement `detectObjects` function in `lib/colossal.ts`
  - Implement `verifyProduct` with confidence threshold logic
  - Add retry logic with exponential backoff
  - _Requirements: 5.1, 5.2, 12.1_

- [ ]* 10.4 Write property test for AI confidence threshold
  - **Property 13: AI verification confidence threshold**
  - **Validates: Requirements 5.3**

- [ ]* 10.5 Write property test for AI retry logic
  - **Property 27: AI API retry with exponential backoff**
  - **Validates: Requirements 12.1**

- [ ] 10.6 Create delivery verification server actions
  - Implement `uploadDeliveryProof` to handle image upload
  - Implement `verifyDelivery` to trigger AI verification
  - Implement `releaseFunds` for automatic fund release
  - Handle verification success and failure flows
  - _Requirements: 4.1, 4.3, 4.5, 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ]* 10.7 Write property test for image storage
  - **Property 12: Image storage and association**
  - **Validates: Requirements 4.3**

- [ ]* 10.8 Write property test for AI verification trigger
  - **Property 11: Image upload triggers AI verification**
  - **Validates: Requirements 4.5**

- [ ]* 10.9 Write property test for valid verification
  - **Property 14: Valid verification releases funds**
  - **Validates: Requirements 5.5**

- [ ]* 10.10 Write property test for invalid verification
  - **Property 15: Invalid verification creates dispute**
  - **Validates: Requirements 6.1**

- [ ] 10.11 Build delivery proof upload UI
  - Create `DeliveryProofUpload` component with drag-and-drop
  - Add image preview before upload
  - Show upload progress and success/error states
  - Integrate into `/orders/[id]` page
  - _Requirements: 4.1, 4.2, 4.4_

- [ ] 10.12 Build AI verification result display
  - Create `AIVerificationResult` component
  - Display detected objects and confidence scores
  - Show verification status (VALID/INVALID)
  - _Requirements: 5.2, 9.2_

- [ ] 11. Implement dispute management
- [ ] 11.1 Create dispute server actions
  - Implement `createDispute` for automatic dispute creation
  - Implement `resolveDispute` for manual resolution
  - Add dispute notification logic
  - _Requirements: 6.1, 6.2, 6.3, 6.5_

- [ ]* 11.2 Write property test for disputed funds
  - **Property 16: Disputed funds remain held**
  - **Validates: Requirements 6.2**

- [ ]* 11.3 Write property test for dispute notifications
  - **Property 17: Dispute notification to both parties**
  - **Validates: Requirements 6.3**

- [ ]* 11.4 Write property test for failed verification manual review
  - **Property 28: Failed verification triggers manual review**
  - **Validates: Requirements 12.2**

- [ ] 11.2 Build dispute UI
  - Create `/disputes/[id]` page for dispute details
  - Display uploaded photos and AI results
  - Add dispute resolution interface (admin/manual review)
  - Show dispute status and resolution options
  - _Requirements: 6.3, 6.4, 6.5_

- [ ] 12. Implement transaction history
- [ ] 12.1 Create transaction history server actions
  - Implement transaction queries with filtering
  - Add date range filtering
  - _Requirements: 9.1, 9.3, 10.5_

- [ ]* 12.2 Write property test for transaction history
  - **Property 23: Transaction history completeness**
  - **Validates: Requirements 9.1**

- [ ]* 12.3 Write property test for transaction details
  - **Property 24: Transaction detail completeness**
  - **Validates: Requirements 9.2**

- [ ] 12.4 Build transaction history UI
  - Create `/transactions` page with transaction list
  - Create `/transactions/[id]` page with full details
  - Add status filters and date range picker
  - Display payment info, delivery proof, and AI results
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 10.3, 10.4_

- [ ] 13. Implement supplier earnings dashboard
- [ ] 13.1 Create earnings calculation logic
  - Calculate total earnings from RELEASED transactions
  - Aggregate sales metrics
  - _Requirements: 10.1, 10.2, 10.4_

- [ ] 13.2 Enhance supplier dashboard with earnings
  - Display total earnings
  - Show completed transactions
  - Add date range filtering for earnings
  - Display transaction details with amounts
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ] 14. Build landing page and navigation
- [ ] 14.1 Create landing page
  - Build `/` page with marketplace overview
  - Add hero section explaining SALAMAN
  - Add call-to-action buttons for registration
  - _Requirements: General UX_

- [ ] 14.2 Create navigation components
  - Build main navigation with role-based menu items
  - Add user profile dropdown
  - Implement mobile responsive navigation
  - _Requirements: General UX_

- [ ] 15. Implement error handling and logging
- [ ] 15.1 Add error handling to all server actions
  - Wrap all server actions in try-catch blocks
  - Implement structured error logging
  - Add user-friendly error messages
  - _Requirements: 12.3, 12.4, 12.5_

- [ ] 15.2 Add error boundaries to UI
  - Create error boundary components
  - Add fallback UI for errors
  - Implement toast notifications for errors
  - _Requirements: 12.3, 12.5_

- [ ] 16. Final checkpoint - Ensure all tests pass
  - Run all unit tests and property-based tests
  - Fix any failing tests
  - Verify all core functionality works end-to-end
  - Ask the user if questions arise

- [ ] 17. Polish and optimization
- [ ] 17.1 Add loading states and skeletons
  - Add loading skeletons for all data fetching
  - Implement optimistic UI updates where appropriate
  - Add loading spinners for async operations
  - _Requirements: General UX_

- [ ] 17.2 Optimize images and performance
  - Add image optimization with Next.js Image component
  - Implement lazy loading for images
  - Add caching headers
  - _Requirements: Performance_

- [ ] 17.3 Add form validation and user feedback
  - Implement Zod schemas for all forms
  - Add inline validation errors
  - Improve success/error toast messages
  - _Requirements: General UX_

- [ ] 18. Documentation and deployment preparation
- [ ] 18.1 Create environment setup documentation
  - Document all required environment variables
  - Create setup instructions for Supabase
  - Document Midtrans sandbox setup
  - Document Colossal AI API setup
  - _Requirements: Deployment_

- [ ] 18.2 Prepare for deployment
  - Configure Vercel deployment settings
  - Set up production environment variables
  - Test deployment in staging environment
  - _Requirements: Deployment_
