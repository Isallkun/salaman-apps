const COLOSSAL_API_KEY = process.env.COLOSSAL_API_KEY!
const COLOSSAL_API_URL = 'https://api.colossal.id/v1/vision/detect'

interface DetectionResult {
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

interface VerificationResult {
  isValid: boolean
  confidence: number
  detectedObjects: Array<{
    label: string
    confidence: number
  }>
  expectedCategory: string
}

// Retry with exponential backoff
async function fetchWithRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      if (i === maxRetries - 1) throw error
      const delay = baseDelay * Math.pow(2, i)
      console.log(`Retry ${i + 1}/${maxRetries} after ${delay}ms`)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
  throw new Error('Max retries exceeded')
}

export async function detectObjects(imageUrl: string): Promise<DetectionResult | null> {
  try {
    const result = await fetchWithRetry(async () => {
      const response = await fetch(COLOSSAL_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${COLOSSAL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_url: imageUrl,
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        console.error('Colossal AI error:', error)
        throw new Error(`API error: ${response.status}`)
      }

      return await response.json()
    })

    return result
  } catch (error) {
    console.error('Detect objects error:', error)
    return null
  }
}

export async function verifyProduct(
  imageUrl: string,
  expectedCategory: string
): Promise<VerificationResult> {
  const CONFIDENCE_THRESHOLD = 0.7 // 70%

  try {
    const detection = await detectObjects(imageUrl)

    if (!detection || !detection.detections || detection.detections.length === 0) {
      return {
        isValid: false,
        confidence: 0,
        detectedObjects: [],
        expectedCategory,
      }
    }

    // Map category to expected labels
    const categoryLabels: Record<string, string[]> = {
      sembako: ['rice', 'sugar', 'flour', 'oil', 'food', 'grocery'],
      minuman: ['bottle', 'drink', 'beverage', 'water', 'tea', 'coffee'],
      makanan: ['food', 'noodle', 'snack', 'instant noodle'],
      bumbu: ['sauce', 'condiment', 'spice', 'bottle'],
      segar: ['egg', 'chicken', 'meat', 'vegetable', 'fruit', 'fresh'],
    }

    const expectedLabels = categoryLabels[expectedCategory.toLowerCase()] || [expectedCategory]

    // Check if any detected object matches expected category
    const matchingDetections = detection.detections.filter((d) =>
      expectedLabels.some((label) =>
        d.label.toLowerCase().includes(label.toLowerCase()) ||
        label.toLowerCase().includes(d.label.toLowerCase())
      )
    )

    const highestConfidence = matchingDetections.length > 0
      ? Math.max(...matchingDetections.map((d) => d.confidence))
      : 0

    const isValid = highestConfidence >= CONFIDENCE_THRESHOLD

    return {
      isValid,
      confidence: highestConfidence,
      detectedObjects: detection.detections.map((d) => ({
        label: d.label,
        confidence: d.confidence,
      })),
      expectedCategory,
    }
  } catch (error) {
    console.error('Verify product error:', error)
    return {
      isValid: false,
      confidence: 0,
      detectedObjects: [],
      expectedCategory,
    }
  }
}

// Mock function for demo when API is not available
export async function verifyProductMock(
  imageUrl: string,
  expectedCategory: string
): Promise<VerificationResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000))

  // For demo, randomly return valid/invalid with high probability of valid
  const isValid = Math.random() > 0.2 // 80% chance of valid
  const confidence = isValid ? 0.75 + Math.random() * 0.2 : 0.3 + Math.random() * 0.3

  return {
    isValid,
    confidence,
    detectedObjects: [
      { label: expectedCategory, confidence },
      { label: 'package', confidence: 0.85 },
    ],
    expectedCategory,
  }
}
