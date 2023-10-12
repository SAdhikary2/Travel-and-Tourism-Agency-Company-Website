// Pagination>>>>>>>>>>>>

const itemsPerPage = 1;
const items = document.querySelectorAll('.item');
const pagination = document.getElementById('pagination');

function showPage(pageNumber) {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  items.forEach((item, index) => {
    if (index >= startIndex && index < endIndex) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

function createPaginationButtons() {
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Previous Button
  const previousButton = document.createElement('a');
  previousButton.href = '#';
  previousButton.classList.add('page-link');
  previousButton.textContent = 'Previous';

  previousButton.addEventListener('click', () => {
    const activePage = document.querySelector('.page-link.active');
    const pageNumber = parseInt(activePage.textContent);
    if (pageNumber > 1) {
      showPage(pageNumber - 1);
      updateActiveButton(pageNumber - 1);
    }
  });

  pagination.appendChild(previousButton);

  // Page Buttons
  for (let i = 1; i <= pageCount; i++) {
    const button = document.createElement('a');
    button.href = '#';
    button.classList.add('page-link');
    button.textContent = i;

    // Use a closure to capture the correct page number
    button.addEventListener('click', (pageNumber => {
      return () => {
        showPage(pageNumber);
        updateActiveButton(pageNumber);
      };
    })(i));

    pagination.appendChild(button);
  }

  // Next Button
  const nextButton = document.createElement('a');
  nextButton.href = '#';
  nextButton.classList.add('page-link');
  nextButton.textContent = 'Next';

  nextButton.addEventListener('click', () => {
    const activePage = document.querySelector('.page-link.active');
    const pageNumber = parseInt(activePage.textContent);
    if (pageNumber < pageCount) {
      showPage(pageNumber + 1);
      updateActiveButton(pageNumber + 1);
    }
  });

  pagination.appendChild(nextButton);

  showPage(1); // Show the first page by default
  updateActiveButton(1); // Mark the first button as active by default
}

function updateActiveButton(activePage) {
  const buttons = document.querySelectorAll('.page-link');
  buttons.forEach(button => button.classList.remove('active'));

  const activeButton = document.querySelector(`.page-link:nth-child(${activePage + 1})`);
  activeButton.classList.add('active');
}

createPaginationButtons();


// It will set the scroll position to the top...


window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}





// When the user scrolls down 20px from the top of the document, show the button

window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// function to smoothly scroll to the top when the button is clicked

function topFunction() {
  window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
}