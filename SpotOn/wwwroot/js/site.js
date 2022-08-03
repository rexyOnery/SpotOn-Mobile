// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

//var stat  = require("fs/promises");

//import { log } from "console";

// Write your JavaScript code.

var uri = 'http://medicall-002-site5.ctempurl.com/api/UserSpotOns';
var specialuri = 'http://medicall-002-site5.ctempurl.com/api/Special';
//let todos = [];

var _logged_status_ = localStorage.getItem("userid");
var status = _logged_status_ == null ? false : true;
if ($("#menu_login").length > 0) {
    if (status == false) {
        setInterval(function () { ShowMenuLogin(); }, 1000);
    }
}

function ShowMenuLogin() {
    alert("fsdf");
    $("#menu_login").showMenu();
}


function getAllItems() {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(uri + "/pages", requestOptions)
        .then(response => response.text())
        .then(result => runPages(result))
        .catch(error => console.log('error', error));

}

var forwardPaging = false;
var backPaging = false;
function runPages(pages) {
    var _ult = parseInt(pages);
    if (_ult > 0) {
        localStorage.setItem("allTimePages", _ult);
        localStorage.setItem("currentVisiblePages", 4);
        localStorage.setItem("hide", 0);
        localStorage.setItem("show", 5);

        var paging = "";
        $("#page-items").html(paging);
        paging += "<li class='page-item'>"
        paging += "<a class='page-link rounded-xs color-black bg-transparent bg-theme shadow-xl border-0' href='javascript:doPrevious();' tabindex='-1' aria-disabled='true'><i class='fa fa-angle-left'></i></a>"
        paging += "</li>";

        for (i = 0; i <= pages; i++) {
            var num = parseInt(i + 1);
            if (i == 0) {
                localStorage.setItem("currentPage", i);
                paging += "<li id='page-" + i + "' class='page-item active'><a class='page-link rounded-xs color-black bg-highlight shadow-l border-0' href='javascript:page(" + i + ");'>" + num + "</a></li>";

            }
            else if (i == pages) {
                localStorage.setItem("lastitem", i);
                paging += "<li id='page-" + i + "' class='page-item hidden'><a class='page-link rounded-xs color-black bg-theme shadow-l border-0' href='javascript:page(" + i + ");'>" + num + "</a></li>";
            }
            else if (i <= 4) {
                paging += "<li id='page-" + i + "' class='page-item'><a class='page-link rounded-xs color-black bg-theme shadow-l border-0' href='javascript:page(" + i + ");'>" + num + "</a></li>";
            } else {
                forwardPaging = true;
                paging += "<li id='page-" + i + "' class='page-item hidden'><a class='page-link rounded-xs color-black bg-theme shadow-l border-0' href='javascript:page(" + i + ");'>" + num + "</a></li>";
            }
        }
        paging += "<li class='page-item'>"
        paging += "<a class='page-link rounded-xs color-black bg-transparent bg-theme shadow-l border-0' href='javascript:doNext();'><i class='fa fa-angle-right'></i></a>"
        paging += "</li>"
        $("#page-items").append(paging);
    }
}

function page(id) {

    var _prevPage = localStorage.getItem("currentPage");
    var _prev_Page = "#page-" + _prevPage;
    var _prev_Page_a = "#page-" + _prevPage + " a";

    var _curPage = "#page-" + id;
    var _curPage_a = "#page-" + id + " a";
    if (_prevPage != id) {
        $("#item-preloader").removeClass('hidden');

        fetch("http://medicall-002-site5.ctempurl.com/api/UserSpotOns?page=" + id + "&pageSize=10")
            .then(response => response.json())
            .then(data => _displayItems(data))
            .catch(error => console.error('Unable to get items.', error));

        $(_prev_Page).removeClass('active');
        $(_prev_Page_a).removeClass('bg-highlight');
        $(_prev_Page_a).addClass('bg-theme');

        $(_curPage).addClass('active');
        $(_curPage_a).addClass('bg-highlight');
        $(_curPage_a).removeClass('bg-theme');

        localStorage.setItem("currentPage", id);
    }
}

function doPrevious() {
    var allPages = parseInt(localStorage.getItem("allTimePages"));
    var currVisiblePage = parseInt(localStorage.getItem("currentVisiblePages"));
    var lastItem = parseInt(localStorage.getItem("lastitem"));

    //console.log("all: " + allPages);
    //console.log("last: " + lastItem);
    //console.log("Cur Vis: " + currVisiblePage);

    var hide = localStorage.getItem("hide");
    var show = localStorage.getItem("show");



    if (backPaging) {
        if (currVisiblePage > 4) {

            var newHide = parseInt(hide) - 1;
            var newShow = parseInt(show) - 1;

            var hidePage = "#page-" + newHide;
            var showPage = "#page-" + newShow;

            $(hidePage).removeClass('hidden');
            $(showPage).addClass('hidden');

            currVisiblePage = currVisiblePage - 1;

            localStorage.setItem("hide", newHide);
            localStorage.setItem("show", newShow);
            localStorage.setItem("currentVisiblePages", currVisiblePage);

            // console.log("Curr Vis: " + currVisiblePage);
            forwardPaging = true;
        } else {
            backPaging = false;
        }
    }
}

