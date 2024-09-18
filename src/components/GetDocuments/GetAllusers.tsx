import { UserDocument } from "@/models/user";

export const getAllusers = async (): Promise<UserDocument[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    cache: "no-store",
  });
  if (response.status !== 200) {
    throw new Error("問題発生");
  }
  const data = await response.json();
  console.log(data);
  return data.user as UserDocument[];
};
