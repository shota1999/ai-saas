export interface Plan {
  name: string;
  priceText: string;
  priceId: string;
  features: string[];
}

export const PLANS: Plan[] = [
  {
    name: "Free",
    priceText: "$0",
    priceId: "", 
    features: ["Basic generation", "Limited credits"],
  },
  {
    name: "Pro",
    priceText: "$19/mo",
    priceId: "price_1RqGdKQoAp4c8NIpEYcdun8Q",
    features: ["Unlimited generation", "Priority support"],
  },
  {
    name: "Enterprise",
    priceText: "$99/mo",
    priceId: "price_1RqGeGQoAp4c8NIpoxKuOX9l", 
    features: ["Custom AI models", "Dedicated support"],
  },
];
