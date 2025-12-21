let tweets = [
  {
    id: 1,
    author: "Mahmoud Saad",
    username: "@msaad",
    content: "Hello World",
    likes: 5,
    retweets: 2,
    comments: 1,
    liked: false,
  },
  {
    id: 2,
    author: "Ali Ahmed",
    username: "@aliAhmed",
    content: "lorem ipsum dolor sit amet",
    likes: 12,
    retweets: 3,
    comments: 0,
    liked: false,
  },
  {
    id: 3,
    author: "Ahmed Mohamed",
    username: "@ahmedMohamed",
    content: "lorem ipsum dolor sit amet",
    likes: 8,
    retweets: 5,
    comments: 2,
    liked: false,
  },
];


function loadTweets() {
  const savedTweets = localStorage.getItem("tweets");
  if (savedTweets) {
    tweets = JSON.parse(savedTweets);
  }
}

function saveTweets() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}


function loadTheme() {
  const theme = localStorage.getItem("theme") || "light";
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    document.getElementById("themeToggle").textContent = "☀️";
  }
}


document.getElementById("themeToggle").addEventListener("click", function () {
  document.documentElement.classList.toggle("dark");
  const isDark = document.documentElement.classList.contains("dark");
  this.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});


document
  .getElementById("mobileMenuToggle")
  .addEventListener("click", function () {
    document.querySelector(".sidebar-left").classList.toggle("active");
  });


document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    const tab = this.dataset.tab;
    console.log("Switched to:", tab);
  });
});


const tweetInput = document.getElementById("tweetInput");
const tweetBtn = document.getElementById("tweetBtn");

tweetInput.addEventListener("input", function () {
  if (this.value.trim().length === 0) {
    tweetBtn.disabled = true;
  }
});

tweetBtn.addEventListener("click", function () {
  const content = tweetInput.value.trim();
  if (content.length === 0 || content.length > 280) {
    alert("Tweet must be between 1 and 280 characters!");
    return;
  }

  const newTweet = {
    id: Date.now(),
    author: "You",
    username: "@you",
    content: content,
    likes: 0,
    retweets: 0,
    comments: 0,
    liked: false,
  };

  tweets.unshift(newTweet);
  saveTweets();
  renderTweets();

  tweetInput.value = "";
  charCount.textContent = "280";
  tweetBtn.disabled = true;
});

function renderTweets() {
  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  tweets.forEach((tweet) => {
    const tweetElement = createTweetElement(tweet);
    feed.appendChild(tweetElement);
  });
}

  

function createTweetElement(tweet) {
  
  const div = document.createElement("div");
  
  div.className =
    "tweet p-4 border-b border-gray-200 dark:border-[#38444d] transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-[#192734]";
  
  
  div.dataset.id = tweet.id;

  
  
  
  div.innerHTML = `
        <div class="flex items-center gap-2 mb-2">
            <span class="font-bold text-black dark:text-white transition-colors duration-300">${
              tweet.author
            }</span>
            <span class="text-secondary transition-colors duration-300">${
              tweet.username
            }</span>
        </div>
        <div class="my-2 text-black dark:text-white transition-colors duration-300">${
          tweet.content
        }</div>
        <div class="flex gap-8 md:gap-4 mt-2">
            <button class="tweet-action comment-btn flex items-center gap-2 bg-transparent border-none text-secondary cursor-pointer p-2 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-[#192734] text-sm" data-id="${
              tweet.id
            }">
                <span class="text-xl">💬</span> ${tweet.comments}
            </button>
            <button class="tweet-action retweet-btn flex items-center gap-2 bg-transparent border-none text-secondary cursor-pointer p-2 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-[#192734] text-sm" data-id="${
              tweet.id
            }">
                <span class="text-xl">🔄</span> ${tweet.retweets}
            </button>
            <button class="tweet-action like-btn flex items-center gap-2 bg-transparent border-none text-secondary cursor-pointer p-2 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-[#192734] text-sm ${
              tweet.liked ? "liked" : ""
            }" data-id="${tweet.id}">
                <span class="text-xl">${tweet.liked ? "❤️" : "🤍"}</span> ${
    tweet.likes
  }
            </button>
        </div>
    `;

  
  
  const likeBtn = div.querySelector(".like-btn");
  
  likeBtn.addEventListener("click", function () {
    
    
    const tweetId = parseInt(this.dataset.id);
    
    const tweet = tweets.find((t) => t.id === tweetId);

    
    if (tweet.liked) {
      
      tweet.likes--; 
      tweet.liked = false; 
      this.querySelector("span").textContent = "🤍"; 
      this.classList.remove("liked"); 
    } else {
      
      tweet.likes++; 
      tweet.liked = true; 
      this.querySelector("span").textContent = "❤️"; 
      this.classList.add("liked"); 
    }

    
    this.innerHTML = `<span>${tweet.liked ? "❤️" : "🤍"}</span> ${tweet.likes}`;
    
    saveTweets();
  });

  
  
  const retweetBtn = div.querySelector(".retweet-btn");
  
  retweetBtn.addEventListener("click", function () {
    
    const tweetId = parseInt(this.dataset.id);
    
    const tweet = tweets.find((t) => t.id === tweetId);
    
    tweet.retweets++;
    
    this.innerHTML = `<span>🔄</span> ${tweet.retweets}`;
    
    saveTweets();
  });

  
  
  const commentBtn = div.querySelector(".comment-btn");
  
  commentBtn.addEventListener("click", function () {
    
    const tweetId = parseInt(this.dataset.id);
    
    const tweet = tweets.find((t) => t.id === tweetId);
    
    const comment = prompt("Add a comment:");
    
    if (comment && comment.trim()) {
      
      tweet.comments++;
      
      this.innerHTML = `<span>💬</span> ${tweet.comments}`;
      
      saveTweets();
    }
    
  });

  
  return div;
}



loadTheme(); 
loadTweets(); 
renderTweets(); 



document.addEventListener("click", function (e) {
  
  const sidebar = document.querySelector(".sidebar-left");
  const menuToggle = document.getElementById("mobileMenuToggle");

  
  
  
  
  if (
    sidebar.classList.contains("active") &&
    !sidebar.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    
    sidebar.classList.remove("active");
  }
  
});
