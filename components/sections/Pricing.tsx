"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Check, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export function Pricing() {
  const handleSelectTier = (tierName: string) => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#D4FF00", "#00F0FF", "#FFFFFF", "#10B981"],
    });
    alert(`Selected: ${tierName} plan. Access initialized in mock mode.`);
  };

  const tiers = [
    {
      name: "Explorer",
      price: "$0",
      period: "forever",
      description: "Ideal for curious thinkers starting their personal mind mapping journey.",
      highlighted: false,
      badge: "FREE TIER",
      features: [
        "Up to 5,000 knowledge nodes",
        "Local 3D web graph viewer",
        "Markdown & Obsidian sync",
        "Basic semantic search",
        "Local encrypted storage",
      ],
      ctaText: "Start Explorer",
      ctaVariant: "secondary" as const,
    },
    {
      name: "Neural Architect",
      price: "$19",
      period: "per month",
      description: "The complete cognitive OS for founders, researchers, and polymaths.",
      highlighted: true,
      badge: "MOST POPULAR",
      features: [
        "Unlimited interconnected nodes",
        "Real-time autonomous neural linking",
        "Interactive 3D Knowledge Studio",
        "GitHub, Notion, Readwise sync",
        "Growth velocity & mastery telemetry",
        "Vector semantic instant recall (<12ms)",
        "Cloud encrypted continuous backup",
      ],
      ctaText: "Claim Architect Pass",
      ctaVariant: "primary" as const,
    },
    {
      name: "Sovereign",
      price: "$49",
      period: "per month",
      description: "For private teams and institutions demanding sovereign federated memory.",
      highlighted: false,
      badge: "ENTERPRISE",
      features: [
        "Multi-graph team federation",
        "Dedicated private vector compute",
        "Custom local LLM inference support",
        "REST & GraphQL topological APIs",
        "Role-based node permissions",
        "24/7 dedicated engineering support",
      ],
      ctaText: "Initialize Sovereign",
      ctaVariant: "outline" as const,
    },
  ];

  return (
    <section id="pricing" className="py-28 px-6 relative z-10 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <Badge variant="lime" dot className="mb-4">
          MEMBERSHIP
        </Badge>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
          Invest in your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#D4FF00]">
            growth.
          </span>
        </h2>
        <p className="mt-4 text-base text-slate-400 font-normal leading-relaxed">
          Predictable, transparent access. Experience the cognitive leverage of a living mind map.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier) => {
          return (
            <Card
              key={tier.name}
              highlightBorder={tier.highlighted}
              className={`flex flex-col justify-between p-8 sm:p-9 transition-all duration-300 relative ${
                tier.highlighted
                  ? "bg-[#0E1216]/95 border-[#D4FF00]/60 shadow-[0_0_40px_rgba(212,255,0,0.12)] -translate-y-2"
                  : "bg-[#080B0E]/85 border-white/[0.08]"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-3.5 py-1 rounded-full text-[11px] font-mono font-bold bg-[#D4FF00] text-black shadow-[0_0_15px_rgba(212,255,0,0.5)] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-black" />
                    {tier.badge}
                  </span>
                </div>
              )}

              <div>
                {!tier.highlighted && (
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
                    {tier.badge}
                  </div>
                )}

                <h3 className="text-2xl font-bold tracking-tight text-white mt-1">
                  {tier.name}
                </h3>
                <p className="text-xs text-slate-400 mt-2 min-h-10 leading-relaxed font-normal">
                  {tier.description}
                </p>

                <div className="my-8 flex items-baseline gap-2">
                  <span className="text-5xl font-black font-mono tracking-tight text-white">
                    {tier.price}
                  </span>
                  <span className="text-xs font-mono text-slate-400">/ {tier.period}</span>
                </div>

                <div className="space-y-3 pt-6 border-t border-white/5">
                  {tier.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-[#D4FF00]/15 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-[#D4FF00]" />
                      </div>
                      <span className="leading-relaxed font-mono">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-white/5">
                <Button
                  variant={tier.ctaVariant}
                  size="md"
                  glow={tier.highlighted}
                  onClick={() => handleSelectTier(tier.name)}
                  className="w-full justify-center text-xs font-mono font-bold uppercase tracking-wider py-3.5"
                >
                  {tier.ctaText}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
