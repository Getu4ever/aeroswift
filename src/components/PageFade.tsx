"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

/**
 * Gentle page slide-in — remounts on route change so the animation
 * always plays (same feel as destinations / deals / about).
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
