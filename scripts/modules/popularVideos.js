// get the Popular Videos result by regionCode
const getPopularVideos = (callback, regionCode = "JP", maxResults = 10) => {
  // set the setting for search operating
  getData(
    "videos",
    {
      maxResults: maxResults,
      chart: "mostPopular",
      regionCode: regionCode,
    },
    callback
  );
};