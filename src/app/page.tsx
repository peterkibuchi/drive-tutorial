"use client";

import { useState } from "react";
import {
  Archive,
  ChevronRight,
  FileText,
  Folder,
  Grid3X3,
  HardDrive,
  ImageIcon,
  List,
  MoreVertical,
  Music,
  Search,
  Star,
  Trash2,
  Upload,
  Users,
  Video,
} from "lucide-react";

import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";

interface FileItem {
  id: string;
  name: string;
  type:
    | "folder"
    | "document"
    | "image"
    | "video"
    | "audio"
    | "archive"
    | "other";
  size?: string;
  modified: string;
  url?: string;
  children?: FileItem[];
}

const mockData: FileItem[] = [
  {
    id: "1",
    name: "Work Projects",
    type: "folder",
    modified: "2 days ago",
    children: [
      {
        id: "1-1",
        name: "Project Proposal.docx",
        type: "document",
        size: "2.4 MB",
        modified: "1 day ago",
        url: "#",
      },
      {
        id: "1-2",
        name: "Budget Spreadsheet.xlsx",
        type: "document",
        size: "1.8 MB",
        modified: "3 days ago",
        url: "#",
      },
      {
        id: "1-3",
        name: "Presentation Assets",
        type: "folder",
        modified: "1 week ago",
        children: [
          {
            id: "1-3-1",
            name: "logo.png",
            type: "image",
            size: "245 KB",
            modified: "1 week ago",
            url: "#",
          },
          {
            id: "1-3-2",
            name: "chart.png",
            type: "image",
            size: "189 KB",
            modified: "1 week ago",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Personal Photos",
    type: "folder",
    modified: "1 week ago",
    children: [
      {
        id: "2-1",
        name: "vacation-2024.jpg",
        type: "image",
        size: "3.2 MB",
        modified: "1 week ago",
        url: "#",
      },
      {
        id: "2-2",
        name: "family-dinner.jpg",
        type: "image",
        size: "2.8 MB",
        modified: "2 weeks ago",
        url: "#",
      },
    ],
  },
  {
    id: "3",
    name: "Meeting Recording.mp4",
    type: "video",
    size: "45.2 MB",
    modified: "3 days ago",
    url: "#",
  },
  {
    id: "4",
    name: "Backup Files.zip",
    type: "archive",
    size: "128 MB",
    modified: "1 month ago",
    url: "#",
  },
  {
    id: "5",
    name: "Podcast Episode.mp3",
    type: "audio",
    size: "12.4 MB",
    modified: "5 days ago",
    url: "#",
  },
];

function getFileIcon(type: string) {
  switch (type) {
    case "folder":
      return <Folder className="h-6 w-6 text-blue-500" />;
    case "document":
      return <FileText className="h-6 w-6 text-blue-600" />;
    case "image":
      return <ImageIcon className="h-6 w-6 text-green-500" />;
    case "video":
      return <Video className="h-6 w-6 text-red-500" />;
    case "audio":
      return <Music className="h-6 w-6 text-purple-500" />;
    case "archive":
      return <Archive className="h-6 w-6 text-orange-500" />;
    default:
      return <FileText className="text-muted-foreground h-6 w-6" />;
  }
}

export default function GoogleDriveClone() {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const getCurrentItems = (): FileItem[] => {
    let items = mockData;
    for (const pathSegment of currentPath) {
      const folder = items.find(
        (item) => item.name === pathSegment && item.type === "folder",
      );
      if (folder?.children) {
        items = folder.children;
      }
    }
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  const navigateToFolder = (folderName: string) => {
    setCurrentPath([...currentPath, folderName]);
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
      {/* Header */}
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
                {segment}
              </Button>
            </div>
          ))}
        </div>

        {/* View Controls */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-foreground text-lg font-medium">
            {currentPath.length > 0
              ? currentPath[currentPath.length - 1]
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
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {currentItems.map((item) => (
              <Card
                key={item.id}
                className="group cursor-pointer transition-shadow hover:shadow-md"
                onClick={() => {
                  if (item.type === "folder") {
                    navigateToFolder(item.name);
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
                    <p className="text-muted-foreground text-xs">
                      {item.modified}
                    </p>
                    {item.size && (
                      <p className="text-muted-foreground text-xs">
                        {item.size}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="hover:bg-muted/50 group flex cursor-pointer items-center gap-4 rounded-lg p-3"
                onClick={() => {
                  if (item.type === "folder") {
                    navigateToFolder(item.name);
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
                  {item.size ?? "—"}
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
