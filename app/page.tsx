import React from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <SignedOut>
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Event Finder
              </h1>
              <p className="text-2xl font-light text-muted-foreground">
                Discover Amazing Events
              </p>
            </div>
            <p className="text-lg font-normal text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Connect with your community through unforgettable experiences.
              Sign up to get started and never miss out on the fun!
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="font-semibold">
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="font-medium">
                Learn More
              </Button>
            </div>

            {/* Features section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold">🎉 Discover</h3>
                <p className="text-sm font-medium text-muted-foreground">
                  Find events that match your interests
                </p>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold">📅 Organize</h3>
                <p className="text-sm font-medium text-muted-foreground">
                  Create and manage your own events
                </p>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold">🤝 Connect</h3>
                <p className="text-sm font-medium text-muted-foreground">
                  Meet like-minded people in your area
                </p>
              </div>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome back! 👋
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to discover some amazing events? Let's find something
              perfect for you.
            </p>
            <div className="flex gap-4 justify-center mb-12">
              <Link href="/dashboard">
                <Button size="lg">Go to Dashboard</Button>
              </Link>
              <Button variant="outline" size="lg">
                Browse Events
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg border bg-card/50 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-2">Find Events</h3>
                <p className="text-muted-foreground">
                  Browse events in your area
                </p>
              </div>
              <div className="p-6 rounded-lg border bg-card/50 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-2">My Bookmarks</h3>
                <p className="text-muted-foreground">View your saved events</p>
              </div>
              <div className="p-6 rounded-lg border bg-card/50 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-2">Create Event</h3>
                <p className="text-muted-foreground">Host your own event</p>
              </div>
            </div>
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

export default page;
