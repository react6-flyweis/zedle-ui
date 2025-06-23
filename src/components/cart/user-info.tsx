"use client";

import { UserIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface UserInfoProps {
  name: string;
  phone: string;
}

export default function UserInfo({ name, phone }: UserInfoProps) {
  return (
    <Card className="rounded-none shadow-none gap-0">
      <CardHeader className="relative">
        <div className="absolute size-12 bg-black -left-10 top-0 flex items-center justify-center">
          <UserIcon className="size-6 text-white" />
        </div>
      </CardHeader>
      <CardContent className="">
        <h3 className="font-semibold text-lg">Logged in</h3>
        <p className="text-accent-foreground">
          {name} | {phone}
        </p>
      </CardContent>
    </Card>
  );
}
