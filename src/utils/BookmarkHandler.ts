class BookmarkHandler {
  async loadAll() {
    const res = await fetch("/api/saved-cocktails?onlyIds=true");
    const payload = await res.json();
    return payload as string[];
  }

  async load(cocktailId: string) {
    const res = await fetch(`/api/saved-cocktails/${cocktailId}`);
    const payload = await res.json();
    return payload as string;
  }

  async save(cocktailId: string) {
    const res = await fetch("/api/saved-cocktails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cocktailId),
    });

    const payload = await res.json();
    return payload;
  }

  async delete(cocktailId: string) {
    const res = await fetch(`/api/saved-cocktails/${cocktailId}`, {
      method: "DELETE",
    });
    const payload = await res.json();
    return payload;
  }

  isBookmarked(bookmarkIds: string[], cocktailId: string) {
    if (!bookmarkIds) {
      return false;
    }

    return bookmarkIds.some((id) => id === cocktailId);
  }
}

export default BookmarkHandler;
