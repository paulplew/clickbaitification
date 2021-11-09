const fetchFile = async filePath => {
  try {
    const response = await fetch(filePath);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const createArticle = jsonArticle => {
  const image = document.createElement("img");
  image.src = jsonArticle.url;

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");
  imageContainer.appendChild(image);

  const title = document.createElement("p");
  title.innerText = jsonArticle.title;

  const titleContainer = document.createElement("div");
  titleContainer.classList.add("title");
  titleContainer.appendChild(title);

  const article = document.createElement("a");
  article.classList.add("article");
  article.href = jsonArticle.href;
  article.appendChild(imageContainer);
  article.appendChild(titleContainer);

  document.querySelector("#content").appendChild(article);
};

fetchFile("./articles.json").then(articles => {
  articles.map(element => {
    createArticle(element);
  });
});
