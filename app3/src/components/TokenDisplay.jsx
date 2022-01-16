import { useState } from "react";
import { useAppContext } from "../data/hooks/hook";

export function TokenDisplay() {
  const [visible, setVisible] = useState(false);

  const { authCtx } = useAppContext();

  return (
    <div>
      <h3>{visible ? authCtx.token : authCtx.token.replace(/./g, "*")}</h3>
      <button type="button" onClick={() => setVisible(!visible)}>
        Mostrar/Esconder
      </button>
    </div>
  );
}
