import { createGateKeeper } from "../../libs/api-gatekeeper";
import { isSendable, onError, onResponse } from "./response-handlers";

export const basicApi = createGateKeeper({
  isSendable,
  onResponse,
  onError
});
