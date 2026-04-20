import { createAuthClient } from "better-auth/client";
import { environment } from '@/../environments/environments';

export const authClient = createAuthClient({
  baseURL: environment.apiUrl
});
