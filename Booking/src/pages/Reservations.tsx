import React from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Search, Filter, Check, X } from 'lucide-react';

const reservationsData = [
  {
    id: 'RES5124',
    client: {
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      phone: '+33 6 12 34 56 78'
    },
    room: { number: '201', type: 'Suite Junior' },
    checkIn: '2023-05-10',
    checkOut: '2023-05-15',
    status: 'confirmed',
    amount: 950,
    paymentStatus: 'paid',
    guests: 2,
    created: '2023-04-25T14:30:00'
  },
  {
    id: 'RES5123',
    client: {
      name: 'Marie Leroy',
      email: 'marie.leroy@example.com',
      phone: '+33 6 23 45 67 89'
    },
    room: { number: '105', type: 'Chambre Deluxe' },
    checkIn: '2023-05-08',
    checkOut: '2023-05-12',
    status: 'confirmed',
    amount: 650,
    paymentStatus: 'paid',
    guests: 2,
    created: '2023-04-20T10:15:00'
  },
  {
    id: 'RES5122',
    client: {
      name: 'Paul Martin',
      email: 'paul.martin@example.com',
      phone: '+33 6 34 56 78 90'
    },
    room: { number: '304', type: 'Chambre Standard' },
    checkIn: '2023-05-05',
    checkOut: '2023-05-07',
    status: 'cancelled',
    amount: 260,
    paymentStatus: 'refunded',
    guests: 1,
    created: '2023-04-18T09:45:00'
  },
  {
    id: 'RES5121',
    client: {
      name: 'Sophie Bernard',
      email: 'sophie.bernard@example.com',
      phone: '+33 6 45 67 89 01'
    },
    room: { number: '401', type: 'Suite Executive' },
    checkIn: '2023-05-12',
    checkOut: '2023-05-18',
    status: 'pending',
    amount: 1850,
    paymentStatus: 'unpaid',
    guests: 3,
    created: '2023-04-30T16:20:00'
  },
  {
    id: 'RES5120',
    client: {
      name: 'Thomas Petit',
      email: 'thomas.petit@example.com',
      phone: '+33 6 56 78 90 12'
    },
    room: { number: '110', type: 'Chambre Deluxe' },
    checkIn: '2023-05-14',
    checkOut: '2023-05-16',
    status: 'confirmed',
    amount: 450,
    paymentStatus: 'paid',
    guests: 2,
    created: '2023-04-29T11:10:00'
  },
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

const paymentStatusColors = {
  paid: 'bg-emerald-100 text-emerald-800',
  unpaid: 'bg-amber-100 text-amber-800',
  refunded: 'bg-blue-100 text-blue-800',
};

const paymentStatusLabels = {
  paid: 'Payé',
  unpaid: 'Non payé',
  refunded: 'Remboursé',
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

const Reservations: React.FC = () => {
  return (
    <AdminLayout title="Gestion des Réservations">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-3 md:space-y-0">
        <div className="flex items-center w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Rechercher une réservation..." 
              className="pl-10 py-2 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-hotel-600 focus:border-hotel-600 w-full"
            />
          </div>
          <Button variant="outline" size="icon" className="ml-2">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button className="bg-teal-500 hover:bg-teal-600 w-full md:w-auto">
          Nouvelle réservation
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmées</TabsTrigger>
          <TabsTrigger value="pending">En attente</TabsTrigger>
          <TabsTrigger value="cancelled">Annulées</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto rounded-t-lg w-full">
                <table className="text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="py-4 px-6 font-medium text-gray-500">ID</th>
                      <th className="py-4 px-6 font-medium text-gray-500">Client</th>
                      <th className="py-4 px-6 font-medium text-gray-500">Chambre</th>
                      <th className="py-4 px-6 font-medium text-gray-500">Arrivée</th>
                      <th className="py-4 px-6 font-medium text-gray-500">Départ</th>
                      <th className="py-4 px-6 font-medium text-gray-500">Statut</th>
                      <th className="py-4 px-6 font-medium text-gray-500">Paiement</th>
                      <th className="py-4 px-6 font-medium text-gray-500 text-right">Montant</th>
                      <th className="py-4 px-6 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservationsData.map((reservation) => (
                      <tr key={reservation.id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="py-4 px-6 text-gray-900">{reservation.id}</td>
                        <td className="py-4 px-6">
                          <div className="text-gray-900">{reservation.client.name}</div>
                          <div className="text-gray-500 text-xs">{reservation.client.email}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-gray-900">{reservation.room.number}</div>
                          <div className="text-gray-500 text-xs">{reservation.room.type}</div>
                        </td>
                        <td className="py-4 px-6 text-gray-900">{formatDate(reservation.checkIn)}</td>
                        <td className="py-4 px-6 text-gray-900">{formatDate(reservation.checkOut)}</td>
                        <td className="py-4 px-6">
                          <Badge className={statusColors[reservation.status as keyof typeof statusColors]} variant="outline">
                            {statusLabels[reservation.status as keyof typeof statusLabels]}
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          <Badge className={paymentStatusColors[reservation.paymentStatus as keyof typeof paymentStatusColors]} variant="outline">
                            {paymentStatusLabels[reservation.paymentStatus as keyof typeof paymentStatusLabels]}
                          </Badge>
                        </td>
                        <td className="py-4 px-6 text-gray-900 text-right">{reservation.amount.toLocaleString()} €</td>
                        <td className="py-4 px-6">
                          <div className="flex space-x-2">
                            {reservation.status === 'pending' && (
                              <>
                                <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 h-8 w-8 p-0">
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-rose-200 text-rose-500 hover:bg-rose-50">
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            <Button size="sm" variant="outline" className="h-8">
                              Voir
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Le contenu des autres onglets serait filtré ici */}
        <TabsContent value="confirmed" className="mt-6">
          {/* Réservations confirmées uniquement */}
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          {/* Réservations en attente uniquement */}
        </TabsContent>

        <TabsContent value="cancelled" className="mt-6">
          {/* Réservations annulées uniquement */}
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default Reservations;
