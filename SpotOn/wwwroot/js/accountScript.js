$(document).ready(function () {
    'use strict'
    if ($("#artisan_type_select").length != 0) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(server_url + "/artisantype", requestOptions)
            .then(response => response.json())
            .then(result => {
                var htm = '';

                result.forEach(item => {
                    htm += "<option value='" + item.id + "'>" + item.category.toUpperCase() + "</option>"
                });
                var sel = "<option value=''><span class=''>Select Artisan Type...</span></option>"
                $("#artisan_type_select").html(sel);
                $("#artisan_type_select").append(htm);
            })
            .catch(error => {
                var sel = "<option value=''><span class=''>Error Loading Artisan Type...</span></option>"
                $("#artisan_type_select").html(sel);
            });
    }
    if ($("#artisan_state").length != 0) {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(server_url + "/userstate", requestOptions)
            .then(response => response.json())
            .then(result => {
                //console.log(result);
                var htm = '';

                result.forEach(item => {
                    htm += "<option value='" + item.id + "'>" + item.stateName.toUpperCase() + "</option>"
                });
                var sel = "<option value=''><span class=''>Select States...</span></option>"
                $("#artisan_state").html(sel);
                $("#artisan_state").append(htm);
            })
            .catch(error => {
                var sel = "<option value=''><span class=''>Error Loading States...</span></option>"
                $("#artisan_state").html(sel);
            });
    }

});

var register = () => {

    if ($("#username").val() == "") {
        $("#msg").html("Login Name is required. Please check and try again!.")
        $("#menu-warning-2").showMenu();
        $("#username").focus();
        return false;
    }
    if ($("#email").val() == "") {
        $("#msg").html("Invalid e-mail address. Please check and try again!.")
        $("#menu-warning-2").showMenu();
        $("#email").focus();
        return false;
    }
    var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i

    if (!pattern.test($("#email").val())) {
        $("#msg").html($("#email").val() + ' is not a valid e-mail address');
        $("#menu-warning-2").showMenu();
        $("#email").focus();
        return false;
    }
    if ($("#Password").val() == "") {
        $("#msg").html("Password is required. Please check and try again!.")
        $("#menu-warning-2").showMenu();
        $("#Password").focus();
        return false;
    }
    if ($("#cnfPassword").val() == "") {
        $("#msg").html("Password not confirmed. Please confirm password and try again!.")
        $("#menu-warning-2").showMenu();
        $("#cnfPassword").focus();
        return false;
    }
    if ($("#cnfPassword").val() != $("#Password").val()) {
        $("#msg").html("Password not confirmed. Please confirm password and try again!.")
        $("#menu-warning-2").showMenu();
        $("#cnfPassword").focus();
        return false;
    }
    if ($("#answer").val() == "") {
        $("#msg").html("Your secret answer is required. Please check and try again!.")
        $("#menu-warning-2").showMenu();
        $("#answer").focus();
        return false;
    }

    if ($("#account_type").val() == "0") {
        $("#msg").html("Please specify your account type!.")
        $("#menu-warning-2").showMenu();
        $("#answer").focus();
        return false;
    }

    var raw = JSON.stringify({
        "UserName": $("#username").val(),
        "Email": $("#email").val(),
        "Password": $("#Password").val(),
        "ConfirmPassword": $("#cnfPassword").val(),
        "Question": $("#secretquestion").val(),
        "Answer": $("#answer").val(),
        "AccountType": $("#account_type").val(),
        "AcceptTerms": true
    });
    //console.log(raw)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("origin", "http://africafashionvillage.com");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    $("#item-preloader").removeClass('hidden');
    fetch(server_url + "/accounts/register", requestOptions)
        .then(response => {
            if (!response.ok) {
                $("#item-preloader").addClass('hidden');
                $("#msg").html("Ooops! Something went wrong. Please try again.");
                $('#menu-warning-2').showMenu();
            }
            else {
                return response.json();
            }
        })
        .then(result => {
            if (result.message == true) {
                $("#success_msg").html("Registration successful, please login to continue ");
                $("#menu-success-2").showMenu();
            } else {
                $("#msg").html("A user with the Login Name '" + $("#username").val() + "' already exist!");
                $("#menu-warning-2").showMenu();
            }
            $("#item-preloader").addClass('hidden');
        })
        .catch(error => {
            $("#item-preloader").addClass('hidden');
            $("#msg").html(error)
            $("#menu-warning-2").showMenu();
        });

}


