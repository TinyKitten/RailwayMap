"use client";
import { ReactNode } from "react";
import { SWRConfig } from "swr";

type Props = { children: ReactNode };

export const Providers = ({ children }: Props) => (
  <SWRConfig>{children}</SWRConfig>
);
