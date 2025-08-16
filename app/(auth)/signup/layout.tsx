"use client";

import React from "react";
import { sideBardata } from "@/features/signin/constant";
import { CircleCheck, Mail } from "lucide-react";
import { useMultiFormStepState } from "@/hooks/store/useMultiFormState";
import { cn } from "@/lib/utils";
import ProgressBar from "@/components/ProgressBar";
import useIsMobile from "@/lib/useIsMobile";

const AuthOnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  const { step } = useMultiFormStepState();
  const isMobile = useIsMobile();

  return (
    <section className="flex h-screen w-screen flex-col sm:flex-row">
      <aside className="hidden md:flex bg-sidebar h-screen w-full max-w-xs border-r p-4  flex-col ">
        <header className="mt-4">
          <h1 className="text-3xl font-bold mb-20">Event Finder</h1>
        </header>

        <ul className="flex flex-col  space-y-8">
          {sideBardata.map((progress, index) => (
            <li key={progress.step}>
              <div className="flex items-center gap-2">
                <CircleCheck
                  className={`${
                    step === index + 1 || step > index + 1
                      ? "text-primary"
                      : "text-muted-foreground"
                  } size-6`}
                />
                <div className="grid">
                  <h2
                    className={cn(
                      step === index + 1 || step > index + 1
                        ? "text-primary/80"
                        : "text-muted-foreground/55",
                      "font-bold"
                    )}
                  >
                    {progress.title}
                  </h2>
                  <p
                    className={cn(
                      step === index + 1 || step > index + 1
                        ? "text-primary-foreground"
                        : "text-muted-foreground/55",
                      "text-sm"
                    )}
                  >
                    {progress.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <footer className="absolute bottom-20">
          <span className="ml-5 grid gap-5 justify-between">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Event Finder.
            </p>
            <p className="flex items-center justify-center gap-2 text-sm">
              <Mail size={15} /> eventfinder@gmail.com
            </p>
          </span>
        </footer>
      </aside>
      <div className="flex-1 flex flex-col w-full">
        <div
          className={cn(
            `md:hidden max-w-3xl w-full justify-center items-center  p-10 mt-10`
          )}
        >
          <ProgressBar />
        </div>
        <main className="my-0 md:my-24 w-full flex-1">{children}</main>
      </div>
    </section>
  );
};

export default AuthOnboardingLayout;
