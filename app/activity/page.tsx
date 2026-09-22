"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell, useAppShell } from "@/components/app/AppShell";
import { MOCK_ACTIVITIES, ActivityItem, EntityType } from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  History,
  ArrowRight,
  Sparkles,
  Network,
  Plus,
  Link as LinkIcon,
  CheckCircle2,
  FileUp,
  Clock
} from "lucide-react";

export default function ActivityPage() {
  const { openDrawer } = useAppShell();
  const [filterAction, setFilterAction] = useState<string>("All");

  const actionFilters = ["All", "created", "connected", "completed", "uploaded"];

  const filtered = MOCK_ACTIVITIES.filter((act) => {
    if (filterAction !== "All" && act.action !== filterAction) return false;
    return true;
  });

  // Group by date
  const groups: Record<string, ActivityItem[]> = {};
  filtered.forEach((act) => {
    if (!groups[act.dateGroup]) groups[act.dateGroup] = [];
    groups[act.dateGroup].push(act);
  });

  const getActionIcon = (action: ActivityItem["action"]) => {
    switch (action) {
      case "created":
        return <Plus className="w-3.5 h-3.5 text-[#D4FF00]" />;
      case "connected":
        return <LinkIcon className="w-3.5 h-3.5 text-cyan-400" />;
      case "completed":
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
      case "uploaded":
        return <FileUp className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-[#A1A1AA]" />;
    }
  };

  return (
    <AppShell>
      <div className="p-6 sm:p-10 space-y-8 max-w-5xl mx-auto w-full">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] text-[#71717A] uppercase">
              <span>CHRONOLOGY</span>
              <span>•</span>
              <span className="text-[#D4FF00]">EVOLUTION LOG</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
              Knowledge Activity
            </h1>
            <p className="text-sm sm:text-base text-slate-400 font-light max-w-2xl">
              A historical trajectory documenting every project created, relation mapped, paper uploaded, and milestone completed.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/explore">
              <Button variant="secondary" size="sm" className="text-xs">
                <Network className="w-3.5 h-3.5 text-[#D4FF00]" />
                <span>Spatial View</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-white/[0.06] pt-2">
          {actionFilters.map((act) => (
            <button
              key={act}
              onClick={() => setFilterAction(act)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer capitalize ${
                filterAction === act
                  ? "bg-[#D4FF00] text-black font-semibold shadow-[0_0_12px_rgba(212,255,0,0.2)]"
                  : "text-[#A1A1AA] hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {act === "All" ? "All Activity" : act}
            </button>
          ))}
        </div>

        {/* Vertical Timeline */}
        <div className="space-y-10">
          {Object.entries(groups).length === 0 ? (
            <div className="p-12 rounded-2xl border border-dashed border-white/10 bg-[#0A0D11] text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto text-[#71717A]">
                <History className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-white">No activity recorded yet</h3>
                <p className="text-sm text-slate-400 max-w-sm mx-auto">
                  Every interaction, entity connection, upload, and goal achievement will be documented chronologically here.
                </p>
              </div>
              <Link href="/dashboard">
                <Button variant="secondary" size="sm">
                  <span>Return to Dashboard</span>
                </Button>
              </Link>
            </div>
          ) : (
            Object.entries(groups).map(([dateGroup, items]) => (
              <div key={dateGroup} className="space-y-4">
                <span className="text-xs font-mono tracking-[0.2em] text-[#71717A] uppercase font-bold sticky top-16 bg-[#070809]/90 py-1 backdrop-blur-xs z-10 block">
                  {dateGroup}
                </span>

                <div className="space-y-3 relative pl-6 sm:pl-8 before:absolute before:left-2.5 sm:before:left-3 before:top-3 before:bottom-3 before:w-px before:bg-white/10">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => openDrawer(item.entityId)}
                      className="p-4 sm:p-5 rounded-2xl border border-white/[0.06] bg-[#0A0D11] hover:bg-[#0E1217] hover:border-white/15 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group relative"
                    >
                      {/* Node Dot on Timeline */}
                      <div className="absolute -left-[27px] sm:-left-[35px] top-5 w-4 h-4 rounded-full bg-[#070809] border border-white/20 flex items-center justify-center group-hover:border-[#D4FF00] transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-[#D4FF00]" />
                      </div>

                      <div className="space-y-1.5 min-w-0 flex-1">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <div className="p-1 rounded bg-white/[0.04] border border-white/10">
                            {getActionIcon(item.action)}
                          </div>
                          <Badge entityType={item.entityType}>{item.entityType}</Badge>
                          <span className="text-sm sm:text-base font-semibold text-white group-hover:text-[#D4FF00] transition-colors tracking-tight">
                            {item.title}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-normal leading-relaxed">
                          {item.details}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 justify-between sm:justify-end text-xs font-mono text-[#71717A]">
                        <span>{item.timestamp}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#71717A] group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </AppShell>
  );
}
