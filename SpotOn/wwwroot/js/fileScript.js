
const input = document.getElementById('fileinput');
const id = localStorage.getItem("userid");

// Event handler executed when a file is selected
const onSelectFile = () => upload();

// Add a listener on your input
// It will be triggered when a file will be selected
input.addEventListener('change', onSelectFile, false);
// This will upload the file after having read it  
var upload = () => {

    $('#snackbar-9').toast('show');
    $("#up").addClass('hidden');
    $("#procdiv").removeClass('hidden');
    $("#fileinput").addClass('hidden');

    let imageFile = $(fileinput)[0].files[0];
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
                "Photo": dataurl
            });
            console.log(dataurl)

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            await fetch(server_url + "/artisan/photo/" + id, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        console.log('Network response was not ok ' + response);
                        $('#snackbar-9').toast('hide');
                        $("#menu-warning-1").showMenu();
                        $("#up").removeClass('hidden');
                        $("#procdiv").addClass('hidden');
                        $("#fileinput").removeClass('hidden');
                    }

                    return response.json();
                })
                .then(data => {

                    if (data.message == "Upload Successful.")
                        location.href = "/login";
                })
                //.then(result => uploadOk(result))
                .catch(error => showError());
        }
        img.src = e.target.result;
    }
    reader.readAsDataURL(imageFile);
}



function showError() {
    $("#up").removeClass('hidden');
    $("#procdiv").addClass('hidden');
    $("#fileinput").removeClass('hidden');
    $("#menu-warning-file-upload").showMenu()
}