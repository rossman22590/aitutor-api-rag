import React from "react";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input">
>((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={`p-2 border rounded ${props.className || ""}`}
    />
  );
});

Input.displayName = "Input";
