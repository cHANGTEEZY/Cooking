import React from "react";
import Navigation from "@/components/Navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Finder - Discover Amazing Events",
  description: "Find and create amazing events in your area with Event Finder",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
};

export default layout;
