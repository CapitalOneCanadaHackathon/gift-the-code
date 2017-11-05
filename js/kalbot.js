window.onload = function() {
  //on first click I sent "What's on your mind?"

  $(window).resize(function() {
        // This will fire each time the window is resized:
        if($(window).width() >= 800) {
            // if larger or equal
            $('#chat-history').addClass("chat-history");
            $('#chat-history').removeClass("chat-history-mobile");
          } else {
            // if smaller
            $('#chat-history').removeClass("chat-history");
            $('#chat-history').addClass("chat-history-mobile");

          }
        }).resize();

  $(init);
  function init(){
    var url = "http://kalbot-api.us-east-1.elasticbeanstalk.com/answer?response=";
    var query = "What's on your mind?"; //document.getElementById(this.id).
    $.get(url+query, function(data, status){
      console.log(data);
      console.log(data.options);
      let newButtons = data.options;
      $("#question-field").text(data.message);
      for(const index in newButtons){
        $("#button-"+index).text(newButtons[index].text);
        $("#button-"+index).data( "link", newButtons[index].link );
        console.log("link " + index + " --" + newButtons[index].link );
      }
    });
    console.log("*** Init function completed ***");
  }
  
  function updateScroll(){
    document.getElementById("chat-history").scrollTop = document.getElementById("chat-history").scrollHeight;
    //document.getElementById("chat-history-mobile").scrollTop = document.getElementById("chat-history-mobile").scrollHeight;
    $('html, body').scrollTop( $('body').height() );
  }
  $(document).ready(function(){
    $("button").click(function(){
      $("#chat-history").removeClass("hide"); // i only have to do this on the first click, but oh well.
      var url = "http://kalbot-api.us-east-1.elasticbeanstalk.com/answer?response=";
      var query =  $( "#"+this.id ).data( "link" );
      // console.log("SENDING THIS BACK TO REQUEST GET: "+query);
      // console.log(url+query);

      if(query === ""|| query === undefined){
       //what to do if there is no link on the component.
      }
      //log the previous question in the chat history as a smaller bubble.
      var prevQuestion = $( "#question-field" ).text();
      var $divQuestion = $("<p class='question cell'>" + prevQuestion + "</p>");
      $("#chat-history").append($divQuestion);

      //log the recent response in the chat history as a smaller bubble.
      var prevResponse = $( "#"+this.id ).text();
      var $divResponse = $("<p class='answer archived cell'>"+prevResponse + "</p>");
      console.log($divResponse);
      $("#chat-history").append($divResponse);

      //bring up the next question
      //if both are empty then display the message - send whats on your mind?
      $.get(url+query, function(data, status){
       console.log("THIS SHOULD BE EMPTY" + data.options);
       let newButtons = data.options;
       let message = data.message;
       let urlKeywords = "http"; //every string with http
      //after noticing the text leaves are empty, we verify the message isn't a link
        if(message.includes(urlKeywords)){
          var win = window.open(message, '_blank');
          if (win) {
              //Browser has allowed it to be opened
              win.focus();
          } else {
              //Browser has blocked it
              alert('Please allow popups for this website');
          }
          //message = "<a href='"+message+"' target='_blank'>"+message+"</a>";
          //console.log("********* THIS IS A FUCKING URL" + message);

        }
       $("#question-field").text(message);
       let tempCounter = data.options.length;

       for(const index in newButtons){
         //only make a button and display it when the text field has content
         if(newButtons[index].text === "" || newButtons[index].text === undefined){
          //show talk about something else button.
          $("#button-"+index).toggleClass("hide");
          tempCounter -=1;
          console.log(tempCounter + " COUNTER");

          if(tempCounter <= 0){
            //there's no buttons so display the default button and add a link to it 
            $("#button-0").text("Would you like to start the conversation again?");
            $("#button-0").data( "link", "What's on your mind?");   
            $("#button-0").toggleClass("hide");
            $("#button-1").text("Continue to www.kidshelphone.ca");
            $("#button-1").data( "link", "What's on your mind?");   
            $("#button-1").toggleClass("hide");
          }
        }
        // else if(newButtons[index].link ==="") {
        //   console.log("******************** link is empty");
        // } 
        else {
          $("#button-"+index).removeClass("hide");
          $("#button-"+index).text(newButtons[index].text);
          $("#button-"+index).data( "link", newButtons[index].link);        
          //console.log("link " + index + " --" + newButtons[index].link);
          updateScroll(); 
        }
      }
    });
    });
//if link contains https then send to that link

  });

}


/***********************
TODO
- default text in the gray box or put the message in the actual textbox.
- read links with https and if they have it then send the user to the new page. --huge selling point -- drive directly to content
*/