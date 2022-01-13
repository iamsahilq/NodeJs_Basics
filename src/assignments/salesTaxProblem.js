const salesTaxRate = 10;
const importTaxRate = 5;

const categories = {
  Book: { exempt: true },
  Food: { exempt: true },
  Medical: { exempt: true },
  Other: { exempt: false },
};

// Example baskets
// const basket = [
//   {
//     "name": "book",
//     "category": "Book",
//     "qty": 1,
//     "imported": false,
//     "shelfPrice": 12.49
//   },
//   {
//     "name": "music CD",
//     "category": "Other",
//     "qty": 1,
//     "imported": false,
//     "shelfPrice": 14.99
//   },
//   {
//     "name": "chocolate bar",
//     "category": "Food",
//     "qty": 1,
//     "imported": false,
//     "shelfPrice": 0.85
//   }
// ];

// const basket2 = [
//   {
//     "name": "Perfume",
//     "category": "Other",
//     "qty": 1,
//     "imported": true,
//     "shelfPrice": 47.5
//   },
//   {
//     "name": "chocolate bar",
//     "category": "Food",
//     "qty": 1,
//     "imported": true,
//     "shelfPrice": 10
//   }
// ];

// const basket3 = [
//   {
//     "name": "Perfume",
//     "category": "Other",
//     "qty": 1,
//     "imported": true,
//     "shelfPrice": 27.99
//   },
//   {
//     "name": "Perfume",
//     "category": "Other",
//     "qty": 1,
//     "imported": false,
//     "shelfPrice": 18.99
//   },
//   {
//     "name": "headache pills",
//     "category": "Medical",
//     "qty": 1,
//     "imported": false,
//     "shelfPrice": 9.75
//   },
//   {
//     "name": "chocolate bar",
//     "category": "Food",
//     "qty": 1,
//     "imported": true,
//     "shelfPrice": 11.25
//   }
// ]
const roundTax = (num) => (Math.ceil((num) * 20) / 20).toFixed(2);

const calculateSalesTax = (price, category, qty = 1) => {
  if (categories[category].exempt) return 0;
  const txAmt = ((salesTaxRate * price) / 100) * qty;
  const roundedVal = Number(roundTax((txAmt)));
  return roundedVal;
};

const calculateImportTax = (price, qty = 1) => {
  const txAmt = ((importTaxRate * price) / 100) * qty;
  const roundedVal = Number(roundTax((txAmt)));
  return roundedVal;
};

const calculateTax = (item) => {
  const salesTax = calculateSalesTax(item.shelfPrice, item.category, item.qty);
  let importTax = 0;
  if (item.imported) {
    importTax = calculateImportTax(item.shelfPrice, item.qty);
  }
  const totalTaxOnItem = (salesTax + importTax);
  const itemAmount = (item.shelfPrice + totalTaxOnItem);
  return {
    salesTax, importTax, totalTaxOnItem, itemAmount,
  };
};

const generateReceipt = (items = []) => {
  if (!Array.isArray(items)) {
    const error = new Error('Invalid basket');
    error.message = 'Invalid basket';
    error.status = 400;
    throw error;
  }
  let totalAmt = 0;
  let totalTax = 0;
  const receipt = [];
  items.forEach((item) => {
    const {
      salesTax = 0, importTax = 0, totalTaxOnItem = 0, itemAmount = 0,
    } = calculateTax(item);
    totalAmt += itemAmount;
    totalTax += totalTaxOnItem;
    receipt.push({
      ...item, salesTax, importTax, totalTaxOnItem, itemAmount,
    });
  });
  receipt.push({ 'Total Amount': (totalAmt).toFixed(2), 'Total Tax': (totalTax).toFixed(2) });
  return receipt;
};

export default generateReceipt;
