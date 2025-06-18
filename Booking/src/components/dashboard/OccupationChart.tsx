import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const occupationData = [
  { name: 'Jan', occupation: 65 },
  { name: 'Fév', occupation: 59 },
  { name: 'Mar', occupation: 80 },
  { name: 'Avr', occupation: 81 },
  { name: 'Mai', occupation: 56 },
  { name: 'Juin', occupation: 55 },
  { name: 'Juil', occupation: 90 },
  { name: 'Août', occupation: 95 },
  { name: 'Sept', occupation: 75 },
  { name: 'Oct', occupation: 67 },
  { name: 'Nov', occupation: 72 },
  { name: 'Déc', occupation: 85 },
];

const OccupationChart: React.FC = () => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Taux d'occupation mensuel (%)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={occupationData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.375rem',
                }}
              />
              <Bar dataKey="occupation" fill="#2C7A7B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default OccupationChart;
