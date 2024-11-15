import React from 'react';
import { hatch } from 'ldrs';

// hatch.register();

export default function Loader({ children, isLoading }) {
  return isLoading ? (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <l-hatch 
      size="28" 
      stroke="4" 
      speed="3.5" 
      color="#3A3A3A"
      >
      </l-hatch>
    </div>
  ) : (
    children
  );
}
