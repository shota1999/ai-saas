"use client";

import { useState } from "react";

 const GeneratorPage = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const handleGenerate = () => {
    if (!input.trim()) return;
    setResults((prev) => [
      ...prev,
      `Generated result for: "${input}"`,
    ]);
    setInput("");
  };

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">AI Generator</h1>

      <textarea
        className="w-full border p-2 rounded mb-4"
        rows={3}
        placeholder="Type something to generate..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Generate
      </button>

      <div className="mt-6 space-y-2">
        {results.map((res, i) => (
          <div
            key={i}
            className="bg-white p-3 rounded shadow border border-gray-100"
          >
            {res}
          </div>
        ))}
      </div>
    </div>
  );
}


export default GeneratorPage