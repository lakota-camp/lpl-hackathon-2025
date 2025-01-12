"use client";
import Demo from "./components/Demo";

export default function Home() {
  return (
    <section className="p-4 text-center">
      <h2 className="text-2xl font-semibold">
        Welcome to the LPL Hackathon 2025
      </h2>
      <p className="text-lg">Boilerplate code</p>
      <div>
        <h3 className="text-xl font-semibold">Demo API Call</h3>
        <Demo />
      </div>
    </section>
  );
}
