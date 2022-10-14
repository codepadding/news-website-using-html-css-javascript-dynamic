const postWrapper = document.getElementById("posts");

const getImageHTML = (url) => {
  const posts__image = document.createElement("div");
  posts__image.classList.add("posts__image");
  const img = document.createElement("img");
  img.src = url;
  posts__image.appendChild(img);
  return posts__image;
};

const getInformationHTML = (postDate, postTitle, link) => {
  const posts__information = document.createElement("div");
  posts__information.classList.add("posts__information");
  const posts__date = document.createElement("div"); // M
  posts__date.innerText = postDate;
  const posts__title = document.createElement("div"); // M
  posts__title.classList.add("posts__title");
  const titleLink = document.createElement("a");
  titleLink.href = link;
  titleLink.innerText = postTitle;
  // add _blank to open in new tab
  titleLink.target = "_blank";
  posts__title.appendChild(titleLink);
  posts__information.appendChild(posts__date);
  posts__information.appendChild(posts__title);
  return posts__information;
};

const getPostItem = (imgUrl, postDate, postTitle, link) => {
  const posts__item = document.createElement("div");
  posts__item.classList.add("posts__item");

  const posts__image = getImageHTML(imgUrl);
  posts__item.appendChild(posts__image);

  const posts__information = getInformationHTML(postDate, postTitle, link);
  posts__item.appendChild(posts__information);

  return posts__item;
};

// call api
const getPosts = async () => {
  const url =
    "https://bloomberg-market-and-financial-news.p.rapidapi.com/news/list?id=markets";

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "5facbb528dmshb8e28de367d5300p17c711jsn675b8289b235",
      "X-RapidAPI-Host": "bloomberg-market-and-financial-news.p.rapidapi.com",
    },
  };

  const response = await fetch(url, options);
  const posts = await response.json();
  return posts;
};

const renderPosts = async () => {
  const data = await getPosts();

  const posts = data.modules[2].stories;

  posts.forEach((post) => {
    const postHTML = getPostItem(
      post.thumbnailImage,
      post.published,
      post.title,
      post.shortURL
    );
    postWrapper.appendChild(postHTML);
  });
};

renderPosts();
