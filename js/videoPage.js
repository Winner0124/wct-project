const profileBar = document.querySelector(".profile-bar");
const profileBtn = document.getElementById("profileBtn");
profileBtn.addEventListener("click", function () {
  profileBar.classList.toggle("show");
});

const scrollToTopBtn = document.getElementById("arrow-upbtn");

// Add click event listener
scrollToTopBtn.addEventListener("click", function () {
  // Scroll to the top smoothly
  window.scrollTo({
    top: 0,
    behavior: "smooth", // This ensures smooth scrolling
  });
});

function openTab(tabId) {
  // Hide all tab content
  const contents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < contents.length; i++) {
    contents[i].style.display = "none";
  }

  // Remove active class from all buttons
  const buttons = document.getElementsByClassName("tab-button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }

  // Show the selected tab and mark button as active
  document.getElementById(tabId).style.display = "block";
  event.currentTarget.classList.add("active");
}

// Show the first tab by default on page load
document.addEventListener("DOMContentLoaded", () => {
  openTab("description");
});

let existingComments = [
  {
    text: "លោកគ្រូសង្ហាហើយពូកែពន្យល់ទៀត។",
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    username: "សិស្ស", // Comment username
    profileImage: "../img/secretComment.png", // Comment image
    replies: [
      {
        text: "បាទអគុណប្អូន!",
        timestamp: new Date(Date.now() - 120000), // 2 minutes ago
        username: "លោកគ្រូ", // Reply username
        profileImage: "../img/teacher/kimchayPoster.jpg", // Reply image
      },
      {
        text: "ខំប្រឹងរៀនណា!",
        timestamp: new Date(Date.now() - 30000), // 1 minute ago
        username: "លោកគ្រូ", // Reply username
        profileImage: "../img/teacher/kimchayPoster.jpg", // Reply image
      },
    ],
  },
  {
    text: "បើបានលោកគ្រូធ្វើសង្សាមិនដឹងរៀនពូកែយ៉ាងណាទេ។",
    timestamp: new Date(Date.now() - 600000), // 10 minutes ago
    username: "សិស្ស", // Comment username
    profileImage: "../img/secretComment.png", // Comment image
    replies: [
      {
        text: "ហាសហាលោកគ្រូមានប្តីហើយ។",
        timestamp: new Date(Date.now() - 240000), // 4 minutes ago
        username: "លោកគ្រូ", // Reply username
        profileImage: "../img/teacher/kimchayPoster.jpg", // Reply image
      },
    ],
  },
  {
    text: "សំឡេងពិរោះណាស់លោកគ្រូ​។",
    timestamp: new Date(Date.now() - 1200000), // 20 minutes ago
    username: "សិស្ស", // Comment username
    profileImage: "../img/secretComment.png", // Comment image
    replies: [
      {
        text: "បាទគ្រូអតីតម្ចាស់ពាន The Voice ដែរ។",
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        username: "លោកគ្រូ", // Reply username
        profileImage: "../img/teacher/kimchayPoster.jpg", // Reply image
      },
    ],
  },
];

// Default user profile images and names
const defaultProfileImages = {
  student: "../img/secretComment.png",
};

