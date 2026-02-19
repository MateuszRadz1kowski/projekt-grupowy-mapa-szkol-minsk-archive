"use client";

import { FC, ReactNode, useState } from "react";
import { PlusIcon, XIcon } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

interface FamilyButtonProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
}

const FamilyButtonCommuteBoard: React.FC<FamilyButtonProps> = ({
  children,
  width,
  height,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={cn(
        "rounded-[24px] border border-neutral-200 shadow-sm dark:border-neutral-200",
        "bg-gradient-to-b from-neutral-100 to-neutral-200",
        isExpanded
          ? "bg-gradient-to-b dark:from-neutral-200 dark:to-neutral-100 z-index: 50;"
          : "bg-gradient-to-b dark:from-neutral-100 dark:to-neutral-200"
      )}
    >
      <div className="rounded-[23px] border border-neutral-200">
        <div className="rounded-[22px] border dark:border-neutral-200 border-neutral-300">
          <div className="rounded-[21px] border border-neutral-200/50 flex items-center justify-center">
            <FamilyButtonContainer
              isExpanded={isExpanded}
              toggleExpand={toggleExpand}
              width={width}
              height={height}
            >
              {isExpanded ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      delay: 0.3,
                      duration: 0.4,
                      ease: "easeOut",
                    },
                  }}
                >
                  {children}
                </motion.div>
              ) : null}
            </FamilyButtonContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FamilyButtonContainerProps {
  isExpanded: boolean;
  toggleExpand: () => void;
  children: ReactNode;
  width: number;
  height: number;
}

const FamilyButtonContainer: FC<FamilyButtonContainerProps> = ({
  isExpanded,
  toggleExpand,
  children,
  width,
  height,
}) => {
  return (
    <motion.div
      className={cn(
        "relative border-white/10 border shadow-lg flex flex-col space-y-1 items-center text-white cursor-pointer z-10",
        !isExpanded
          ? "bg-gradient-to-b from-neutral-200 to-stone-200 dark:from-stone-100 dark:to-neutral-800/80"
          : ""
      )}
      layoutRoot
      layout
      initial={{ borderRadius: 21, width: "4rem", height: "4rem" }}
      animate={
        isExpanded
          ? {
              borderRadius: 20,
              width,
              height,
              transition: {
                type: "spring",
                damping: 25,
                stiffness: 300,
                when: "beforeChildren",
              },
            }
          : {
              borderRadius: 21,
              width: "4rem",
              height: "4rem",
            }
      }
    >
      {children}
      <motion.div
        className="absolute"
        initial={{ x: "-50%" }}
        animate={{
          x: isExpanded ? "0%" : "-50%",
          transition: {
            type: "tween",
            ease: "easeOut",
            duration: 0.3,
          },
        }}
        style={{ left: isExpanded ? "" : "50%", top: 6 }}
      >
        {isExpanded ? (
          <motion.div
            className="p-[10px] group bg-neutral-800/50 dark:bg-black/50 border border-cyan-100/30 hover:border-neutral-200 text-orange-50 rounded-full shadow-2xl transition-colors duration-300"
            onClick={toggleExpand}
            layoutId="expand-toggle"
            initial={false}
            animate={{ rotate: -360, transition: { duration: 0.4 } }}
          >
            <XIcon className="h-7 w-7 text-cyan-100/30 dark:text-neutral-400/80 group-hover:text-neutral-500 transition-colors duration-200" />
          </motion.div>
        ) : (
          <motion.div
            className="p-[10px] group bg-neutral-200 dark:bg-cyan-500/90 text-cyan-50 border border-cyan-100/10 shadow-2xl transition-colors duration-200"
            style={{ borderRadius: 24 }}
            onClick={toggleExpand}
            layoutId="expand-toggle"
            initial={{ rotate: 180 }}
            animate={{ rotate: -180, transition: { duration: 0.4 } }}
          >
            <PlusIcon className="h-7 w-7 text-black dark:text-neutral-900" />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export { FamilyButtonCommuteBoard };
