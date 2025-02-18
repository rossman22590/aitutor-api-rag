export function getMostRecentUserMessage(
    messages: Array<{ role: string; content: string }>
  ) {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "user") return messages[i];
    }
    return null;
  }
  