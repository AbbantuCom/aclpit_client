'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Img from './Img';

type Shape = 'portrait' | 'square' | 'landscape';

/** How much of the 12-column row the cover and the text get, by the cover's shape. */
const COLUMNS: Record<Shape, { cover: string; text: string }> = {
  portrait: { cover: 'lg:col-span-4', text: 'lg:col-span-8' },
  square: { cover: 'lg:col-span-5', text: 'lg:col-span-7' },
  landscape: { cover: 'lg:col-span-7', text: 'lg:col-span-5' },
};

function shapeOf(img: HTMLImageElement): Shape | null {
  const { naturalWidth: w, naturalHeight: h } = img;
  if (!w || !h) return null;
  const ratio = w / h;
  return ratio > 1.15 ? 'landscape' : ratio < 0.87 ? 'portrait' : 'square';
}

/**
 * A publication page's cover beside its text. The cover is always shown whole —
 * never cropped — and the layout follows its shape: a portrait cover gets a
 * narrow column, a landscape one the wider side of the page, so neither ends up
 * tiny or oversized. The shape is read from the image once it loads; until then
 * the page assumes portrait, which is what most publication covers are.
 */
export default function PublicationCoverLayout({
  src,
  alt,
  children,
}: {
  /** Cover image; without one the text takes the full width. */
  src: string;
  alt: string;
  children: ReactNode;
}) {
  const [shape, setShape] = useState<Shape>('portrait');
  const ref = useRef<HTMLImageElement>(null);

  /**
   * Reads the size now and stores only the result. The image must not be read
   * inside a setState updater: React may run that later, after it has cleared
   * the load event's `currentTarget`.
   */
  function measure(img: HTMLImageElement | null) {
    const next = img ? shapeOf(img) : null;
    if (next) setShape(next);
  }

  // A cached image can finish loading before React attaches onLoad.
  useEffect(() => {
    if (ref.current?.complete) measure(ref.current);
  }, [src]);

  if (!src) {
    return (
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-12 reveal reveal-delay-1">{children}</div>
      </div>
    );
  }

  const cols = COLUMNS[shape];
  return (
    <div className="grid lg:grid-cols-12 gap-12 items-start">
      <div className={`${cols.cover} reveal`}>
        <div className="pub-cover-full" data-shape={shape}>
          <Img
            ref={ref}
            src={src}
            alt={alt}
            onLoad={(e) => measure(e.currentTarget)}
          />
        </div>
      </div>
      <div className={`${cols.text} reveal reveal-delay-1`}>{children}</div>
    </div>
  );
}
