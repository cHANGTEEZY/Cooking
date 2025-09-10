export interface FeedCardData {
  cardImage: string;
  imageAlt: string;
  eventCategory: string;
  eventPrice: string;
  cardTitle: string;
  cardDescription: string;
  eventDate: string;
  eventLocation: string;
}

export interface Event {
  id: string;
  event_title: string;
  event_description: string;
  event_category: string;
  event_start_date: string;
  event_end_date: string;
  ticket_type: string;
  ticket_price: string;
  ticket_quantity: string;
  banner_image_url: string;
  event_venue: string;
  event_location: string;
  event_creator: string;
  created_at: string;
  updated_at: string;
}
