import { createContext, useContext } from "react";
import { IExtraActions } from "./types";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const ExtraActionsContext = createContext<IExtraActions>();

export function useExtraActions(): IExtraActions {
  return useContext(ExtraActionsContext);
}