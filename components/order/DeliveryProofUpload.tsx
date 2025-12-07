'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, Camera, Loader2, CheckCircle, XCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { uploadDeliveryProof, verifyDelivery } from '@/actions/delivery'
import AIVerificationResult from './AIVerificationResult'

interface DeliveryProofUploadProps {
  orderId: string
  onSuccess?: () => void
}

interface VerificationData {
  isValid: boolean
  confidence: number
  detectedObjects: Array<{ label: string; confidence: number }>
}

export default function DeliveryProofUpload({ orderId, onSuccess }: DeliveryProofUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
  const [verificationResult, setVerificationResult] = useState<VerificationData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      setError('Format file tidak didukung. Gunakan JPEG, PNG, atau WebP.')
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran file terlalu besar. Maksimal 5MB.')
      return
    }

    setError(null)
    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
    setVerificationResult(null)
  }

  const handleUploadAndVerify = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    setError(null)

    try {
      // Upload file
      const formData = new FormData()
      formData.append('file', selectedFile)

      const uploadResult = await uploadDeliveryProof(orderId, formData)

      if (!uploadResult.success || !uploadResult.imageUrl) {
        setError(uploadResult.error || 'Gagal mengupload file')
        setIsUploading(false)
        return
      }

      setUploadedUrl(uploadResult.imageUrl)
      setIsUploading(false)
      setIsVerifying(true)

      // Verify with AI
      const verifyResult = await verifyDelivery(orderId, uploadResult.imageUrl)

      if (!verifyResult.success) {
        setError(verifyResult.error || 'Gagal memverifikasi')
        setIsVerifying(false)
        return
      }

      setVerificationResult({
        isValid: verifyResult.isValid!,
        confidence: verifyResult.confidence!,
        detectedObjects: verifyResult.detectedObjects || [],
      })

      setIsVerifying(false)

      if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      console.error('Upload error:', err)
      setError('Terjadi kesalahan. Silakan coba lagi.')
      setIsUploading(false)
      setIsVerifying(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload Area */}
      {!previewUrl && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-colors"
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium mb-2">
            Klik untuk upload foto barang
          </p>
          <p className="text-sm text-gray-500">
            Format: JPEG, PNG, WebP (Maks. 5MB)
          </p>
        </div>
      )}

      {/* Preview */}
      {previewUrl && !verificationResult && (
        <div className="space-y-4">
          <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedFile(null)
                setPreviewUrl(null)
                setError(null)
              }}
              disabled={isUploading || isVerifying}
              className="flex-1"
            >
              Ganti Foto
            </Button>
            <Button
              onClick={handleUploadAndVerify}
              disabled={isUploading || isVerifying}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Mengupload...
                </>
              ) : isVerifying ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Memverifikasi AI...
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4 mr-2" />
                  Upload & Verifikasi
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Verification Result */}
      {verificationResult && (
        <AIVerificationResult
          isValid={verificationResult.isValid}
          confidence={verificationResult.confidence}
          detectedObjects={verificationResult.detectedObjects}
          imageUrl={uploadedUrl || previewUrl || ''}
        />
      )}
    </div>
  )
}
