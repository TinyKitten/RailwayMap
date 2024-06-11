import React from "react";
import { AppLogo } from "./AppLogo";

export const Credit: React.FC = () => (
  <footer className="fixed right-[32px] bottom-[48px] flex flex-col items-end opacity-50">
    <AppLogo className="mb-1" width={127.5} height={38.4} />
    <p className="text-xs margin-0 select-none">
      A product of{" "}
      <a
        className="no-underline text-xs font-bold outline-none"
        target="_blank"
        rel="noreferrer noopener"
        href="https://tinykitten.me"
      >
        TinyKitten
      </a>
    </p>
  </footer>
);
