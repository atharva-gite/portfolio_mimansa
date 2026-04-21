import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fadeUp, staggerContainer } from "../../utils/animations";
import { prefetchPdf } from "../../utils/pdfCache";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import PortfolioImage from "../ui/PortfolioImage";
import SlidesThumbnail from "../ui/SlidesThumbnail";

export default function SelectedWorks({ data }) {
  const navigate = useNavigate();

  useEffect(() => {
    data.items.forEach((item) => {
      if (item.pdfPreviewSrc) prefetchPdf(item.pdfPreviewSrc);
    });
  }, [data.items]);

  return (
    <section id={data.sectionId} className="relative border-b border-black/10 px-6 py-20 sm:px-10 lg:px-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={staggerContainer}
      >
        <Container>
          <motion.div variants={fadeUp} className="mb-10">
            <SectionLabel index={data.index} label={data.label} />
          </motion.div>

          <motion.div variants={fadeUp} className="mb-12 max-w-2xl">
            <h2 className="text-4xl font-semibold uppercase tracking-[-0.03em] text-black">Selected Works</h2>
            <p className="mt-4 text-sm text-black/60">{data.intro}</p>
          </motion.div>

          <div className="border-t border-black/20">
            {data.items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(`/work/${item.id}`)}
                className="group grid w-full gap-8 border-b border-black/10 py-10 text-left transition hover:bg-black/[0.02] md:grid-cols-[0.65fr_0.35fr]"
              >
                <div className="flex items-start gap-6">
                  <div className="text-[12px] uppercase tracking-[0.3em] text-black/40">{item.id}</div>
                  <div>
                    <h3 className="text-3xl font-semibold uppercase tracking-[-0.03em] text-black">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm text-black/60">{item.meta}</p>
                    <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-black/40 transition group-hover:text-black/60">
                      Open project page
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-start md:justify-end">
                  <div className="w-full max-w-[180px] overflow-hidden rounded-[12px] border border-black/10 bg-white/80">
                    {item.pdfPreviewSrc ? (
                      <SlidesThumbnail
                        pdfSrc={item.pdfPreviewSrc}
                        label={`Work ${item.id} preview (PDF)`}
                        className="h-auto w-full"
                      />
                    ) : (
                      <PortfolioImage
                        src={item.image}
                        alt={item.title}
                        label={`Work ${item.id}`}
                        className="h-24 w-full object-cover"
                      />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