function doNext() {
    var allPages = parseInt(localStorage.getItem("allTimePages"));
    var currVisiblePage = parseInt(localStorage.getItem("currentVisiblePages"));
    var lastItem = parseInt(localStorage.getItem("lastitem"));

    //console.log("all: " + allPages);
    //console.log("last: " + lastItem);
    //console.log("Cur Vis: " + currVisiblePage);

    var hide = localStorage.getItem("hide");
    var show = localStorage.getItem("show");

    var hidePage = "#page-" + hide;
    var showPage = "#page-" + show;

    if (forwardPaging) {
        if (currVisiblePage < allPages) {

            $(hidePage).addClass('hidden');
            $(showPage).removeClass('hidden');

            var newHide = parseInt(hide) + 1;
            var newShow = parseInt(show) + 1;
            currVisiblePage = currVisiblePage + 1;

            localStorage.setItem("hide", newHide);
            localStorage.setItem("show", newShow);
            localStorage.setItem("currentVisiblePages", currVisiblePage);

            //console.log("Curr Vis: "+currVisiblePage);
            backPaging = true;
        } else {
            forwardPaging = false;
        }
    }
}

function getItems() {

    fetch("http://medicall-002-site5.ctempurl.com/api/UserSpotOns?page=0&pageSize=10")
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function getCallListItems() {
    var user_id = localStorage.getItem("userid");
    fetch(uri + "/GetCallLists?userid=" + user_id + "&page=0&pageSize=10")
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));

}

function getSpecialItems() {
    var addNameTextbox = document.getElementById('add-name');
    fetch(uri + "/GetSpecialDoctors?special=" + addNameTextbox.value.trim() + "&page=0&pageSize=10")
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));

}

function authenticate() {

    $("#item-preloader").removeClass('hidden');

    var addNameTextbox = document.getElementById('LoginName');
    var addPasswordTextbox = document.getElementById('Password');
    if (addPasswordTextbox.value != "" && addNameTextbox.value != "") {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(uri + "/authenticateuser?username=" + addNameTextbox.value.trim() + "&password=" + addPasswordTextbox.value.trim(), requestOptions)
            //.then(response => {
            //    if (!response.ok) {
            //        console.log('Network response was not ok');
            //        $("#menu-warning-1").showMenu();
            //    }
            //})
            .then(response => response.json())
            .then(data => _processLoginItems(data))
            .catch(error => $("#item-preloader").addClass('hidden'));
    } else {
        $("#item-preloader").addClass('hidden');
        $('#snackbar-10').toast('show');
    }
}

