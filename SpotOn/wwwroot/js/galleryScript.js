
const input = document.getElementById('fileinput');
const id = localStorage.getItem("userid");

// Event handler executed when a file is selected
const onSelectFile = () => upload();

// Add a listener on your input
// It will be triggered when a file will be selected
input.addEventListener('change', onSelectFile, false);
// This will upload the file after having read it  
var upload = () => {

    var title = $("#txtTitle").val();
    var describe = $("#txtDescribe").val();

    if (title == "") {
        $("#warningTextError").html("Please title your gallery")
        $("#menu-warning-error").showMenu();
        $("#txtTitle").focus();
        return false;
    }
    if (describe == "") {
        $("#warningTextError").html("Please describe your gallery")
        $("#menu-warning-error").showMenu();
        $("#txtDescribe").focus();
        return false;
    }


    let imageFile = $(fileinput)[0].files[0];

    if (imageFile.length == 0) {
        return false
    }

    $('#snackbar-9').toast('show');
    $("#up").addClass('hidden');
    $("#pro_create").removeClass('hidden');
    $("#fileinput").addClass('hidden');

    var reader = new FileReader();
    reader.onload = function (e) {
        var img = document.createElement("img");
        img.onload = async function (event) {
            // Dynamically create a canvas element
            var canvas = document.createElement("canvas");

            // var canvas = document.getElementById("canvas");
            var ctx = canvas.getContext("2d");

            // Actual resizing
            var MAX_WIDTH = 469;
            var MAX_HEIGHT = 508;

            var width = img.width;
            var height = img.height;

            // Change the resizing logic
            if (width > height) {
                if (width > MAX_WIDTH) {
                    height = height * (MAX_WIDTH / width);
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width = width * (MAX_HEIGHT / height);
                    height = MAX_HEIGHT;
                }
            }

            var canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            ctx.webkitImageSmoothingEnabled = true;
            ctx.msImageSmoothingEnabled = true;
            ctx.imageSmoothingEnabled = true;
            // Show resized image in preview element
            var dataurl = canvas.toDataURL(imageFile.type);
            document.getElementById("preview").src = dataurl;

            var raw = JSON.stringify({
                "AccountId": id,
                "Title": title,
                "Description": describe,
                "Photo": dataurl
            });

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            await fetch(server_url + "/gallery", requestOptions)
                .then(response => {
                    if (!response.ok) {
                        console.log('Network response was not ok ' + response);
                        $('#snackbar-9').toast('hide');
                        $("#menu-warning-1").showMenu();
                        $("#up").removeClass('hidden');
                        $("#pro_create").addClass('hidden');
                        $("#fileinput").removeClass('hidden');
                    }

                    return response.json();
                })
                .then(data => {

                    $('#snackbar-9').toast('hide');
                    $("#pro_create").addClass('hidden');
                    $("#fileinput").removeClass('hidden');
                    if (data.message == "The file was successfully uploaded")
                        loadGallery(id);

                })
                //.then(result => uploadOk(result))
                .catch(error => showError());
        }
        img.src = e.target.result;
    }
    reader.readAsDataURL(imageFile);
}
var showError = () => {
    $("#up").removeClass('hidden');
    $("#pro_create").addClass('hidden');
    $("#fileinput").removeClass('hidden');
    $("#menu-warning-file-upload").showMenu()
}



var loadGallery = (id) => {

    const options = {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
        redirect: 'follow'
    };

    $("#load_gallery").removeClass('hidden');
    fetch(server_url + "/gallery/" + id, options)
        .then(response => {
            if (!response.ok) {
                $("#dash_description").html("Network Error! <a href='javascript: loadGallery();'>Reload Gallery</a>");
                $("#load_gallery").addClass('hidden');
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            if (data.length == 0) {
                $("#gallery_container").html("<p>Here, you can update your client(s) of your past jobs in pictures</p>");
                $("#load_gallery").addClass('hidden');
            } else {
                 
                var i = 6;
                data.forEach(item => {
                    if (i == 6) {
                        $("#pix_6").attr("src", item.photo);
                        $("#h_6").removeClass('hidden');
                        document.getElementById('ref_6').setAttribute('href', "javascript:deleteGallery(" + item.id + ")"); 
                        i++;
                    }
                    else {
                        if (i == 7) {
                            $("#pix_7").attr("src", item.photo);
                            $("#h_7").removeClass('hidden');
                            document.getElementById("ref_7").href = "javascript:deleteGallery(" + item.id + ")";
                            i++;
                        } else {
                            if (i == 8) {
                                $("#pix_8").attr("src", item.photo);
                                $("#h_8").removeClass('hidden');
                                document.getElementById("ref_8").href = "javascript:deleteGallery(" + item.id + ")";
                                i++;
                            } else {
                                if (i == 9) {
                                    $("#pix_9").attr("src", item.photo);
                                    $("#h_9").removeClass('hidden');
                                    document.getElementById("ref_9").href = "javascript:deleteGallery(" + item.id + ")";
                                    i++;
                                }
                            }
                        }
                    }
                    
                  
                });

                $("#load_gallery").addClass('hidden');
            }
        })
        .catch(error => {
            $("#dash_description").html("Network Error! <a href='javascript: loadGallery();'>Reload Gallery</a>");
            $("#load_gallery").addClass('hidden');
        });

}

var deleteGallery = (id) => {
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };
    $("#menu-option-6").hideMenu();
    $("#menu-option-7").hideMenu();
    $("#menu-option-8").hideMenu();
    $("#menu-option-9").hideMenu();
    $("#timed-2").showMenu();
    var u_id = localStorage.getItem("userid");
    fetch(server_url + "/gallery/" + id, requestOptions)
        .then(response => {
            if (!response.ok) {
                $("#dash_description").html("Network Error! Try againg</a>");
                $("#load_gallery").addClass('hidden');
            }
            return response.json();
        })
        .then(data => {
            $("#timed-2").hideMenu();
            loadGallery(u_id)
        })
        .catch(error => {
            $("#dash_description").html("Network Error! Try againg</a>");
            $("#load_gallery").addClass('hidden');
        });
}