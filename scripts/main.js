import { getEmployees, getOrders, getProducts } from "./database.js";


const productsArray = getProducts()
const employeeArray = getEmployees()
const ordersArray = getOrders()

const orderSum = (orders) => {
    // Iterate the order and add up the totals
    let grandTotal = 0
    for (const order of orders) {
        grandTotal += order.total
    }

    return grandTotal
}
const revenueByProduct = (orders, productId) => {
    let totalOfProduct = 0

    for (const order of orders) {
        if (order.productId === productId) {
            totalOfProduct += order.total
        }
    }
    return totalOfProduct
}
const topSalesperson = (orders, employees) => {
    let employeeProfitTracker = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0
    }

    for (const order of orders) {
        // Using square bracket notation to access a property value
        employeeProfitTracker[order.employeeId] += order.total
    }

    const answer = Object.keys(employeeProfitTracker).reduce((a, b) => employeeProfitTracker[a] > employeeProfitTracker[b] ? a : b)

    for (const employee of employees) {
        if (employee.id === parseInt(answer)) {
            return employee
        }
    }

}
const monthlyOrders = (orders, month, year) => {
    const thisMonthsOrders = []

    for (const order of orders) {
        // Check if date_of_sale is for month/year parameters
        const date = new Date(order.date_of_sale)
        const orderMonth = date.getMonth() + 1
        const orderYear = date.getFullYear()

        if (orderMonth === month && orderYear === year) {
            thisMonthsOrders.push(order)
        }

    }

    return thisMonthsOrders
}
const revenueByEmployee = (orders, employeeId) => {
    let sales = 0

    for (const order of orders) {
        if (order.employeeId === employeeId) {
            sales += order.total
        }
    }
    return sales
}
const getProductId = (products, nameOfProduct) => {
    for (const product of products) {
        if (product.name === nameOfProduct) {
            return product.id
        }
    }
}
const orderCountByProduct = (orders, productId) => {
    let count = 0

    for (const order of orders) {
        if (productId === order.productId) {
            count += 1
        }
    }

    return count
}

/*
    Vocabulary term to remember and learn about...
    MEMOIZATION
*/
const topProduct = (orders, products) => {
    let productProfitTracker = { }

    for (const order of orders) {
        if (productProfitTracker[order.productId]) {
            productProfitTracker[order.productId] += order.total
        }
        else {
            productProfitTracker[order.productId] = order.total
        }
    }

    const answer = Object.keys(productProfitTracker).reduce((a, b) => productProfitTracker[a] > productProfitTracker[b] ? a : b)

    for (const product of products) {
        if (product.id === parseInt(answer)) {
            return product
        }
    }
}

/*
    Highest revenue product of all time
*/
const topDogProduct = topProduct(ordersArray, productsArray)
console.log(`Our top selling product of all time is ${topDogProduct.name}`)

/*
    Total profit for milk chocolate donuts sold in a particular month
*/
const productToFind = "Milk Chocolate"
const productId = getProductId(productsArray, productToFind)


const april2021Orders = monthlyOrders(ordersArray, 4, 2021)
const milkChocolateRevenueInApril = revenueByProduct(april2021Orders, productId)
console.log(`We sold ${milkChocolateRevenueInApril.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })} in revenue in April for Milk Chocolate`)


/*
    Number of milk chocolate donuts sold in a particular month
*/

// Filter all order to just the ones in December of 2020
const december2020Orders = monthlyOrders(ordersArray, 12, 2020)

const milkChocolateCount = orderCountByProduct(december2020Orders, productId)
console.log(`We have sold ${milkChocolateCount} of ${productToFind} in December of 2020`)























/*
    Top salesperson for this month
*/
const ordersForThisMonth = monthlyOrders(ordersArray, 5, 2021)
const topDogForThisMonth = topSalesperson(ordersForThisMonth, employeeArray)
const topDogSales = revenueByEmployee(ordersForThisMonth, topDogForThisMonth.id)
console.log(`Top salesperson for May is ${topDogForThisMonth.firstName} ${topDogForThisMonth.lastName}: ${topDogSales.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })}`)


/*
    Top salesperson of all time
*/
const topDog = topSalesperson(ordersArray, employeeArray)
console.log(`The top salesperson of all time is ${topDog.firstName} ${topDog.lastName}`)


/*
    Total receipts for avocado donuts (all time)
*/
const avocadoTotal = revenueByProduct(ordersArray, 3)
console.log(`Total avocado sales is ${avocadoTotal.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })}`)


/*
    Total receipts for all time
*/
const totalReceipts = orderSum(ordersArray)
console.log(`Total sales of all time is ${totalReceipts.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })}`)