var authenticate = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("origin", "http://africafashionvillage.com");

    if ($("#LoginName").val() == "") {
        $("#msg").html("Login Name is required. Please check and try again!.")
        $("#menu-warning-2").showMenu();
        $("#LoginName").focus();
        return false;
    }

    if ($("#Password").val() == "") {
        $("#msg").html("Password is required. Please check and try again!.")
        $("#menu-warning-2").showMenu();
        $("#Password").focus();
        return false;
    }

    var raw = JSON.stringify({
        "UserName": $("#LoginName").val(),
        "Password": $("#Password").val()
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    $("#item-preloader").removeClass('hidden');
    document.getElementById("btnANDROID").style.pointerEvents = "none";
    document.getElementById("btnIOS").style.pointerEvents = "none";
    fetch(server_url + "/accounts/authenticate", requestOptions)
        .then(response => {
            return response.json();
        })
        .then(result => {
            //console.log(result)
            if (result.message != null) {
                $("#msg").html(result.message + "<br /> Please check for typo error(s)!.");
                $("#menu-warning-2").showMenu();
                $("#item-preloader").addClass('hidden');
                document.getElementById("btnANDROID").style.pointerEvents = "auto";
                document.getElementById("btnIOS").style.pointerEvents = "auto";
            } else {
                localStorage.setItem("userid", result.id);
                localStorage.setItem("user_email", result.email);
                if (result.isVerified) {
                    if (result.role == 'User') {
                        getUser(result.id);
                    } else {
                        getArtisan(result.id);
                    }
                }
            }

        })
        .catch(error => {
            $("#msg").html(result.message + "<br /> Please try again!.");
            $("#menu-warning-2").showMenu();
            $("#item-preloader").addClass('hidden');
            document.getElementById("btnANDROID").style.pointerEvents = "auto";
            document.getElementById("btnIOS").style.pointerEvents = "auto";
        });
}

var getUser = (id) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(server_url+"/user/" + id, requestOptions)
        .then(response => {

            if (!response.ok) {
                $("#item-preloader").addClass('hidden');
                $("#msg").html("Ooops! Something went wrong. Please try again.");
                $('#menu-warning-2').showMenu();
            }
            
            return response.json();
            
        })
        .then(result => {
            if (result == null) {
                location.href = '/user/adduser';
            } else {

                CartRef = [];

                CartRef.push(result.id)
                CartRef.push(result.localAreaId)
                CartRef.push(result.location)


                localStorage.setItem("UserData", JSON.stringify(CartRef));
                //console.log(JSON.parse(localStorage.getItem("UserData")));

                 location.href = "/artisan/";

                //if (result.photo == null) {
                //    location.href = "/artisan/photo"
                //} else {
                //    var TomorrowDate = new Date(result.dateApproved);
                //    var ToDate = new Date();
                //    TomorrowDate.setDate(TomorrowDate.getDate() + 365);

                //    if (TomorrowDate.getTime() >= ToDate.getTime()) {
                //        location.href = "/artisan/dashboard";
                //        //$("#pack_menu_list").showMenu()
                //    }
                //    else {
                //        $("#item-preloader").addClass('hidden');
                //        document.getElementById("btnANDROID").style.pointerEvents = "auto";
                //        document.getElementById("btnIOS").style.pointerEvents = "auto";
                //        $("#menu-payment-expired").showMenu();
                //    }
                //}
            }

        })
        .catch(error => console.log('error', error));

}

