import { MoreVertical, Star, Trash2, Users } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { getFileIcon } from "~/hooks/get-file-icon";
import type { AppFile, AppFolder } from "~/lib/mock-data";

export function ListView({
  items,
  navigateToFolder,
}: {
  items: (AppFile | AppFolder)[];
  navigateToFolder: (folderId: string) => void;
}) {
  return (
    <div className="space-y-1">
      {items.map((item) => (
        <div
          key={item.id}
          className="hover:bg-muted/50 group flex cursor-pointer items-center gap-4 rounded-lg p-3"
          onClick={() => {
            if (item.type === "folder") {
              navigateToFolder(item.id);
            } else if (item.url) {
              window.open(item.url, "_blank");
            }
          }}
        >
          <div className="flex-shrink-0">{getFileIcon(item.type)}</div>
          <div className="min-w-0 flex-1">
            <h3 className="text-foreground truncate text-sm font-medium">
              {item.name}
            </h3>
          </div>
          <div className="text-muted-foreground w-20 flex-shrink-0 text-sm">
            {item.type !== "folder" ? item.size : "—"}
          </div>
          <div className="text-muted-foreground w-24 flex-shrink-0 text-sm">
            {item.modified}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 transition-opacity group-hover:opacity-100"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Star className="mr-2 h-4 w-4" />
                Add to starred
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 dark:text-red-400">
                <Trash2 className="mr-2 h-4 w-4" />
                Move to trash
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  );
}
