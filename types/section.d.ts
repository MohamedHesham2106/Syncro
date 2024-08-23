type Section = {
  id: string;
  name: string;
  projectId: string;
  dueDate: string; // Replaces DateTime with string
  type: string; // Assuming SectionType is a string enum or similar
  isFinished: boolean;
  isStarted: boolean;
  deleted: boolean;
  createdAt: string; // Replaces DateTime with string
  updatedAt: string; // Replaces DateTime with string
  deletedAt: string | null; // Replaces DateTime with string
};
