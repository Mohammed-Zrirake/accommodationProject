import React from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Search, Filter, FileText, Download } from 'lucide-react';

const paymentsData = [
  {
    id: 'PAY1234',
    reservationId: 'RES5124',
    client: 'Jean Dupont',
    amount: 950,
    date: '2023-05-02T14:30:00',
    method: 'card',
    status: 'completed',
  },
  {
    id: 'PAY1233',
    reservationId: 'RES5123',
    client: 'Marie Leroy',
    amount: 650,
    date: '2023-04-25T10:15:00',
    method: 'card',
    status: 'completed',
  },
  {
    id: 'PAY1232',
    reservationId: 'RES5122',
    client: 'Paul Martin',
    amount: 260,
    date: '2023-04-20T09:45:00',
    method: 'card',
    status: 'refunded',
  },
  {
    id: 'PAY1231',
    reservationId: 'RES5121',
    client: 'Sophie Bernard',
    amount: 600,
    date: '2023-04-30T16:20:00',
    method: 'transfer',
    status: 'pending',
  },
  {
    id: 'PAY1230',
    reservationId: 'RES5120',
    client: 'Thomas Petit',
    amount: 450,
    date: '2023-04-29T11:10:00',
    method: 'cash',
    status: 'completed',
  },
];

const statusColors = {
  completed: 'bg-emerald-100 text-emerald-800',
  pending: 'bg-amber-100 text-amber-800',
  refunded: 'bg-blue-100 text-blue-800',
  failed: 'bg-rose-100 text-rose-800',
};

const statusLabels = {
  completed: 'Complété',
  pending: 'En attente',
  refunded: 'Remboursé',
  failed: 'Échoué',
};

const methodLabels = {
  card: 'Carte bancaire',
  transfer: 'Virement',
  cash: 'Espèces',
  check: 'Chèque',
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

const Payments: React.FC = () => {
  return (
    <AdminLayout title="Gestion des Paiements">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Total des revenus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34 580 €</div>
            <p className="text-sm text-emerald-600 mt-1">+12% vs mois précédent</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Paiements ce mois</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-sm text-emerald-600 mt-1">+8 vs mois précédent</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Panier moyen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">823 €</div>
            <p className="text-sm text-emerald-600 mt-1">+5% vs mois précédent</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Paiements en attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-sm text-gray-500 mt-1">1 200 € en total</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-3 md:space-y-0">
        <div className="flex items-center w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Rechercher un paiement..." 
              className="pl-10 py-2 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-hotel-600 focus:border-hotel-600 w-full"
            />
          </div>
          <Button variant="outline" size="icon" className="ml-2">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button className="bg-teal-500 hover:bg-teal-600 w-full md:w-auto">
          Enregistrer un paiement
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="completed">Complétés</TabsTrigger>
          <TabsTrigger value="pending">En attente</TabsTrigger>
          <TabsTrigger value="refunded">Remboursés</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="py-4 px-6 font-medium text-gray-500">ID</th>
                      <th className="py-4 px-6 font-medium text-gray-500">Réservation</th>
                      <th className="py-4 px-6 font-medium text-gray-500">Client</th>
                      <th className="py-4 px-6 font-medium text-gray-500">Date</th>
                      <th className="py-4 px-6 font-medium text-gray-500">Méthode</th>
                      <th className="py-4 px-6 font-medium text-gray-500">Statut</th>
                      <th className="py-4 px-6 font-medium text-gray-500 text-right">Montant</th>
                      <th className="py-4 px-6 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentsData.map((payment) => (
                      <tr key={payment.id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="py-4 px-6 text-gray-900">{payment.id}</td>
                        <td className="py-4 px-6 text-gray-900">{payment.reservationId}</td>
                        <td className="py-4 px-6 text-gray-900">{payment.client}</td>
                        <td className="py-4 px-6 text-gray-900">{formatDate(payment.date)}</td>
                        <td className="py-4 px-6 text-gray-900">
                          {methodLabels[payment.method as keyof typeof methodLabels]}
                        </td>
                        <td className="py-4 px-6">
                          <Badge className={statusColors[payment.status as keyof typeof statusColors]} variant="outline">
                            {statusLabels[payment.status as keyof typeof statusLabels]}
                          </Badge>
                        </td>
                        <td className="py-4 px-6 text-gray-900 text-right">{payment.amount.toLocaleString()} €</td>
                        <td className="py-4 px-6">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="h-8">
                              <FileText className="h-3 w-3 mr-1" />
                              Détails
                            </Button>
                            <Button size="sm" variant="outline" className="h-8">
                              <Download className="h-3 w-3 mr-1" />
                              Facture
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
        <TabsContent value="completed" className="mt-6">
          {/* Paiements complétés uniquement */}
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          {/* Paiements en attente uniquement */}
        </TabsContent>

        <TabsContent value="refunded" className="mt-6">
          {/* Paiements remboursés uniquement */}
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default Payments;
