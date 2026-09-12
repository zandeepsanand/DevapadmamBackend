"use client";

import React, { memo } from "react";
import {
  AnimatePresence,
  motion,
  type Variants,
} from "framer-motion";
import { cn } from "@/lib/utils";

type AnimationType = "text" | "word" | "character" | "line";
type AnimationVariant =
  | "fadeIn"
  | "blurIn"
  | "blurInUp"
  | "blurInDown"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scaleUp"
  | "scaleDown";

const motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span,
} as const;

type MotionElementType = keyof typeof motionElements;

interface TextAnimateProps extends Omit<React.HTMLAttributes<HTMLElement>, "onDrag" | "onDragEnd" | "onDragStart" | "onAnimationStart"> {
  /**
   * The text content to animate
   */
  children: string;
  /**
   * The class name of the container
   */
  className?: string;
  /**
   * The class name of each segment (word, character, etc.)
   */
  segmentClassName?: string;
  /**
   * The delay before the animation starts in seconds
   */
  delay?: number;
  /**
   * The duration of the animation in seconds
   */
  duration?: number;
  /**
   * Custom motion variants
   */
  variants?: Variants;
  /**
   * The element type to render
   */
  as?: MotionElementType;
  /**
   * How to split the text ("text", "word", "character", "line")
   */
  by?: AnimationType;
  /**
   * Whether to start animation when component enters viewport
   */
  startOnView?: boolean;
  /**
   * Whether to animate only once
   */
  once?: boolean;
  /**
   * The animation preset to use
   */
  animation?: AnimationVariant;
  /**
   * Whether to enable accessibility features (default: true)
   */
  accessible?: boolean;
}

const staggerTimings: Record<AnimationType, number> = {
  text: 0.06,
  word: 0.05,
  character: 0.03,
  line: 0.06,
};

const defaultContainerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0,
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const defaultItemAnimationVariants: Record<
  AnimationVariant,
  { container: Variants; item: Variants }
> = {
  fadeIn: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 16 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.4,
        },
      },
      exit: {
        opacity: 0,
        y: 16,
        transition: { duration: 0.3 },
      },
    },
  },
  blurIn: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      show: {
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          duration: 0.4,
        },
      },
      exit: {
        opacity: 0,
        filter: "blur(10px)",
        transition: { duration: 0.3 },
      },
    },
  },
  blurInUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(8px)", y: 18 },
      show: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
          y: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.45 },
          filter: { duration: 0.4 },
        },
      },
      exit: {
        opacity: 0,
        filter: "blur(8px)",
        y: 18,
        transition: {
          y: { duration: 0.3 },
          opacity: { duration: 0.3 },
          filter: { duration: 0.3 },
        },
      },
    },
  },
  blurInDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(8px)", y: -18 },
      show: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
          y: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.45 },
          filter: { duration: 0.4 },
        },
      },
    },
  },
  slideUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: 20, opacity: 0 },
      show: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1],
        },
      },
      exit: {
        y: -20,
        opacity: 0,
        transition: {
          duration: 0.3,
        },
      },
    },
  },
  slideDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: -20, opacity: 0 },
      show: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      },
      exit: {
        y: 20,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  slideLeft: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: 20, opacity: 0 },
      show: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      },
      exit: {
        x: -20,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  slideRight: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: -20, opacity: 0 },
      show: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      },
      exit: {
        x: 20,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  scaleUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { scale: 0.7, opacity: 0 },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.4,
          scale: {
            type: "spring",
            damping: 15,
            stiffness: 300,
          },
        },
      },
      exit: {
        scale: 0.7,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  scaleDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { scale: 1.3, opacity: 0 },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.4,
          scale: {
            type: "spring",
            damping: 15,
            stiffness: 300,
          },
        },
      },
      exit: {
        scale: 1.3,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
};

const TextAnimateBase = ({
  children,
  delay = 0,
  duration = 0.35,
  variants,
  className,
  segmentClassName,
  as: Component = "p",
  startOnView = false,
  once = true,
  by = "word",
  animation = "blurInUp",
  accessible = true,
  ...props
}: TextAnimateProps) => {
  const MotionComponent = motionElements[Component] || motion.p;

  if (typeof children !== "string") {
    return <Component className={className}>{children}</Component>;
  }

  let segments: string[] = [];
  switch (by) {
    case "word":
      segments = children.split(/(\s+)/);
      break;
    case "character":
      segments = children.split("");
      break;
    case "line":
      segments = children.split("\n");
      break;
    case "text":
    default:
      segments = [children];
      break;
  }

  const selectedAnimation = animation || "blurInUp";
  const defaultAnim = defaultItemAnimationVariants[selectedAnimation] || defaultItemAnimationVariants.blurInUp;

  const finalVariants = variants
    ? {
        container: {
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              opacity: { duration: 0.01, delay },
              delayChildren: delay,
              staggerChildren: duration / Math.max(segments.length, 1),
            },
          },
          exit: {
            opacity: 0,
            transition: {
              staggerChildren: duration / Math.max(segments.length, 1),
              staggerDirection: -1,
            },
          },
        },
        item: variants,
      }
    : {
        container: {
          ...defaultAnim.container,
          show: {
            ...defaultAnim.container.show,
            transition: {
              delayChildren: delay,
              staggerChildren: duration / Math.max(segments.length, 1),
            },
          },
        },
        item: defaultAnim.item,
      };

  return (
    <AnimatePresence mode="popLayout">
      {React.createElement(
        MotionComponent as any,
        {
          variants: finalVariants.container as Variants,
          initial: "hidden",
          whileInView: startOnView ? "show" : undefined,
          animate: startOnView ? undefined : "show",
          exit: "exit",
          className: cn("whitespace-pre-wrap", className),
          viewport: { once },
          "aria-label": accessible ? children : undefined,
          ...props,
        },
        <>
          {accessible && <span className="sr-only">{children}</span>}
          {segments.map((segment, i) => (
            <motion.span
              key={`${by}-${segment}-${i}`}
              variants={finalVariants.item}
              custom={i * staggerTimings[by]}
              className={cn(
                by === "line" ? "block" : "inline-block whitespace-pre",
                segmentClassName
              )}
              aria-hidden={accessible ? true : undefined}
            >
              {segment}
            </motion.span>
          ))}
        </>
      )}
    </AnimatePresence>
  );
};

export const TextAnimate = memo(TextAnimateBase);
