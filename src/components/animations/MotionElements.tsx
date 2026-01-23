import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

// Fade up animation for sections
export const FadeIn = ({ 
  children, 
  delay = 0,
  duration = 0.5,
  className = "",
  ...props 
}: { 
  children: ReactNode; 
  delay?: number;
  duration?: number;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children">) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration, delay, ease: "easeOut" }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// Fade in when element enters viewport
export const FadeInView = ({ 
  children, 
  delay = 0,
  duration = 0.6,
  className = "",
  ...props 
}: { 
  children: ReactNode; 
  delay?: number;
  duration?: number;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children">) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration, delay, ease: "easeOut" }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// Stagger container for lists
export const StaggerContainer = ({ 
  children,
  staggerDelay = 0.1,
  className = "",
  ...props
}: { 
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children">) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    variants={{
      visible: {
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// Stagger item for use inside StaggerContainer
export const StaggerItem = ({ 
  children,
  className = "",
  ...props
}: { 
  children: ReactNode;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children">) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// Scale on hover for interactive elements
export const ScaleOnHover = ({ 
  children,
  scale = 1.02,
  className = "",
  ...props
}: { 
  children: ReactNode;
  scale?: number;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children">) => (
  <motion.div
    whileHover={{ scale }}
    transition={{ duration: 0.2 }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// Page transition wrapper
export const PageTransition = ({ 
  children,
  className = "",
}: { 
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className={className}
  >
    {children}
  </motion.div>
);

// Hero section animation with staggered children
export const HeroAnimation = ({ 
  children,
  className = "",
}: { 
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.1,
        },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const HeroItem = ({ 
  children,
  className = "",
}: { 
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Image reveal animation
export const ImageReveal = ({ 
  children,
  className = "",
  delay = 0,
}: { 
  children: ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);
