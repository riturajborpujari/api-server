import { createGateKeeper } from "../utils/api.gate-keeper.utils";
import { isSendable, onError, onResponse } from "./response-handlers";

export const basicApi = createGateKeeper({
  isSendable,
  onResponse,
  onError
});
