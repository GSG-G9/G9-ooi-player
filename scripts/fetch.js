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
const createYoutubeUrl = (options) => {
  return `https://www.googleapis.com/youtube/v3/search${getQueryString(
    options
  )}`;
};

// get the search result by input
const getSearchResults = (input, callback) => {
  // set the setting for search operating
  const options = {
    part: "snippet",
    key: "Your API KEY",
    q: input,
    maxResults: 20,
  };
  //  create the URL
  const url = createYoutubeUrl(options);
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
