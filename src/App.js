import './App.css';
import 'leaflet/dist/leaflet.css';
import PropertiesPage from './pages/PropertiesPage';
import AddPropertyPage from './pages/AddPropertyPage';


function App() {
  return (
    <div className="App">
      <PropertiesPage />
      <AddPropertyPage />
    </div>
  );
}

export default App;