var getArtisan = (id) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(server_url + "/artisan/getartisanbyaccountid/" + id, requestOptions) 
        .then(response => response.text())
        .then(result => {
            result = result.length ? JSON.parse(result) : { "message":"Artisan not found"}
            
            if (result.message == "Artisan not found") {
                location.href = '/artisan/adddetails';
            } else {
                if (result.photo == null) {
                    location.href = "/artisan/addphoto"
                } else {
                    
                    var TomorrowDate = new Date(result.dateApproved);
                    var ToDate = new Date();
                    TomorrowDate.setDate(TomorrowDate.getDate() + 365);

                    if (TomorrowDate.getTime() >= ToDate.getTime() && result.isApproved) {
                        location.href = "/artisan/dashboard";
                        //$("#pack_menu_list").showMenu()
                    }
                    else {
                        $("#item-preloader").addClass('hidden');
                        document.getElementById("btnANDROID").style.pointerEvents = "auto";
                        document.getElementById("btnIOS").style.pointerEvents = "auto";
                        $("#menu-payment-expired").showMenu();
                    }
                }
            }

        })
        .catch(error => console.log('error', error));

}

var loadLocalAreas = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    if ($("#artisan_state").val() == '')
        return false;

    var sel = "<option value=''><span class=''>Loading Local Govt. Areas...</span></option>"
    $("#local_govt_area").html(sel);

    fetch(server_url + "/localarea/getbystate/" + $("#artisan_state").val(), requestOptions)
        .then(response => response.json())
        .then(result => {
            var htm = '';

            result.forEach(item => {
                htm += "<option value='" + item.id + "'>" + item.locationName.toUpperCase() + "</option>"
            });
            $("#local_govt_area").html(htm);
        })
        .catch(error => {
            console.log(error)
            var sel = "<option value=''><span class=''>Error Loading Local Govt. Areas...</span></option>"
            $("#local_govt_area").html(sel);
        });
}

var create_artisan = () => {

    if ($("#artisan_type_select").val() == "") {
        $("#msg").html("Artisan Type is required. Please check and try again!.")
        $("#menu-warning-2").showMenu();
        $("#artisan_type_select").focus();
        return false;
    }
    if ($("#firstname").val() == "") {
        $("#msg").html("First Name is required. Please check and try again!.")
        $("#menu-warning-2").showMenu();
        $("#firstname").focus();
        return false;
    }
    if ($("#lastname").val() == "") {
        $("#msg").html("Last Name is required. Please check and try again!.")
        $("#menu-warning-2").showMenu();
        $("#lastname").focus();
        return false;
    }
    if ($("#phone").val() == "") {
        $("#msg").html("Phone Number is required. Please check and try again!.")
        $("#menu-warning-2").showMenu();
        $("#phone").focus();
        return false;
    }

    if ($("#phone").val().length != 11) {
        $("#msg").html("Enter mobile number only. Please check and try again!.")
        $("#menu-warning-2").showMenu();
        $("#phone").focus();
        return false;
    }
    if ($("#artisan_state").val() == "") {
        $("#msg").html("Artisan State is required. Please check and try again!.")
        $("#menu-warning-2").showMenu();
        $("#artisan_state").focus();
        return false;
    }
    if ($("#local_govt_area").val() == "") {
        $("#msg").html("Local Govt. Area is required. Please check and try again!.")
        $("#menu-warning-2").showMenu();
        $("#local_govt_area").focus();
        return false;
    }
    if ($("#location").val() == "") {
        $("#msg").html("Your Location is required. Please check and try again!.")
        $("#menu-warning-2").showMenu();
        $("#location").focus();
        return false;
    }

    var accountId = localStorage.getItem("userid");


    var raw = JSON.stringify({
        "ArtisanTypeId": $("#artisan_type_select").val(),
        "AccountId": accountId,
        "Name": $("#firstname").val() + ' ' + $("#lastname").val(),
        "Phone": $("#phone").val(),
        "LocalAreaId": $("#local_govt_area").val(),
        "Location": $("#location").val()
    });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("origin", "http://africafashionvillage.com");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    $("#item-preloader").removeClass('hidden');
    fetch(server_url + "/artisan", requestOptions)
        .then(response => {
            if (!response.ok) {
                $("#item-preloader").addClass('hidden');
                $("#msg").html("Ooops! Something went wrong. Please try again.");
                $('#menu-warning-2').showMenu();
            }
            else {
                return response.json();
            }
        })
        .then(result => {
            //console.log(result)
            if (result.message == true) {
                location.href = "/artisan/photo";
            } else {
                $("#item-preloader").addClass('hidden');
                $("#msg").html("Could not process request at this time. Please try again")
                $("#menu-warning-2").showMenu();
                $("#item-preloader").addClass('hidden');
            }
        })
        .catch(error => {
            $("#item-preloader").addClass('hidden');
            $("#msg").html(error)
            $("#menu-warning-2").showMenu();
        });

}


