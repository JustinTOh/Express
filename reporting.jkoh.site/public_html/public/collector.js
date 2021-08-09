
//can youse <noscript></noscript> to check if
//javascript is enabled
//ADDEDEDEDED
var current_page = window.location.href
//YYESSIR
console.log(current_page)
var Cursor = []
var Scroller = []
var KeyD = []
var KeyU = []
var TotalI = [0]
var IdleDate = []
var Clicks = []
var ActiveId = 0
var Done = [0,0,0,0,0,0,0]
var urlA = "https://reporting.jkoh.site/active"
var DateEntered = Date.now()

fetch(urlA, {

  method: 'POST',
  body: JSON.stringify({
    CursorPos: Cursor,
    ScrollBar: Scroller,
    KeyD: KeyD,
    KeyU: KeyU,
    TotalIdle: TotalI,
    IdleTime: IdleDate,
    MouseClick: Clicks,
    DateEn: DateEntered,
    CurrPage: current_page,
    DateLeft: DateEntered,
    TimeSpent: 0
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
}).then(function (response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response);
}).then(function (data) {
  console.log(data);
  ActiveId = data._id;
}).catch(function (error) {
  console.warn('Something went wrong.', error);
});





//static
function getWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }
function getHeight() {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
}

var Img = false;

function noimage()
{

    if ((document.getElementById('flag').offsetWidth==1 
         && document.getElementById('flag').readyState=='complete')
         ||(document.getElementById('flag').offsetWidth==1
         && document.getElementById('flag').readyState==undefined))
    {
      Img = true;

    }

}

var cssdisabled = false; // must be proven otherwise
var testcss = document.createElement('div');
testcss.style.position = 'absolute';
document.getElementsByTagName('body')[0].appendChild(testcss);
if (testcss.currentStyle) 
  var currstyle = testcss.currentStyle['position'];
else if (window.getComputedStyle) 
  var currstyle = document.defaultView.getComputedStyle(testcss, null).getPropertyValue('position');
var cssdisabled = (currstyle == 'static') ? true : false;
document.getElementsByTagName('body')[0].removeChild(testcss);


var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
var type = connection.effectiveType;





