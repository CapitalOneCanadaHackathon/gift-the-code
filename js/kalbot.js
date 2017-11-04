  window.onload = function() {
    var map = new Map();
    //questions array mapped to one button array.
    //array of strings mapped to an array of buttons

    //I'm sad responses
    map.set("Would you like me to get someone to text you?", ["Sure, text me", "No, I don't want to text", "I don't have access to text"]);
    map.set("Oh I'm sorry to hear that, how can I help?", ["How can you help?", "You can't help me", "I don't need help"]);
    map.set("Would you like me to get someone to call you?", ["Sure, call me", "No, I don't want to call", "I don't have access to call"]);
    //I'm happy responses
    map.set("That's amazing! What brings you here?", ["I'm here for content!", "I'm here to learn", "I'm here for help"]);
    map.set("Always nice to see a smiling face, what do you need today?", ["I'm here for content!", "I'm here to learn", "I'm here for help"]);
    map.set("What fantastic news, what can I do for you?", ["I'm here for content!", "I'm here to learn", "I'm here for help"]);
    //I'm okay responses
    map.set("Nice to hear, what do you need?", ["I'm here for content!", "I'm here to learn", "I'm here for help"]);
    map.set("Well then, whats up?", ["I'm here for content!", "I'm here to learn", "I'm here for help"]);
    map.set("I'm happy to hear that! What can I do for you?", ["I'm here for content!", "I'm here to learn", "I'm here for help"]);


      console.log(map["Would you like me to get someone to call you?"]);
      $(document).ready(function(){
        $("button").click(function(){
          var url = "http://kalbot-api.us-east-1.elasticbeanstalk.com/answer?response=";
          var query = document.getElementById(this.id).textContent;
          console.log(url+query);
          $.get(url+query, function(data, status){
            var newButtons = map.get(data);
            console.log(data);
              $("#question-field").text(data);
            for(const index in newButtons){
              $("#button-"+index).text(newButtons[index]);
            }

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
