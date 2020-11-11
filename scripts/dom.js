
// createCard function takes data object as a parameter , and returns card element
const createCard = (dataObj)=>{
    // Creating Dom elements
    const card = document.createElement('div');
    const imageContainer = document.createElement('div');
    const image = document.createElement('img');
    const videoDescription = document.createElement('div');
    const videoTitle = document.createElement('h2');
    const videoDesc = document.createElement('p');
    const channelTitle = document.createElement('h3');

    // adding the dataobj to the created elements
    image.src = dataObj.thumbnails.url;
    videoTitle.textContent = dataObj.title;
    videoDesc.textContent = dataObj.description;
    channelTitle.textContent = dataObj.channelTitle;

    // adding classes to the elements
    card.classList.add("video-content")
    card.id = dataObj.videoId;
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
    card.addEventListener('click',(event)=>{
        createVideoDiv(dataObj)
    })

    //return
    return card ;
}

// createVideoDiv function takes data object , and return video section
const createVideoDiv = (dataObj)=>{
    // not done yet
    console.log(dataObj);
}
