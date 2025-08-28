"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  MapPin,
  Users,
  DollarSign,
  Info,
  User,
  Ticket,
} from "lucide-react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface EventData {
  id: string;
  event_title: string;
  event_description: string;
  event_category: string;
  event_venue: string;
  event_location: string;
  event_start_date: string;
  event_end_date: string;
  ticket_type: string;
  banner_image_url: string;
  ticket_price: string;
  ticket_quantity: string;
  event_creator: string;
  event_highlights: string[];
  event_creator_avatar_url: string;
  event_duration_minutes: number;
}

interface EventCardProps {
  eventData: EventData;
}

export function EventCard({ eventData }: EventCardProps) {
  const { user } = useUser();
  const router = useRouter();

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startOptions: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };

    if (start.toDateString() === end.toDateString()) {
      return `${start.toLocaleDateString(
        "en-US",
        startOptions
      )} • ${start.toLocaleTimeString(
        "en-US",
        timeOptions
      )} - ${end.toLocaleTimeString("en-US", timeOptions)}`;
    }

    return `${start.toLocaleDateString(
      "en-US",
      startOptions
    )} - ${end.toLocaleDateString("en-US", startOptions)}`;
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    let durationString = "";
    if (hours > 0) {
      durationString += `${hours} hr${hours > 1 ? "s" : ""}`;
    }
    if (mins > 0) {
      durationString += ` ${mins} min${mins > 1 ? "s" : ""}`;
    }
    return durationString.trim();
  };

  const handleTicketClick = (eventData: EventData) => {
    router.push("/events/event-details/" + eventData.id);
  };

  return (
    <Card className="max-w-6xl mx-auto rounded-2xl overflow-hidden border bg-card shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex h-80">
        <div className="relative w-2/5 h-full rounded-r-4xl overflow-hidden mr-5 shadow-2xl shadow-accent-foreground/5">
          <Image
            src={eventData.banner_image_url || "/placeholder.svg"}
            alt={eventData.event_title}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/60" />

          <div className="absolute top-4 left-4 backdrop-blur-md bg-white/20 px-3 py-1 rounded-full text-white text-sm font-semibold">
            {eventData.event_category}
          </div>

          <div className="absolute bottom-4 left-4 right-4 bg-black/35">
            <div className="flex items-center justify-center gap-2 text-white text-sm mb-2">
              <MapPin className="h-4 w-4" />
              <span className="truncate">
                {eventData.event_venue}, {eventData.event_location}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col mr-5">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-tight mb-2 truncate">
                  {eventData.event_title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">
                    {formatDateRange(
                      eventData.event_start_date,
                      eventData.event_end_date
                    )}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-primary">
                  <Image
                    src={user?.imageUrl || "/placeholder-avatar.svg"}
                    alt={user?.username || "User"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Hosted by</p>
                  <p className="text-sm font-semibold truncate max-w-24">
                    {user?.username}
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 pb-3 space-y-3">
            <div className="grid grid-cols-4 gap-3 text-sm">
              <div className="flex items-center gap-2 min-w-0">
                <Ticket className="h-4 w-4 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-medium truncate">
                    {eventData.ticket_quantity}{" "}
                    <span className="text-muted-foreground">available</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <DollarSign className="h-4 w-4 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-medium truncate">
                    {eventData.ticket_type === "Paid"
                      ? eventData.ticket_price
                      : "Free"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <Users className="h-4 w-4 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-medium truncate">
                    {eventData.ticket_type}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {eventData.event_description}
              </p>
            </div>

            {/* Highlights */}
            {eventData.event_highlights &&
              eventData.event_highlights.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-2">
                    Event Highlights
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {eventData.event_highlights
                      .slice(0, 4)
                      .map((highlight, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs px-2 py-1"
                        >
                          {highlight}
                        </Badge>
                      ))}
                    {eventData.event_highlights.length > 4 && (
                      <Badge variant="outline" className="text-xs px-2 py-1">
                        +{eventData.event_highlights.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
          </CardContent>

          <CardFooter className="pt-3 flex justify-between items-center border-t ">
            <div className="flex gap-2">
              <Badge
                variant={
                  eventData.ticket_type === "Paid" ? "default" : "outline"
                }
                className="text-xs"
              >
                {eventData.ticket_type}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {eventData.event_category}
              </Badge>
            </div>
            <Button
              onClick={() => handleTicketClick(eventData)}
              className="rounded-full px-6 py-2 font-semibold transition-all duration-300 transform hover:scale-105 bg-primary/80 hover:bg-primary"
            >
              Get Tickets
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
