export interface AnkiNote {
  deckName: string;
  modelName: string;
  fields: {
    Front: string;
    Back: string;
  };
  options: {
    allowDuplicate: boolean;
  };
}

export interface AnkiConnectRequest {
  action: string;
  version: number;
  params?: {
    note: AnkiNote;
  };
}

export interface AnkiConnectResponse {
  result: number | null;
  error: string | null;
}