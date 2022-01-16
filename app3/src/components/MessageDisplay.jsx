import { useAppContext } from "../data/hooks/hook";

export function MessageDisplay() {
  const { uiCtx } = useAppContext();

  return <h3>{uiCtx.message === "" ? "..." : uiCtx.message}</h3>;
}
