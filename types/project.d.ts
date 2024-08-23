type Project = {
  id: string;
  name: string;
  targetDate: string; // Replaces DateTime with string
  description: string;
  ownerId: string;
  createdAt: string; // Replaces DateTime with string
  updatedAt: string; // Replaces DateTime with string

  // Additional fields
  owner: {
    name: string;
    email: string;
    imageUrl: string;
  };
  sections: Section[] | []; // If `Section` type is available, include it
};
