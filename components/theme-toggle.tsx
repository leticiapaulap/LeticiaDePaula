"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribe = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Tooltip.Provider delayDuration={180}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            className="icon-button focusable"
            type="button"
            aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="tooltip-content" sideOffset={8}>
            {isDark ? "Tema claro" : "Tema escuro"}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
