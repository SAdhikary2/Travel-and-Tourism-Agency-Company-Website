//   Scrollling animation for navber

// gsap.to("#nav", {
//   backgroundColor: "#fff",
//   color: "#000",
//   duration: 1,
//   height: "100px",
//   scrollTrigger: {
//     trigger: "#nav",
//     scroller: "body",

//     start: "top -10%",
//     end: "top -10%",
//     scrub: 3,
//   },
// });

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

var crsr=document.querySelector("#cursor")
var blur=document.querySelector("#cursor-blur")

document.addEventListener("mousemove",function(dets){
        crsr.style.left=dets.x+"px"
        crsr.style.top=dets.y+"px"
        blur.style.left=dets.x - 50+"px"
        blur.style.top=dets.y -50 +"px"
        

})










