
import React from 'react';
import { Card } from '../ui/card';

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string | number;
    positive: boolean;
  };
  subtitle?: string;
};

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  subtitle
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-3xl font-semibold">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {change && (
            <div className="mt-2 flex items-center">
              <div className={`inline-flex items-center ${change.positive ? 'text-emerald-500' : 'text-rose-500'}`}>
                <span>
                  {change.positive ? '↑' : '↓'} {change.value}
                </span>
              </div>
              <span className="text-sm text-gray-500 ml-2">vs mois précédent</span>
            </div>
          )}
        </div>
        <div className="bg-hotel-50 rounded-lg p-3">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
