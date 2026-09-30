/**
 * Servicio de Procesamiento de Pagos para DREAMS D&N
 * Compatible con arquitecturas de Stripe y Mercado Pago.
 */

export const CARD_BRANDS = {
  VISA: { name: 'Visa', icon: 'visa', pattern: /^4/ },
  MASTERCARD: { name: 'Mastercard', icon: 'mastercard', pattern: /^(5[1-5]|2[2-7])/ },
  AMEX: { name: 'American Express', icon: 'amex', pattern: /^3[47]/ },
  DINERS: { name: 'Diners Club', icon: 'diners', pattern: /^3(?:0[0-5]|[68])/ },
  UNKNOWN: { name: 'Tarjeta de Crédito / Débito', icon: 'credit-card', pattern: /.*/ }
}

export const detectCardBrand = (cardNumber) => {
  const cleanNumber = cardNumber.replace(/\D/g, '')
  if (CARD_BRANDS.VISA.pattern.test(cleanNumber)) return CARD_BRANDS.VISA
  if (CARD_BRANDS.MASTERCARD.pattern.test(cleanNumber)) return CARD_BRANDS.MASTERCARD
  if (CARD_BRANDS.AMEX.pattern.test(cleanNumber)) return CARD_BRANDS.AMEX
  if (CARD_BRANDS.DINERS.pattern.test(cleanNumber)) return CARD_BRANDS.DINERS
  return CARD_BRANDS.UNKNOWN
}

// Validación de número de tarjeta mediante Algoritmo de Luhn
export const validateLuhn = (cardNumber) => {
  const cleanNumber = cardNumber.replace(/\D/g, '')
  if (cleanNumber.length < 13 || cleanNumber.length > 19) return false

  let sum = 0
  let shouldDouble = false

  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i), 10)

    if (shouldDouble) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    shouldDouble = !shouldDouble
  }

  return sum % 10 === 0
}

// Formateador de número de tarjeta con espacios cada 4 dígitos
export const formatCardNumber = (value) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  const matches = v.match(/\d{4,16}/g)
  const match = (matches && matches[0]) || ''
  const parts = []

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }

  if (parts.length) {
    return parts.join(' ')
  } else {
    return value
  }
}

// Formateador de fecha de expiración MM/AA
export const formatExpiry = (value) => {
  const clean = value.replace(/\D/g, '')
  if (clean.length >= 2) {
    return `${clean.slice(0, 2)}/${clean.slice(2, 4)}`
  }
  return clean
}

export const paymentService = {
  /**
   * Procesa el pago de forma segura
   * En producción: este método envía un token seguro al backend que llama a Stripe / Mercado Pago API
   */
  async processCardPayment({
    gateway = 'stripe', // 'stripe' | 'mercadopago'
    cardData,
    amount,
    currency = 'COP',
    customer
  }) {
    // Validaciones preventivas
    const cleanNumber = cardData.number.replace(/\s+/g, '')
    if (!cleanNumber || cleanNumber.length < 13) {
      throw new Error('El número de tarjeta no es válido.')
    }

    const [expMonth, expYear] = cardData.expiry.split('/')
    const currentYear = new Date().getFullYear() % 100
    const currentMonth = new Date().getMonth() + 1

    if (!expMonth || !expYear || parseInt(expMonth) > 12 || parseInt(expMonth) < 1) {
      throw new Error('Fecha de expiración inválida.')
    }

    if (parseInt(expYear) < currentYear || (parseInt(expYear) === currentYear && parseInt(expMonth) < currentMonth)) {
      throw new Error('La tarjeta se encuentra expirada.')
    }

    if (!cardData.cvv || cardData.cvv.length < 3) {
      throw new Error('Código de seguridad (CVV) inválido.')
    }

    // Simulación de red y tokenización segura en la pasarela
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Token simulado (ej: tok_1Ni345... o mp_token_982...)
    const token = gateway === 'mercadopago' 
      ? `mp_tok_${Math.random().toString(36).substring(2, 15)}`
      : `tok_${Math.random().toString(36).substring(2, 15)}`

    const transactionId = `txn_${Date.now()}_${Math.floor(Math.random() * 10000)}`

    return {
      status: 'approved',
      transactionId,
      gateway,
      cardBrand: detectCardBrand(cardData.number).name,
      last4: cleanNumber.slice(-4),
      token,
      installments: cardData.installments || 1,
      timestamp: new Date().toISOString()
    }
  }
}
