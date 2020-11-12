// createCard function takes data object as a parameter , and returns card element
const createCard = (dataObj) => {
  // Creating Dom elements
  const elementsObj = createElementsObj({
    "card": "div",
    "imageContainer": "div",
    "image": "img",
    "videoDescription": "div",
    "videoTitle": "h2",
    "videoDesc": "p",
    "channelTitle": "h3"
  })

  const LIMIT_DES = 170;
  const WIDTH_SCALE = 0.9

  // adding the dataobj to the created elements
  setAttributes(elementsObj.image, {
    "src": dataObj.thumbnails.url,
    "width": dataObj.thumbnails.width * WIDTH_SCALE
  })

  setTextContents(elementsObj, {
    "videoTitle": dataObj.title,
    "videoDesc": dataObj.description.substring(0, LIMIT_DES) + " ...",
    "channelTitle": dataObj.channelTitle,
  })

  // adding classes to the elements
  setClasses(elementsObj, {
    "card": "video-content",
    "imageContainer": "video",
    "videoDescription": "video-description",
    "videoTitle": "video-title",
    "videoDesc": "video-desc",
    "channelTitle": "channel-title",
  })

  elementsObj.card.id = dataObj.videoId

  // appending elements to their divs
  appendNodes(elementsObj, {
    "imageContainer": ["image"],
    "videoDescription": ["videoTitle", "videoDesc", "channelTitle"],
    "card": ["imageContainer", "videoDescription"]
  })

  // add click listener
  elementsObj.card.addEventListener("click", (event) => {
    addDataToAppContainer(createVideoDiv(dataObj))
  });
  return elementsObj.card
}

// createVideoDiv function takes data object , and return video section
const createVideoDiv = (dataObj) => {
  // Creating Dom elements
  const elementsObj = createElementsObj({
    "videoDisplay": "div",
    "iframeVideo": "iframe",
    "iframeContent": "div",
    "iframeTitle": "div",
    "iframeH2": "h2",
    "iframeChannelName": "h3",
    "iframeDescription": "div",
    "iframeDescriptionP": "p",
    "readMoreButton": "h3"
  })

  // adding the dataobj to the created elements
  elementsObj.iframeVideo.src = `https://www.youtube.com/embed/${dataObj.videoId}`;

  // adding classes to the elements
  setClasses(elementsObj, {
    "iframeTitle": "iframeTitle",
    "iframeDescription": "iframe-description",
    "videoDisplay": "app-video",
    "iframeContent": "iframe-content"
  })

  setAttributes(elementsObj.iframeVideo, {
    "frameborder": "0",
    "allowfullscreen": "true"
  })
  elementsObj.readMoreButton.id = "readMore";

  // appending elements to their divs
  appendNodes(elementsObj, {
    "iframeDescription": ["iframeDescriptionP", "readMoreButton"],
    "iframeTitle": ["iframeH2", "iframeChannelName"],
    "iframeContent": ["iframeTitle", "iframeDescription"],
    "videoDisplay": ["iframeVideo", "iframeContent"],
  })

  const LIMIT = 90;

  // show more button
  const description = dataObj.description;
  const subDescription = description.substring(0, LIMIT) + " ..."

  setTextContents(elementsObj, {
    "iframeH2": dataObj.title,
    "iframeChannelName": dataObj.channelTitle,
    "readMoreButton": "show More",
    "iframeDescriptionP": subDescription
  })

  // read More Button
  let isMore = false;
  elementsObj.readMoreButton.addEventListener("click", () => {
    elementsObj.iframeDescriptionP.textContent = isMore ? subDescription : description;
    elementsObj.readMoreButton.textContent = `Show ${isMore ? "More" : "Less"}`;
    isMore = !isMore;
  });

  return elementsObj.videoDisplay;
};

//grid function takes data array and returns video container div
const grid = (dataArray) => {
  const videoContainer = document.createElement("div")
  videoContainer.classList.add("app-video")
  if (dataArray) {
    dataArray.forEach((dataObj) => {
      videoContainer.appendChild(createCard(dataObj))
    })
    return videoContainer
  }
}

// searchAction function retrieve the input and return the result
const searchAction = (callback) => {
  const input = document.querySelector(".app-input input")
  const inputValue = input.value.trim().toLowerCase()
  if (!inputValue) {
    callback()
    return
  }
  getSearchResults(inputValue, (data) => {
    callback(data)
  })
}

// addDataToAppContainer functions add data to the container div
const addDataToAppContainer = (data) => {
  const appContainer = document.querySelector(".app-container")
  const appVideo = document.querySelector('.app-video')
  if (data) {
    appContainer.removeChild(appVideo);
    appContainer.appendChild(data);
  }
}

// onStart function start the website
(() => {
  const searchButton = document.querySelector("#search-button");
  getPopularVideos((data) => addDataToAppContainer(grid(data)), "NA", 25);
  searchButton.addEventListener("click", () => {
    searchAction((data) => addDataToAppContainer(grid(data)));
  });
})();
