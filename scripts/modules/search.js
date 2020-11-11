// get the search result by input
const getSearchResults = (input = "", callback, maxResults = 10) => {
    // set the setting for search operating
    getData(
      "search",
      {
        q: input,
        maxResults: maxResults,
      },
      callback
    );
  };