var create_user = () => {

    if ($("#firstname").val() == "") {
        $("#msg").html("First Name is required. Please check and try again!.")
        $("#menu-warning-2").showMenu();
        $("#firstname").focus();
        return false;
    }
    if ($("#lastname").val() == "") {
        $("#msg").html("Last Name is required. Please check and try again!.")
        $("#menu-warning-2").showMenu();
        $("#lastname").focus();
        return false;
    }
    if ($("#phone").val() == "") {
        $("#msg").html("Phone Number is required. Please check and try again!.")
        $("#menu-warning-2").showMenu();
        $("#phone").focus();
        return false;
    }

    if ($("#phone").val().length != 11) {
        $("#msg").html("Enter mobile number only. Please check and try again!.")
        $("#menu-warning-2").showMenu();
        $("#phone").focus();
        return false;
    }
    if ($("#artisan_state").val() == "") {
        $("#msg").html("State is required. Please check and try again!.")
        $("#menu-warning-2").showMenu();
        $("#artisan_state").focus();
        return false;
    }
    if ($("#local_govt_area").val() == "") {
        $("#msg").html("Local Govt. Area is required. Please check and try again!.")
        $("#menu-warning-2").showMenu();
        $("#local_govt_area").focus();
        return false;
    }
    if ($("#location").val() == "") {
        $("#msg").html("Your Location is required. Please check and try again!.")
        $("#menu-warning-2").showMenu();
        $("#location").focus();
        return false;
    }

    var accountId = localStorage.getItem("userid");


    var raw = JSON.stringify({
        "AccountId": accountId,
        "Name": $("#firstname").val() + ' ' + $("#lastname").val(),
        "Phone": $("#phone").val(),
        "LocalAreaId": $("#local_govt_area").val(),
        "Location": $("#location").val()
    });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("origin", "http://africafashionvillage.com");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    $("#item-preloader").removeClass('hidden');
    fetch(server_url + "/user", requestOptions)
        .then(response => {
            if (!response.ok) {
                $("#item-preloader").addClass('hidden');
                $("#msg").html("Ooops! Something went wrong. Please try again.");
                $('#menu-warning-2').showMenu();
            }
            else {
                return response.json();
            }
        })
        .then(result => {
           // console.log(result)
            if (result.message == true) {
                location.href = "/artisan";
                //location.href = "/artisan/photo";
            } else {
                $("#item-preloader").addClass('hidden');
                $("#msg").html("Could not process request at this time. Please try again")
                $("#menu-warning-2").showMenu();
                $("#item-preloader").addClass('hidden');
            }
        })
        .catch(error => {
            $("#item-preloader").addClass('hidden');
            $("#msg").html(error)
            $("#menu-warning-2").showMenu();
        });
}

_email = "";
var sendInstructionCode = () => {
    var email = document.getElementById('confirm-email-address').value.trim();
    var answer = document.getElementById('answer').value.trim();
    var question = document.getElementById('secretquestion').value.trim();
    _email = email;
    if (email == "") {
        $("#menu-warning-2").showMenu();
        return false;
    }
    if (answer == "") {
        $("#menu-warning-2").showMenu();
        return false;
    }
    $('#snackbar-9').toast('show');

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "UserName": email,
        "Question": question,
        "Answer": answer
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    $("#load_spinner").removeClass('hidden');
    $("#in_Code").addClass('hidden');
    fetch(server_url + "/accounts/forgot-password", requestOptions)
        .then(response => {
            if (!response.ok) {
                console.log('Network response was not ok');
                $('#snackbar-9').toast('hide');
                $("#menu-warning-2").showMenu();
                $("#load_spinner").addClass('hidden');
                $("#in_Code").removeClass('hidden');
            } 
            return response.json();
        })
        .then(data => {

            //console.log(data)
            if (data.message == "false") {
                $("#menu-warning-2").showMenu();
                $("#load_spinner").addClass('hidden');
                $("#in_Code").removeClass('hidden');               
            } else {
                $("#menu-instruction-code").showMenu();
                $("#load_spinner").addClass('hidden');
                $("#in_Code").removeClass('hidden');
            }
        })
        //.then(result => uploadOk(result))
        .catch(error => {
            $('#snackbar-9').toast('hide');
            $("#menu-warning-2").showMenu();
            $("#load_spinner").addClass('hidden');
            $("#in_Code").removeClass('hidden');
        });


}


