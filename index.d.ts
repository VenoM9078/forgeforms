declare module "forgeforms" {
  import { FC } from "react";

  export const ForgeForms: FC<{ apiKey: string }>;
  export const ForgeField: FC<{ type: string; name: string }>;
  export const ForgeSubmit: FC;
}
