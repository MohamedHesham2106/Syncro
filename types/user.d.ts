type User = {
  id: string;
  name: string;
  email: string;
  externalId: string;
  imageUrl: string;
  createdAt: string; // Replaces DateTime with string
  updatedAt: string; // Replaces DateTime with string

  ownedProjects?: Project[];
};
