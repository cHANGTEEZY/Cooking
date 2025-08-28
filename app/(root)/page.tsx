"use client";

import { EventCard } from "@/components/EventFeedCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useGetEvents } from "@/hooks/api/event/useGetEvents";
import React from "react";

const page = () => {
  const { data: events, isLoading } = useGetEvents();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!events || events.length === 0) {
    return (
      <div className="text-4xl flex items-center justify-center h-screen w-screen">
        No events yet !!!
      </div>
    );
  }

  return (
    <section>
      <h1 className="text-center text-4xl font-extrabold my-10">All Events</h1>

      <section className=" mx-auto space-y-4 gap-4  px-3">
        {events?.map((event: any) => (
          <EventCard key={event.id} eventData={event} />
        ))}
      </section>
    </section>
  );
};

export default page;
