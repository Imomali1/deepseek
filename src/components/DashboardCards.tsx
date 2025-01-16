import { SparklesIcon } from 'lucide-react';
import React from 'react';

const DashboardCards: React.FC = () => {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">Total Sales</h2>
        <p className="mt-2 text-3xl font-bold text-gray-900">$12,345</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">Total Orders</h2>
        <p className="mt-2 text-3xl font-bold text-gray-900">123</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">Total Customers</h2>
        <p className="mt-2 text-3xl font-bold text-gray-900">45</p>
      </div>
    </div>
  );
};

export default DashboardCards;