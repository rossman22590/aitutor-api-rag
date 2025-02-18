import React from "react";

export const Skeleton = ({ className }: { className?: string }) => {
  return <div className={`animate-pulse bg-gray-300 ${className}`} />;
};
