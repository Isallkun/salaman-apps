# Requirements Document

## Introduction

SALAMAN (Solusi Aman Layanan Antar Mitra UMKM Atas Niaga) is a B2B marketplace and escrow system designed specifically for Indonesian MSMEs (UMKM). The system provides a trustless transaction mechanism using AI-powered product verification instead of blockchain technology. The core innovation is automated escrow fund release based on AI vision verification of delivered products, reducing transaction risk between buyers (warung/small shops) and suppliers.

## Glossary

- **SALAMAN System**: The complete B2B marketplace and escrow platform
- **Buyer**: A warung (small shop) that purchases goods through the platform
- **Supplier**: A business that sells products to buyers through the platform
- **Escrow Transaction**: A transaction where payment is held by the system until delivery verification
- **AI Verification**: Automated product validation using Colossal AI Vision API
- **Payment Gateway**: Midtrans payment processing system
- **Transaction Status**: The current state of an escrow transaction (PENDING, HELD, RELEASED, DISPUTED, REFUNDED)
- **Dispute Flow**: The process triggered when AI verification fails or buyer contests delivery
- **Product Catalog**: The collection of products available for purchase from suppliers
- **Order**: A buyer's request to purchase specific products from a supplier
- **Delivery Proof**: Photo evidence uploaded by buyer showing received products

## Requirements

### Requirement 1

**User Story:** As a buyer, I want to browse and search for products from verified suppliers, so that I can find the goods I need for my warung.

#### Acceptance Criteria

1. WHEN a buyer accesses the marketplace THEN the SALAMAN System SHALL display a searchable product catalog with supplier information
2. WHEN a buyer enters search terms THEN the SALAMAN System SHALL return relevant products matching the query
3. WHEN a buyer views a product THEN the SALAMAN System SHALL display product details including name, description, price, supplier name, and product images
4. WHEN a buyer filters products by category THEN the SALAMAN System SHALL display only products within the selected category
5. WHERE product images are available THEN the SALAMAN System SHALL display thumbnail images in the catalog listing

### Requirement 2

**User Story:** As a buyer, I want to create orders and pay securely through the platform, so that my payment is protected until I receive the correct products.

#### Acceptance Criteria

1. WHEN a buyer adds products to cart and initiates checkout THEN the SALAMAN System SHALL create an order with status PENDING
2. WHEN a buyer confirms an order THEN the SALAMAN System SHALL redirect the buyer to the Payment Gateway for payment processing
3. WHEN the Payment Gateway confirms successful payment THEN the SALAMAN System SHALL update the transaction status to HELD and hold the funds in escrow
4. WHEN payment processing fails THEN the SALAMAN System SHALL notify the buyer and maintain the order in PENDING status
5. WHEN an order is created THEN the SALAMAN System SHALL record the order details including buyer ID, supplier ID, product list, quantities, and total amount

### Requirement 3

**User Story:** As a supplier, I want to receive and fulfill orders from buyers, so that I can sell my products through the platform.

#### Acceptance Criteria

1. WHEN an order is placed and payment is held THEN the SALAMAN System SHALL notify the supplier of the new order
2. WHEN a supplier views their orders THEN the SALAMAN System SHALL display all orders with their current status
3. WHEN a supplier marks an order as shipped THEN the SALAMAN System SHALL update the order status and notify the buyer
4. WHEN a supplier provides tracking information THEN the SALAMAN System SHALL store and display the tracking details to the buyer
5. WHEN funds are released THEN the SALAMAN System SHALL notify the supplier of the completed transaction

### Requirement 4

**User Story:** As a buyer, I want to verify received products by uploading photos, so that the system can automatically confirm delivery and release payment to the supplier.

#### Acceptance Criteria

1. WHEN a buyer receives products THEN the SALAMAN System SHALL provide an interface to upload delivery proof photos
2. WHEN a buyer uploads a photo THEN the SALAMAN System SHALL accept common image formats (JPEG, PNG, WebP) with maximum size of 5MB
3. WHEN a photo is uploaded THEN the SALAMAN System SHALL store the image securely and associate it with the transaction
4. WHEN a photo upload fails due to size or format THEN the SALAMAN System SHALL display an error message and allow retry
5. WHEN a photo is successfully uploaded THEN the SALAMAN System SHALL trigger the AI Verification process

### Requirement 5

**User Story:** As the system, I want to automatically verify delivered products using AI vision analysis, so that I can determine whether to release escrowed funds to the supplier.

#### Acceptance Criteria

1. WHEN delivery proof is uploaded THEN the SALAMAN System SHALL call the Colossal AI Vision API with the product image and expected product category
2. WHEN the Colossal AI Vision API returns detection results THEN the SALAMAN System SHALL parse the detected objects and confidence scores
3. WHEN detected objects match the ordered product category with confidence above 70% THEN the SALAMAN System SHALL mark the verification as VALID
4. WHEN detected objects do not match the ordered product category or confidence is below 70% THEN the SALAMAN System SHALL mark the verification as INVALID
5. WHEN AI Verification returns VALID THEN the SALAMAN System SHALL automatically update transaction status to RELEASED and transfer funds to the supplier

### Requirement 6

