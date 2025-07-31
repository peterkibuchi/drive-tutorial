import {
  Archive,
  FileText,
  Folder,
  ImageIcon,
  Music,
  Video,
} from "lucide-react";

export function getFileIcon(type: string) {
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
