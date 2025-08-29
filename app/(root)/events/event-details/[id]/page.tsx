"use client";
import { useParams, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Clock, Users, Ticket, Star } from "lucide-react";

const EventDetailsPage = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();

  const encodedData = searchParams.get("data");

  // Sample data for demonstration - replace with actual data parsing
  const eventData = {
    id: "c8bd4592-4cc6-44cb-81c4-c7a4d149cba4",
    event_title: "Tech Summit Kathmandu 2025",
    event_description:
      "Join industry leaders and innovators for a two-day summit covering AI, blockchain, cloud computing, and the future of technology in South Asia.",
    event_category: "Conference",
    event_venue: "Soaltee Hotel Kathmandu",
    event_location: "Kathmandu, Nepal",
    event_start_date: "2025-08-27T18:15:00.000Z",
    event_end_date: "2025-08-28T18:15:00.000Z",
    ticket_type: "Paid",
    banner_image_url:
      "https://res.cloudinary.com/dpq9kytd1/image/upload/v1756283941/event-banners/oliehxtipwvwrs8tjczi.jpg",
    ticket_price: "20",
    ticket_quantity: "400",
    event_creator: "user_3183NUsVnlpBNwi3hf7GASCufc4",
  };

  // Parse actual data if available
  let actualEventData = eventData;
  if (encodedData) {
    try {
      actualEventData = JSON.parse(decodeURIComponent(encodedData));
    } catch (e) {
      console.error("Failed to parse event data:", e);
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${actualEventData.banner_image_url})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 flex h-full items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-4xl">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
                {actualEventData.event_category}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-balance">
                {actualEventData.event_title}
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl text-pretty">
                {actualEventData.event_description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Ticket className="mr-2 h-5 w-5" />
                  Register Now - ${actualEventData.ticket_price}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Info Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <CalendarDays className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-card-foreground">
                      Event Dates
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium">
                      {formatDate(actualEventData.event_start_date)}
                    </p>
                    <p className="text-sm text-muted-foreground">End Date</p>
                    <p className="font-medium">
                      {formatDate(actualEventData.event_end_date)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-card-foreground">
                      Event Time
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Start Time</p>
                    <p className="font-medium">
                      {formatTime(actualEventData.event_start_date)}
                    </p>
                    <p className="text-sm text-muted-foreground">End Time</p>
                    <p className="font-medium">
                      {formatTime(actualEventData.event_end_date)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-card-foreground">
                      Venue
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium">{actualEventData.event_venue}</p>
                    <p className="text-sm text-muted-foreground">
                      {actualEventData.event_location}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-card-foreground">
                      Capacity
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium">
                      {actualEventData.ticket_quantity} Attendees
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Limited seats available
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* About Section */}
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-card-foreground">
                  About This Event
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {actualEventData.event_description}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    This premier technology conference brings together thought
                    leaders, innovators, and professionals from across South
                    Asia to explore the latest trends and developments in
                    artificial intelligence, blockchain technology, and cloud
                    computing.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Network with industry experts, attend hands-on workshops,
                    and gain insights that will shape the future of technology
                    in the region. Don't miss this opportunity to be part of the
                    conversation that's defining tomorrow's digital landscape.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card className="bg-primary/5 border-primary/20 sticky top-6">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    Event Ticket
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold text-primary">
                      ${actualEventData.ticket_price}
                    </span>
                    <span className="text-muted-foreground">per person</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Ticket Type
                    </span>
                    <Badge variant="secondary">
                      {actualEventData.ticket_type}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Available
                    </span>
                    <span className="font-medium">
                      {actualEventData.ticket_quantity} seats
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Duration
                    </span>
                    <span className="font-medium">2 Days</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="lg"
                >
                  <Ticket className="mr-2 h-5 w-5" />
                  Register Now
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Secure payment • Instant confirmation
                </p>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-card-foreground">
                  Event Highlights
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>20+ Industry Speakers</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Hands-on Workshops</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Networking Sessions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Certificate of Attendance</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Lunch & Refreshments</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
