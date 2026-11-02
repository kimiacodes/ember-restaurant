// src/App.jsx

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedMenu from "./components/FeaturedMenu";

export default function App() {
  return (
    <main className="min-h-screen bg-[#070504] text-white">
      <Navbar />
      <Hero />
      <FeaturedMenu />
    </main>
  );
}