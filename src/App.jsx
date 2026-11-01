// src/App.jsx

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function App() {
  return (
    <main className="min-h-screen bg-[#070504] text-white">
      <Navbar />
      <Hero />
    </main>
  );
}