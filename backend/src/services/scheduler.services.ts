import {
  getAlpacaAccount,
  getUsersByIds,
  putUserDataById,
} from "@/db/scheduler.db.js";

export interface AlpacaAccount {
  id: string;
  cash: string;
  accrued_fees: string;
}

export async function usersSnapshot(userIds: string[]) {
  const users = await getUsersByIds(userIds);
  users.map(async (user) => {
    if (user.keyId) {
      const alpacaAccount = (await getAlpacaAccount(
        user.keyId ?? "",
        user.secretId ?? "",
      )) as AlpacaAccount;
      await putUserDataById(user.id, Number(alpacaAccount?.accrued_fees ?? 0));
    }
  });
}
