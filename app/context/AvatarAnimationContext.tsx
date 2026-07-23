"use client";

import React, { createContext, useState } from "react";

export const AvatarAnimationContext = createContext<{
  avaterInView: boolean;
  setAvaterInView: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  avaterInView: true,
  setAvaterInView: () => {},
});

const AvatarAnimationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [avaterInView, setAvaterInView] = useState(true);

  return (
    <AvatarAnimationContext.Provider value={{ avaterInView, setAvaterInView }}>
      {children}
    </AvatarAnimationContext.Provider>
  );
};

export default AvatarAnimationProvider;
