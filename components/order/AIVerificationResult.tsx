import Image from 'next/image'
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface AIVerificationResultProps {
  isValid: boolean
  confidence: number
  detectedObjects: Array<{ label: string; confidence: number }>
  imageUrl: string
}

export default function AIVerificationResult({
  isValid,
  confidence,
  detectedObjects,
  imageUrl,
}: AIVerificationResultProps) {
  const confidencePercent = Math.round(confidence * 100)

  return (
    <div className="space-y-4">
      {/* Result Banner */}
      <Card className={isValid ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${isValid ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {isValid ? (
                <CheckCircle className="w-8 h-8 text-white" />
              ) : (
                <XCircle className="w-8 h-8 text-white" />
              )}
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isValid ? 'text-emerald-800' : 'text-red-800'}`}>
                {isValid ? 'Verifikasi Berhasil!' : 'Verifikasi Gagal'}
              </h3>
              <p className={`text-sm ${isValid ? 'text-emerald-700' : 'text-red-700'}`}>
                {isValid
                  ? 'Barang sesuai dengan pesanan. Dana akan dicairkan ke supplier.'
                  : 'Barang tidak sesuai dengan pesanan. Dispute telah dibuat.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Details */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Detail Verifikasi AI</h4>

          {/* Uploaded Image */}
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
            <Image
              src={imageUrl}
              alt="Delivery proof"
              fill
              className="object-contain"
            />
            <Badge
              className={`absolute top-2 right-2 ${
                isValid ? 'bg-emerald-500' : 'bg-red-500'
              }`}
            >
              {isValid ? 'VALID' : 'INVALID'}
            </Badge>
          </div>

          {/* Confidence Score */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Tingkat Kepercayaan</span>
              <span className={`font-bold ${
                confidencePercent >= 70 ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {confidencePercent}%
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  confidencePercent >= 70 ? 'bg-emerald-500' : 'bg-red-500'
                }`}
                style={{ width: `${confidencePercent}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Minimal 70% untuk verifikasi berhasil
            </p>
          </div>

          {/* Detected Objects */}
          {detectedObjects.length > 0 && (
            <div>
              <p className="text-sm text-gray-600 mb-2">Objek Terdeteksi:</p>
              <div className="flex flex-wrap gap-2">
                {detectedObjects.map((obj, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-sm"
                  >
                    {obj.label} ({Math.round(obj.confidence * 100)}%)
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Langkah Selanjutnya</p>
              <p className="text-sm text-gray-600">
                {isValid
                  ? 'Transaksi selesai. Dana akan otomatis dicairkan ke supplier dalam 1x24 jam.'
                  : 'Tim SALAMAN akan meninjau dispute Anda. Anda akan dihubungi dalam 1x24 jam.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
