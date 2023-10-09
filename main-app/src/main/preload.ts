import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  chatGPTApi: {
    getCompletion: async (prompt: string) => {
      const res = await ipcRenderer.invoke("getCompletion", prompt);
      return res;
    },
  },
});
