"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "./Lightbox";

type Photo = {
  id: string;
  url: string;
  title_es: string | null;
  title_en: string | null;
};

type Props = {
  photos: Photo[];
  locale: string;
};

export default function PhotoGallery({ photos, locale }: Props) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  return (
    <>
      <div className="columns-2 md:columns-3 gap-3 space-y-3">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="break-inside-avoid mb-3 overflow-hidden rounded group cursor-pointer relative"
            onClick={() => setCurrentIndex(index)}
          >
            <img
              src={photo.url}
              alt={
                locale === "es"
                  ? photo.title_es || ""
                  : photo.title_en || photo.title_es || ""
              }
              className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {(photo.title_es || photo.title_en) && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-4">
                <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity font-serif">
                  {locale === "es"
                    ? photo.title_es
                    : photo.title_en || photo.title_es}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <Lightbox
        photos={photos}
        currentIndex={currentIndex}
        onClose={() => setCurrentIndex(null)}
        onPrev={() => setCurrentIndex((i) => (i !== null && i > 0 ? i - 1 : i))}
        onNext={() =>
          setCurrentIndex((i) =>
            i !== null && i < photos.length - 1 ? i + 1 : i,
          )
        }
        locale={locale}
      />
    </>
  );
}
