"use client";
import { ThemeProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <NextUIProvider>{children}</NextUIProvider>
    </ThemeProvider>
  );
}

export default Providers;
