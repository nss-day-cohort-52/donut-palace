import { getEmployees, getOrders, getProducts } from "./database.js";

const ordersArray = getOrders()
const productsArray = getProducts()
const employeeArray = getEmployees()


const maxGrossProduct = (orders) => {}


const orderSum = (orders) => {
    // Iterate the order and add up the totals
    let grandTotal = 0
    for (const order of orders) {
        grandTotal += order.total
    }

    return grandTotal
}
const ordersByProduct = (orders, productId) => {
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
        employeeProfitTracker[order.employeeId] += order.total
    }

    const answer = Object.keys(employeeProfitTracker).reduce((a, b) => employeeProfitTracker[a] > employeeProfitTracker[b] ? a : b)
    // "5"

    for (const employee of employees) {
        if (employee.id === parseInt(answer)) {
            return employee
        }
    }

}

// Get all orders for a month
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

const salesByEmployee = (orders, employeeId) => {
    let sales = 0

    for (const order of orders) {
        if (order.employeeId === employeeId) {
            sales += order.total
        }
    }
    return sales
}

/*
    Top salesperson for this month
*/
const ordersForThisMonth = monthlyOrders(ordersArray, 5, 2021)
const topDogForThisMonth = topSalesperson(ordersForThisMonth, employeeArray)
const topDogSales = salesByEmployee(ordersForThisMonth, topDogForThisMonth.id)
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
const avocadoTotal = ordersByProduct(ordersArray, 3)
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








/*
    Top salesperson for last month
*/


/*
    Milk chocolate donuts sold in a particular month
*/


/*
    Total profit for milk chocolate donuts sold in a particular month
*/


/*
    Top grossing product for January
*/
