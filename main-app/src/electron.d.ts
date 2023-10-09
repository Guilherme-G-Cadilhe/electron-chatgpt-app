type AIResponse = {
  message: string;
  error?: string;
};

type ElectronPreloadExposed = {
  chatGPTApi: {
    getCompletion: (value: string) => Promise<AIResponse>;
  };
};

declare let electron: ElectronPreloadExposed;
