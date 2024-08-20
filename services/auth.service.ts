import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/database";

export async function getSelf() {
  const self = await currentUser();
  if (!self) throw new Error("unauthorized");
  const user = await db.user.findUnique({
    where: { externalId: self.id },
  });
  if (!user) throw new Error("Not found");
  return user;
}
