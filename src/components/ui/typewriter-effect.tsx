"use client"
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const TypewriterEffect = ({ words, className, cursorClassName, }: { words: { text: string; className?: string; }[]; className?: string; cursorClassName?: string; }) => {
  const wordsArray = words.map((word) => ({ ...word, text: word.text.split("") }));

  const renderWords = () => (
    <div>
      {wordsArray.map((word, idx) => (
        <div key={`word-${idx}`} className="inline-block">
          {word.text.map((char, index) => (
            <span key={`char-${index}`} className={cn(`dark:text-white text-black`, word.className)}>
              {char}
            </span>
          ))}
          &nbsp;
        </div>
      ))}
    </div>
  );

  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setReverse(prev => !prev), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("flex gap-x-1", className)}>
      <motion.div
        className="overflow-hidden pt-3 xl:pt-0"
        initial={{ width: reverse ? "fit-content" : "0%" }}
        animate={{ width: reverse ? "0%" : "fit-content" }}
        transition={{ duration: 2, ease: "linear" }}
      >
        <div className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-bold" style={{ whiteSpace: "nowrap" }}>
          {renderWords()}{" "}
        </div>
      </motion.div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className={cn("block rounded-sm w-[4px] h-12 bg-white", cursorClassName)}
      ></motion.span>
    </div>
  );
};
