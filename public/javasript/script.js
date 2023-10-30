// page1 h2 text animation
var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml3 .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2000,
    delay: (el, i) => 150 * (i+1)
  }).add({
    targets: '.ml3',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });




//   Scrollling animation for navber

gsap.to("nav", {
  backgroundColor: "#373636",
  
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
                "/austrelia?query=austrelia";
              break;

            case "canada":
              window.location.href =
                "/canada?query=canada";
              break;

              case "europe":
              window.location.href =
                "/europe?query=canada";
              break;

              case "south africa":
              window.location.href =
                "/south africa?query=canada";
              break;

              case "america":
              window.location.href =
                "/america?query=canada";
              break;

              // Indian Holiday 
              case "andaman":
                window.location.href =
                  "/andaman?query=canada";
                break;
            
                case "gujrat":
                  window.location.href =
                    "/gujrat?query=canada";
                  break;

                  case "jammu":
                    window.location.href =
                      "/jammu?query=canada";
                    break;

                    case "kasmir":
                      window.location.href =
                        "/kasmir?query=canada";
                      break;

                      case "kerala":
                        window.location.href =
                          "/kerala?query=canada";
                        break;

                        
                        case "rajasthan":
                          window.location.href =
                            "/rajasthan?query=canada";
                          break;

                  

            default:
              window.location.href = "pge not found";
          }
        });



        //preloader
        // For Live Projects
window.addEventListener('load',function(){
  document.querySelector('body').classList.add("loaded")  
});
