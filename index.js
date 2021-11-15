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
    link:
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

  const link = document.createElement("a");
  link.classList.add("article");
  link.href = article.link;
  link.target = "_blank";
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
