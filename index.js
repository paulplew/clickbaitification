// used to fetch files, returns the JSON inside them
const jsonFetchFile = async filePath => {
  try {
    const response = await fetch(filePath);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

// creates an article in the 'snapchat' style
// call with no arguments and append to document.body for an example
const createArticle = (
  article = {
    title: "Avoid this one simple thing to completely cure your anxiety",
    image: {
      src:
        "https://cdn.glitch.me/07486811-aee1-45d8-b7a9-be44fb8b03cc%2F0bb73b8a8afc4403b0bc6f24412d4569.png?v=1637007533486",
      alt: "A carefree person with no anxiety"
    },
    video:
      "https://www.healthyplace.com/blogs/survivingmentalhealthstigma/2017/09/clickbait-contributes-to-mental-health-stigma"
  }
) => {
  /* DOM TREE
  div.article
    div.image-container
      img.
    div.title
      p
    
  const image = document.createElement("img");
  image.src = article.image.src;
  image.alt = article.image.alt;

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");
  imageContainer.appendChild(image);

  const title = document.createElement("p");
  title.innerHTML = article.title;

  const titleContainer = document.createElement("div");
  titleContainer.classList.add("title");
  titleContainer.appendChild(title);
  titleContainer.dataset.video = article.video;
  titleContainer.onclick = videoPopup;

  const link = document.createElement("div");
  link.classList.add("article");

  link.appendChild(imageContainer);
  link.appendChild(titleContainer);

  return link;
};

/*
  call after page load to setup the articles in the /articles.json file
  waits for the JSON promise to be resolved

  see articles.json for the JSON format.
*/
const setupArticles = () => {
  jsonFetchFile("./articles.json").then(articles => {
    articles.map(article => {
      document.querySelector("#content").appendChild(createArticle(article));
    });
  });
};

// creates a video popup when added as an onClick
// the clicked object should have a data-video tag defined
const videoPopup = clicked => {
  const fade = document.createElement("div");
  fade.classList.add("hover-top", "transparent-gray", "center");
  fade.setAttribute("id", "filter");

  // when user clicks anywhere not in the iframe remove the element
  fade.onclick = removeSelf;

  fade.innerHTML += `
    <iframe
      width="560"
      height="315"
      src="${clicked.target.dataset.video}"
    ></iframe>
  `;

  document.body.appendChild(fade);
};

// removes an element when added as an onClick
const removeSelf = clicked => {
  clicked.target.remove();
};

// key handler for all key press events
document.onkeyup = e => {
  // if the escape key is pressed
  if (e.keyCode === 27) {
    const filter = document.getElementById("filter");

    // remove filter when it exists
    if (filter) {
      filter.remove();
    }
  }
};
