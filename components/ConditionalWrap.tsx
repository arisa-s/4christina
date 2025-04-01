"use client";

import React from "react";

interface ConditionalWrapProps {
  children: React.ReactElement;
  condition: boolean;
  wrapper: (children: React.ReactElement) => JSX.Element;
}

const ConditionalWrap: React.FC<ConditionalWrapProps> = ({
  condition,
  wrapper,
  children,
}) => {
  if (!condition) return children;

  return wrapper(children);
};

export default ConditionalWrap;
