// createCard function takes data object as a parameter , and returns card element
const createCard = (dataObj) => {
  // Creating Dom elements
  const card = document.createElement("div")
  const imageContainer = document.createElement("div")
  const image = document.createElement("img")
  const videoDescription = document.createElement("div")
  const videoTitle = document.createElement("h2")
  const videoDesc = document.createElement("p")
  const channelTitle = document.createElement("h3")

  // adding the dataobj to the created elements
  image.src = dataObj.thumbnails.url
  image.width = dataObj.thumbnails.width * 0.9
  videoTitle.textContent = dataObj.title                                                                                        
  videoDesc.textContent = dataObj.description.substring(0,170)+" ..."
  channelTitle.textContent = dataObj.channelTitle

  // adding classes to the elements
  card.classList.add("video-content")
  card.id = dataObj.videoId
  imageContainer.classList.add("video")
  videoDescription.classList.add("video-description")
  videoTitle.classList.add("video-title")
  videoDesc.classList.add("video-desc")
  channelTitle.classList.add("channel-title")

  // appending elements to their divs
  imageContainer.appendChild(image)
  videoDescription.append(videoTitle,videoDesc,channelTitle)
  card.append(imageContainer,videoDescription)

  // add click listener
  card.addEventListener("click", (event) => {
    addDataToAppContainer(createVideoDiv(dataObj))
  });

  return card
}

// createVideoDiv function takes data object , and return video section
const createVideoDiv = (dataObj) => {
  // Creating Dom elements
  const videoDisplay = document.createElement("div");
  const iframeVideo = document.createElement("iframe");
  const iframeContent = document.createElement("div");
  const iframeTitle = document.createElement("div");
  const iframeH2 = document.createElement("h2");
  const iframeChannelName= document.createElement("h3");
  const iframeDescription = document.createElement("div");
  const iframeDescriptionP = document.createElement("p");
  const readMoreButton = document.createElement("h3");
 
  // adding the dataobj to the created elements
  iframeVideo.src = `https://www.youtube.com/embed/${dataObj.videoId}`;
  iframeH2.textContent = dataObj.title;
  iframeChannelName.textContent = dataObj.channelTitle;

  // adding classes to the elements
  iframeTitle.classList.add("iframeTitle");
  iframeDescription.classList.add("iframe-description")
  videoDisplay.classList.add("app-video");
  iframeContent.classList.add("iframe-content");
  iframeVideo.setAttribute("frameborder",'0');
  iframeVideo.setAttribute("allowfullscreen", "true");
  readMoreButton.id = "readMore";
  readMoreButton.textContent = "show More";
  
  // appending elements to their divs
  iframeDescription.append(iframeDescriptionP,readMoreButton);
  iframeTitle.append(iframeH2, iframeChannelName);
  iframeContent.append(iframeTitle,iframeDescription);
  videoDisplay.append(iframeVideo,iframeContent);

  // show more button
  const limit = 50;
  const description = dataObj.description;
  const subDescription = description.substring(0,limit)+" ..."

  iframeDescriptionP.textContent = subDescription;

  let isMore = false;
  readMoreButton.addEventListener("click",()=>{
    if (isMore){
      iframeDescriptionP.textContent = subDescription;
      readMoreButton.textContent = "show More";
      isMore = !isMore 
      } else{
      iframeDescriptionP.textContent = description;
      readMoreButton.textContent = "show Less";
      isMore = !isMore
    }
  })
  return videoDisplay;
};

//grid function takes data array and returns video container div
const grid = (dataArray) => {
  const videoContainer = document.createElement("div")
  videoContainer.classList.add("app-video")
  if(dataArray){
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
const onStart = (() => {
  const searchButton = document.querySelector("#search-button");
  getPopularVideos((data) => addDataToAppContainer(grid (data)),"NA",25);
  searchButton.addEventListener("click", () => {
  searchAction((data) => addDataToAppContainer(grid(data)));
  });
})();
