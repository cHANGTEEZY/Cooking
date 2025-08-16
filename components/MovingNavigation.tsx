"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useIsScreenReisze from "@/hooks/utils/useIsScreenReisze";
import { cn } from "@/lib/utils";

interface MovingNavigationProps {
  navData: any;
  handleNavItemClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
}

const MovingNavigation = ({
  navData,
  handleNavItemClick,
}: MovingNavigationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLLIElement[]>([]);
  const highlightRef = useRef<HTMLDivElement>(null);

  const { screenResized } = useIsScreenReisze();
  const [activeIndex, setActiveIndex] = useState(0);

  const setHighlightPosition = (item: HTMLLIElement) => {
    if (!item || !highlightRef.current || !containerRef.current) {
      console.warn("Elements not ready for setHighlightPosition");
      return;
    }

    try {
      const containerRect = containerRef.current.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      if (!containerRect || !itemRect) {
        console.warn("getBoundingClientRect returned null");
        return;
      }

      const offsetLeft = itemRect.left - containerRect.left;
      const width = itemRect.width;

      gsap.set(highlightRef.current, {
        x: offsetLeft,
        width,
      });
    } catch (error) {
      console.error("Error in setHighlightPosition:", error);
    }
  };

  useGSAP(() => {
    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (itemRefs.current[0]) {
        setHighlightPosition(itemRefs.current[0]);
      } else {
        console.warn("First nav item not found");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (screenResized) {
      setHighlightPosition(itemRefs.current[activeIndex]);
    }
  }, [screenResized, activeIndex]);

  const moveHighlight = (item: HTMLLIElement, index: number) => {
    if (!item || !highlightRef.current || !containerRef.current) {
      console.warn("Elements not ready for moveHighlight");
      return;
    }

    try {
      const containerRect = containerRef.current.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      if (!containerRect || !itemRect) {
        console.warn("getBoundingClientRect returned null in moveHighlight");
        return;
      }

      const offsetLeft = itemRect.left - containerRect.left;
      const width = itemRect.width;

      gsap.to(highlightRef.current, {
        x: offsetLeft,
        width,
        duration: 0.45,
        ease: "back.out",
      });

      setActiveIndex(index);
    } catch (error) {
      console.error("Error in moveHighlight:", error);
    }
  };

  return (
    <div>
      <nav ref={containerRef} className="relative">
        <div
          ref={highlightRef}
          className="absolute bottom-0 h-0.5 bg-primary bg rounded-lg z-0"
        ></div>

        <ul className="flex justify-around max-w-md mx-auto relative z-10 cursor-pointer gap-5">
          {navData.map((item: any, index: number) => (
            <li
              key={index}
              ref={(el) => {
                if (el) itemRefs.current[index] = el;
              }}
              onMouseEnter={() => moveHighlight(itemRefs.current[index], index)}
              className={cn(
                "text-center py-2 px-4",
                activeIndex === index ? "text-primary" : "text-muted-foreground"
              )}
              onClick={handleNavItemClick}
            >
              <a href={`${item.href}`} className="text-lg font-semibold ">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MovingNavigation;
