"use client";

import { useState } from "react";
import { ChevronRight, Grid3X3, HardDrive, List } from "lucide-react";

import { GridView } from "~/components/grid-view";
import { NavBar } from "~/components/layout/navbar";
import { ListView } from "~/components/list-view";
import { Button } from "~/components/ui/button";
import { mockData, type AppFile, type AppFolder } from "~/lib/mock-data";

export default function GoogleDriveClone() {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getCurrentItems = (): (AppFile | AppFolder)[] => {
    let items = mockData.children;
    if (!items) return [];

    for (const pathSegment of currentPath) {
      const folder = items.find(
        (item) => item.id === pathSegment && item.type === "folder",
      ) as AppFolder;

      if (!folder) {
        return []; // Folder doesn't exist - invalid path
      }

      items = folder.children ?? []; // Use empty array if no children
    }

    return items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  const getFolderNameById = (folderId: string): string => {
    const findFolderRecursively = (
      items: (AppFile | AppFolder)[],
    ): string | null => {
      for (const item of items) {
        if (item.id === folderId && item.type === "folder") {
          return item.name;
        }
        if (item.type === "folder" && item.children) {
          const found = findFolderRecursively(item.children);
          if (found) return found;
        }
      }
      return null;
    };

    return findFolderRecursively(mockData.children ?? []) ?? folderId;
  };

  const navigateToFolder = (folderId: string) => {
    setCurrentPath([...currentPath, folderId]);
  };

  const navigateToPath = (index: number) => {
    setCurrentPath(currentPath.slice(0, index + 1));
  };

  const goHome = () => {
    setCurrentPath([]);
  };

  const currentItems = getCurrentItems();

  return (
    <div className="bg-background min-h-screen">
      <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Main Content */}
      <main className="p-6">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2">
          <Button
            variant="ghost"
            className="h-auto p-0 font-normal text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            onClick={goHome}
          >
            My Drive
          </Button>

          {currentPath.map((segment, index) => (
            <div key={index} className="flex items-center gap-2">
              <ChevronRight className="text-muted-foreground h-4 w-4" />
              <Button
                variant="ghost"
                className="h-auto p-0 font-normal text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                onClick={() => navigateToPath(index)}
              >
                {getFolderNameById(segment)}
              </Button>
            </div>
          ))}
        </div>

        {/* View Controls */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-foreground text-lg font-medium">
            {currentPath.length > 0
              ? getFolderNameById(currentPath[currentPath.length - 1]!)
              : "My Drive"}
          </h2>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>

            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Files Grid/List */}
        {viewMode === "grid" ? (
          <GridView items={currentItems} navigateToFolder={navigateToFolder} />
        ) : (
          <ListView items={currentItems} navigateToFolder={navigateToFolder} />
        )}

        {currentItems.length === 0 && (
          <div className="py-12 text-center">
            <HardDrive className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <h3 className="text-muted-foreground mb-2 text-lg font-medium">
              {searchQuery ? "No files found" : "This folder is empty"}
            </h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? `No files match "${searchQuery}"`
                : "Upload files or create folders to get started"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
