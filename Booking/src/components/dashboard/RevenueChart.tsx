import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { name: 'Jan', revenue: 12000 },
  { name: 'Fév', revenue: 11000 },
  { name: 'Mar', revenue: 15000 },
  { name: 'Avr', revenue: 16500 },
  { name: 'Mai', revenue: 14000 },
  { name: 'Juin', revenue: 17000 },
  { name: 'Juil', revenue: 25000 },
  { name: 'Août', revenue: 28000 },
  { name: 'Sept', revenue: 20000 },
  { name: 'Oct', revenue: 18000 },
  { name: 'Nov', revenue: 15500 },
  { name: 'Déc', revenue: 22000 },
];

const RevenueChart: React.FC = () => {
  const formatRevenue = (value: number) => {
    return `${value.toLocaleString()} €`;
  };

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Revenus mensuels (€)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={revenueData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatRevenue} />
              <Tooltip 
                formatter={(value: number) => [`${value.toLocaleString()} €`, 'Revenu']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.375rem',
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#1A365D"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
