"use client";

export default function BillingPage() {
  const plans = [
    { name: "Free", price: "$0", features: ["Basic generation", "Limited credits"] },
    { name: "Pro", price: "$19/mo", features: ["Unlimited generation", "Priority support"] },
    { name: "Enterprise", price: "$99/mo", features: ["Custom AI models", "Dedicated support"] },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Billing & Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan, i) => (
          <div key={i} className="bg-white p-6 rounded shadow border">
            <h2 className="text-xl font-bold">{plan.name}</h2>
            <p className="text-gray-600 mb-4">{plan.price}</p>
            <ul className="mb-4 text-sm text-gray-600">
              {plan.features.map((f, j) => (
                <li key={j}>✅ {f}</li>
              ))}
            </ul>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
