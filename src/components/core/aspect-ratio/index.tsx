import React, { CSSProperties } from "react";

const CONTENT_DIV_STYLE: CSSProperties = {
  height: "100%",
  left: 0,
  position: "absolute",
  top: 0,
  width: "100%"
};

const RATIO_DIV_STYLE: CSSProperties = {
  height: 0,
  position: "relative",
  width: "100%"
};

interface AspectRatioProps {
  children;
  className?: string;
  contentClassName?: string;
  ratio?: number;
  ratioClassName?: string;
  style?;
  tagName?: string;
  [x: string]: any;
}

export function AspectRatio({
  children,
  className,
  contentClassName,
  ratio = 1,
  ratioClassName,
  style = {},
  ...extra
}: AspectRatioProps) {
  const paddingTop = ratio === 0 ? 100 : 100 / ratio;

  return (
    <div {...extra} className={`ratio ${className}`} style={{ display: "block", ...style }}>
      <div
        className={`ratio-ratio ${ratioClassName}`}
        style={{ ...RATIO_DIV_STYLE, paddingTop: `${paddingTop}%` }}
      >
        <div className={`ratio-content ${contentClassName}`} style={CONTENT_DIV_STYLE}>
          {children}
        </div>
      </div>
    </div>
  );
}
