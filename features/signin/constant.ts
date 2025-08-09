import { Flag, icons, Lock, Rocket, User } from "lucide-react";

export const sideBardata = [
  {
    title: "Your details",
    description: "Please provide your name and email.",
    step: 1,
    icon: Flag,
  },
  {
    title: "Enter your OTP",
    description: "Enter the code received in your email to verify.",
    step: 2,
    icon: Lock,
  },
  {
    title: "Choose a password",
    description: "Create a secure password for your account.",
    step: 3,
    icon: Lock,
  },

  {
    title: "Complete your profile",
    description: "Add a username and any additional information.",
    step: 4,
    icon: User,
  },

  {
    title: "Add your socials",
    description: "Connect your social media accounts for easy sharing.",
    step: 5,
    icon: Rocket,
  },
];

export const eventTypes = [
  { id: 1, title: "Concert" },
  { id: 2, title: "Sports" },
  { id: 3, title: "Theater" },
  { id: 4, title: "Comedy" },
  { id: 5, title: "Festival" },
  { id: 6, title: "Exhibition" },
  { id: 7, title: "Conference" },
  { id: 8, title: "Workshop" },
  { id: 9, title: "Party" },
  { id: 10, title: "Other" },
];
