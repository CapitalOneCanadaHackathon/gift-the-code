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
    console.log("------------------------------------ " + document.height());
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
      var $divQuestion = $("<h5 class='question cell'>" + prevQuestion + "</h5>");
      $("#chat-history").append($divQuestion);

      //log the recent response in the chat history as a smaller bubble.
      var prevResponse = $( "#"+this.id ).text();
      var $divResponse = $("<h5 class='answer archived cell'>"+prevResponse + "</h5>");
      console.log($divResponse);
      $("#chat-history").append($divResponse);

      updateScroll(); 
      //bring up the next question

      //only make a button and display it when the text field has content
      //if the text is blank don't display the button
      //if the link is blank dont look anything up
      //if both are empty then display the message - send whats on your mind?
      $.get(url+query, function(data, status){
       // console.log(data);
       let newButtons = data.options;
       $("#question-field").text(data.message);
       for(const index in newButtons){
        $("#button-"+index).text(newButtons[index].text);
        $("#button-"+index).data( "link", newButtons[index].link);
          //console.log("link " + index + " --" + newButtons[index].link);
        }
      });
    });

  });

}
