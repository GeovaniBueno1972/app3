import { AuthProvider } from "./AuthContext";
import { UIProvider } from "./UIContext";



export function ContextWrapper(props) {
  return (
    <AuthProvider>
      <UIProvider>{props.children}</UIProvider>
    </AuthProvider>
  );
}