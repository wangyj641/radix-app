import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import FileUpload from './UploadCSV';

const PrivateRoute = ({ children }) => {
  if (!(localStorage.getItem("token"))) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/uploadCSV" element={<FileUpload />} />

        // protect route, only signed user can link this url
        <Route path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
