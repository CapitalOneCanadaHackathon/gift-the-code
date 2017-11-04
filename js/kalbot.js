window.onload = function() {
  //on first click I sent "What's on your mind?"
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

  $(document).ready(function(){
    $("button").click(function(){
      var url = "http://kalbot-api.us-east-1.elasticbeanstalk.com/answer?response=";
      var query =  $( "#"+this.id ).data( "link" );


      // console.log("SENDING THIS BACK TO REQUEST GET: "+query);
      // console.log(url+query);
      if(query === ""|| query === undefined){
       //what to do if there is no link on the component.     
      }

      //LOG the recent response in the chat history as a smaller bubble.

      var recentResponse = $( "#"+this.id ).text();
      var $div = $("<div></div>");;
      $("#chat-history").append($div);
      //log the previous question in the chat history as a smaller bubble.


      //bring up the next question

      $.get(url+query, function(data, status){
       // console.log(data);
        let newButtons = data.options;
        $("#question-field").text(data.message);
        for(const index in newButtons){
          $("#button-"+index).text(newButtons[index].text);
          $("#button-"+index).data( "link", newButtons[index].link);
          //console.log("link " + index + " --" + newButtons[index].link);
        }

        //switch to text - enter phone number, and we send a text
        //the buttons without links need functionality and what they can do is actually respond to what they are so


          //console.log("this is the id: " + this.id);
          //console.log(document.getElementById("question-field").innerHTML);
          // $.get(url+query, function(data, status){
          //   document.getElementById("question-field").innerHTML = data;
          //   var newButtons = map.get(data);
          //   for(const [i,button] of newButtons.entries()){
          //     console.log(i);
          //     console.log(button);
          //     console.log("----");
          //     console.log(newButtons.entries());
          //     console.log(document.getElementById("button-1").innerHTML);
          //     var temp = document.getElementById("button-"+i);
          //     console.log("why is this poo?" + temp);
          //   }
            //alert("Data: " + data + "\nStatus: " + status);
          });
    });
  });
}
