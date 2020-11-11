// fetch function
const fetch = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status == 200) {
        callback(JSON.parse(xhr.responseText));
      }
    }
  });
  xhr.open("GET", url);
  xhr.send();
};

// get the query obj and convert it to string
const getQueryString = (options) => {
  let queryString = "?";
  for (const key in options) {
    if (options.hasOwnProperty(key)) {
      queryString += `${key}=${options[key]}&`;
    }
  }
  return queryString.substr(0, queryString.length - 1);
};

// get the settings and create the youtube API url
const createYoutubeUrl = (ResourceTypes, options) => {
  return `https://www.googleapis.com/youtube/v3/${ResourceTypes}${getQueryString(
    options
  )}`;
};

//get the data
const getData = (ResourceTypes, options, callback) => {
  // set the require options
  options.part = "snippet";
  options.key = key;
  //  create the URL
  const url = createYoutubeUrl(ResourceTypes, options);
  // fetch the data
  fetch(url, (data) => {
    callback(
      data.items.map((item) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnails: item.snippet.thumbnails.default,
        channelTitle: item.snippet.channelTitle,
      }))
    );
  });
};

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
