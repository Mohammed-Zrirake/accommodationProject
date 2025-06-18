// Make sure you do NOT import BrowserRouter here
import { Routes, Route } from 'react-router-dom'; 

// Import your other components
import { PropertyCreationProvider } from './context/PropertyCreationContext';
import Layout from './pages/Layout';

import ListProperties from './pages/ListProperties';
import AddProperty from './pages/AddProperty';
import ManageUnits from './pages/ManageUnits';
import Footer from './components/Footer';

function App() {
  // NO <BrowserRouter> should be here
  return (
    <PropertyCreationProvider>
      <div className="flex flex-col min-h-screen">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<ListProperties />} />
              <Route path='properties' element={<ListProperties />} />
              <Route path='properties/add/manage-units' element={<ManageUnits />} />
              <Route path='properties/add' element={<AddProperty />} />
              <Route path='properties/edit/:propertyId/manage-units' element={<ManageUnits key={window.location.pathname} />} />
              <Route path='properties/edit/:propertyId' element={<AddProperty key={window.location.pathname} />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </PropertyCreationProvider>
  )
}

export default App;