function validateInstructionCode() {
    
    var code = document.getElementById('instruction-code').value.trim();
    if (_email == "" && code == "") {
        $("#menu-warning-2").showMenu();
    } else {
        $('#snackbar-9').toast('show');

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "Token": code
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        $("#load_instruction").removeClass('hidden');
        $("#vCode").addClass('hidden');
        fetch(server_url + "/accounts/validate-reset-token", requestOptions)
            .then(response => {
                if (!response.ok) {
                    $("#menu-instruction-code").hideMenu();
                    console.log('Network response was not ok');
                    $('#snackbar-9').toast('hide');
                    $("#menu-warning-1").showMenu();
                } 
                return response.json();
            })
            .then(result => { 
                if (result.message == "Token is valid") {
                    $("#menu-instruction-code").hideMenu();
                    $("#menu-reset").showMenu();
                    $("#load_instruction").addClass('hidden');
                    $("#vCode").removeClass('hidden');
                } else {
                    $("#menu-instruction-code").hideMenu();
                    $("#menu-warning-1").showMenu()
                    $("#load_instruction").addClass('hidden');
                    $("#vCode").removeClass('hidden');
                }
            })
            .catch(error => {
                $("#menu-instruction-code").hideMenu();
                $("#menu-warning-1").showMenu()
                $("#load_instruction").addClass('hidden');
                $("#vCode").removeClass('hidden');
            });


    }
}


var changePassword = () => {
    $("#change_msg").addClass('hidden');
    var newpass = document.getElementById('new-password').value.trim();
    var cnfpass = document.getElementById('cnf-password').value.trim();
    var code = document.getElementById('instruction-code').value.trim();

    if (newpass == "" || cnfpass == "") {
        $("#change_msg").html("All fields are required!");
        $("#change_msg").removeClass('hidden');
        //$("#menu-reset").hideMenu();
       // $("#menu-warning-reset").showMenu();
        return false;
    } else {
        if (newpass != cnfpass) {
            $("#change_msg").html("Wrong password confirmation!");
            $("#change_msg").removeClass('hidden');
            //$("#menu-reset").hideMenu();
           // $("#menu-warning-reset").showMenu();
            return false;
        } else { 
            $('#snackbar-9').toast('show');

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "Token": code,
                "Password": newpass,
                "ConfirmPassword": cnfpass
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            $("#load_reset").removeClass('hidden');
            $("#btn_reset").addClass('hidden');
            fetch("http://localhost:4000/accounts/reset-password", requestOptions)
                .then(response => {
                    if (!response.ok) {
                        console.log('Network response was not ok');
                        $("#load_reset").addClass('hidden');
                        $("#btn_reset").removeClass('hidden');
                        $("#menu-warning-1").showMenu();
                    } 
                    return response.text();
                })
                .then(result => {
                    //console.log("Result: "+result)
                    if (result.message != "Invalid token") {
                        location.href = "/login";
                    } else {
                        $("#menu-reset").hideMenu();
                        $("#load_reset").addClass('hidden');
                        $("#btn_reset").removeClass('hidden');
                        $("#menu-warning-1").showMenu()
                    }
                })
                .catch(error => {
                    $("#menu-reset").hideMenu();
                    $("#load_reset").addClass('hidden');
                    $("#btn_reset").removeClass('hidden');
                    $("#menu-warning-1").showMenu()
                });

        }
    }
}