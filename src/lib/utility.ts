export const toDateStr = (date: string): string => {
  return new Date(date).toDateString();
};

export const toCapitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const toCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    roundingMode: 'floor',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const validateInput = (data: any) => {
  if (
    !data.type ||
    !data.date ||
    !data.amount ||
    !data.name ||
    !data.aadhaar ||
    !data.rrn
  ) {
    throw new Error('All fields are required');
  }
  if (data.type === 'transfer' && (!data.creditName || !data.creditAadhaar)) {
    throw new Error("Creditor's details are required for transfer");
  }
  if (data.aadhaar.length !== 4) {
    throw new Error('Aadhaar number should be last 4 digits');
  }
  if (data.type === 'transfer' && data.creditAadhaar.length !== 4) {
    throw new Error("Creditor's Aadhaar number should be last 4 digits");
  }
  if (data.rrn.length !== 12) {
    throw new Error('RRN should be 12 digits');
  }
  if (data.amount <= 0) {
    throw new Error('Amount should be greater than 0');
  }
  if (data.type === 'transfer' && data.creditAadhaar === data.aadhaar) {
    throw new Error('Debit & Credit Aadhaar number should be different');
  }
};
