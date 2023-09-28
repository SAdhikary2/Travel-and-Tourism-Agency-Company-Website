//   Scrollling animation for navber

gsap.to("nav", {
  backgroundColor: "#000",
  
  duration: 1,
  height: "80px",
  scrollTrigger: {
    trigger: "nav",
    scroller: "body",

    start: "top -10%",
    end: "top -10%",
    scrub: 3,
  },
});

gsap.to("#main", {
  backgroundColor: "#000",
  scrollTrigger: {
    trigger: "#main",
    scroller: "body",

    start: "top -30%",
    end: "top -80%",
    scrub: 3,
  },
});

// for cursor

var crsr = document.querySelector("#cursor");
var blur = document.querySelector("#cursor-blur");

document.addEventListener("mousemove", function (dets) {
  crsr.style.left = dets.x + "px";
  crsr.style.top = dets.y + "px";
  blur.style.left = dets.x - 50 + "px";
  blur.style.top = dets.y - 50 + "px";
});


// javascript for search bar
document
        .getElementById("searchForm")
        .addEventListener("submit", function (event) {
          event.preventDefault();
          var searchQuery = document.getElementById("searchInput").value;
          // window.location.href = 'International Holiday/Austrelia Tour.html?query=';

          switch (searchQuery.toLowerCase()) {
            case "austrelia":
              window.location.href =
                "International Holiday/Austrelia Tour.html?query=austrelia";
              break;

            case "canada":
              window.location.href =
                "International Holiday/Canada Tour.html?query=canada";
              break;

              case "europe":
              window.location.href =
                "International Holiday/Europe Tour.html?query=canada";
              break;

              case "south africa":
              window.location.href =
                "International Holiday/South Africa Tour.html?query=canada";
              break;

              case "america":
              window.location.href =
                "International Holiday/America Tour Package.html?query=canada";
              break;

            default:
              window.location.href = "pge not found";
          }
        });