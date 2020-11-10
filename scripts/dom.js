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

const getQueryString = (options) => {
  let queryString = "?";
  for (const key in options) {
    if (options.hasOwnProperty(key)) {
      const val = options[key];
      queryString += `${key}=${val}&`;
    }
  }
  return queryString.substr(0, queryString.length - 1);
};

const createYoutubeUrl = (options) => {
  return `https://www.googleapis.com/youtube/v3/search${getQueryString(
    options
  )}`;
};

// TEST

const options = {
  part: "snippet",
  key: key,
  q: "cat",
  maxResults: 20,
};

const url = createYoutubeUrl(options);

fetch(URL, (data) => {
  console.log(data);
});