**User Story:** As a buyer, I want to dispute a transaction when the delivered products are incorrect, so that I can request a refund or resolution.

#### Acceptance Criteria

1. WHEN AI Verification returns INVALID THEN the SALAMAN System SHALL automatically create a dispute and update transaction status to DISPUTED
2. WHEN a transaction is in DISPUTED status THEN the SALAMAN System SHALL hold the escrowed funds and prevent automatic release
3. WHEN a dispute is created THEN the SALAMAN System SHALL notify both buyer and supplier of the dispute
4. WHEN a buyer views a disputed transaction THEN the SALAMAN System SHALL display the dispute details including uploaded photos and AI verification results
5. WHERE manual review is required THEN the SALAMAN System SHALL provide an interface for dispute resolution with options to release funds or refund buyer

### Requirement 7

**User Story:** As a supplier, I want to manage my product catalog, so that buyers can discover and purchase my products.

#### Acceptance Criteria

1. WHEN a supplier creates a new product THEN the SALAMAN System SHALL store the product with name, description, price, category, and images
2. WHEN a supplier uploads product images THEN the SALAMAN System SHALL validate image format and size before storage
3. WHEN a supplier updates product information THEN the SALAMAN System SHALL save the changes and reflect them in the marketplace
4. WHEN a supplier deactivates a product THEN the SALAMAN System SHALL hide the product from buyer searches while preserving historical order data
5. WHEN a supplier views their catalog THEN the SALAMAN System SHALL display all their products with current status

### Requirement 8

**User Story:** As a user (buyer or supplier), I want to register and authenticate securely, so that I can access platform features appropriate to my role.

#### Acceptance Criteria

1. WHEN a new user registers THEN the SALAMAN System SHALL create an account with email, password, role (buyer or supplier), and business information
2. WHEN a user provides registration information THEN the SALAMAN System SHALL validate email format and password strength requirements
3. WHEN a user logs in with valid credentials THEN the SALAMAN System SHALL authenticate the user and create a session
4. WHEN a user logs in with invalid credentials THEN the SALAMAN System SHALL reject the login attempt and display an error message
5. WHEN an authenticated user accesses protected routes THEN the SALAMAN System SHALL verify the user's role and grant appropriate access

### Requirement 9

**User Story:** As a buyer, I want to view my transaction history, so that I can track my orders and payments.

#### Acceptance Criteria

1. WHEN a buyer accesses their transaction history THEN the SALAMAN System SHALL display all their transactions ordered by date
2. WHEN a buyer views a transaction THEN the SALAMAN System SHALL display order details, payment status, delivery status, and AI verification results
3. WHEN a buyer filters transactions by status THEN the SALAMAN System SHALL display only transactions matching the selected status
4. WHEN a buyer views a completed transaction THEN the SALAMAN System SHALL display the delivery proof photo and verification details
5. WHEN a buyer views a disputed transaction THEN the SALAMAN System SHALL display the dispute status and resolution options

### Requirement 10

**User Story:** As a supplier, I want to view my sales and earnings, so that I can track my business performance on the platform.

#### Acceptance Criteria

1. WHEN a supplier accesses their dashboard THEN the SALAMAN System SHALL display total sales, pending orders, and completed transactions
2. WHEN a supplier views earnings THEN the SALAMAN System SHALL display total earnings from released transactions
3. WHEN a supplier views transaction details THEN the SALAMAN System SHALL display order information, payment amount, and current status
4. WHEN funds are released to a supplier THEN the SALAMAN System SHALL update the supplier's earnings balance
5. WHEN a supplier filters transactions by date range THEN the SALAMAN System SHALL display only transactions within the specified period

### Requirement 11

**User Story:** As the system, I want to integrate with Midtrans payment gateway, so that I can process secure payments and manage escrow funds.

#### Acceptance Criteria

1. WHEN a buyer initiates payment THEN the SALAMAN System SHALL create a Midtrans Snap transaction with order details and redirect URL
2. WHEN Midtrans sends payment notification THEN the SALAMAN System SHALL verify the notification signature and update transaction status
3. WHEN payment is successful THEN the SALAMAN System SHALL record the payment details including transaction ID, amount, and timestamp
4. WHEN payment fails or is cancelled THEN the SALAMAN System SHALL update the order status and notify the buyer
5. WHEN the SALAMAN System processes payment notifications THEN the SALAMAN System SHALL validate the notification authenticity using Midtrans signature verification

### Requirement 12

**User Story:** As the system, I want to handle errors gracefully during AI verification and payment processing, so that users receive clear feedback and transactions remain in consistent states.

#### Acceptance Criteria

1. WHEN the Colossal AI Vision API is unavailable THEN the SALAMAN System SHALL retry the request up to 3 times with exponential backoff
2. WHEN AI verification fails after retries THEN the SALAMAN System SHALL mark the transaction as requiring manual review and notify administrators
3. WHEN the Payment Gateway is unavailable THEN the SALAMAN System SHALL display an error message and allow the buyer to retry payment
4. WHEN an error occurs during transaction processing THEN the SALAMAN System SHALL log the error details and maintain transaction data integrity
5. WHEN network errors occur during API calls THEN the SALAMAN System SHALL handle timeouts gracefully and provide user-friendly error messages
