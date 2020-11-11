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
  videoDescription.appendChild(videoTitle)
  videoDescription.appendChild(videoDesc)
  videoDescription.appendChild(channelTitle)
  card.appendChild(imageContainer)
  card.appendChild(videoDescription)

  // add click listener
  card.addEventListener("click", (event) => {
    createVideoDiv(dataObj)
  })

  //return
  return card
}

// createVideoDiv function takes data object , and return video section
const createVideoDiv = (dataObj) => {
  // not done yet
  console.log(dataObj)
}

//grid function takes data array and returns video container div
const grid = (dataArray) => {
  const videoContainer = document.createElement("div")
  videoContainer.classList.add("app-video")
  dataArray.forEach((dataObj) => {
    videoContainer.appendChild(createCard(dataObj))
  })
  return videoContainer
}

// searchAction function retrieve the input and return the result
const searchAction = (callback) => {
  const input = document.querySelector(".app-input input")
  const inputValue = input.value.trim().toLowerCase()
  if (!inputValue) {
    callback()
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
    appContainer.removeChild(appVideo)
    appContainer.appendChild(grid(data))
  }
}

// onStart function start the website
const onStart = (() => {
  const searchButton = document.querySelector("#search-button")
  getPopularVideos((data) => addDataToAppContainer(data),"NA")
  searchButton.addEventListener("click", () => {
  searchAction((data) => addDataToAppContainer(data))
  })
})()
