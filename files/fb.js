  /*
   * This is boilerplate code that is used to initialize
   * the Facebook JS SDK.  You would normally set your
   * App ID in this code.
   */

  // Additional JS functions here
  window.fbAsyncInit = function() {
    FB.init({
      appId      : 1406331849634811, // App ID
      status     : true,    // check login status
      cookie     : true,    // enable cookies to allow the
                            // server to access the session
      xfbml      : true,     // parse page for xfbml or html5
                            // social plugins like login button below
      oauth: true
    });

    // Put additional init code here
  };

  // Load the SDK Asynchronously
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/all.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));


function verificarLogin(){
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      PostImageToFacebook(response.authResponse.accessToken);
    } else if (response.status === 'not_authorized') {
      FB.login(function(response) {
          if (response.authResponse) {
            PostImageToFacebook(response.authResponse.accessToken);
          }
      });
    } else {
      FB.login(function(response) {
          if (response.authResponse) {
            PostImageToFacebook(response.authResponse.accessToken);
          } else {
            alert("Você não logou no Facebook!");
          }
      });
    }
   });
}
// Post a BASE64 Encoded PNG Image to facebook
function PostImageToFacebook(authToken) {
    var message = window.prompt("Digite a mensagem que irá aparecer em sua Timeline:" ,"Sorocaba é minha, é sua e também "+ $('#bottom-line').val() + " " + $('#top-line').val().toUpperCase() +"!!")
    if(message === null){
      return;
    }

    var canvas = document.getElementById("canvas");
    var imageData = canvas.toDataURL("image/png");
    try {
        blob = dataURItoBlob(imageData);
    } catch (e) {
        console.log(e);
    }
    var fd = new FormData();
    fd.append("access_token", authToken);
    fd.append("source", blob);
    fd.append("message", message);
    alert("Aguarde um momento, a imagem será enviada ao Facebook...");
    try {
        $.ajax({
            url: "https://graph.facebook.com/me/photos?access_token=" + authToken,
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                console.log("success " + data);
                alert("Compartilhado!");
                $("#poster").html("Posted Canvas Successfully");
            },
            error: function (shr, status, data) {
                alert("errr... algo deu errado...");
                console.log("error " + data + " Status " + shr.status);
            },
        });

    } catch (e) {
        console.log(e);
    }
}

// Convert a data URI to blob
function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {
        type: 'image/png'
    });
}