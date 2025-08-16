import React from "react";

interface EventFormHeaderProps {
  eventTitle: string;
  eventdescription: string;
}

const EventFormHeader = ({
  eventTitle,
  eventdescription,
}: EventFormHeaderProps) => {
  return (
    <div>
      <h1 className="text-primary text-2xl font-semibold">{eventTitle}</h1>
      <p className="text-muted-foreground text-sm">{eventdescription}</p>
    </div>
  );
};

export default EventFormHeader;
