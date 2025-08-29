interface AnkiConnectRequest {
  action: string;
  version: number;
  params: {
    note: {
      deckName: string;
      modelName: string;
      fields: {
        Front: string;
        Back: string;
      };
      options: {
        allowDuplicate: boolean;
      };
    };
  };
}

interface AnkiConnectResponse {
  result: number | null;
  error: string | null;
}

const ANKI_CONNECT_URL = '/anki';

export async function addFlashcard(front: string, back: string): Promise<AnkiConnectResponse> {
  const request: AnkiConnectRequest = {
    action: 'addNote',
    version: 6,
    params: {
      note: {
        deckName: 'wikideck',
        modelName: 'Basic',
        fields: {
          Front: front,
          Back: back,
        },
        options: {
          allowDuplicate: true,
        },
      },
    },
  };

  try {
    const response = await fetch(ANKI_CONNECT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: AnkiConnectResponse = await response.json();
    return result;
  } catch (error) {
    return {
      result: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function syncAnki(): Promise<AnkiConnectResponse> {
  const request = {
    action: 'sync',
    version: 6,
  };

  try {
    const response = await fetch(ANKI_CONNECT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: AnkiConnectResponse = await response.json();
    return result;
  } catch (error) {
    return {
      result: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}