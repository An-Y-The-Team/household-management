"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function AppearanceForm() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-muted-foreground text-sm">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Theme</Label>
          <p className="text-muted-foreground text-[0.8rem]">
            Select the theme for the dashboard.
          </p>
          <div className="grid max-w-md grid-cols-2 gap-4 pt-2">
            <button
              onClick={() => setTheme("light")}
              className={`border-muted hover:border-accent items-center rounded-md border-2 p-1 ${
                theme === "light" ? "border-primary" : ""
              }`}
            >
              <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="size-4 rounded-full bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="size-4 rounded-full bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                Light
              </span>
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`border-muted hover:border-accent items-center rounded-md border-2 p-1 ${
                theme === "dark" ? "border-primary" : ""
              }`}
            >
              <div className="bg-slate-950 space-y-2 rounded-sm p-2">
                <div className="bg-slate-800 space-y-2 rounded-md p-2 shadow-sm">
                  <div className="bg-slate-400 h-2 w-[80px] rounded-lg" />
                  <div className="bg-slate-400 h-2 w-[100px] rounded-lg" />
                </div>
                <div className="bg-slate-800 flex items-center space-x-2 rounded-md p-2 shadow-sm">
                  <div className="bg-slate-400 size-4 rounded-full" />
                  <div className="bg-slate-400 h-2 w-[100px] rounded-lg" />
                </div>
                <div className="bg-slate-800 flex items-center space-x-2 rounded-md p-2 shadow-sm">
                  <div className="bg-slate-400 size-4 rounded-full" />
                  <div className="bg-slate-400 h-2 w-[100px] rounded-lg" />
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                Dark
              </span>
            </button>
          </div>
        </div>
        <Button>Update preferences</Button>
      </div>
    </div>
  );
}
