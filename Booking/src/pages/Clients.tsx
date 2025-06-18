import React from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Search, Plus, Eye, FileText } from 'lucide-react';

const clientsData = [
  {
    id: 'C001',
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    phone: '+33 6 12 34 56 78',
    address: '15 rue des Lilas, 75001 Paris',
    reservations: 5,
    totalSpent: 2450,
    lastStay: '2023-04-15',
    created: '2022-01-15'
  },
  {
    id: 'C002',
    name: 'Marie Leroy',
    email: 'marie.leroy@example.com',
    phone: '+33 6 23 45 67 89',
    address: '25 avenue Victor Hugo, 69002 Lyon',
    reservations: 2,
    totalSpent: 850,
    lastStay: '2023-03-22',
    created: '2022-03-10'
  },
  {
    id: 'C003',
    name: 'Paul Martin',
    email: 'paul.martin@example.com',
    phone: '+33 6 34 56 78 90',
    address: '8 place de la Mairie, 33000 Bordeaux',
    reservations: 1,
    totalSpent: 260,
    lastStay: '2023-02-05',
    created: '2023-01-20'
  },
  {
    id: 'C004',
    name: 'Sophie Bernard',
    email: 'sophie.bernard@example.com',
    phone: '+33 6 45 67 89 01',
    address: '12 rue Pasteur, 13001 Marseille',
    reservations: 3,
    totalSpent: 1850,
    lastStay: '2023-05-02',
    created: '2022-06-08'
  },
  {
    id: 'C005',
    name: 'Thomas Petit',
    email: 'thomas.petit@example.com',
    phone: '+33 6 56 78 90 12',
    address: '5 rue du Commerce, 44000 Nantes',
    reservations: 4,
    totalSpent: 1720,
    lastStay: '2023-04-28',
    created: '2022-02-14'
  },
];

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

const Clients: React.FC = () => {
  return (
    <AdminLayout title="Gestion des Clients">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-3 md:space-y-0">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Rechercher un client..." 
            className="pl-10 py-2 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-hotel-600 focus:border-hotel-600 w-full"
          />
        </div>
        <Button className="bg-teal-500 hover:bg-teal-600 w-full md:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un client
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto rounded-t-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="py-4 px-6 font-medium text-gray-500">ID</th>
                  <th className="py-4 px-6 font-medium text-gray-500">Client</th>
                  <th className="py-4 px-6 font-medium text-gray-500">Contact</th>
                  <th className="py-4 px-6 font-medium text-gray-500">Réservations</th>
                  <th className="py-4 px-6 font-medium text-gray-500">Dépenses</th>
                  <th className="py-4 px-6 font-medium text-gray-500">Dernier séjour</th>
                  <th className="py-4 px-6 font-medium text-gray-500">Client depuis</th>
                  <th className="py-4 px-6 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clientsData.map((client) => (
                  <tr key={client.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-900">{client.id}</td>
                    <td className="py-4 px-6 text-gray-900">{client.name}</td>
                    <td className="py-4 px-6">
                      <div className="text-gray-900">{client.email}</div>
                      <div className="text-gray-500 text-xs">{client.phone}</div>
                    </td>
                    <td className="py-4 px-6 text-gray-900">{client.reservations}</td>
                    <td className="py-4 px-6 text-gray-900">{client.totalSpent.toLocaleString()} €</td>
                    <td className="py-4 px-6 text-gray-900">{formatDate(client.lastStay)}</td>
                    <td className="py-4 px-6 text-gray-900">{formatDate(client.created)}</td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="h-8">
                          <Eye className="h-3 w-3 mr-1" />
                          Détails
                        </Button>
                        <Button size="sm" variant="outline" className="h-8">
                          <FileText className="h-3 w-3 mr-1" />
                          Historique
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
    </AdminLayout>
  );
};

export default Clients;
