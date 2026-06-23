"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Photo = {
  id: string;
  url: string;
  title_es: string | null;
  title_en: string | null;
};

type Props = {
  photos: Photo[];
  currentIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  locale: string;
};

export default function Lightbox({
  photos,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  locale,
}: Props) {
  const photo = currentIndex !== null ? photos[currentIndex] : null;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    if (currentIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [currentIndex]);

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Cerrar */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors cursor-pointer z-10"
          >
            <X size={24} />
          </button>

          {/* Anterior */}
          {currentIndex !== null && currentIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-4 text-white/60 hover:text-white transition-colors cursor-pointer z-10"
            >
              <ChevronLeft size={36} />
            </button>
          )}

          {/* Imagen */}
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-5xl max-h-[85vh] mx-12"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photo.url}
              alt={
                locale === "es"
                  ? photo.title_es || ""
                  : photo.title_en || photo.title_es || ""
              }
              className="max-h-[85vh] max-w-full object-contain rounded"
            />
            {(photo.title_es || photo.title_en) && (
              <p className="text-white/60 text-sm text-center mt-3 font-serif">
                {locale === "es"
                  ? photo.title_es
                  : photo.title_en || photo.title_es}
              </p>
            )}
          </motion.div>

          {/* Siguiente */}
          {currentIndex !== null && currentIndex < photos.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 text-white/60 hover:text-white transition-colors cursor-pointer z-10"
            >
              <ChevronRight size={36} />
            </button>
          )}

          {/* Contador */}
          {currentIndex !== null && (
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-xs">
              {currentIndex + 1} / {photos.length}
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
