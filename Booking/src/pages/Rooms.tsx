import React from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Search, Edit, Trash, Plus } from 'lucide-react';

const roomsData = [
  {
    id: 1,
    number: '101',
    type: 'Standard',
    beds: '1 lit double',
    capacity: 2,
    price: 89,
    status: 'available',
    amenities: ['WiFi', 'TV', 'Salle de bain', 'Climatisation'],
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=300&h=200',
  },
  {
    id: 2,
    number: '102',
    type: 'Deluxe',
    beds: '1 lit king-size',
    capacity: 2,
    price: 129,
    status: 'occupied',
    amenities: ['WiFi', 'TV', 'Salle de bain', 'Climatisation', 'Mini-bar', 'Coffre-fort'],
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=300&h=200',
  },
  {
    id: 3,
    number: '103',
    type: 'Standard',
    beds: '2 lits simples',
    capacity: 2,
    price: 99,
    status: 'cleaning',
    amenities: ['WiFi', 'TV', 'Salle de bain', 'Climatisation'],
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=300&h=200',
  },
  {
    id: 4,
    number: '104',
    type: 'Suite Junior',
    beds: '1 lit king-size',
    capacity: 3,
    price: 179,
    status: 'maintenance',
    amenities: ['WiFi', 'TV', 'Salle de bain', 'Climatisation', 'Mini-bar', 'Coffre-fort', 'Salon'],
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&q=80&w=300&h=200',
  },
  {
    id: 5,
    number: '105',
    type: 'Deluxe',
    beds: '1 lit queen-size',
    capacity: 2,
    price: 139,
    status: 'occupied',
    amenities: ['WiFi', 'TV', 'Salle de bain', 'Climatisation', 'Mini-bar', 'Coffre-fort'],
    image: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&q=80&w=300&h=200',
  },
  {
    id: 6,
    number: '106',
    type: 'Suite Executive',
    beds: '1 lit king-size',
    capacity: 4,
    price: 249,
    status: 'available',
    amenities: ['WiFi', 'TV', 'Salle de bain', 'Climatisation', 'Mini-bar', 'Coffre-fort', 'Salon', 'Balcon'],
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=300&h=200',
  },
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

const Rooms: React.FC = () => {
  return (
    <AdminLayout title="Gestion des Chambres">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Rechercher une chambre..." 
              className="pl-10 py-2 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-hotel-600 focus:border-hotel-600 w-full md:w-64"
            />
          </div>
        </div>
        <Button className="bg-teal-500 hover:bg-teal-600">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une chambre
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="available">Disponibles</TabsTrigger>
          <TabsTrigger value="occupied">Occupées</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roomsData.map((room) => (
              <Card key={room.id}>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={`Chambre ${room.number}`}
                    className="w-full h-full object-cover rounded-t-md"
                  />
                  <Badge className={`absolute top-2 right-2 ${statusColors[room.status as keyof typeof statusColors]}`}>
                    {statusLabels[room.status as keyof typeof statusLabels]}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-medium">Chambre {room.number}</h3>
                      <p className="text-gray-600">{room.type}</p>
                    </div>
                    <span className="text-lg font-semibold">{room.price} €</span>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm text-gray-600">{room.beds} · {room.capacity} personnes</p>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {room.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-100">
                        {amenity}
                      </Badge>
                    ))}
                    {room.amenities.length > 3 && (
                      <Badge variant="outline" className="bg-gray-100">
                        +{room.amenities.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Modifier
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Le contenu des autres onglets serait filtré ici */}
        <TabsContent value="available" className="mt-6">
          {/* Chambres disponibles uniquement */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roomsData.filter(room => room.status === 'available').map((room) => (
              <Card key={room.id}>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={`Chambre ${room.number}`}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-emerald-100 text-emerald-800">
                    Disponible
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-medium">Chambre {room.number}</h3>
                      <p className="text-gray-600">{room.type}</p>
                    </div>
                    <span className="text-lg font-semibold">{room.price} €</span>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm text-gray-600">{room.beds} · {room.capacity} personnes</p>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {room.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-100">
                        {amenity}
                      </Badge>
                    ))}
                    {room.amenities.length > 3 && (
                      <Badge variant="outline" className="bg-gray-100">
                        +{room.amenities.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Modifier
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="occupied" className="mt-6">
          {/* Chambres occupées uniquement */}
        </TabsContent>

        <TabsContent value="maintenance" className="mt-6">
          {/* Chambres en maintenance uniquement */}
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default Rooms;
