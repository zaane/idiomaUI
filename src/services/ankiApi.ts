import type { AnkiNote, AnkiConnectRequest, AnkiConnectResponse } from '../types/AnkiNote';

const ANKI_CONNECT_URL = '/anki';

export async function addFlashcard(front: string, back: string, deckName: string = 'wikideck'): Promise<AnkiConnectResponse> {
  const note: AnkiNote = {
    deckName: deckName.trim() || 'wikideck',
    modelName: 'Basic',
    fields: {
      Front: front,
      Back: back,
    },
    options: {
      allowDuplicate: true,
    },
  };

  const request: AnkiConnectRequest = {
    action: 'addNote',
    version: 6,
    params: {
      note,
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
  const request: AnkiConnectRequest = {
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

export async function getDecks(): Promise<AnkiConnectResponse> {
  const request: AnkiConnectRequest = {
    action: 'deckNames',
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
