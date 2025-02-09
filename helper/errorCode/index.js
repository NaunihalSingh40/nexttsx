export const getErrorMessageFromErrorCode = (errorCode) => {
  const errorMessages = {
    10002: 'Invalid City Code',
    30001: 'Provider not found',
    30002: 'Provider location not found',
    30003: 'Provider category not found',
    30004: 'Item not found',
    30005: 'Invalid return request',
    30008: 'Pickup location not serviceable by Logistics Provider',
    30009: 'Selected location is not serviceable',
    30010: 'Delivery distance exceeds the maximum serviceability distance',
    30011: 'Delivery Partners not available',
    30012: 'Cancellation reason is invalid',
    30013: 'Invalid Fulfillment TAT',
    30014: 'Cancellation unacceptable',
    30016: 'Invalid Signature',
    30017: 'Merchant is currently not taking orders',
    30018: 'Order not found',
    30019: 'Seller App is unable to confirm the order',
    30020: 'Order Confirm Failure',
    30021: 'Merchant is inactive',
    30023: 'Cart value is less than minimum order value',
    31001: 'Cannot process request due to internal error, please retry',
    31002: 'Order validation failure',
    31003: 'Order processing in progress',
    40002: 'Item out of stock',
    40004: 'Payment type not supported',
    40005: 'racking not enabled',
    40006: 'Fulfillment agent unavailable',
    40007: 'Change in item quantity',
    40008: 'Change in quote',
    40009: 'Maximum order qty exceeded',
    41001: 'Buyer finder fee is not acceptable',
    50001: 'Cancellation not possible',
    50002: 'Updation not possible',
    50006: 'Order terminated',
  }

  return errorMessages[errorCode] || 'An error occurred. Please try again later.'
}
