// import React from 'react';
import { AllergyManager } from './components/AllergyManager';
import { WeeklyScheduler } from './components/WeeklyScheduler';
import { Utensils } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2">
            <Utensils className="text-blue-500" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">
              Menu Scheduler
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[300px,1fr]">
          <AllergyManager />
          <WeeklyScheduler />
        </div>
      </main>
    </div>
  );
}

export default App;