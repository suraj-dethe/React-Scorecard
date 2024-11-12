import  { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Form from './components/Form';
import Scorecard from './components/Scorecard';


const App = () => {
  const [formData, setFormData] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form setFormData={setFormData} />} />
        <Route path="/scorecard" element={<Scorecard formData={formData} />} />
      </Routes>
    </Router>
  );
};

export default App;

