import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

type Room = {
  number: string;
  type: string;
  status: 'available' | 'occupied' | 'cleaning' | 'maintenance';
  guest?: string;
  checkOut?: string;
};

const rooms: Room[] = [
  { number: '101', type: 'Standard', status: 'available' },
  { number: '102', type: 'Deluxe', status: 'occupied', guest: 'Jean Dupont', checkOut: '15/05/2023' },
  { number: '103', type: 'Standard', status: 'cleaning' },
  { number: '104', type: 'Suite', status: 'maintenance' },
  { number: '105', type: 'Deluxe', status: 'occupied', guest: 'Marie Leroy', checkOut: '12/05/2023' },
  { number: '106', type: 'Standard', status: 'available' },
];

const statusColors = {
  available: 'bg-emerald-100 text-emerald-800',
  occupied: 'bg-rose-100 text-rose-800',
  cleaning: 'bg-amber-100 text-amber-800',
  maintenance: 'bg-blue-100 text-blue-800',
};

const statusLabels = {
  available: 'Disponible',
  occupied: 'Occupée',
  cleaning: 'Nettoyage',
  maintenance: 'Maintenance',
};

const RoomStatus: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">État des chambres</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="pb-3 font-medium text-gray-500">N°</th>
                <th className="pb-3 font-medium text-gray-500">Type</th>
                <th className="pb-3 font-medium text-gray-500">Statut</th>
                <th className="pb-3 font-medium text-gray-500">Client</th>
                <th className="pb-3 font-medium text-gray-500">Départ</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.number} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 text-gray-900">{room.number}</td>
                  <td className="py-3 text-gray-900">{room.type}</td>
                  <td className="py-3">
                    <Badge className={statusColors[room.status]} variant="outline">
                      {statusLabels[room.status]}
                    </Badge>
                  </td>
                  <td className="py-3 text-gray-900">{room.guest || '-'}</td>
                  <td className="py-3 text-gray-900">{room.checkOut || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomStatus;
