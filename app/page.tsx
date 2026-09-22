"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { CinematicNavbar } from "@/components/cinematic/Navbar";
import { ChapterHero } from "@/components/cinematic/ChapterHero";
import { ChapterProblem } from "@/components/cinematic/ChapterProblem";
import { ChapterConnection } from "@/components/cinematic/ChapterConnection";
import { ChapterUnderstanding } from "@/components/cinematic/ChapterUnderstanding";
import { ChapterExplore } from "@/components/cinematic/ChapterExplore";
import { ChapterGrow } from "@/components/cinematic/ChapterGrow";
import { ChapterFinale } from "@/components/cinematic/ChapterFinale";

const ArtScene = dynamic(
  () => import("@/components/3d/ArtScene").then((mod) => mod.ArtScene),
  { ssr: false }
);

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative bg-[#070708] min-h-screen text-[#F5F5F7] overflow-x-hidden selection:bg-[#F5F5F7] selection:text-black font-sans"
    >
      {/* 3D Filmic Canvas (Character as cinematographic protagonist + ethereal constellation) */}
      <ArtScene />

      {/* Understated Minimal Navigation */}
      <CinematicNavbar />

      {/* The Continuous 6-Chapter Cinematic Journey */}
      <main className="relative z-10">
        {/* Chapter 01: Hero — "Your knowledge has a shape." */}
        <ChapterHero />

        {/* Chapter 02: The Problem — Fragmented words drifting in physical space */}
        <ChapterProblem />

        {/* Chapter 03: Connection — The constellation forms */}
        <ChapterConnection />

        {/* Chapter 04: Understanding — Silent synthesis */}
        <ChapterUnderstanding />

        {/* Chapter 05: Explore — Spatial camera journey */}
        <ChapterExplore />

        {/* Chapter 06: Grow — Monumental typographic rhythm */}
        <ChapterGrow />

        {/* Epilogue: "See what you know. Discover what's connected." */}
        <ChapterFinale />
      </main>
    </div>
  );
}
