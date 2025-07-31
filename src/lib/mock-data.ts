export type AppFile = {
  id: string;
  name: string;
  type: "document" | "image" | "video" | "audio" | "archive" | "other";
  url: string;
  size: string;
  modified: string;
};

export type AppFolder = {
  id: string;
  name: string;
  type: "folder";
  children?: (AppFile | AppFolder)[];
  modified: string;
};

// Mock data for testing app functionality
export const mockData: AppFolder = {
  id: "root",
  name: "My Drive",
  type: "folder",
  modified: "2024-01-15T10:30:00Z",
  children: [
    // Root level files
    {
      id: "readme-root",
      name: "README.md",
      type: "document",
      url: "/files/readme.md",
      size: "2.1 KB",
      modified: "2024-01-15T10:30:00Z",
    },
    {
      id: "getting-started",
      name: "Getting Started Guide.pdf",
      type: "document",
      url: "/files/getting-started.pdf",
      size: "1.2 MB",
      modified: "2024-01-14T16:20:00Z",
    },

    // Documents folder
    {
      id: "documents",
      name: "Documents",
      type: "folder",
      modified: "2024-01-20T14:22:00Z",
      children: [
        {
          id: "resume-2024",
          name: "Resume_2024.pdf",
          type: "document",
          url: "/files/resume-2024.pdf",
          size: "245 KB",
          modified: "2024-01-20T09:15:00Z",
        },
        {
          id: "cover-letter",
          name: "Cover Letter Template.docx",
          type: "document",
          url: "/files/cover-letter.docx",
          size: "89 KB",
          modified: "2024-01-18T14:30:00Z",
        },
        {
          id: "budget-spreadsheet",
          name: "Monthly Budget.xlsx",
          type: "document",
          url: "/files/budget.xlsx",
          size: "156 KB",
          modified: "2024-01-19T11:45:00Z",
        },

        // Work Documents subfolder
        {
          id: "work-docs",
          name: "Work Documents",
          type: "folder",
          modified: "2024-01-22T13:45:00Z",
          children: [
            {
              id: "project-proposal",
              name: "Q1 Project Proposal.docx",
              type: "document",
              url: "/files/q1-proposal.docx",
              size: "2.3 MB",
              modified: "2024-01-22T13:45:00Z",
            },
            {
              id: "meeting-notes",
              name: "Team Meeting Notes.txt",
              type: "document",
              url: "/files/meeting-notes.txt",
              size: "12 KB",
              modified: "2024-01-22T10:20:00Z",
            },
            {
              id: "employee-handbook",
              name: "Employee Handbook 2024.pdf",
              type: "document",
              url: "/files/handbook.pdf",
              size: "4.7 MB",
              modified: "2024-01-15T08:30:00Z",
            },
          ],
        },

        // Templates subfolder
        {
          id: "templates",
          name: "Templates",
          type: "folder",
          modified: "2024-01-12T15:30:00Z",
          children: [
            {
              id: "invoice-template",
              name: "Invoice Template.xlsx",
              type: "document",
              url: "/files/invoice-template.xlsx",
              size: "67 KB",
              modified: "2024-01-12T15:30:00Z",
            },
            {
              id: "letterhead-template",
              name: "Company Letterhead.docx",
              type: "document",
              url: "/files/letterhead.docx",
              size: "234 KB",
              modified: "2024-01-11T09:15:00Z",
            },
          ],
        },
      ],
    },

    // Projects folder
    {
      id: "projects",
      name: "Projects",
      type: "folder",
      modified: "2024-01-25T09:15:00Z",
      children: [
        // Web Development subfolder
        {
          id: "web-projects",
          name: "Web Development",
          type: "folder",
          modified: "2024-01-26T11:15:00Z",
          children: [
            {
              id: "react-app",
              name: "React Portfolio",
              type: "folder",
              modified: "2024-01-27T15:20:00Z",
              children: [
                {
                  id: "package-json",
                  name: "package.json",
                  type: "document",
                  url: "/files/package.json",
                  size: "3.2 KB",
                  modified: "2024-01-27T15:20:00Z",
                },
                {
                  id: "readme-react",
                  name: "README.md",
                  type: "document",
                  url: "/files/react-readme.md",
                  size: "1.8 KB",
                  modified: "2024-01-27T14:15:00Z",
                },
              ],
            },
            {
              id: "vue-dashboard",
              name: "Vue Dashboard",
              type: "folder",
              modified: "2024-01-25T11:30:00Z",
              children: [
                {
                  id: "vue-config",
                  name: "vue.config.js",
                  type: "document",
                  url: "/files/vue.config.js",
                  size: "892 B",
                  modified: "2024-01-25T11:30:00Z",
                },
              ],
            },
          ],
        },
      ],
    },

    // Media folder
    {
      id: "media",
      name: "Media",
      type: "folder",
      modified: "2024-01-18T16:45:00Z",
      children: [
        // Photos subfolder
        {
          id: "photos",
          name: "Photos",
          type: "folder",
          modified: "2024-01-21T16:20:00Z",
          children: [
            {
              id: "profile-photo",
              name: "Profile Photo.jpg",
              type: "image",
              url: "/files/profile.jpg",
              size: "2.3 MB",
              modified: "2024-01-21T16:20:00Z",
            },
            {
              id: "team-photo",
              name: "Team Photo 2024.png",
              type: "image",
              url: "/files/team-2024.png",
              size: "4.1 MB",
              modified: "2024-01-20T14:15:00Z",
            },
            {
              id: "vacation-2024",
              name: "Vacation 2024",
              type: "folder",
              modified: "2024-01-28T10:15:00Z",
              children: [
                {
                  id: "beach-sunset",
                  name: "Beach Sunset.jpg",
                  type: "image",
                  url: "/files/beach-sunset.jpg",
                  size: "3.2 MB",
                  modified: "2024-01-28T10:15:00Z",
                },
                {
                  id: "vacation-video",
                  name: "Vacation Highlights.mp4",
                  type: "video",
                  url: "/files/vacation-highlights.mp4",
                  size: "125 MB",
                  modified: "2024-01-26T18:20:00Z",
                },
              ],
            },
          ],
        },

        // Videos subfolder
        {
          id: "videos",
          name: "Videos",
          type: "folder",
          modified: "2024-01-20T12:10:00Z",
          children: [
            {
              id: "project-demo-video",
              name: "Project Demo Video.mp4",
              type: "video",
              url: "/files/project-demo.mp4",
              size: "89.3 MB",
              modified: "2024-01-20T12:10:00Z",
            },
            {
              id: "tutorial-video",
              name: "How-to Tutorial.mp4",
              type: "video",
              url: "/files/tutorial.mp4",
              size: "156 MB",
              modified: "2024-01-18T09:45:00Z",
            },
          ],
        },

        // Audio subfolder
        {
          id: "audio",
          name: "Audio Files",
          type: "folder",
          modified: "2024-01-17T14:55:00Z",
          children: [
            {
              id: "podcast-episode",
              name: "Podcast Episode 15.mp3",
              type: "audio",
              url: "/files/podcast-15.mp3",
              size: "45.2 MB",
              modified: "2024-01-17T14:55:00Z",
            },
            {
              id: "meeting-recording",
              name: "Team Meeting Recording.wav",
              type: "audio",
              url: "/files/meeting-audio.wav",
              size: "78.9 MB",
              modified: "2024-01-16T11:30:00Z",
            },
          ],
        },
      ],
    },

    // Archive folder
    {
      id: "archive",
      name: "Archive",
      type: "folder",
      modified: "2023-12-10T11:30:00Z",
      children: [
        {
          id: "old-projects",
          name: "Old Projects.zip",
          type: "archive",
          url: "/files/old-projects.zip",
          size: "234 MB",
          modified: "2023-12-10T11:30:00Z",
        },
        {
          id: "backup-files",
          name: "Backup Files.tar.gz",
          type: "archive",
          url: "/files/backup.tar.gz",
          size: "567 MB",
          modified: "2023-11-15T09:20:00Z",
        },
        {
          id: "legacy-docs",
          name: "Legacy Documents",
          type: "folder",
          modified: "2023-10-20T14:30:00Z",
          children: [
            {
              id: "old-contract",
              name: "Old Contract.pdf",
              type: "document",
              url: "/files/old-contract.pdf",
              size: "1.8 MB",
              modified: "2023-10-20T14:30:00Z",
            },
          ],
        },
      ],
    },
  ],
};
