import type { Dispatch, SetStateAction } from "react";
import { HardDrive, Search, Upload } from "lucide-react";

import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export function NavBar({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}) {
  return (
    <header className="border-border border-b px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-500">
            <HardDrive className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-foreground text-xl font-medium">Drive</h1>
        </div>

        <div className="mx-4 max-w-2xl flex-1">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />
            <Input
              placeholder="Search in Drive"
              className="bg-muted border-border pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="space-x-4">
          <Button variant="default">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
