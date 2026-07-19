"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

/**
 * Gentle page slide-in — remounts on route change so the animation
 * always plays. Avoids opacity:0 in SSR HTML (bad for indexing).
 */
export default function PageFade({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
