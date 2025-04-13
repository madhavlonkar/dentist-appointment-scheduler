import { useState } from 'react';
import  DentistNavbar  from './components/DentistNavbar.jsx';
import Calendar from './components/Dashboard.jsx'; 
import "react-datepicker/dist/react-datepicker.css";


const App = () => {
  // "Lifted" state for the search term
  // const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <>
      <DentistNavbar />
      <Calendar />
    </>
  );
};

export default App;