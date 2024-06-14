import React from "react";
import { AppLogo } from "./AppLogo";

export const Credit: React.FC = () => (
  <footer className="fixed right-[32px] bottom-[48px] flex flex-col items-end opacity-50">
    <AppLogo className="w-24 h-auto" />
    <p className="text-[10px] margin-0 select-none">
      A product of{" "}
      <span className="no-underline font-bold outline-none">TinyKitten</span>
    </p>
  </footer>
);
