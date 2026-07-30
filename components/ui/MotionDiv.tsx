'use client';

import { HTMLMotionProps, motion } from 'framer-motion';
import { ReactNode } from 'react';

type MotionDivProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
};

export default function MotionDiv({
  children,
  ...props
}: MotionDivProps) {
  return (
    <motion.div {...props}>
      {children}
    </motion.div>
  );
} 