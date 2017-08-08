/* jshint browser: true */
(function (window, document) {
    "use strict";  /* Wrap code in an IIFE */

    var jQuery, $; // Localize jQuery variables

    function loadScript(url, callback) {
        /* Load script from url and calls callback once it's loaded */
        var scriptTag = document.createElement('script');
        scriptTag.setAttribute("type", "text/javascript");
        scriptTag.setAttribute("src", url);
        if (typeof callback !== "undefined") {
            if (scriptTag.readyState) {
                /* For old versions of IE */
                scriptTag.onreadystatechange = function () {
                    if (this.readyState === 'complete' || this.readyState === 'loaded') {
                        callback();
                    }
                };
            } else {
                scriptTag.onload = callback;
            }
        }
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(scriptTag);
    }

   function onConnectDone(res) {
      if (res == AppWarp.ResultCode.Success) {
        console.log("Client Connected");
        console.log("Checking If Admin is Online!!!!");
        _warpclient.getUserStatus("ADMIN");
      }
      else {
        console.log("Error in Connection");
      }
    }

    function onGetUserStatusDone(res) {

      $("#roomInfo").html("onGetUserStatusDone Success");
      if (res.json.status) {
        console.log("Admin is Online!!!!");
        $("#getUsers").html("Admin is available");
      } else {
        console.log("Admin is not Online!!!!");
        $("#getUsers").html("Admin is not available");
      }

    }

    //sendPrivateChat(toUser, message) 

    function onSendPrivateChatDone(res) {
      var msg = "onSendPrivateChatDone : <strong>" + AppWarp.ResultCode[res] + "</strong>";
      console.log(msg);
      if (AppWarp.ResultCode[res] == "Success") {

      } else {

      }
    }

    function onPrivateChatReceived(sender, chat) {
      var msg = "<strong>" + sender + "</strong> privately says <i> " + chat + "</i>";
      console.log(msg);
      setResponse(sender, chat)
    }

    function setResponse(sender, chat) {
      Date.prototype.monthNames = [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
      ];

      Date.prototype.getShortMonthName = function () {
        return this.monthNames[this.getMonth()].substr(0, 3);
      };
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getShortMonthName();
      var currDate = mm + " " + dd

      if (sender === nameId) {
        var liHtml = '<li><div class="row"><div class="col-xs-12"><div class="meta-info user_info_right"><a href="#">' + sender + '</a> on ' + currDate + '</div></div></div><div class="row"><div class="col-xs-2"> </div><div class="col-xs-10"><div class="chat-bubble chat-bubble-right"><div class="bubble-arrow"></div><p class="pd0 mr0">' + chat + '</p></div></div></div></li>'
        $("#response").html($("#response").html() + liHtml);
      }
      else {
        var liHtml = '<li><div class="row"><div class="col-xs-12"><div class="meta-info user_info_left"><a href="#">' + sender + '</a> on ' + currDate + '</div></div></div><div class="row"><div class="col-xs-10"><div class="chat-bubble chat-bubble-left"><div class="bubble-arrow"></div><p class="pd0 mr0">' + chat + '</p> </div>  </div> <div class="col-xs-2"> </div></div></li>'
        $("#response").html($("#response").html() + liHtml);
      }


      var fixedScroll = document.getElementById("chatDiv");
      fixedScroll.scrollTop = fixedScroll.scrollHeight;


    }

    function openChatWindow() {
      $('#chat').fadeOut(500);
      $('#appwarpchatRoomForm').fadeIn(1000);
      countMsg = 0
      $("#chatnote").text("");
    }
    function closeChat() {
      $('#appwarpchatRoomForm').fadeOut(500);
      $('#chat').fadeIn(1000);
    }

    function initializeAppwarpClient(obj) {
        console.log("Connecting...");
       AppWarp.WarpClient.initialize(obj.apiKey, obj.secreteKey);
      _warpclient = AppWarp.WarpClient.getInstance();
      _warpclient.setResponseListener(AppWarp.Events.onConnectDone, onConnectDone);
      _warpclient.setResponseListener(AppWarp.Events.onUserStatusDone, onGetUserStatusDone);
      _warpclient.setResponseListener(AppWarp.Events.onSendPrivateChatDone, onSendPrivateChatDone);
      _warpclient.setNotifyListener(AppWarp.Events.onPrivateChatReceived, onPrivateChatReceived);
      _warpclient.connect(obj.name);
    }

    function main(obj) {
        /* The main logic of our widget */
        var apiKey = "112af4dc8deae4602107b53dc00320ffbe6f4601c181097332210247042c0b2e";
        var secreteKey = "acedbf2c30df3cff12a6592e09441986ffa136e1caedbfd6b4c72ea57dddc3f6";
        var obj = { "apiKey": apiKey, "secreteKey": secreteKey, "name": "Chauhan" }
        var _warpclient;
        initializeAppwarpClient(obj)  // get this object obj from the client
   }

    /* Load jQuery */
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min.js", function () {
        /* Restore $ and window.jQuery to their previous values and store the
           new jQuery in our local jQuery variables. */
        $ = jQuery = window.jQuery.noConflict(true);
        /* Load jQuery plugin and execute the main logic of our widget once the
           plugin is loaded is loaded */
        loadScript("http://cdn.shephertz.com/repository/files/bb3884923279901ad527f58fd01b255e3d450728e93dfae27c2281c8a8e46cdd/478013a53ffce578b9ec0088fd6ba6e10df07dfb/appwarp.js", function () {
            main();
        });
    });

}(window, document)); /* end IIFE */