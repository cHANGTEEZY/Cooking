import React from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardDescription,
  CardFooter,
  CardContent,
} from "./ui/card";
import { FeedCardData } from "@/app/page";
import { Calendar, MapPin, DollarSign, Heart, Share2 } from "lucide-react";
import { Button } from "./ui/button";

const FeedCard = ({ data }: { data: FeedCardData }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="group overflow-hidden border-0 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image Header */}
      <CardHeader className="px-4 rounded-2xl relative">
        <div className="relative w-full h-40 p-4 overflow-hidden rounded-2xl">
          <Image
            src={data.cardImage}
            alt={data.imageAlt}
            fill
            className="object-cover transition-transform duration-300 "
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <p className="text-xs font-medium text-primary-foreground">
              {data.eventCategory}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 bg-white/20 backdrop-blur-sm hover:bg-white/30"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 bg-white/20 backdrop-blur-sm hover:bg-white/30"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Price Badge */}
          <div className="absolute bottom-3 right-3 bg-accent/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <p className="text-sm font-bold text-accent-foreground">
              {data.eventPrice}
            </p>
          </div>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-bold text-lg leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {data.cardTitle}
        </h3>

        {/* Description */}
        <CardDescription className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {data.cardDescription}
        </CardDescription>

        {/* Event Details */}
        <div className="space-y-2 pt-2">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{formatDate(data.eventDate)}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="truncate">{data.eventLocation}</span>
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-200">
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeedCard;
