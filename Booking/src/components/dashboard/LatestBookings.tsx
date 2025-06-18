import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

type Reservation = {
  id: string;
  client: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  amount: number;
};

const bookings: Reservation[] = [
  { id: 'RES5124', client: 'Jean Dupont', room: 'Suite 201', checkIn: '10/05/2023', checkOut: '15/05/2023', status: 'confirmed', amount: 950 },
  { id: 'RES5123', client: 'Marie Leroy', room: 'Chambre Deluxe 105', checkIn: '08/05/2023', checkOut: '12/05/2023', status: 'confirmed', amount: 650 },
  { id: 'RES5122', client: 'Paul Martin', room: 'Chambre Standard 304', checkIn: '05/05/2023', checkOut: '07/05/2023', status: 'cancelled', amount: 260 },
  { id: 'RES5121', client: 'Sophie Bernard', room: 'Suite Executive 401', checkIn: '12/05/2023', checkOut: '18/05/2023', status: 'pending', amount: 1850 },
  { id: 'RES5120', client: 'Thomas Petit', room: 'Chambre Deluxe 110', checkIn: '14/05/2023', checkOut: '16/05/2023', status: 'confirmed', amount: 450 },
];

const statusColors = {
  confirmed: 'bg-emerald-100 text-emerald-800',
  pending: 'bg-amber-100 text-amber-800',
  cancelled: 'bg-rose-100 text-rose-800',
};

const statusLabels = {
  confirmed: 'Confirmée',
  pending: 'En attente',
  cancelled: 'Annulée',
};

const LatestBookings: React.FC = () => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Dernières réservations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="pb-3 font-medium text-gray-500">ID</th>
                <th className="pb-3 font-medium text-gray-500">Client</th>
                <th className="pb-3 font-medium text-gray-500">Chambre</th>
                <th className="pb-3 font-medium text-gray-500">Arrivée</th>
                <th className="pb-3 font-medium text-gray-500">Départ</th>
                <th className="pb-3 font-medium text-gray-500">Statut</th>
                <th className="pb-3 font-medium text-gray-500 text-right">Montant</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 text-gray-900">{booking.id}</td>
                  <td className="py-3 text-gray-900">{booking.client}</td>
                  <td className="py-3 text-gray-900">{booking.room}</td>
                  <td className="py-3 text-gray-900">{booking.checkIn}</td>
                  <td className="py-3 text-gray-900">{booking.checkOut}</td>
                  <td className="py-3">
                    <Badge className={statusColors[booking.status]} variant="outline">
                      {statusLabels[booking.status]}
                    </Badge>
                  </td>
                  <td className="py-3 text-gray-900 text-right">{booking.amount.toLocaleString()} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LatestBookings;
