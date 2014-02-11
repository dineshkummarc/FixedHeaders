$(document).ready(function(){
  var timer;
  
  $(window).scroll(function() {

    var topdisplay  = $('#fixedheader').css('top');
    var footdisplay = $('#fixedfooter ul').css('display');
    var scrolltoppx = $(this).scrollTop();
    
    
    if(scrolltoppx < 10 && topdisplay != "-35px") {
      // if we scroll up anywhere from 9px-0px and the header is hidden,
      // immediately display the header smoothly into the scroll
        clearTimeout(timer);
        autoDisplayHeader();
        $('#toparrow').fadeOut(350);
    }   

    
    if(scrolltoppx > 130 && topdisplay == "-35px") {
      // if we scroll beyond 130px and the header is still displaying,
      // hide the header after 700ms pause
      clearTimeout(timer);      
      timer = setTimeout(function() {
        autoHideHeader();
        $('#toparrow').fadeIn(450);
      }, 600);
    }
    
    if(scrolltoppx + $(window).height() == getDocHeight()) {
      // if the current window position + the above space equals the total window height
      // then the user is at the bottom of the page.
      // in this case we quickly display the small fixed footer
      if(footdisplay == 'none') {
        $('#fixedfooter ul').fadeIn(300);
      }
    }
    
    if(scrolltoppx + $(window).height() != getDocHeight() && footdisplay == 'block') {
      // if the user is not at the bottom and our footer is being displayed
      // we need to hide it until we re-enter the bottom again
      $('#fixedfooter ul').fadeOut(300);
    }
    

  }); 

  $('#toparrow').on('click', function() {
    // when clicking the arrow we are animated immediately to the top
    $("html, body").animate({ scrollTop: "0px" });
  });  
});
 


/**
 * functions to hide and display the header
 */
function autoHideHeader(){
  $('#fixedheader').animate({
    top: '-149px',
  }, 450, 'easeInBack');
  
  $('#pagewrapper').animate({
    'margin-top': '3px',
  }, 450, 'easeInBack');  
}
  
function autoDisplayHeader(){
  $('#fixedheader').animate({
    top: '-35px',
  }, 400, 'easeOutBack');
    
  $('#pagewrapper').animate({
    'margin-top': '117px',
  }, 400, 'easeOutBack');  
}

/**
 * cross-browser function to determine full browser height
 * needed to check when user hits the bottom of the webpage
 * source: http://james.padolsey.com/javascript/get-document-height-cross-browser/
 */
function getDocHeight() {
  var D = document;
  
  return Math.max(
    Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
    Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
    Math.max(D.body.clientHeight, D.documentElement.clientHeight)
  );
}