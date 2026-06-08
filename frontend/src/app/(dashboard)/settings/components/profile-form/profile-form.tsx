"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ProfileForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-muted-foreground text-sm">
          This is how others will see you on the site.
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" defaultValue="thienydo" />
          <p className="text-muted-foreground text-[0.8rem]">
            This is your public display name. It can be your real name or a
            pseudonym.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            defaultValue="thien@example.com"
            disabled
          />
          <p className="text-muted-foreground text-[0.8rem]">
            You can manage verified email addresses in your account settings.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell us a little bit about yourself"
            className="resize-none"
            defaultValue="Software Engineer building tools for household management."
          />
          <p className="text-muted-foreground text-[0.8rem]">
            You can @mention other users and organizations to link to them.
          </p>
        </div>
        <Button>Update profile</Button>
      </div>
    </div>
  );
}
