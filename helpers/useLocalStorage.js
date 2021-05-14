import { useState } from "react";

export default typeof window !== "undefined"
  ? require("@rehooks/local-storage").useLocalStorage
  : useState;
