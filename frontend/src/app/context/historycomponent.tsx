"use client";
import { useState } from "react";
import { Historycontext } from "./historycontext";

export const HistoryComponent = ({ children }: any) => {
  const [historydata, sethistorydata] = useState([]);
  return (
    <Historycontext.Provider value={{ historydata, sethistorydata }}>
      {children}
    </Historycontext.Provider>
  );
};
