export const parseJsonSafely = <T>(jsonString: string, fallback: T): T => {
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      console.error('Error parsing JSON:', e);
      return fallback;
    }
  };