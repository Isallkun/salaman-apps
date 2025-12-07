import { NextRequest, NextResponse } from 'next/server'

const COLOSSAL_API_KEY = process.env.COLOSSAL_API_KEY
const COLOSSAL_CHAT_URL = 'https://api.colossal.id/v1/chat/completions'

const SYSTEM_PROMPT = `Kamu adalah SALAMAN AI Assistant, asisten virtual untuk marketplace B2B SALAMAN.

SALAMAN adalah platform marketplace B2B dengan sistem escrow yang melindungi pembeli dan penjual. Fitur utama:
- Escrow Payment: Dana ditahan sampai barang diterima dan diverifikasi
- AI Verification: Foto bukti penerimaan diverifikasi oleh AI
- Dispute Resolution: Jika ada masalah, tim SALAMAN akan membantu

Cara kerja:
1. Pembeli pilih produk dan checkout
2. Pembayaran masuk ke rekening escrow SALAMAN
3. Supplier kirim barang
4. Pembeli upload foto bukti penerimaan
5. AI verifikasi foto
6. Jika valid, dana dicairkan ke supplier

Jawab pertanyaan user dengan ramah dan helpful dalam Bahasa Indonesia. Jika tidak tahu jawabannya, arahkan ke tim support.`

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }

    const messages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: message }
    ]

    // Try Colossal AI first
    if (COLOSSAL_API_KEY) {
      try {
        const response = await fetch(COLOSSAL_CHAT_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${COLOSSAL_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages,
            max_tokens: 500,
            temperature: 0.7,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          const reply = data.choices?.[0]?.message?.content || 'Maaf, saya tidak bisa menjawab saat ini.'
          return NextResponse.json({ reply })
        }
      } catch (error) {
        console.error('Colossal AI chat error:', error)
      }
    }

    // Fallback to mock responses
    const reply = getMockResponse(message)
    return NextResponse.json({ reply })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


function getMockResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes('escrow') || lowerMessage.includes('aman')) {
    return 'SALAMAN menggunakan sistem escrow untuk melindungi transaksi Anda. Dana pembeli akan ditahan di rekening bersama sampai barang diterima dan diverifikasi. Supplier baru menerima pembayaran setelah pembeli konfirmasi barang sesuai. 🛡️'
  }

  if (lowerMessage.includes('bayar') || lowerMessage.includes('pembayaran')) {
    return 'Anda bisa membayar menggunakan berbagai metode: Transfer Bank, E-Wallet, atau Kartu Kredit melalui Midtrans. Setelah pembayaran berhasil, dana akan ditahan di escrow sampai transaksi selesai. 💳'
  }

  if (lowerMessage.includes('kirim') || lowerMessage.includes('pengiriman')) {
    return 'Setelah pembayaran dikonfirmasi, supplier akan memproses dan mengirim pesanan Anda. Anda akan mendapat nomor resi untuk tracking. Saat barang sampai, upload foto bukti penerimaan untuk verifikasi. 📦'
  }

  if (lowerMessage.includes('verifikasi') || lowerMessage.includes('ai') || lowerMessage.includes('foto')) {
    return 'Sistem AI kami akan memverifikasi foto bukti penerimaan untuk memastikan barang yang diterima sesuai pesanan. Jika verifikasi berhasil (confidence > 70%), dana otomatis dicairkan ke supplier. 🤖'
  }

  if (lowerMessage.includes('dispute') || lowerMessage.includes('masalah') || lowerMessage.includes('komplain')) {
    return 'Jika ada masalah dengan pesanan, sistem akan otomatis membuat dispute. Tim SALAMAN akan review dan membantu menyelesaikan masalah. Dana tetap aman di escrow sampai dispute selesai. ⚖️'
  }

  if (lowerMessage.includes('daftar') || lowerMessage.includes('register')) {
    return 'Untuk mendaftar, klik tombol "Daftar" di halaman utama. Pilih jenis akun (Pembeli atau Supplier), isi data bisnis Anda, dan verifikasi email. Setelah itu Anda bisa langsung bertransaksi! 📝'
  }

  if (lowerMessage.includes('halo') || lowerMessage.includes('hai') || lowerMessage.includes('hi')) {
    return 'Halo! 👋 Saya SALAMAN AI Assistant. Saya bisa membantu Anda dengan pertanyaan seputar marketplace, pembayaran, pengiriman, dan sistem escrow. Ada yang bisa saya bantu?'
  }

  return 'Terima kasih atas pertanyaannya! Untuk informasi lebih lanjut, Anda bisa:\n\n1. Cek halaman FAQ di website\n2. Hubungi tim support kami\n3. Tanyakan hal spesifik tentang escrow, pembayaran, atau pengiriman\n\nAda yang lain yang bisa saya bantu? 😊'
}