window.onload = function(){
  setTimeout(function(){
    noimage()
    var t = performance.getEntriesByType("navigation")[0];
    // console.log(t)
    // console.log(t.responseEnd)
    // console.log(t.loadEventEnd)
    // console.log(t.loadEventEnd - t.responseEnd);

    var urlP = "https://reporting.jkoh.site/perform"
    fetch(urlP, {

      method: 'POST',
      body: JSON.stringify({
        TimeObject: t,
        StartTime: t.responseEnd,
        EndTime: t.loadEventEnd,
        LoadTime: (t.loadEventEnd - t.responseEnd)
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    }).then(function (data) {
      console.log(data);
    }).catch(function (error) {
      console.warn('Something went wrong.', error);
    });

    //STATIC SEND
    //sending data
    var urlS ="https://reporting.jkoh.site/static"
    fetch(urlS, {

    	method: 'POST',
    	body: JSON.stringify({

        Agent_string: navigator.userAgent,
        Language: navigator.language,
        CookiesEn: navigator.cookieEnabled,
        JSEn: true,
        ImagesEn: Img,
        CSSEn: !cssdisabled,
        ScreenW: screen.width,
        ScreenH: screen.height,
        WindowW: getWidth(),
        WindowH: getHeight(),
        Connection_Type: type
    	}),
    	headers: {
    		'Content-type': 'application/json; charset=UTF-8'
    	}
    }).then(function (response) {
    	if (response.ok) {
    		return response.json();
    	}
    	return Promise.reject(response);
    }).then(function (data) {
    	console.log(data);
    }).catch(function (error) {
    	console.warn('Something went wrong.', error);
    });

  }, 0);
}

//activity
//functions needed
var startIdle= new Date().getTime();

function activityWatcher(){
  var secondsSinceLastActivity = 0;
  var holder = new Date().getTime();
  startIdle = holder;

  setInterval(function(){
      secondsSinceLastActivity++;
  }, 1000);

  function activity(){
    if(secondsSinceLastActivity >= 2){
      var newTime = new Date().getTime();
      //console.log(newTime - startIdle);

      if(TotalI.length < 500){
        TotalI.push(newTime - startIdle)
        var IdleD = Date.now()
        //console.log(IdleD)
        IdleDate.push(IdleD)
      }
      else{
        Done[0] = 1
        Done[1] = 1
      }

      //console.log(newTime);
    }

    secondsSinceLastActivity = 0;
    var testing = new Date().getTime();
    startIdle = testing;
  }

  //An array of DOM events that should be interpreted as
  //user activity.
  var activityEvents = [
      'mousedown', 'mousemove', 'keydown',
      'scroll', 'touchstart'
  ];

  //add these events to the document.
  //register the activity function as the listener parameter.
  activityEvents.forEach(function(eventName) {
      document.addEventListener(eventName, activity, true);
  });


}


if(Done[2] == 0){
  document.onmousemove = function(e){
    if (Cursor.length < 500){
      //var pageCoords = "( " + e.pageX + ", " + e.pageY + " )";
      //console.log(pageCoords)
      var obj = {}
      obj["x"] = e.pageX
      obj["y"] = e.pageY
      Cursor.push(obj)
    }else{
      Done[2] = 1
    }
  };
}

if(Done[6] == 0){
  document.onmousedown = function(e){
    e = e || window.event;
    if(Clicks.length < 500){
      if(e.button == 0){
        //console.log("left click");
        Clicks.push("left click")
      }
      else if(e.button == 1){
        //console.log("middle click");
        Clicks.push("middle click")
      }
      else if(e.button == 2){
        //console.log("right click");
        Clicks.push("right click")
      }
      else{
        //console.log("Your mouse has more buttons.");
        Clicks.push("??? click")
    }
  }
    else{
      Done[6] = 1
    }
  
  };
}


if (Done[3] == 0) {
  window.onscroll = function (e) {
    if(Scroller.length < 500){
      Scroller.push(window.scrollY)
    }else{
      Done[3] = 1
    }
    //console.log(window.scrollY ); // Value of scroll Y in px
  };
  
}

var KeyCounting = 0

if(Done[4] == 0 || Done[5] == 0){

  window.onkeydown = function(e){
    KeyCounting = KeyCounting + 1
    if(KeyCounting< 500){
      KeyD.push("Down")
      //console.log(KeyD)
    }
    else{
      Done[4] = 1
    }

  }
  window.onkeyup = function(e){
    if(KeyCounting < 500){
      KeyU.push("Up")
    }
    else{
      Done[5] = 1
    }
    //console.log("up\t" + e.keyCode);
  }
}


if(Done[0] == 0){
  activityWatcher();
}


  
setInterval(function(){
    var newDate = Date.now();
    if (Done[0] == 1 && Done[1] == 1 && Done[2] == 1 && Done[3] == 1 && Done[4] == 1 && Done[5] == 1 && Done[6] == 1){
      console.log("Recorded CAP of everything :D")
    }
    else{      

      fetch(`https://reporting.jkoh.site/active/${ActiveId}`, {

        method: 'PUT',
        body: JSON.stringify({
          CursorPos: Cursor,
          ScrollBar: Scroller,
          KeyD: KeyD,
          KeyU: KeyU,
          TotalIdle: TotalI,
          IdleTime: IdleDate,
          MouseClick: Clicks
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then(function (response) {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      }).then(function (data) {
        console.log(data);
      }).catch(function (error) {
        console.warn('Something went wrong.', error);
      });
    }
}, 6000);






//sending Data
window.addEventListener('beforeunload', function (e) {

  var Lefts = Date.now()
  fetch(`https://reporting.jkoh.site/active/${ActiveId}`, {

    method: 'PUT',
    body: JSON.stringify({
      CursorPos: Cursor,
      ScrollBar: Scroller,
      KeyD: KeyD,
      KeyU: KeyU,
      TotalIdle: TotalI,
      IdleTime: IdleDate,
      MouseClick: Clicks,
      DateLeft: Lefts,
      TimeSpent: (Math.abs(Lefts - DateEntered)),
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  }).then(function (data) {
    console.log(data);
  }).catch(function (error) {
    console.warn('Something went wrong.', error);
  });

})