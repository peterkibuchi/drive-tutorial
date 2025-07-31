import { Card, CardContent } from "~/components/ui/card";
import { getFileIcon } from "~/hooks/get-file-icon";
import type { AppFile, AppFolder } from "~/lib/mock-data";

export function GridView({
  items,
  navigateToFolder,
}: {
  items: (AppFile | AppFolder)[];
  navigateToFolder: (folderId: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
      {items.map((item) => (
        <Card
          key={item.id}
          className="group cursor-pointer transition-shadow hover:shadow-md"
          onClick={() => {
            if (item.type === "folder") {
              navigateToFolder(item.id);
            } else if (item.url) {
              window.open(item.url, "_blank");
            }
          }}
        >
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-3">{getFileIcon(item.type)}</div>
              <h3 className="text-foreground mb-1 w-full truncate text-sm font-medium">
                {item.name}
              </h3>
              <p className="text-muted-foreground text-xs">{item.modified}</p>
              {item.type !== "folder" && (
                <p className="text-muted-foreground text-xs">{item.size}</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