function _processLoginItems(data) {

    localStorage.removeItem("loaded");
    localStorage.clear();
    $('#snackbar-9').toast('hide');
    console.log(data);

    if (data != null) {
        data.forEach(item => {

            if (item.firstName.toLowerCase() != "invalid") {

                localStorage.setItem("userid", item.id);
                localStorage.setItem("username", item.loginName);
                localStorage.setItem("expired", item.expired);
                localStorage.setItem("emailaddress", item.emailAddress);
                localStorage.setItem("firstname", item.firstName);
                localStorage.setItem("lastname", item.lastName);
                localStorage.setItem("type", item.profession);



                if (item.isNew == true) {
                    var user_v = {
                        UserId: localStorage.getItem("userid")
                    };
                    addAutomaticFolioNumber(user_v);

                    $('#snackbar-9').toast('hide');
                    $('#menu-option-1').showMenu();
                } else {

                    if (item.isDoc == true) {
                        if (item.profession == "health") {
                            $('#snackbar-9').toast('hide');
                            var identity = localStorage.getItem("username");
                            var token = "token";
                            location.href = "activity:http://medicall-001-site6.ctempurl.com?doctor=" + identity + "::" + token;
                        } else {
                            if (item.profession == "tutor") {
                                if (item.expired == true) {
                                    $("#menu-payment-expired").showMenu();
                                } else {
                                    var itemid_ = item.id;
                                    CheckTutorPhoto(itemid_);

                                    //var identity = localStorage.getItem("username");
                                    //var token = "token";
                                    //location.href = "activity:http://medicall-001-site6.ctempurl.com?tutor=" + identity + "::" + token;
                                }
                            } else {
                                if (item.profession == "artisan") {
                                    $('#snackbar-9').toast('hide');
                                    var identity = localStorage.getItem("username");
                                    var token = "token";
                                    location.href = "activity:http://medicall-001-site6.ctempurl.com?artisan=" + identity + "::" + token;
                                } else {
                                    if (item.profession == "chef") {
                                        $('#snackbar-9').toast('hide');
                                        var identity = localStorage.getItem("username");
                                        var token = "token";
                                        location.href = "activity:http://medicall-001-site6.ctempurl.com?chef=" + identity + "::" + token;
                                    } else {
                                        if (item.profession == "product") {
                                            $('#snackbar-9').toast('hide');
                                            var identity = localStorage.getItem("username");
                                            var token = "token";
                                            location.href = "activity:http://medicall-001-site6.ctempurl.com?product=" + identity + "::" + token;
                                        } else {
                                            if (item.profession == "taxi") {
                                                $('#snackbar-9').toast('hide');
                                                var identity = localStorage.getItem("username");
                                                var token = "token";
                                                location.href = "activity:http://medicall-001-site6.ctempurl.com?taxi=" + identity + "::" + token;
                                            } else {

                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else {
                        if (item.expired == false) {

                            if (localStorage.getItem("docitem") != null) {
                                $('#snackbar-9').toast('hide');

                                var docusername = localStorage.getItem("docitem");
                                var identity = localStorage.getItem("username");
                                var docPhoto = localStorage.getItem("docphoto");

                                var token = "token";//localStorage.getItem("EXTRA_TOKEN");

                                location.href = "activity:http://medicall-001-site6.ctempurl.com?username=" + identity + "::" + docusername + "::" + token + "::http://medicall-002-site5.ctempurl.com/uploads/" + docPhoto;


                            } else {
                                location.href = "/tutors";
                            }
                        } else {
                            var _check = fetchSponsorship(item.id);
                            if (_check) {

                                if (localStorage.getItem("docitem") != null) {
                                    $('#snackbar-9').toast('hide');

                                    var docusername = localStorage.getItem("docitem");
                                    var identity = localStorage.getItem("username");
                                    var docPhoto = localStorage.getItem("docphoto");

                                    var token = "token";//localStorage.getItem("EXTRA_TOKEN");
                                    alert("from sponsor");
                                    location.href = "activity:http://medicall-001-site6.ctempurl.com?username=" + identity + "::" + docusername + "::" + token + "::http://medicall-002-site5.ctempurl.com/uploads/" + docPhoto;


                                } else {
                                    location.href = "/packages";
                                }
                            }
                            else {
                                $("#menu-payment-expired").showMenu();
                                $("#item-preloader").addClass('hidden');
                            }
                        }
                    }
                }
                $("#faloggedout").removeClass('hidden');
                $("#falogged").addClass('hidden');
                $("#item-preloader").addClass('hidden');
            } else {
                $("#menu-warning-2").showMenu();
                $("#item-preloader").addClass('hidden');
            }
        });
    }

}


function CheckTutorPhoto(id) {
    try {
        $("#item-preloader").removeClass('hidden');
        var options = {
            method: 'GET',
            redirect: 'follow'
        }

        fetch(uri + "/checktutorphoto?id=" + id, options)
            .then(response => {
                if (!response.ok) {
                    console.log('Network response was not ok');
                    $('#snackbar-9').toast('hide');
                    $("#menu-warning-2").showMenu();
                }
                return response.json();
            })
            .then(result => {

                console.log(result);
                if (result.length > 0) {
                    result.forEach(item => {

                        if (item.photo == null) {
                            location.href = "/complete/photo";
                        } else if (item.classId == null) {
                            location.href = "/tutors/settings";
                        }
                        else {
                            location.href = "/tutors/tutordash";
                        }
                    });
                } else {
                    location.href = "/complete/photo";
                }
            })
            .catch(error => console.error('Unable to get items.', error));


    } catch (error) {

        $('#snackbar-9').toast('hide');
        $("#menu-warning-2").showMenu();
    }
}


function setUserNewAllFalse() {
    console.log(localStorage.getItem("userid"));
    var id = localStorage.getItem("userid");
    var itemId = id;
    $('#snackbar-9').toast('show');

    fetch(uri + "/setusernewallfalse/" + itemId + "?id=" + itemId, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(data => _reprocessLoginItems())
        .catch(error => console.error('Unable to update item.', error));

}

function _reprocessLoginItems() {
    $('#snackbar-9').toast('show');
    $('#menu-option-1').hideMenu();
    var addNameTextbox = document.getElementById('LoginName');
    var addPasswordTextbox = document.getElementById('Password');
    if (addPasswordTextbox.value != "" && addNameTextbox.value != "") {
        fetch(uri + "/authenticateuser?username=" + addNameTextbox.value.trim() + "&password=" + addPasswordTextbox.value.trim())
            .then(response => response.json())
            .then(data => _processLoginItems(data))
            .catch(error => console.error('Unable to get items.', error));
    } else {
        $('#snackbar-10').toast('show');
    }
}

function checkCode() {
    $('#snackbar-9').toast('show');
    var codeTextbox = document.getElementById('spot-on-code');
    fetch(uri + "/checkcode?code=" + codeTextbox.value.trim())
        .then(response => response.json())
        .then(data => _displayCode(data))
        .catch(error => console.error('Unable to get items.', error));
}


function veriDoc() {
    $('#snackbar-9').toast('show');
    $("#procsend").removeClass('hidden');
    $("#veriSend").addClass('hidden');
    var user = {
        UserId: localStorage.getItem("userid"),
        Codex: document.getElementById('spot-on-folio').value.trim(),
        Registrtion: document.getElementById('spot-on-reg').value.trim()
    };
    addFolioNumber(user);

}



var addAutomaticFolioNumber = async (user) => {
    try {

        var options = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        var res = await fetch(uri + "/verification", options);
        if (!res.ok) {

        }
        var data = await res.json();
        console.log(data);

    } catch (error) {


    }
}


var addFolioNumber = async (user) => {
    try {

        var options = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        var res = await fetch(uri + "/verification", options);
        if (!res.ok) {
            $('#snackbar-9').toast('hide');
            $("#menu-code-fail").showMenu();
            $("#procsend").addClass('hidden');
            $("#veriSend").removeClass('hidden');
        }
        var data = await res.json();
        console.log(data);
        if (data != true) {
            $('#snackbar-9').toast('hide');
            $("#menu-code-fail").showMenu();
            $("#procsend").addClass('hidden');
            $("#veriSend").removeClass('hidden');
        }
        else {
            $('#snackbar-9').toast('hide');
            $("#menu-code-okay").showMenu();
        }
    } catch (error) {

        $('#snackbar-9').toast('hide');
        $("#menu-code-fail").showMenu();
        $("#procsend").addClass('hidden');
        $("#veriSend").removeClass('hidden');
    }
}


function _displayCode(data) {
    console.log(data);
    if (data != null) {
        console.log(data);
        data.forEach(item => {
            if (item.codex.toLowerCase() == "found") {
                $('#snackbar-9').toast('hide');
                _reprocessLoginItems();
            } else {
                if (item.codex.toLowerCase() == "lost") {
                    $('#snackbar-9').toast('hide');
                    $("#menu-code-fail").showMenu();
                }
            }
        });
    } else {
        $('#snackbar-10').toast('show');
    }
}


function setUserBusy() {
    var itemId = 6;


    fetch(uri + "/setuserbusy/" + itemId + "?id=" + itemId, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}


function getMedicalSpecialItems() {

    //$("#snackbar-9").toast('show');

    fetch(uri + "/medicalfields")
        .then(response => response.json())
        .then(data => _displayMedicalSpecialItems(data))
        .catch(error => showFuncFieldError());
}

function showFuncFieldError() {
    $("#menuwarning-specialization").showMenu();
}
function _displayMedicalSpecialItems(data) {
    console.log(data);
    if (data != null) {
        let html = "";
        data.forEach(item => {
            html += "<option value='" + item.category + "'>" + item.category + "</option>";
        });
        $("#specialization").append(html);
        $('#snackbar-9').toast('hide');
    }
}


function addSpecialItem() {
    $('#toast-1').toast('show');
    $("#btnSave").addClass('hidden');
    $("#processing").removeClass('hidden');

    var id = localStorage.getItem("userid");
    var specialization = $("#specialization option:selected").text().trim();
    var languages = document.getElementById('languages').value.trim();


    if (specialization != "Select your specialization" && languages != "") {
        fetch(specialuri + "/PostSpecials?userId=" + id + "&specialization=" + specialization + "&languages=" + languages, {
            method: 'POST'
        })

            .then(response => {
                if (!response.ok) {
                    console.log('Network response was not ok');
                    SpecialError();
                }
                return response.json();
            })
            .then(data => _processAddSpecialItems(data))
            .catch(error => SpecialError());// console.error('Unable to add item.', error));
    } else {
        $("#btnSave").removeClass('hidden');
        $("#processing").addClass('hidden');
        $('#snackbar-3').toast('show');
    }
}

function SpecialError() {
    $("#btnSave").removeClass('hidden');
    $("#processing").addClass('hidden');
    $('#snackbar-5').showMenu();
}

function _processAddSpecialItems(data) {

    data.forEach(item => {

        if (item.firstName == "invalid") {
            $('#toast-1').toast('hide');
            $("#btnSave").removeClass('hidden');
            $("#processing").addClass('hidden');
            $('#menu-snackbar-5').showMenu();
        }
        else {
            location.href = "/complete/photo";
        }
    });

}

function addItem() {
    $('#toast-1').toast('show');
    $("#procreate").removeClass('hidden');
    $("#btnAddAcct").addClass('hidden');
    var addFirstName = document.getElementById('first-name').value.trim();
    var addLastName = document.getElementById('last-name').value.trim();
    var addLoginName = document.getElementById('user-name').value.trim();
    var addPassword = document.getElementById('password').value.trim();
    var addEmail = document.getElementById('email-address').value.trim();
    var addState = $("#state option:selected").text();
    var addLga = $("#lga option:selected").text();
    var designation = localStorage.getItem("designation")

    if (addLoginName == "") {
        $("#msg").html("Your Login Name is required!");
        $('#snackbar-3').toast('show');
        $("#user-name").focus();
        $("#procreate").addClass('hidden');
        $("#btnAddAcct").removeClass('hidden');
        return false;
    }
    if (addPassword == "") {
        $("#msg").html("Your Password is required!");
        $('#snackbar-3').toast('show');
        $("#password").focus();
        $("#procreate").addClass('hidden');
        $("#btnAddAcct").removeClass('hidden');
        return false;
    }
    if (addFirstName == "") {
        $("#msg").html("Your First Name is required!");
        $('#snackbar-3').toast('show');
        $("#first-name").focus();
        $("#procreate").addClass('hidden');
        $("#btnAddAcct").removeClass('hidden');
        return false;
    }
    if (addLastName == "") {
        $("#msg").html("Your Last Name is required!");
        $('#snackbar-3').toast('show');
        $("#last-name").focus();
        $("#procreate").addClass('hidden');
        $("#btnAddAcct").removeClass('hidden');
        return false;
    }
    if (addEmail == "") {
        $("#msg").html("Your Email Address is required!");
        $('#snackbar-3').toast('show');
        $("#email-address").focus();
        $("#procreate").addClass('hidden');
        $("#btnAddAcct").removeClass('hidden');
        return false;
    }

    if (addState == "Select State" || addState == "State") {
        $("#msg").html("Please State is required!");
        $('#snackbar-3').toast('show');
        $("#state").focus();
        $("#procreate").addClass('hidden');
        $("#btnAddAcct").removeClass('hidden');
        return false;
    }

    if (addLga == "Local Government Area" || addLga == "Select Local Area") {
        $("#msg").html("Please Local Government Area is required!");
        $('#snackbar-3').toast('show');
        $("#lga").focus();
        $("#procreate").addClass('hidden');
        $("#btnAddAcct").removeClass('hidden');
        return false;
    }

    fetch(uri + "/PostUsers?firstname=" + addFirstName + "&lastname=" + addLastName + "&emailaddress=" + addEmail + "&loginname=" + addLoginName + "&password=" + addPassword + "&stateoforigin=" + addState + "&localgovt=" + addLga + "&designation=" + designation, {
        method: 'POST'
    })
        //.then(response => response.json())
        .then(response => {
            if (!response.ok) {
                console.log('Network response was not ok');
                $('#menu-warning-2').showMenu();
                $("#procreate").addClass('hidden');
                $("#btnAddAcct").removeClass('hidden');
            }
            else {
                return response.json();
            }

        })
        .then(data => _processAddItems(data))
        .catch(error => addItemError());// console.error('Unable to add item.', error));

}

function addItemError() {
    $('#menu-warning-2').showMenu();
    $("#procreate").addClass('hidden');
    $("#btnAddAcct").removeClass('hidden');
}
function _processAddItems(data) {

    data.forEach(item => {

        if (item.loginName.startsWith("Error")) {
            $("#procreate").addClass('hidden');
            $("#btnAddAcct").removeClass('hidden');
            $("#menu-warning-1").showMenu();
        }
        else {
            $("#btnAddAcct").addClass('hidden');
            localStorage.setItem("userid", item.id);
            localStorage.setItem("username", item.loginName);
            if (localStorage.getItem("designation") == 'health') {
                $("#menu-option-1").showMenu();
            }
            else {
                if (localStorage.getItem("designation") == 'user') {
                    setRegisterUserNewAllFalse();
                } else {
                    location.href = "/complete/photo";
                }
            }
        }
    });
    $('#toast-1').toast('hide');
}

function setRegisterUserNewAllFalse() {
    console.log(localStorage.getItem("userid"));
    var id = localStorage.getItem("userid");
    var itemId = id;
    $('#snackbar-9').toast('show');

    fetch(uri + "/setusernewallfalse/" + itemId + "?id=" + itemId, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                console.log('Network response was not ok');
                $("#menu-option-2").showMenu();
            }
            else {
                location.href = "/login"
            }
            return response.json();
        })
        //.then(data => _reprocessLoginItems())
        .catch(error => $("#menu-option-2").showMenu());

}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    //var item = todos.find(item => item.id === id);

    //document.getElementById('edit-name').value = item.name;
    //document.getElementById('edit-id').value = item.id;
    //document.getElementById('edit-isComplete').checked = item.isComplete;
    //document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    var itemId = document.getElementById('edit-id').value;
    var item = {
        id: parseInt(itemId, 10),
        isComplete: document.getElementById('edit-isComplete').checked,
        name: document.getElementById('edit-name').value.trim()
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    var name = (itemCount === 1) ? 'to-do' : 'to-dos';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}



function _displayItems(data) {

    console.log(data);
    if (!Object.keys(data).length) {
        $("#no-item").removeClass('hidden');
    }
    else {
        var htm = "";
        //$("#docItems").html(htm);
        data.forEach(item => {

            htm += "<div class='d-flex'><input type='hidden' id='item-" + item.id + "' value='" + item.loginName + "'></span>"
            htm += "            <div class='mr-3'>"
            htm += "                <img width='120' class='fluid-img rounded-m shadow-xl' src='http://medicall-002-site5.ctempurl.com/uploads/" + item.photo + "'>"
            htm += "                <input type='hidden' id='docphoto-" + item.id + "' value='" + item.photo + "' />"
            htm += "            </div>"
            htm += "            <div>"
            htm += "                <p class='color-highlight font-600 mb-n1'>" + item.firstName + " " + item.lastName + "</p>"
            htm += "                <h2>" + item.special + "</h2>"
            htm += "                <p class='color-highlight font-600 mb-n1'>Can Communicate In:</p>"
            htm += "                <p class='mt-2'>"
            htm += "                    " + item.language + ""
            htm += "                </p>"
            htm += "                 <div id='spinner-" + item.id + "' class='hidden spinner-border color-red-dark' style='border-width: 1px;' role='status'><span class='sr-only'>Loading...</span></div>"
            htm += "                 <a id='a-" + item.id + "' href='javascript:Call(" + item.id + ")' class='mb-3 text-left btn btn-m btn-full bg-phone btn-icon font-600'><i class='fa fa-phone font-16 text-center'></i> Click to Call </a>"
            htm += "            </div>"
            htm += "        </div>"

            htm += "    <div class='divider mt-4'></div>"

        });
        $("#docItems").append(htm);

    }
    $("#item-preloader").addClass('hidden');
}

var _email = "";
var sendInstructionCode = () => {
    var email = document.getElementById('confirm-email-address').value.trim();
    var answer = document.getElementById('answer').value.trim();
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
    fetch(server_url + "/accounts/passwordrecovery/" + email)
        .then(response => {
            if (!response.ok) {
                console.log('Network response was not ok');
                $('#snackbar-9').toast('hide');
                $("#menu-warning-2").showMenu();
            }
            else {
                $("#menu-instruction-code").showMenu();
            }
            return response.json();
        })
        .then(data => {
            //$("#menu-warning-2").showMenu();
            /* process your data further */
        })
        //.then(result => uploadOk(result))
        .catch(error => {
            $('#snackbar-9').toast('hide');

            $("#menu-warning-2").showMenu();
        });


}


function validateInstructionCode() {
    var code = document.getElementById('instruction-code').value.trim();
    if (_email == "" && code == "") {
        $("#menu-warning-2").showMenu();
    } else {
        $('#snackbar-9').toast('show');


        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(uri + "/confirmcode?email=" + _email + "&code=" + code, requestOptions)
            .then(response => {
                if (!response.ok) {
                    console.log('Network response was not ok');
                    $('#snackbar-9').toast('hide');
                    $("#menu-warning-1").showMenu();
                }
                else {
                    $("#menu-reset").showMenu();
                }
                return response.text();
            })
            .then(result => console.log(result))
            .catch(error => $("#menu-warning-1").showMenu());


    }
}


function changePassword() {
    var newpass = document.getElementById('new-password').value.trim();
    var cnfpass = document.getElementById('cnf-password').value.trim();
    if (newpass == "" && cnfpass == "") {
        $("#menu-warning-1").showMenu();
    } else {
        if (newpass != cnfpass) {
            $("#menu-warning-1").showMenu();
        } else {


            $('#snackbar-9').toast('show');


            var requestOptions = {
                method: 'PUT',
                redirect: 'follow'
            };

            fetch(uri + "/passwordchange?email=" + _email + "&password=" + newpass, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        console.log('Network response was not ok');
                        $('#snackbar-9').toast('hide');
                        $("#menu-warning-1").showMenu();
                    }
                    else {
                        location.href = "/login";
                    }
                    return response.text();
                })
                .then(result => console.log(result))
                .catch(error => $("#menu-warning-1").showMenu());

        }
    }
}

function Call(id) {
    var item = "#item-" + id;
    var docitem = "#docphoto-" + id;
    var hide = "#a-" + id;
    var spinner = "#spinner-" + id;
    $(hide).addClass('hidden');
    $(spinner).removeClass('hidden');

    if (localStorage.getItem("username") == null) {
        localStorage.setItem("docitem", $(item).val());
        localStorage.setItem("docphoto", $(docitem).val());
        location.href = "/login";
    } else {
        localStorage.setItem("docitem", $(item).val());
        localStorage.setItem("docphoto", $(docitem).val());
        if (localStorage.getItem("expired") != null) {
            var docusername = $(item).val();
            var identity = localStorage.getItem("username");
            var docPhoto = $(docitem).val();

            var token = "token";//localStorage.getItem("EXTRA_TOKEN");

            location.href = "activity:http://medicall-001-site6.ctempurl.com?username=" + identity + "::" + docusername + "::" + token + "::http://medicall-002-site5.ctempurl.com/uploads/" + docPhoto;
        } else {
            $("#menu-payment-expired").showMenu();
        }
    }
}
function LoadDocPhoto(id) {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(uri + "/loadphoto?id=" + id, requestOptions)
        .then(response => {
            if (!response.ok) {
                console.log('Network response was not ok');
                $('#snackbar-9').toast('hide');
            }
            return response.json();
        })
        .then(result => displayPhoto(result))
        .catch(error => $("#menu-warning-1").showMenu());
}

function displayPhoto(data) {
    // console.log(data);
    data.forEach(item => {
        $("#full-name").html(item.firstName + " " + item.lastName);
        document.getElementById('doc-img').src = "http://medicall-002-site5.ctempurl.com/uploads/heads/" + item.photo;
    })
}



function LoadDashboard(id) {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(uri + "/loadphoto?id=" + id, requestOptions)
        .then(response => {
            if (!response.ok) {
                console.log('Network response was not ok');
                $('#snackbar-9').toast('hide');
            }
            return response.json();
        })
        .then(result => displayDashBoard(result))
        .catch(error => $("#menu-warning-1").showMenu());
}

function displayDashBoard(data) {
    console.log(data);
    data.forEach(item => {
        $("#full-name").html(item.firstName + " " + item.lastName);
        $("#spec").html(item.special);
        $("#approved").html(item.language);

        var percentage_trafic = (parseInt(item.trafic) / parseInt(item.allCalls)) * 100;
        var percentage_drop = (parseInt(item.dropCall) / parseInt(item.allCalls)) * 100;
        var percentage_success = (parseInt(item.received) / parseInt(item.allCalls)) * 100;
        var supposed_income = (parseInt(item.received) / parseInt(item.allCalls)) * parseInt(item.totalIncome);
        var paid = parseInt(item.paid);
        var payment = paid > 0 ? (supposed_income / 2) - paid : supposed_income / 2; //(percentage_trafic/percentage_success)
        //console.log(percentage_trafic.toFixed(0));
        $("#drop").html(percentage_drop.toFixed(0));
        $("#drop_progress").attr('style', 'width: ' + percentage_drop.toFixed(0) + "%");
        $("#received").html(percentage_success.toFixed(0));
        $("#received_progress").attr('style', 'width: ' + percentage_success.toFixed(0) + "%");
        $("#trafic").html(percentage_trafic.toFixed(1));
        $("#trafic_progress").attr('style', 'width: ' + percentage_trafic.toFixed(0) + "%");
        $("#income").html(payment.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
        $("#month").html(item.month);
        localStorage.setItem("logoutid", item.id);
        //document.getElementById('doc-img').src = "http://medicall-002-site5.ctempurl.com/uploads/" + item.photo;
    })
}


var CashOut = function () {

    if (document.getElementById('bankname').value == "") {
        $("#bankname").focus();
        return false;
    }
    if (document.getElementById('accountname').value == "") {
        $("#accountname").focus();
        return false;
    }
    if (document.getElementById('accountnumber').value == "") {
        $("#accountnumber").focus();
        return false;
    }
    if ($("#accountnumber").val().length != 10) {
        $("#accountnumber").focus();
        return false;
    }


    var user = {
        UserId: localStorage.getItem("userid"),
        Bank: $("#bankname").val(),
        AccountName: $("#accountname").val(),
        AccountNumber: $("#accountnumber").val(),
        Amount: $("#income").html().replace(",", "")
    };

    $("#procreate").removeClass('hidden');
    $("#cashout").addClass('hidden');

    CashOutDoctor(user);

}

var CashOutDoctor = async (user) => {
    console.log(user);
    try {

        var options = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        var res = await fetch(uri + "/cashout", options);
        if (!res.ok) {
            $('#menu-bank-details').hideMenu();
            $("#menu-code-fail").showMenu();

            $("#procreate").addClass('hidden');
            $("#cashout").removeClass('hidden');
        }
        var data = await res.json();
        console.log(data);
        if (data != true) {
            $('#menu-bank-details').hideMenu();
            $("#menu-pending-pay").showMenu();
            $("#procreate").addClass('hidden');
            $("#cashout").removeClass('hidden');
        }
        else {
            $('#menu-bank-details').hideMenu();
            $("#menu-code-okay").showMenu();
            $("#procreate").addClass('hidden');
            $("#cashout").removeClass('hidden');
        }
    } catch (error) {
        $('#menu-bank-details').hideMenu();
        $('#snackbar-9').toast('hide');
        $("#menu-code-fail").showMenu();
        $("#procreate").addClass('hidden');
        $("#cashout").removeClass('hidden');
    }
}

var logout = async () => {
    try {
        var requestOptions = {
            method: 'PUT',
            redirect: 'follow'
        };
        var id = localStorage.getItem("logoutid");
        var res = await fetch(uri + "/logout?id=" + id, requestOptions);
        if (!res) {
            console.log('Network response was not ok');
            $("#menu-signout-error").showMenu();
        }
        var data = await res.json();
        processResult(data);
    } catch (error) {
        $("#menu-signout-error").showMenu();
    }
}

function processResult(result) {

    if (result) {
        localStorage.clear();
        location.href = "/";
    }
}

var sendPrescription = async () => {

    var symptom = $("#symptom").val();

    if (symptom == "") {
        return false;
    }
    var prescribe = $("#prescription").val();

    if (prescribe == "") {
        return false;
    }

    var userid = document.getElementById("client_id").value;
    var docid = document.getElementById("doc_id").value;


    var user = {
        UserId: userid,
        DocId: docid,
        Symptom: symptom,
        Treatment: prescribe
    };

    $("#procreate").removeClass('hidden');
    $("#btnPrescription").addClass('hidden');

    try {

        var options = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        var res = await fetch(uri + "/prescribe", options);
        if (!res.ok) {
            $('#menu-prescription-description').hideMenu();
            $("#menu-symptom-description").hideMenu();
            $("#menu-code-fail").showMenu();

            $("#procreate").addClass('hidden');
            $("#btnPrescription").removeClass('hidden');
        }
        var data = await res.json();
        console.log(data);
        if (data != true) {
            $('#menu-prescription-description').hideMenu();
            $("#menu-symptom-description").hideMenu();
            $("#menu-code-fail").showMenu();
            $("#procreate").addClass('hidden');
            $("#btnPrescription").removeClass('hidden');
        }
        else {
            $('#menu-prescription-description').hideMenu();
            $("#menu-code-okay").showMenu();
            $("#procreate").addClass('hidden');
            $("#btnPrescription").removeClass('hidden');
        }
    } catch (error) {
        $('#menu-prescription-description').hideMenu();
        $("#menu-symptom-description").hideMenu();
        $("#menu-code-fail").showMenu();
        $("#procreate").addClass('hidden');
        $("#btnPrescription").removeClass('hidden');
    }
}

var lunchHistory = function () {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(uri + "/getprescription?userid=" + $("#client_id").val(), requestOptions)
        .then(response => {
            if (!response.ok) {
                console.log('Network response was not ok'); $("#no_prescription").removeClass('hidden');
                $("#menu-network-1").showMenu();
            }
            return response.json();
        })
        .then(data => _displayHistoryItems(data))
        .catch(error => $("#menu-network-1").showMenu());
}

if ($("#history").length > 0) {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(uri + "/getprescription?userid=" + $("#client_id").val(), requestOptions)
        .then(response => {
            if (!response.ok) {
                console.log('Network response was not ok'); $("#no_prescription").removeClass('hidden');
                $("#menu-network-1").showMenu();
            }
            return response.json();
        })
        .then(data => _displayHistoryItems(data))
        .catch(error => $("#menu-network-1").showMenu());

}

function _displayHistoryItems(data) {

    console.log(data);
    if (!Object.keys(data).length) {
        $("#no_prescription").removeClass('hidden');
    }
    else {

        var htm = "";
        //$("#docItems").html(htm);
        data.forEach(item => {

            htm += "<div class='timeline-item'>"
            htm += "        <div class='timeline-item-content rounded-sm shadow-l'>"
            htm += "            <h5 class='font-500 text-center'>"
            htm += "                <a href='#'>Symptom</a><br />"
            htm += item.symptom
            htm += "            </h5>"
            htm += "            <hr />"
            htm += "            <h5 class='font-500 text-center'>"
            htm += "                <a href='#'>Prescription</a><br />"
            htm += item.treatment
            htm += "            </h5>"
            htm += "            <p class='text-center mt-4 mb-0 pb-0'>"
            htm += "                <a href='#' class='text-center font-400'>Treated By @@ " + item.firstName + " " + item.lastName + "</a>"
            htm += "            </p>"
            htm += "        </div>"
            htm += "    </div>"

        });
        $("#no_prescription").addClass('hidden');
        $("#docItems").append(htm);

    }
    $("#item-preloader").addClass('hidden');
}
