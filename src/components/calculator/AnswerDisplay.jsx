import React, { useEffect, useRef, useState } from "react";

import { createEmptyResult } from "./utils";

const AnswerDisplay = ({ result, placeholderValue = "0" }) => {
  const output = result ?? createEmptyResult();

  const isPlaceholder = Boolean(output.placeholder);
  const hasError = Boolean(output.error);
  const value =
    !isPlaceholder && !hasError && typeof output.value === "string"
      ? output.value
      : placeholderValue;

  const digitCount = String(value).replace(/[^0-9]/g, "").length;
  const valueSizeClass =
    digitCount > 18
      ? "text-2xl"
      : digitCount > 13
        ? "text-3xl"
        : digitCount > 9
          ? "text-4xl"
          : "text-5xl";

  const [isBumping, setIsBumping] = useState(false);
  const previousValueRef = useRef(value);
  const bumpTimeoutRef = useRef(null);

  useEffect(() => {
    if (isPlaceholder || hasError) {
      previousValueRef.current = value;
      return undefined;
    }

    if (previousValueRef.current !== value) {
      setIsBumping(true);
      if (bumpTimeoutRef.current) clearTimeout(bumpTimeoutRef.current);
      bumpTimeoutRef.current = setTimeout(() => {
        setIsBumping(false);
      }, 180);
    }

    previousValueRef.current = value;

    return () => {
      if (bumpTimeoutRef.current) clearTimeout(bumpTimeoutRef.current);
    };
  }, [value, isPlaceholder, hasError]);

  return (
    <div className="h-1/2 border-t border-gray-200 pt-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
        Answer
      </p>
      <p
        aria-live="polite"
        aria-atomic="true"
        className={
          isPlaceholder || hasError
            ? `mt-2 w-full select-none whitespace-nowrap overflow-hidden text-clip font-semibold tabular-nums leading-none tracking-tight text-orange-400/40 transition-transform duration-200 ease-out motion-reduce:transition-none ${valueSizeClass}`
            : `mt-2 w-full whitespace-nowrap overflow-hidden text-clip font-semibold tabular-nums leading-none tracking-tight text-orange-400 transition-transform duration-200 ease-out motion-reduce:transition-none motion-reduce:transform-none ${valueSizeClass} ${
                isBumping ? "scale-105" : "scale-100"
              }`
        }
      >
        {value}
      </p>
      {hasError ? (
        <p role="alert" className="mt-2 text-sm font-medium text-red-600">
          {output.error}
        </p>
      ) : null}
    </div>
  );
};

export { AnswerDisplay };
