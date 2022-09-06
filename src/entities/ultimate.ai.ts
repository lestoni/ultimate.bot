export interface UltimateAIRequestBody {
  botId: string;
  message: string;
}

export interface UltimateAIIntent {
  confidence: number;
  name: string;
}

export interface UltimateAIResponseBody {
  intents: UltimateAIIntent[];
  entities: unknown[];
}
