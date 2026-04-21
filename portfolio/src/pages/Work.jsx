import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SmoothScroll from "../components/layout/SmoothScroll";
import Slides from "../components/sections/Slides";
import ZineFlip from "../components/ui/ZineFlip";
import { works } from "../data/siteData";

export default function Work() {
  const { id } = useParams();
  const navigate = useNavigate();

  const work = useMemo(() => works.items.find((w) => w.id === id), [id]);

  if (!work) {
    return (
      <div className="px-6 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1200px]">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-[11px] uppercase tracking-[0.35em] text-black/60 hover:text-black"
          >
            Back
          </button>
          <h1 className="mt-8 text-3xl font-semibold uppercase tracking-[-0.03em] text-black">Work not found</h1>
          <p className="mt-4 text-sm text-black/60">Unknown project id: {id}</p>
        </div>
      </div>
    );
  }

  // For now, only work 01 is mapped to the PDF slide deck.
  if (work.pdfPreviewSrc) {
    const slidesData = {
      sectionId: "slides",
      title: "",
      pdfSrc: work.pdfPreviewSrc,
    };

    return (
      <SmoothScroll>
        <div className="pointer-events-none sticky top-0 z-30 px-6 pt-6 sm:px-10 lg:px-16">
          <div className="mx-auto flex max-w-[1600px] justify-start">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="pointer-events-auto rounded-full border border-[#c1121f]/30 bg-black/60 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-[#f4f1ea]/80 backdrop-blur-sm transition hover:bg-black/70 hover:text-[#f4f1ea]"
            >
              Back
            </button>
          </div>
        </div>
        <Slides data={slidesData} targetPage={work.slidesPage || 1} chromeless />
      </SmoothScroll>
    );
  }

  if (work.zinePages) {
    return (
      <SmoothScroll>
        <div className="pointer-events-none sticky top-0 z-30 px-6 pt-6 sm:px-10 lg:px-16">
          <div className="mx-auto flex max-w-[1600px] justify-start">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="pointer-events-auto rounded-full border border-[#c1121f]/30 bg-black/60 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-[#f4f1ea]/80 backdrop-blur-sm transition hover:bg-black/70 hover:text-[#f4f1ea]"
            >
              Back
            </button>
          </div>
        </div>
        <section className="relative min-h-screen border-b border-black/10 bg-[#070707] px-6 py-16 text-[#f4f1ea] sm:px-10 lg:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-100"
            style={{
              backgroundImage:
                "radial-gradient(circle at 18% 12%, rgba(193,18,31,0.22), transparent 46%), radial-gradient(circle at 78% 38%, rgba(193,18,31,0.12), transparent 44%)",
            }}
          />
          <div className="relative">
            <ZineFlip pages={work.zinePages} />
          </div>
        </section>
      </SmoothScroll>
    );
  }

  return (
    <SmoothScroll>
      <div className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1200px]">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-[11px] uppercase tracking-[0.35em] text-black/60 hover:text-black"
          >
            Back
          </button>
          <h1 className="mt-8 text-4xl font-semibold uppercase tracking-[-0.03em] text-black">{work.title}</h1>
          <p className="mt-3 text-sm text-black/60">{work.meta}</p>
          <div className="mt-10 border border-dashed border-black/30 bg-white/70 p-6 text-sm text-black/70">
            Case study page not built yet for this project.
          </div>
        </div>
      </div>
    </SmoothScroll>
  );
}
