import React from "react";
import Navigation from "@/components/Navigation";
import FeedCard from "@/components/FeedCard";
import { PinIcon } from "lucide-react";

export interface FeedCardData {
  cardImage: string;
  imageAlt: string;
  cardTitle: string;
  cardDescription: string;
  eventDate: string;
  eventLocation: string;
  icon: React.ReactNode;
  eventPrice: string;
  eventCategory: string;
}

const page = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-6 p-6">
        {dummyFeedCardData.map((item, index) => {
          return (
            <div key={index}>
              <FeedCard data={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;

const dummyFeedCardData = [
  {
    cardImage:
      "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg",
    imageAlt: "Sample Event Image",
    cardTitle: "Sample Event 1",
    cardDescription: "This is a description of sample event 1.",
    eventDate: "2023-10-01",
    eventLocation: "New York, NY",
    icon: <PinIcon />,
    eventPrice: "$20",
    eventCategory: "Music",
  },
  {
    cardImage:
      "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg",
    imageAlt: "Sample Event Image",
    cardTitle: "Sample Event 2",
    cardDescription: "This is a description of sample event 2.",
    eventDate: "2023-10-15",
    eventLocation: "Los Angeles, CA",
    icon: <PinIcon />,
    eventPrice: "$30",
    eventCategory: "Art",
  },
  {
    cardImage:
      "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg",
    imageAlt: "Sample Event Image",
    cardTitle: "Sample Event 3",
    cardDescription: "This is a description of sample event 3.",
    eventDate: "2023-11-05",
    eventLocation: "Chicago, IL",
    icon: <PinIcon />,
    eventPrice: "$25",
    eventCategory: "Technology",
  },
  {
    cardImage:
      "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg",
    imageAlt: "Sample Event Image",
    cardTitle: "Sample Event 4",
    cardDescription: "This is a description of sample event 4.",
    eventDate: "2023-11-20",
    eventLocation: "Miami, FL",
    icon: <PinIcon />,
    eventPrice: "$15",
    eventCategory: "Food & Drink",
  },
];
