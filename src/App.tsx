import { ThemeProvider } from "./contexts/ThemeProvider";
import Component_DnD from "./features/DnD/Component_DnD";
import Component_DynaForm from "./features/DynaForm/Component_DynaForm";
import { ModeToggle } from "./features/ModeToggle";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative">
        <ModeToggle />
        <Component_DnD />
        <Component_DynaForm />
      </div>
    </ThemeProvider>
  );
}
