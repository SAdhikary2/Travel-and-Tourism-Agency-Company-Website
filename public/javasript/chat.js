var data= {
    chatinit:{
        title: ["Hello <span class='emoji'> &#128075;</span>","I am ExploreHelper","How can I help you?"],
        options: ["TravelSpot ","Blog Related to Travel","Travel Acessories","Others"]
    },
    travelspot: {
        title:["Please select category"],
        options:['IndianDestination and Guidance','InternationalDestination and Guidance','Honeymoon Places','Trending Places'],
        url : {
            
        }
    },
    
    blog: {
        title:["Top Trending Article and Blog Which Help you Lot For Your Travel"],
        options:["Best places To Visit in India In August","Most Beautiful Islands In The Maldives:A Visual Journey","Exploring The Best Shooping Destination In Singapore","Ultimate Guide To Shooping In Vietnam: Top 10 Destinations and Insider Tips","A Culinary Adventure In Ladakh: Must-Try Dishes For Every Foodie"],
        url : {
            more:"http://localhost:5000/blog#https://wanderon.in/blogs/local-food-in-leh-ladakh",
            link:["https://www.fabhotels.com/blog/places-to-visit-in-august/","https://traveltriangle.com/blog/biyadhoo-island/","https://traveltriangle.com/blog/malls-in-singapore/","https://traveltriangle.com/blog/vietnam-shopping/","https://tripnme.com/blogs/a-culinary-adventure-in-ladakh/"]
        }
    },
    travel: {
      
        title:["These Are The Some Travel Accessories That Will Help You Too Much ...",'Travel Languages','Travel Adapters and Converters','Packing Cubes and Organizers','Travel Neck Pillows and Eye Masks','Portable Chargers and Power Banks',"Travel Toiletry Kits and Bags","Travel Wallets and Document Organizers","Travel-Sized Toiletries and Hygiene Products","Travel Umbrellas and Rain Gear","Travel Safety Locks and Security Devices","Travel First Aid Kits","Foldable Travel Hangers and Laundry Accessories","Travel-Friendly Water Bottles and Filter Systems","Travel Guides and Language Translation Devices","Travel-Ready Cookware and Eating Utensils","Travel-Size Sewing Kits and Repair Tools","Travel-Friendly Reading Materials and Entertainment"],
        url : {
            
        }
    },
   
   
    indiandestination: {
        title: ["Thanks for your response","Here are some famous Indian Destinations and The Proper Guidance How To Go There.."],
        options: ["Andaman","Kerala","Kashmir","Gujrat","Shimla","Goa","Agra","Rajasthan","Varanashi","Ooty"],
        url: {
            more:"https://www.youtube.com/",
            link:["https://youtu.be/rxw2Kc-uRjk?si=dsn6zxAl6cPkgn9y","https://youtu.be/yLE5bDX7M3Y?si=TOohYFz3U0AGUOMe","https://youtu.be/qmGYnJgCW1o?si=7pS6dnpbtP6hTofv","https://youtu.be/ZxALiRqtwpA?si=nOgso8GfA-RFt57u","https://youtu.be/f-oDL-fZAic?si=MQ731xLHhT_1yLyd","https://youtu.be/jYLXQWVpDYk?si=BhJ1eyqldlxfhfuX","https://youtu.be/NnGszBSiRxk?si=dSTbUunSB-wVGYS1","https://youtu.be/mf-t5oivaY8?si=UYdugoT_bVmR9FZA","https://youtu.be/vx2JKK3nP6I?si=FQPg2nmTUpecMnJq","https://youtu.be/Osi_BGVCv_I?si=HYmmofWeV8M1kRZ0"]
        }
    },
    internationaldestination: {
        title: ["Thanks for your response","Here Are The Some Famous International Destination And Guidance"],
        options: ["Australia","America","Canada","Africa","Europe","Paris","Rome","Spain","Singapore"],
        url: {
            more:"https://www.youtube.com/",
            link:["https://youtu.be/tYfD7teA65w?si=2KDXQ-EM57lmbnK2","https://youtu.be/hepaEWujDrI?si=wSVh7O7jUn11SFwv","https://youtu.be/ctrSCEiYo1A?si=y8Z7rQ6CBBCUV_sL","https://youtu.be/oGChCx0xsSs?si=kofZv0MIw899EhEN","https://youtu.be/7-d9GHbeGfw?si=Jcc2RRYmd65suRo5","https://youtu.be/vrXONXSxJWE?si=chofVx7SGf2_eUtu","https://youtu.be/5DcA4BePBdA?si=qOJiZ1dfyNPCzA0g","https://youtu.be/myoNlbXG2RI?si=d-OT30huFRzBZk2i","https://youtu.be/XSDqXSVt3BE?si=P6yWjZdT7VeBoFfU"]
        }
    },
    honeymoon: {
        title: ["Thanks for your response","Here Are The Best Honeymoon Place Suggestion For Couple And The Proper Guidance"],
        options: ["Bora Bora","St.Lucia","Fiji","Maldives","Bali","Santorini","Lakshadweep"],
        url: {
            more:"https://www.youtube.com/",
            link:["https://youtu.be/gSudm8JWvlQ?si=u5ajBA29yfgLFYuz","https://youtu.be/ljKKIKUfn-Y?si=uRlI6fJeh7RtxJ8R","https://youtu.be/JRaakIL-N_s?si=N3IYL_jER4vHcrfY","https://youtu.be/g-eGMxPzYYQ?si=bGLIhryMS9K7NlLZ","https://youtu.be/-dbVN_Z2iIU?si=ZrmrteS9Hssy6mba","https://youtu.be/125nMc_Nz8s?si=isNaTGjC9yWIVzYm","https://youtu.be/e7cAsFSrbKc?si=6ZQHzBosdoIh3kfr"]
        }
    },
    // "Customer Supports","Tips and Advice","Etiquette and Cultural Sensitivity","Sustainable Travel Practices"
    others: {
        title: ["Here are some more options for you"],
        options: ["Customer Supports","Tips and Advice","Etiquette and Cultural Sensitivity","Sustainable Travel Practices"],
        url: {
            more:"https://www.youtube.com/",
            link:["#","#","#","#","#"]
        }
    },

  
}


