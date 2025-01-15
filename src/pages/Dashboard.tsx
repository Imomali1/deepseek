import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock data for sales, products, employees, and transactions
const salesData = {
  daily: 1200,
  weekly: 8500,
  monthly: 35000,
  yearly: 420000,
};

const lowStockProducts = [
  { id: 1, name: "Silk Tie", stock: 5 },
  { id: 2, name: "Leather Oxfords", stock: 3 },
  { id: 3, name: "Wool Blazer", stock: 2 },
];

const bestSellingProducts = [
  { id: 1, name: "Cashmere Sweater", sales: 120 },
  { id: 2, name: "Fountain Pen", sales: 95 },
  { id: 3, name: "Leather Briefcase", sales: 80 },
  { id: 4, name: "Silk Tie", sales: 75 },
  { id: 5, name: "Wool Blazer", sales: 60 },
];

const bestEmployees = [
  { id: 1, name: "John Doe", sales: 15000 },
  { id: 2, name: "Jane Smith", sales: 12000 },
  { id: 3, name: "Alice Johnson", sales: 10000 },
];

// Mock data for transactions
const transactions = [
  { id: 1, date: "2023-10-01", product: "Cashmere Sweater", amount: 120, status: "Completed" },
  { id: 2, date: "2023-10-02", product: "Leather Briefcase", amount: 250, status: "Pending" },
  { id: 3, date: "2023-10-03", product: "Silk Tie", amount: 50, status: "Completed" },
  { id: 4, date: "2023-10-04", product: "Wool Blazer", amount: 300, status: "Failed" },
  { id: 5, date: "2023-10-05", product: "Fountain Pen", amount: 80, status: "Completed" },
];

// Data for the sales trend chart
const salesTrendData = [
  { period: "Jan", sales: 3000 },
  { period: "Feb", sales: 4500 },
  { period: "Mar", sales: 6000 },
  { period: "Apr", sales: 8000 },
  { period: "May", sales: 7000 },
  { period: "Jun", sales: 9000 },
  { period: "Jul", sales: 10000 },
  { period: "Aug", sales: 12000 },
  { period: "Sep", sales: 11000 },
  { period: "Oct", sales: 13000 },
  { period: "Nov", sales: 14000 },
  { period: "Dec", sales: 15000 },
];

const Dashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Sales Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Daily Sales</h2>
          <p className="text-2xl font-bold text-gray-900">${salesData.daily.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Weekly Sales</h2>
          <p className="text-2xl font-bold text-gray-900">${salesData.weekly.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Monthly Sales</h2>
          <p className="text-2xl font-bold text-gray-900">${salesData.monthly.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Yearly Sales</h2>
          <p className="text-2xl font-bold text-gray-900">${salesData.yearly.toLocaleString()}</p>
        </div>
      </div>

      {/* Sales Trend Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Sales Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesTrendData}>
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Transactions */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Transaction ID</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border">
                <td className="p-2 border">{transaction.id}</td>
                <td className="p-2 border">{transaction.date}</td>
                <td className="p-2 border">{transaction.product}</td>
                <td className="p-2 border">${transaction.amount}</td>
                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded ${
                      transaction.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : transaction.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Low Stock Alerts */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Low Stock Alerts</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Product Name</th>
              <th className="p-2 border">Stock</th>
            </tr>
          </thead>
          <tbody>
            {lowStockProducts.map((product) => (
              <tr key={product.id} className="border">
                <td className="p-2 border">{product.name}</td>
                <td className="p-2 border text-red-600">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Best-Selling Products */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Best-Selling Products</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Product Name</th>
              <th className="p-2 border">Sales</th>
            </tr>
          </thead>
          <tbody>
            {bestSellingProducts.map((product) => (
              <tr key={product.id} className="border">
                <td className="p-2 border">{product.name}</td>
                <td className="p-2 border">{product.sales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Best Employees */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Best Employees</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Employee Name</th>
              <th className="p-2 border">Sales</th>
            </tr>
          </thead>
          <tbody>
            {bestEmployees.map((employee) => (
              <tr key={employee.id} className="border">
                <td className="p-2 border">{employee.name}</td>
                <td className="p-2 border">${employee.sales.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;