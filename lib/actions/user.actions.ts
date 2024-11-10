"use server";

import { ID } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { getUserByEmail, handleError, sendEmailOTP } from "./helpers";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";

type createAccountProps = {
  fullName: string;
  email: string;
};
export const createAccount = async ({
  fullName,
  email,
}: createAccountProps) => {
  const existingUser = await getUserByEmail(email);

  const accountId = await sendEmailOTP(email);

  if (!accountId) throw new Error("Failed to send OTP");

  if (!existingUser) {
    const { databases } = await createAdminClient();

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        fullName,
        email,
        avatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
        accountId,
      },
    );
  }

  return parseStringify({ accountId });
};

type varifyOtpProps = {
  accountId: string;
  password: string;
};
export const verifyOtp = async ({ accountId, password }: varifyOtpProps) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createSession(accountId, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    handleError(error, "Failed to varify OTP");
  }
};
