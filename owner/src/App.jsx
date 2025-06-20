// Make sure you do NOT import BrowserRouter here
import { Routes, Route } from 'react-router-dom'; 

import Layout from './pages/Layout';
import ListProperties from './pages/ListProperties';
import AddProperty from './pages/AddProperty';
import ManageUnits from './pages/ManageUnits';
import Footer from './components/Footer';
// Import your other components
import { PropertyCreationProvider } from './context/PropertyCreationContext';


function App() {
  // NO <BrowserRouter> should be here
  return (
 
      <div className="flex flex-col min-h-screen">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<ListProperties />} />
              <Route path='properties' element={<ListProperties />} />
              <Route path='properties/add' element={<AddProperty />} />
              <Route path='properties/:propertyId/manage-units' element={<ManageUnits />} />
           
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
   
  )
}

export default App;