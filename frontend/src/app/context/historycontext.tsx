"use client";
import { Context, createContext } from "react";
type customdata = {
  historydata: any;
  sethistorydata: (data: any) => void;
};

export const Historycontext = createContext<customdata | undefined | any>([]);
