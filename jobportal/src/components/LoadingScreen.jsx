import React from 'react';

const LoadingScreen = () => {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden"
    >
      {/* Classic Dots Loading Animation */}
      <div className="flex space-x-4 relative z-10">
        <span className="loading-dot bg-cyan-500"></span>
        <span className="loading-dot bg-blue-500 animation-delay-150"></span>
        <span className="loading-dot bg-indigo-500 animation-delay-300"></span>
      </div>

     

      <style jsx>{`
        .loading-dot {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: inline-block;
          animation: bounce 1.2s infinite ease-in-out;
        }
        .animation-delay-150 {
          animation-delay: 0.15s;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.3;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
