# NodeJs_Basics

## Scripts

**npm run start**

### **End Points**

**_/empDetails/:id'_**

Fetch employee data from "http://dummy.restapiexample.com/api/v1/employee" for given id and saves it in a txt file in /output directory.


**_/salesTax/'_**

Takes an array of basket elements and process them for Tax calculation.

Categories: [Book, Medical, Food, Other].


Expected Request : 
`
*{
    "basket": [
        {
            "name": "book",
            "category": "Book",
            "qty": 1,
            "imported": false,
            "shelfPrice": 12.49
        },
        {
            "name": "music CD",
            "category": "Other",
            "qty": 1,
            "imported": false,
            "shelfPrice": 14.99
        },
        {
            "name": "chocolate bar",
            "category": "Food",
            "qty": 1,
            "imported": false,
            "shelfPrice": 0.85
        }
    ]
}*
`

Expected Response: 
`
*[
    {
        "name": "book",
        "category": "Book",
        "qty": 1,
        "imported": false,
        "shelfPrice": 12.49,
        "salesTax": 0,
        "importTax": 0,
        "totalTaxOnItem": 0,
        "itemAmount": 12.49
    },
    {
        "name": "music CD",
        "category": "Other",
        "qty": 1,
        "imported": false,
        "shelfPrice": 14.99,
        "salesTax": 1.5,
        "importTax": 0,
        "totalTaxOnItem": 1.5,
        "itemAmount": 16.490000000000002
    },
    {
        "name": "chocolate bar",
        "category": "Food",
        "qty": 1,
        "imported": false,
        "shelfPrice": 0.85,
        "salesTax": 0,
        "importTax": 0,
        "totalTaxOnItem": 0,
        "itemAmount": 0.85
    },
    {
        "Total Amount": "29.83",
        "Total Tax": "1.50"
    }
]*
`
