import React from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import StatsCard from '../components/dashboard/StatsCard';
import { Hotel, CalendarCheck, Users, DollarSign } from 'lucide-react';
import RoomTypeDistribution from '../components/dashboard/RoomTypeDistribution';
import OccupationChart from '../components/dashboard/OccupationChart';
import RevenueChart from '../components/dashboard/RevenueChart';
import RoomStatus from '../components/dashboard/RoomStatus';
import LatestBookings from '../components/dashboard/LatestBookings';

const Dashboard: React.FC = () => {
  return (
    <AdminLayout title="Tableau de bord">
      <div className="grid grid-cols-1 md:grid-cols-2 custom-grid-4 gap-6 mb-6">
        <StatsCard 
          title="Chambres occupées" 
          value="42/54" 
          icon={<Hotel className="h-6 w-6 text-hotel-800" />}
          change={{ value: '+5%', positive: true }}
          subtitle="Taux d'occupation: 78%"
        />
        <StatsCard 
          title="Réservations du jour" 
          value="8" 
          icon={<CalendarCheck className="h-6 w-6 text-hotel-800" />}
          change={{ value: '+2', positive: true }}
        />
        <StatsCard 
          title="Nouveaux clients" 
          value="24" 
          icon={<Users className="h-6 w-6 text-hotel-800" />}
          change={{ value: '-8%', positive: false }}
          subtitle="Cette semaine"
        />
        <StatsCard 
          title="Revenu journalier" 
          value="3 450 €" 
          icon={<DollarSign className="h-6 w-6 text-hotel-800" />}
          change={{ value: '+12%', positive: true }}
        />
      </div>

       <div className="grid grid-cols-1 custom-grid-2  gap-6 mb-6">
        <OccupationChart />
        <RoomTypeDistribution />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <RevenueChart />
        <RoomStatus />
      </div>

            <div className="grid grid-cols-1 gap-6">
                <LatestBookings />
            </div> 
      
    </AdminLayout>
  );
};

export default Dashboard;
