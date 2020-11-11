const { getQueryString, createYoutubeUrl } = require("../scripts/fetch.js");

describe("Testing getQueryString", () => {
  test("Should return queryString when take object ", () => {
    const options = { part: "snippet", key: "key", maxResults: "20", q: "cat" };
    const actual = getQueryString(options);
    const expected = "?part=snippet&key=key&maxResults=20&q=cat";
    expect(actual).toEqual(expected);
  });
});

describe("Testing createYoutubeUrl", () => {
  test("Should return youtube url when take object and resources text ", () => {
    const options = { part: "snippet", key: "key", maxResults: "20", q: "cat" };
    const ResourceTypes = "search";
    const actual = createYoutubeUrl(ResourceTypes, options);
    const expected =
      "https://www.googleapis.com/youtube/v3/search?part=snippet&key=key&maxResults=20&q=cat";
    expect(actual).toEqual(expected);
  });
});
