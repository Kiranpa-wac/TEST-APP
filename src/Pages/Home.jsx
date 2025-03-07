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
      <Link to="/installment2" className="btn btn-primary ms-2">
        Installment2
      </Link>
    </div>
  );
};

export default Home;
