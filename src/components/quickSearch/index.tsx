"use client";

import * as React from "react";
import { useNavigate } from "react-router-dom";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { quickSearchRoutes } from "@/config/quickSearchRoutes";

export function CommandQuickSearchRoutes() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  // Keyboard shortcut: Open dialog on "Cmd + J" or "Ctrl + J"
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <p className="text-sm text-muted-foreground text-white">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>k
        </kbd>{" "}
        to search and navigate
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a route or command..." />

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            {quickSearchRoutes.map(({ name, path, icon: Icon }) => (
              <CommandItem
                key={path}
                onSelect={() => {
                  navigate(path);
                  setOpen(false);
                }}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{name}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* <CommandGroup heading="Settings">
            <CommandItem>
              <User />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup> */}
        </CommandList>
      </CommandDialog>
    </>
  );
}
