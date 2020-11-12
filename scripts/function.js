const mapObj = (obj, callback) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        callback(key, obj[key]);
      }
    }
};

const createElement = (tagName) => document.createElement(tagName)

const createElementsObj = (obj) => {
  const elementObj = {}
  mapObj(obj, (key, value) => { elementObj[key] = createElement(value) });
  return elementObj
}

const setAttributes = (element, obj) => {
  mapObj(obj, (key, value) => { element.setAttribute(key, value) });
}

const setTextContents = (elementsObj, obj) => {
  mapObj(obj, (key, value) => { elementsObj[key].textContent = value });
}

const setClasses = (elementsObj, obj) => {
  mapObj(obj, (key, value) => { elementsObj[key].classList.add(value) });
}

const appendNodes = (elementsObj, obj) => {
  mapObj(obj, (key, value) => {
    value.forEach((node) => {
      elementsObj[key].appendChild(elementsObj[node])
    })
  });
}