// Function to display existing comments
function displayComments() {
  const commentsList = document.getElementById("comments-list");
  const commentCount = document.getElementById("comment-count");
  commentsList.innerHTML = ""; // Clear previous comments

  // Sort comments by timestamp (newest first)
  existingComments.sort((a, b) => b.timestamp - a.timestamp);

  existingComments.forEach((comment, index) => {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");
    commentElement.innerHTML = `
          <img src="${comment.profileImage}" alt="${comment.username} Profile Image" class="profile-image">
          <p><span class="username">${comment.username}</span>: ${comment.text}</p>
          <button class="toggle-replies" data-index="${index}">
              ${comment.replies.length} Replies ▼
          </button>
          <div class="replies" id="replies-${index}" style="display: none;"></div>
          <div class="reply-form" id="reply-form-${index}" style="display: none;">
              <textarea id="reply-input-${index}" placeholder="Write a reply..." required></textarea>
              <button class="submit-reply" data-index="${index}">Post Reply</button>
          </div>
      `;

    // Append reply buttons to each reply by student
    comment.replies.forEach((reply, replyIndex) => {
      const replyElement = document.createElement("div");
      replyElement.classList.add("reply");
      replyElement.innerHTML = `
              <img src="${reply.profileImage}" alt="${reply.username} Profile Image" class="profile-image">
              <p><span class="username">${reply.username}</span>: ${reply.text}</p>
              <button class="reply-button" data-comment-index="${index}" data-reply-index="${replyIndex}">Reply</button>
          `;
      commentElement
        .querySelector(`#replies-${index}`)
        .appendChild(replyElement);
    });

    commentsList.appendChild(commentElement);
  });

  // Add event listeners to toggle replies
  document.querySelectorAll(".toggle-replies").forEach((button) => {
    button.addEventListener("click", function () {
      const index = button.getAttribute("data-index");
      const repliesDiv = document.getElementById(`replies-${index}`);
      const isVisible = repliesDiv.style.display === "block";
      repliesDiv.style.display = isVisible ? "none" : "block";
      button.textContent = isVisible
        ? `${existingComments[index].replies.length} Replies ▼`
        : `${existingComments[index].replies.length} Replies ▲`;
    });
  });

  // Update comment count
  commentCount.textContent = existingComments.length;
}

// Event listener for adding a new comment
document
  .getElementById("comment-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const commentInput = document.getElementById("comment-input");
    const commentText = commentInput.value.trim();

    if (commentText) {
      // Add new comment with the current timestamp
      existingComments.push({
        text: commentText,
        timestamp: new Date(),
        username: "សិស្ស", // New comment username
        profileImage: defaultProfileImages.student, // New comment image
        replies: [], // Initialize with empty replies
      });
      displayComments(); // Re-display comments
      commentInput.value = ""; // Clear the input field
    }
  });

// Initial display of comments
displayComments();

function startQuiz() {
  alert("Starting the quiz!");
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add animation classes when the element is in view
      entry.target.classList.add("animate__animated", "animate__fadeInRight");
      observer.unobserve(entry.target);
    }
  });
});
const observer4 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add animation classes when the element is in view
      entry.target.classList.add("animate__animated", "animate__fadeInLeft");
      observer.unobserve(entry.target);
    }
  });
});
const observer2 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add animation classes when the element is in view
      entry.target.classList.add("animate__animated", "animate__fadeInUp");
      observer.unobserve(entry.target);
    }
  });
});
const observer3 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add animation classes when the element is in view
      entry.target.classList.add("animate__animated", "animate__fadeInDown");
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll(".introTelling").forEach((element) => {
  observer3.observe(element);
});
document.querySelectorAll(".containerBox").forEach((element) => {
  observer.observe(element);
});
document.querySelectorAll(".paragraph").forEach((element) => {
  observer2.observe(element);
});
document.querySelectorAll(".video-container").forEach((element) => {
  observer4.observe(element);
});
document.querySelectorAll(".suggestion").forEach((element) => {
  observer.observe(element);
});
document.querySelectorAll(".profile-container").forEach((element) => {
  observer4.observe(element);
});
document.querySelectorAll(".tab-content").forEach((element) => {
  observer2.observe(element);
});
document.querySelectorAll(".navbar").forEach((element) => {
  observer3.observe(element);
});

function toggleNotificationDropdown() {
  const dropdown = document.getElementById("notificationDropdown");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

// Close dropdown if clicked outside
document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("notificationDropdown");
  const bellIcon = document.querySelector(".controlbtn a:first-child");

  if (!dropdown.contains(event.target) && !bellIcon.contains(event.target)) {
    dropdown.style.display = "none";
  }
});
