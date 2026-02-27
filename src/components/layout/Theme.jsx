import React from 'react'

function Theme({children}) {
 
     return (
    <div className="relative min-h-screen">
      {/* Conic gradient background */}
      <div className="conic-gradient-bg" />
      
      {/* Glass layout overlay */}
      <div className="fixed inset-0 z-0 glass-layout" />
      
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
 
}

export default Theme