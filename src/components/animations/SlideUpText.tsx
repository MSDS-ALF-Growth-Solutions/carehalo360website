import { motion, useReducedMotion } from "framer-motion";
import { ReactNode, useMemo } from "react";

type Props = {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  /** Stagger between words */
  stagger?: number;
  /** Trigger on viewport enter (true) or on mount (false) */
  inView?: boolean;
};

/**
 * Yucca-style line/word slide-up reveal.
 * Each word sits inside an overflow-hidden mask and translates from 110% → 0.
 */
export default function SlideUpText({
  children,
  as = "span",
  className = "",
  delay = 0,
  stagger = 0.05,
  inView = true,
}: Props) {
  const reduce = useReducedMotion();
  const words = useMemo(() => children.split(/(\s+)/), [children]);

  const Tag = motion[as] as typeof motion.span;

  if (reduce) {
    const Static = as as keyof JSX.IntrinsicElements;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      {...(inView
        ? { whileInView: "visible", viewport: { once: true, margin: "-10%" } }
        : { animate: "visible" })}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      variants={{ hidden: {}, visible: {} }}
    >
      {words.map((word, i) =>
        /^\s+$/.test(word) ? (
          <span key={i}>{word}</span>
        ) : (
          <span
            key={i}
            style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", lineHeight: 1.05 }}
          >
            <motion.span
              style={{ display: "inline-block", willChange: "transform" }}
              variants={{
                hidden: { y: "110%" },
                visible: { y: "0%", transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              {word}
            </motion.span>
          </span>
        )
      )}
    </Tag>
  );
}
