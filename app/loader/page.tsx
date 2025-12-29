// app/loading.js
export default function Loading() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg">
        <div className="relative w-24 h-24">
          {/* Outer ring */}
          <div className="absolute inset-0 border-4 border-t-primary border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin" style={{ animationDuration: '0.6s' }}></div>
          {/* Middle ring */}
          <div className="absolute inset-4 border-4 border-t-primary-dark border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin" style={{ animationDuration: '0.8s', animationDirection: 'reverse' }}></div>
          {/* Inner ring */}
          <div className="absolute inset-8 border-4 border-t-primary-light border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin" style={{ animationDuration: '0.5s' }}></div>
        </div>
      </div>
    );
  }
  