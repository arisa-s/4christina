"use client";

import React from "react";

type ConditionalWrapProps = {
  condition: boolean;
  wrapper: (children: JSX.Element) => JSX.Element;
  children: React.ReactNode;
};

export default function ConditionalWrap({
  condition,
  wrapper,
  children,
}: ConditionalWrapProps) {
  return condition ? wrapper(<>{children}</>) : <>{children}</>;
}
