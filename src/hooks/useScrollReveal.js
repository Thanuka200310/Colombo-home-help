import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    const revealItems = document.querySelectorAll(".reveal");

    if (!revealItems.length) return;

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    revealItems.forEach((item) => observer.observe(item));

    const backupTimer = setTimeout(() => {
      document.querySelectorAll(".reveal").forEach((item) => {
        item.classList.add("is-visible");
      });
    }, 800);

    return () => {
      observer.disconnect();
      clearTimeout(backupTimer);
    };
  }, [location.pathname]);
}