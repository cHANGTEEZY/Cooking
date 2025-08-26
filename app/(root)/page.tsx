"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { useGetEvents } from "@/hooks/api/event/useGetEvents";
import Image from "next/image";
import React from "react";

const page = () => {
  const { data: events, isLoading } = useGetEvents();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>All Events</h1>

      {events?.map((event: any) => (
        <div key={event.id}>
          <h2>{event.event_title}</h2>
          <p>{event.event_description}</p>
          <Image
            src={event.banner_image_url}
            height={200}
            width={200}
            alt="Event banner image"
          />
        </div>
      ))}
    </div>
  );
};

export default page;