document.getElementById("init").addEventListener("click",showChatBot);
var cbot= document.getElementById("chat-box");

var len1= data.chatinit.title.length;

function showChatBot(){
    console.log(this.innerText);
    if(this.innerText=='START CHAT'){
        document.getElementById('test').style.display='block';
        document.getElementById('init').innerText='CLOSE CHAT';
        initChat();
    }
    else{
        location.reload();
    }
}

function initChat(){
    j=0;
    cbot.innerHTML='';
    for(var i=0;i<len1;i++){
        setTimeout(handleChat,(i*500));
    }
    setTimeout(function(){
        showOptions(data.chatinit.options)
    },((len1+1)*500))
}

var j=0;
function handleChat(){
    console.log(j);
    var elm= document.createElement("p");
    elm.innerHTML= data.chatinit.title[j];
    elm.setAttribute("class","msg");
    cbot.appendChild(elm);
    j++;
    handleScroll();
}

function showOptions(options){
    for(var i=0;i<options.length;i++){
        var opt= document.createElement("span");
        var inp= '<div>'+options[i]+'</div>';
        opt.innerHTML=inp;
        opt.setAttribute("class","opt");
        opt.addEventListener("click", handleOpt);
        cbot.appendChild(opt);
        handleScroll();
    }
}

function handleOpt(){
    console.log(this);
    var str= this.innerText;
    var textArr= str.split(" ");
    var findText= textArr[0];
    
    document.querySelectorAll(".opt").forEach(el=>{
        el.remove();
    })
    var elm= document.createElement("p");
    elm.setAttribute("class","test");
    var sp= '<span class="rep">'+this.innerText+'</span>';
    elm.innerHTML= sp;
    cbot.appendChild(elm);

    console.log(findText.toLowerCase());
    var tempObj= data[findText.toLowerCase()];
    handleResults(tempObj.title,tempObj.options,tempObj.url);
}

function handleDelay(title){
    var elm= document.createElement("p");
        elm.innerHTML= title;
        elm.setAttribute("class","msg");
        cbot.appendChild(elm);
}


function handleResults(title,options,url){
    for(let i=0;i<title.length;i++){
        setTimeout(function(){
            handleDelay(title[i]);
        },i*500)
        
    }

    const isObjectEmpty= (url)=>{
        return JSON.stringify(url)=== "{}";
    }

    if(isObjectEmpty(url)==true){
        console.log("having more options");
        setTimeout(function(){
            showOptions(options);
        },title.length*500)
        
    }
    else{
        console.log("end result");
        setTimeout(function(){
            handleOptions(options,url);
        },title.length*500)
        
    }
}

function handleOptions(options,url){
    for(var i=0;i<options.length;i++){
        var opt= document.createElement("span");
        var inp= '<a class="m-link" href="'+url.link[i]+'">'+options[i]+'</a>';
        opt.innerHTML=inp;
        opt.setAttribute("class","opt");
        cbot.appendChild(opt);
    }
    var opt= document.createElement("span");
    var inp= '<a class="m-link" href="'+url.more+'">'+'See more</a>';

    const isObjectEmpty= (url)=>{
        return JSON.stringify(url)=== "{}";
    }

    console.log(isObjectEmpty(url));
    console.log(url);
    opt.innerHTML=inp;
    opt.setAttribute("class","opt link");
    cbot.appendChild(opt);
    handleScroll();
}

function handleScroll(){
    var elem= document.getElementById('chat-box');
    elem.scrollTop= elem.scrollHeight;
}