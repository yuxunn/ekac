import React from 'react';
import Navbar from './components/navbar';
import './tailwind.css';
import Sidebar from './components/sidebar';

const App = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 bg-pink-100">
          <section className="bg-white p-6 rounded-md shadow-md">
            <h1 className="text-3xl font-bold underline">
              main title
            </h1>
            <p>subtitle</p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
