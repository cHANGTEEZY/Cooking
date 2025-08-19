import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MovingNavigation from "./MovingNavigation";
import { ModeToggle } from "./ModeToggle";
import { BorderBeam } from "./magicui/border-beam";

const Navigation = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-semibold hover:text-primary transition-colors"
        >
          Event Finder
        </Link>

        <MovingNavigation navData={dummyNavData} />

        <div className="flex items-center gap-4">
          <ModeToggle />
          <SignedOut>
            <Link href={"/signin"}>
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href={"/signup"}>
              <Button>Sign Up</Button>
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Navigation;

const dummyNavData = [
  {
    name: "Home",
    href: "/",
    title: "Home",
  },
  {
    name: "Events",
    href: "/events",
    title: "Events",
  },
  {
    name: "About",
    href: "/about",
    title: "About",
  },
  {
    name: "Contact",
    href: "/contact",
    title: "Contact",
  },
];
