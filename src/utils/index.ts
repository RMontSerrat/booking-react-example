import uniqid from "uniqid";

export function generateUniqueId(): string {
  return uniqid("id-");
}
