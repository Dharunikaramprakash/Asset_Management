import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        
        <h1 className="text-5xl font-bold text-slate-800 leading-tight">
          Manage Company Assets
          <span className="text-blue-600"> Effortlessly</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Track, assign, approve and monitor all company devices
          in one powerful dashboard.
        </p>

      
      </div>
    </div>
  );
}