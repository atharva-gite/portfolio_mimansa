import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    // Reset scroll when navigating to a new page via link/click.
    // Don't fight browser back/forward ("POP") scroll restoration.
    if (navType === "POP") return;

    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, navType]);

  return null;
}

