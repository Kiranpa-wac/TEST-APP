import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-4">
      <Link to="/installment" className="btn btn-primary me-2">
        Installment
      </Link>
      <Link to="/form" className="btn btn-secondary">
        Form
      </Link>
    </div>
  );
};

export default Home;
