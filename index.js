const fetchFile = async filePath => {
  try {
    const response = await fetch(filePath);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

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

const setupArticles = () => {
  fetchFile("./articles.json").then(articles => {
    articles.map(article => {
      document.querySelector("#content").appendChild(createArticle(article));
    });
  });
};

const videoPopup = clicked => {
  const fade = document.createElement("div");
  fade.classList.add("hover-top", "transparent-gray", "center");
  fade.setAttribute('id', 'filter')
  fade.onclick = removeSelf;
  
  fade.appendChild(document.createElement('p').innerText = "click anywhere or press 'esc' to exit")
  
  fade.innerHTML = `
    <iframe
      width="560"
      height="315"
      src="${clicked.target.dataset.video}"
    ></iframe>
  `;

  document.body.appendChild(fade);
};

document.onkeyup = (e) => {
  if (e.keyCode === 27) {
    if (document.getElementById('filter')) {
      console.log('removing');
      document.getElementById('filter').remove();
    }
  }
}

const removeSelf = clicked => {
  clicked.target.remove();
}

