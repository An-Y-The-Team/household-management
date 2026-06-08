"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export function DisplayForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Display</h3>
        <p className="text-muted-foreground text-sm">
          Turn items on or off to control what&apos;s displayed in the app.
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="mb-4">
            <h4 className="text-sm font-medium">Sidebar</h4>
            <p className="text-muted-foreground text-sm">
              Select the items you want to display in the sidebar.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex flex-row items-start space-x-3 space-y-0">
              <Checkbox id="recents" defaultChecked />
              <div className="space-y-1 leading-none">
                <label htmlFor="recents" className="text-sm font-medium">
                  Recents
                </label>
              </div>
            </div>
            <div className="flex flex-row items-start space-x-3 space-y-0">
              <Checkbox id="home" defaultChecked />
              <div className="space-y-1 leading-none">
                <label htmlFor="home" className="text-sm font-medium">
                  Home
                </label>
              </div>
            </div>
            <div className="flex flex-row items-start space-x-3 space-y-0">
              <Checkbox id="applications" />
              <div className="space-y-1 leading-none">
                <label htmlFor="applications" className="text-sm font-medium">
                  Applications
                </label>
              </div>
            </div>
            <div className="flex flex-row items-start space-x-3 space-y-0">
              <Checkbox id="desktop" />
              <div className="space-y-1 leading-none">
                <label htmlFor="desktop" className="text-sm font-medium">
                  Desktop
                </label>
              </div>
            </div>
            <div className="flex flex-row items-start space-x-3 space-y-0">
              <Checkbox id="downloads" />
              <div className="space-y-1 leading-none">
                <label htmlFor="downloads" className="text-sm font-medium">
                  Downloads
                </label>
              </div>
            </div>
          </div>
        </div>
        <Button>Update display</Button>
      </div>
    </div>
  );
}
