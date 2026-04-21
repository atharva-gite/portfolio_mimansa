import * as pdfjs from "pdfjs-dist";

const pdfBySrc = new Map();

export function getPdfDocument(pdfSrc) {
  if (!pdfSrc) return Promise.reject(new Error("Missing pdfSrc"));
  const existing = pdfBySrc.get(pdfSrc);
  if (existing) return existing;

  const task = pdfjs.getDocument(pdfSrc);
  const promise = task.promise;
  pdfBySrc.set(pdfSrc, promise);
  return promise;
}

export function prefetchPdf(pdfSrc) {
  // Fire-and-forget: warms cache so navigation feels instantaneous.
  getPdfDocument(pdfSrc).catch(() => {});
}

