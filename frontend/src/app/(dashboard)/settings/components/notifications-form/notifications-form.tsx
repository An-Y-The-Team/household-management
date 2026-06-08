"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export function NotificationsForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-muted-foreground text-sm">
          Configure how you receive notifications.
        </p>
      </div>
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Email Notifications</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <label className="text-base font-medium">
                Communication emails
              </label>
              <p className="text-muted-foreground text-sm">
                Receive emails about your account activity.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <label className="text-base font-medium">Marketing emails</label>
              <p className="text-muted-foreground text-sm">
                Receive emails about new products, features, and more.
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <label className="text-base font-medium">Social emails</label>
              <p className="text-muted-foreground text-sm">
                Receive emails for friend requests, follows, and more.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
        <Button>Update notifications</Button>
      </div>
    </div>
  );
}
