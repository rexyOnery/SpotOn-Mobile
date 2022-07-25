//const { fail } = require("assert/strict");

//var uri_tutors = 'http://medicall-002-site5.ctempurl.com/api/tutorsspoton';
var uri_tutors = 'https://localhost:44378/api/tutorsspoton';
if (localStorage.getItem("userid") == null)
    location.href = "/login";

function nospaces(t) {
    if (t.value.match(/\s/g)) {
        t.value = t.value.replace(/\s/g, '');
    }
}

function getClassCategorys() {

    var htm = "";
    $("#slc_category").html(htm);
    htm += "<option value='' disabled selected><div id='procreate' class='spinner-border color-green-dark hidden' role='status'>"
    htm += "                <span class='sr-only'>Loading Class Category...</span>"
    htm += "            </div></option>";
    $("#slc_category").html(htm);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(uri_tutors + "/classcategory", requestOptions)
        .then(response => response.json())
        .then(result => loadCategorys(result))
        .catch(error => failedFetch(error));

}
function failedFetch(val) {
    $("#warningText").html("Could not fetch Class Category at the moment.")
    $("#menu-warning-text").showMenu();
}

function loadCategorys(result) {

    var htm = "";
    $("#slc_category").html(htm);
    htm += "<option value='' disabled selected>Select Class Category</option>";
    //$("#docItems").html(htm);
    result.forEach(item => {
        htm += "<option value='" + item.id + "'>" + item.categoryName + "</option>";
    });
    $("#slc_category").append(htm);
}

var SlcCategoryChange = function () {
    var category = $("#slc_category option:selected").text();
    var htm = "";
    $("#slc_class").html(htm);
    htm += "<option value='' disabled selected><div id='procreate' class='spinner-border color-green-dark hidden' role='status'>"
    htm += "                <span class='sr-only'>Loading " + category + " category classes...</span>"
    htm += "            </div></option>";
    $("#slc_class").html(htm);

    var _sel = $("#slc_category option:selected").val();

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(uri_tutors + "/tutorclases/" + _sel, requestOptions)
        .then(response => response.json())
        .then(result => loadClassNames(result))
        .catch(error => console.log('error', error));
}

function loadClassNames(result) {
    console.log(result);
    var htm = "";
    $("#slc_class").html(htm);
    htm += "<option value='' disabled selected>Select Class</option>";
    //$("#docItems").html(htm);
    result.forEach(item => {
        htm += "<option value='" + item.id + "'>" + item.classNames + "</option>";
    });
    $("#slc_class").append(htm);
}

var SlcLocationChange = function () {

    $("#menu-option-2").showMenu();
}

var advertise = function () {
    $("#menu-option-2").hideMenu();
    $("#success_menu").showMenu();
}





var getClasses = function (id) {
    $("#slc_class_empty").addClass('hidden');
    var htm = "";
    $("#slc_class").html(htm);
    htm += "<option value='' disabled selected><div id='procreate' class='spinner-border color-green-dark' role='status'>"
    htm += "                <span class='sr-only'>Loading classes...</span>"
    htm += "            </div></option>";
    $("#slc_class").html(htm);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(uri_tutors + "/tutorclases?categoryid=" + id, requestOptions)
        .then(response => response.json())
        .then(result => loadTutorClassNames(result))
        .catch(error => reloadClasses(id));
}
function reloadClasses(id) {
    var shtm = "";
    $("#slc_class").html(shtm);
    shtm += "<option value='' disabled selected><div class='spinner-border color-green-dark' role='status'>"
    shtm += "                <span class='sr-only'>Class Loading Failed</span>"
    shtm += "            </div></option>";
    $("#slc_class").html(shtm);

    var htm = "";
    $("#slc_class_empty").html(htm);
    htm += "<a style='float:right' href='javascript:getClasses(" + id + ")';>Reload Local Areas";
    htm += "</a>";
    $("#slc_class_empty").html(htm);
    $("#slc_class_empty").removeClass('hidden');
}
function loadTutorClassNames(result) {
    console.log(result);
    var htm = "";
    $("#slc_class").html(htm);
    htm += "<option value='' disabled selected>Select Class</option>";
    //$("#docItems").html(htm);
    result.forEach(item => {
        htm += "<option value='" + item.id + "'>" + item.classNames + "</option>";
    });
    $("#slc_class").append(htm);
}






//Paging

function getAllTutorItems(id) {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(uri_tutors + "/pages?classid=" + id, requestOptions)
        .then(response => response.text())
        .then(result => runTutorPages(result))
        .catch(error => console.log('error', error));

}

var forwardPaging = false;
var backPaging = false;
function runTutorPages(pages) {
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
                paging += "<li id='page-" + i + "' class='page-item active'><a class='page-link rounded-xs color-black bg-highlight shadow-l border-0' href='javascript:tutorPage(" + i + ");'>" + num + "</a></li>";

            }
            else if (i == pages) {
                localStorage.setItem("lastitem", i);
                paging += "<li id='page-" + i + "' class='page-item hidden'><a class='page-link rounded-xs color-black bg-theme shadow-l border-0' href='javascript:tutorPage(" + i + ");'>" + num + "</a></li>";
            }
            else if (i <= 4) {
                paging += "<li id='page-" + i + "' class='page-item'><a class='page-link rounded-xs color-black bg-theme shadow-l border-0' href='javascript:tutorPage(" + i + ");'>" + num + "</a></li>";
            } else {
                forwardPaging = true;
                paging += "<li id='page-" + i + "' class='page-item hidden'><a class='page-link rounded-xs color-black bg-theme shadow-l border-0' href='javascript:tutorPage(" + i + ");'>" + num + "</a></li>";
            }
        }
        paging += "<li class='page-item'>"
        paging += "<a class='page-link rounded-xs color-black bg-transparent bg-theme shadow-l border-0' href='javascript:doTutorNext();'><i class='fa fa-angle-right'></i></a>"
        paging += "</li>"
        $("#page-items").append(paging);
    }
}

function tutorPage(id) {

    var _prevPage = localStorage.getItem("currentPage");
    var _prev_Page = "#page-" + _prevPage;
    var _prev_Page_a = "#page-" + _prevPage + " a";

    var _curPage = "#page-" + id;
    var _curPage_a = "#page-" + id + " a";
    if (_prevPage != id) {
        $("#item-preloader").removeClass('hidden');

        fetch(uri_tutors + "?page=" + id + "&pageSize=10")
            .then(response => response.json())
            .then(data => _displayTutorItems(data))
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

function doTutorPrevious() {
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

function doTutorNext() {
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

function getTutorItems(id) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(uri_tutors + "?pages=0&pageSize=10&classid=" + id, requestOptions)
        .then(response => {
            if (!response.ok) {
                console.log('Network response was not ok');
                displayError(1);
            }
            return response.json();
        })
        .then(data => _displayTutorItems(data))
        .catch(error => displayError(2));
}

function displayError(id) {
    if (id == 2) {
         
        $('#menu_option_no_network').showMenu();
        $("#item-preloader").addClass("hidden");
    }
    else if (id == 1) {
       
        $('#menu_warning_wrong').showMenu();
        $("#item-preloader").addClass("hidden");
    }
}

function _displayTutorItems(data) {

    console.log(data);
    if (!Object.keys(data).length) {
        $("#no-item").removeClass('hidden');
    }
    else {
        var htm = "";
        //$("#docItems").html(htm);
        data.forEach(item => {

            htm += "<div class='d-flex'>"
            htm += "        <div class='mr-3'>"
            htm += "            <img width='120' class='fluid-img rounded-m shadow-xl' src='http://medicall-002-site5.ctempurl.com/uploads/" + item.photo + "'>"
            htm += "        </div>"
            htm += "        <div>"
            htm += "            <p class='color-highlight font-600 mb-n1'>" + item.title + ".</p>"
            htm += "            <h2>" + item.firstName + " " + item.lastName + "</h2>"
            htm += "            <p class='mt-2'>"
            htm += "                Teaches:  " + item.subjects + ""
            htm += "            </p>"
            htm += "            <a href='/tutors/details?id=" + item.id + "' class='btn btn-sm rounded-s font-13 font-600 gradient-highlight'>View Detail</a>"
            htm += "        </div>"
            htm += "    </div> "
            htm += "    <div class='divider mt-4'></div>"
        });
        $("#docItems").append(htm);
        $("#item-preloader").addClass("hidden");
    }
    $("#item-preloader").addClass('hidden');
}


var UpdateTutorCall = async (user) => {

    $("#procreate").removeClass('hidden');
    $("#btnUpdateTutorSettings").addClass('hidden');

    try {

        const options = {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await fetch(uri_tutors + "/posttutors", options);
        if (!res.ok) {
            $("#warning-title-error").html("Network Error!");
            $("#warningTextError").html("The task failed to complete. This may be due to slow or no network connection.");
            $('#menu-warning-error').showMenu();
            $("#procreate").addClass('hidden');
            $("#btnUpdateTutorSettings").removeClass('hidden');
        }
        const data = await res.json();
        console.log(data);
        if (data != true) {
            $("#warning-title-error").html("Something wrong!");
            $("#warningTextError").html("The task failed to complete. Please trying again and ensure you're logged in..");
            $('#menu-warning-error').showMenu();
            $("#procreate").addClass('hidden');
            $("#btnUpdateTutorSettings").removeClass('hidden');
        }
        else {
            location.href = "/tutors/tutordash";
        }
    } catch (error) {
        $("#warning-title-error").html("Network Error!");
        $("#warningTextError").html("The task failed to complete. This may be due to slow or no network connection.");
        $('#menu-warning-error').showMenu();
        $("#procreate").addClass('hidden');
        $("#btnUpdateTutorSettings").removeClass('hidden');
    }
}


function UpdateTutorSettings() {

    var classId = document.getElementById('slc_class').value.trim();
    var lgaId = document.getElementById('lga').value.trim();
    var designation = document.getElementById("slc_title").value.trim();
    var location = document.getElementById('location').value.trim();
    // var subject = document.getElementById('txtSubject').value.trim();
    var brief = document.getElementById('txtBrief').value.trim();
    var userid = localStorage.getItem("userid");

    if (classId != "") {
        if (lgaId != "") {
            if (location != "") {
                //if (subject != "") {
                if (brief != "") {

                    var datas = {
                        ClassId: classId,
                        LocationId: lgaId,
                        //Subjects: subject,
                        LocationName: location,
                        Description: brief,
                        Approved: false,
                        Title: designation,
                        UserId: userid
                    }

                    UpdateTutor(datas);

                } else {
                    $("#warningText").html("Missing Briefs");
                    $("#warningText").html("Missing Briefs. Please enter the brief description");
                    $('#menu-warning-text').showMenu();
                    return false;
                }
            }
            //else {
            //    $("#warningText").html("Missing Subject(s)");
            //    $("#warningText").html("Missing Subject(s). Please enter the subject(s)");
            //    $('#menu-warning-text').showMenu();
            //    return false;
            //}
            else {
                $("#warningText").html("Missing Location");
                $("#warningText").html("Missing Location. Please enter the location");
                $('#menu-warning-text').showMenu();
                return false;
            }
        } else {
            $("#warningText").html("Missing Local Area");
            $("#warningText").html("Missing Local Area. Please select the local area");
            $('#menu-warning-text').showMenu();
            return false;
        }
    } else {
        $("#warningText").html("Missing Class");
        $("#warningText").html("Missing Class. Please select the class");
        $('#menu-warning-text').showMenu();
        return false;
    }

}

function UpdateTutor() {
    UpdateTutorCall();
}


function MoreTutorSubjects() {

    // var classId = document.getElementById('slc_class').value.trim();
    var subject = document.getElementById('txtSubject').value.trim();
    var userid = localStorage.getItem("userid");

    //if (classId != "") {
    if (subject != "") {

        var datas = {
            //ClassId: classId,
            Subjects: subject,
            TutorId: userid
        }

        UpdateTutorSubjects(datas);

    } else {
        $("#warningText").html("Missing Subject(s)");
        $("#warningText").html("Missing Subject(s). Please enter the subject(s)");
        $('#menu-warning-text').showMenu();
        return false;
    }

    //} else {
    //    $("#warningText").html("Missing Class");
    //    $("#warningText").html("Missing Class. Please select the class");
    //    $('#menu-warning-text').showMenu();
    //    return false;
    //}

}

var UpdateTutorSubjects = async (user) => {

    $("#procreate").removeClass('hidden');
    $("#btnMoreTutorSubjects").addClass('hidden');

    try {

        const options = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await fetch(uri_tutors + "/postmoresubjects", options);
        if (!res.ok) {
            $("#warning-title-error").html("Network Error!");
            $("#warningTextError").html("The task failed to complete. This may be due to slow or no network connection.");
            $('#menu-warning-error').showMenu();
            $("#procreate").addClass('hidden');
            $("#btnMoreTutorSubjects").removeClass('hidden');
        }
        const data = await res.json();
        console.log(data);
        if (data != true) {
            $("#warning-title-error").html("Something wrong!");
            $("#warningTextError").html("The task failed to complete. Please trying again and ensure you're logged in..");
            $('#menu-warning-error').showMenu();
            $("#procreate").addClass('hidden');
            $("#btnMoreTutorSubjects").removeClass('hidden');
        }
        else {
            location.href = "/tutors/tutordash";
        }
    } catch (error) {
        $("#warning-title-error").html("Network Error!");
        $("#warningTextError").html("The task failed to complete. This may be due to slow or no network connection.");
        $('#menu-warning-error').showMenu();
        $("#procreate").addClass('hidden');
        $("#btnMoreTutorSubjects").removeClass('hidden');
    }
}



var getmyDashBoard = async () => {
    $("#procreate").removeClass('hidden');
    try {

        const options = {
            method: 'GET',
            redirect: 'follow'
        };
        var id = localStorage.getItem("userid");

        const res = await fetch(uri_tutors + "/getdashboard?myid=" + id, options);
        if (!res.ok) {
            $("#dash_profile").html("Network Error! <a href='javascript: getmyDashBoard();'>Reload my dashboard profile</a>");
            $("#btnMoreTutorSubjects").removeClass('hidden');
            $("#procreate").addClass('hidden');
        }
        const data = await res.json();
        console.log(data);
        if (data.length == 0) {
            $("#dash_profile").html("Something wrong! <a href='javascript: getmyDashBoard();'>Reload my dashboard profile</a>");
            $("#btnMoreTutorSubjects").removeClass('hidden');
            $("#procreate").addClass('hidden');
        }
        else {

            data.forEach(item => {

                $("#my_img").attr("src", "http://medicall-002-site5.ctempurl.com/uploads/" + item.photo);
                $("#my_img2").attr("src", "http://medicall-002-site5.ctempurl.com/uploads/" + item.photo);
                if (item.approved == 'Activated')
                    $("#color_active").addClass('color-blue-dark');
                else
                    $("#color_active").addClass('color-red-dark');
                $("#dash_active").html(item.approved);
                $("#dash_profile").html(item.description);
                $("#dash_name").html(item.fullName);
                $("#class_name span").html(item.classCategory);
            });
            $("#procreate").addClass('hidden');
            $("#pro_subs").removeClass('hidden');
            getTutorSubjects();
        }
    } catch (error) {
        $("#dash_profile").html("Network Error! <a href='javascript: getmyDashBoard();'>Reload my dashboard profile</a>");
        $("#btnMoreTutorSubjects").removeClass('hidden');
        $("#procreate").addClass('hidden');
    }
}

var getTutorSubjects = async () => {
    $("#pro_subs").removeClass('hidden');
    try {

        const options = {
            method: 'GET',
            redirect: 'follow'
        };
        var id = localStorage.getItem("userid");

        const res = await fetch(uri_tutors + "/gettutormysubjects?myid=" + id, options);
        if (!res.ok) {

            $("#pro_subs").addClass('hidden');
            $("#tutor_subjects_list_error").removeClass('hidden');
        }
        const data = await res.json();
        console.log(data);
        if (data.length == 0) { 
            $("#tutor_subjects_list_error").html("Network Error! <a href='javascript: getTutorSubjects();'>Reload my subjects</a>");
            $("#pro_subs").addClass('hidden');
        }
        else {
            var htm = "";
            $("#tutor_subjects_list").html(htm);
            data.forEach(item => {
                htm += "<a id='a-" + item.id + "' href='javascript:deleteSubject(" + item.id + ");' class='border border-green-dark rounded-s shadow-s'>"
                htm += "    <i class='fa font-20 fa-book-open color-blue-dark'></i>"
                htm += "    <span>" + item.subjects + "</span>"
                htm += "    <strong>" + item.className + "</strong>"


                htm += "    <i id='i-" + item.id + "' class='fa fa-times-circle color-red-light mr-3' style='float:right'></i>"
                htm += "    <u id='u-" + item.id + "' class='color-red-dark'>REMOVE</u>"
                htm += "    <i id='prg-" + item.id + "' class='spinner-border color-green-dark mt-3 hidden'></i>"
                htm += "</a>"
            });
            $("#tutor_subjects_list").html(htm);
            $("#tutor_subjects_list").removeClass('hidden');
            $("#pro_subs").addClass('hidden');
            getAdvertBoards();
        }
    } catch (error) {
        
        $("#tutor_subjects_list_error").html("Network Error! <a href='javascript: getTutorSubjects();'>Reload my subjects</a>");
        $("#pro_subs").addClass('hidden');
    }
}


var getAdvertBoards = async () => {
    $("#pro_ads").removeClass('hidden');
    try {

        const options = {
            method: 'GET',
            redirect: 'follow'
        };
        var id = localStorage.getItem("userid");
        const res = await fetch(uri_tutors + "/gettutoradverts?id=" + id, options);
        if (!res.ok) {
            $("#tutor_advert_lists").html("Network Error! <a href='javascript: getAdvertBoards();'>Reload Adverts</a>");
            $("#pro_ads").addClass('hidden');
        }
        const data = await res.json();
        console.log(data);
        if (data.length == 0) {
            $("#tutor_advert_lists").html("No Advert Has Been Posted!");

            $("#pro_ads").addClass('hidden');
        }
        else {
            var htm = "";
            $("#tutor_advert_lists").html(htm);
            data.forEach(item => {
                htm = "";
                htm += "<div class='list-group list-custom-small list-icon-0'>"
                htm += "    <a data-toggle='collapse' href='#collapse-" + item.id + "'>"
                htm += "        <i class='fa font-14 fa-share-alt color-red-dark'></i>"
                htm += "        <span class='font-14'>" + item.subjects + "</span>"
                htm += "        <i class='fa fa-angle-down'></i>"
                htm += "    </a>"
                htm += "</div>"
                htm += "<div class='collapse' id='collapse-" + item.id + "'>"
                htm += "    <div class='list-group list-custom-small ml-4 pl-2'>"

                htm += "        <a href='#'>"
                htm += "            <span class='font-400 opacity-70'>" + item.location + "</span>"
                htm += "        </a>"

                htm += "        <a href='/chat/communication?parid=" + item.advertiserId + "' class='badge bg-blue-dark color-white'>"
                htm += "            <span class='font-400 opacity-70'>Tap For Chat</span>"
                htm += "        </a>"
                htm += "    </div>"
                htm += "</div>"
                $("#tutor_advert_lists").append(htm);
            });

            $("#pro_ads").addClass('hidden');
        }
    } catch (error) {
        $("#tutor_advert_lists").html("Network Error! <a href='javascript: getAdvertBoards();'>Reload Adverts</a>");
        $("#pro_ads").addClass('hidden');
    }
}

var getAdvertCounts = async () => {
    $("#pro_ads").removeClass('hidden');
    try {

        const options = {
            method: 'GET',
            redirect: 'follow'
        };
        var id = localStorage.getItem("userid");
        const res = await fetch(uri_tutors + "/gettutoradverts?id=" + id, options);
        if (!res.ok) {
            $("#tutor_advert_lists").html("Network Error! <a href='javascript: getAdvertBoards();'>Reload Adverts</a>");
            $("#pro_ads").addClass('hidden');
        }
        const data = await res.json();
        console.log(data);
        if (data.length == 0) {
            $("#tutor_advert_lists").html("No Advert Has Been Posted!</a>");

            $("#pro_ads").addClass('hidden');
        }
        else {
            var htm = "";
            $("#tutor_advert_lists").html(htm);
            var _counter_ = 0;
            data.forEach(item => {
                _counter_++;
            });
            $("#tutor_advert_lists").html("There are " + _counter_ + " tutor requests that matches this class category. <a href='/tuttors/advertpage");
            $("#pro_ads").addClass('hidden');
        }
    } catch (error) {
        $("#tutor_advert_lists").html("Network Error! <a href='javascript: getAdvertBoards();'>Reload Adverts</a>");
        $("#pro_ads").addClass('hidden');
    }
}

if ($("#tutorDashBoard").length) {
    getmyDashBoard();
}

var sub_id;
function deleteSubject(id) {
    sub_id = id;
    $("#menu-option-2").showMenu();
}
var callDeleteSubj = async () => {
    $("#menu-option-2").hideMenu();
    var id = sub_id;
    var i = "#i-" + id;
    var u = "#u-" + id;
    var prg = "#prg-" + id;
    $(prg).removeClass('hidden');
    $(i).addClass('hidden');
    $(u).addClass('hidden');

    try {

        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        const res = await fetch(uri_tutors + "/removesubject?id=" + id, requestOptions);
        if (!res.ok) {
            $("#warning-title-error").html("Network Error!");
            $("#warningTextError").html("The task failed to complete. This may be due to slow or no network connection.");
            $('#menu-warning-error').showMenu();
            $("#procreate").addClass('hidden');
            $("#btnMoreTutorSubjects").removeClass('hidden');
        }
        const data = await res.json();
        console.log(data);
        if (data != true) {
            $("#warning-title-error").html("Something wrong!");
            $("#warningTextError").html("The task failed to complete. Please trying again and ensure you're logged in..");
            $('#menu-warning-error').showMenu();
            $("#procreate").addClass('hidden');
            $("#btnMoreTutorSubjects").removeClass('hidden');
        }
        else {
            var href = '#a-' + id;
            $(href).addClass('hidden');
            getTutorSubjects();
        }
    } catch (error) {
        $("#warning-title-error").html("Network Error!");
        $("#warningTextError").html("The task failed to complete. This may be due to slow or no network connection.");
        $('#menu-warning-error').showMenu();
        $("#procreate").addClass('hidden');
        $("#btnMoreTutorSubjects").removeClass('hidden');
    }
}



var addTutorAdvert = function () {

    var tutorclass = document.getElementById('slc_class').value.trim();
    var locationid = document.getElementById('lga').value.trim();
    var location = document.getElementById('location').value.trim();
    var subject = document.getElementById('txtSubject').value.trim();
    var userid = localStorage.getItem("userid");

    if (tutorclass != "") {
        if (locationid != "") {
            if (location != "") {
                if (subject != "") {

                    var useradvert = {
                        ClassId: tutorclass,
                        LocationId: locationid,
                        Location: location,
                        Subjects: subject,
                        AdvertiserId: userid
                    };

                    AddUserAdvert(useradvert);

                } else {
                    $("#menu-title-error").html("Missing Subject(s)");
                    $("#warningTextError").html("Missing Subject(s). Please enter the subject(s)");
                    $('#menu-warning-error').showMenu();
                    return false;
                }
            } else {
                $("#menu-title-error").html("Missing Location");
                $("#warningTextError").html("Missing Location. Please enter the location");
                $('#menu-warning-error').showMenu();
                return false;
            }
        } else {
            $("#menu-title-error").html("Missing Local Area");
            $("#warningTextError").html("Missing Local Area. Please select the local area");
            $('#menu-warning-error').showMenu();
            return false;
        }
    } else {
        $("#menu-title-error").html("Missing Class");
        $("#warningTextError").html("Missing Class Selection. Please select the class");
        $('#menu-warning-error').showMenu();
        return false;
    }

}


var AddUserAdvert = async (advert) => {
    $("#docItems").addClass('hidden');
    $("#item-preloader").removeClass('hidden');
    $("#btnAdvert").addClass('hidden');
    try {

        const options = {
            method: 'POST',
            body: JSON.stringify(advert),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log(advert);
        const res = await fetch(uri_tutors + "/posttutoradverts", options);
        if (!res.ok) {
            $("#failedTitle").html("Error!");
            $("#failedText").html("This could be as a result of<br /> poor network connection.<br />Please, try again");
            $("#menu-code-fail").showMenu();
            $("#item-preloader").addClass('hidden');
            $("#btnAdvert").removeClass('hidden');
        }
        const data = await res.json();
        console.log(data);
        if (data.length) {
            data.forEach(item => {
                if (item.found == "Advert Not Placed") {

                    $("#failedTitle").html("Failed!");
                    $("#failedText").html("No tutor found.<br />Could not place the advert.<br />Please, try again");
                    $("#menu-code-fail").showMenu();
                    $("#item-preloader").addClass('hidden');
                    $("#btnAdvert").removeClass('hidden');

                } else if (item.found == "Advert Placed") {

                    $("#menu-code-okay").showMenu();
                    $("#item-preloader").addClass('hidden');
                    $("#btnAdvert").removeClass('hidden');

                } else if (item.found == "Found") {
                    $("#docItems").html("");
                    _displayTutorItems(data);
                    $("#docItems").removeClass('hidden');
                    $("#item-preloader").addClass('hidden');
                    $("#btnAdvert").removeClass('hidden');
                }
            });
        } else
            if (item.found == "Advert Placed") {

                $("#menu-code-okay").showMenu();
                $("#item-preloader").addClass('hidden');
                $("#btnAdvert").removeClass('hidden');

            } else {
                $("#failedTitle").html("Error!");
                $("#failedText").html("Something went wrong.<br />Please, try again");
                $("#menu-code-fail").showMenu();
                $("#item-preloader").addClass('hidden');
                $("#btnAdvert").removeClass('hidden');
            }


    } catch (error) {
        $("#failedTitle").html("Error!");
        $("#failedText").html("Something went wrong.<br />Please, try again");
        $("#menu-code-fail").showMenu();
        $("#item-preloader").addClass('hidden');
        $("#btnAdvert").removeClass('hidden');
    }
}


var getMyChatHeads = async () => {
    $("#pro_ads").removeClass('hidden');
    try {

        const options = {
            method: 'GET',
            redirect: 'follow'
        };
        var id = localStorage.getItem("userid");
        const res = await fetch(uri_tutors + "/getchatheads?myid=" + id, options);
        if (!res.ok) {
            $("#menu_option_no_network").showMenu();
            $("#pro_ads").addClass('hidden');
        }
        const data = await res.json();
        console.log(data);
        if (data.length == 0) {
            $("#menu_option_no_chat").showMenu();

            $("#pro_ads").addClass('hidden');
        }
        else {
            var htm = "";
            $("#chat_heads").html(htm);
            var _counter_ = 0;
            data.forEach(item => {
                htm += "<a href='/chat/communication?parentid=" + item.chatHeadId + "' class='d-flex mb-3'>"
                htm += "<div>"
                htm += "    <img src='/images/pictures/6s.jpg' width='60' class='rounded-xl mr-3'>"
                htm += "</div>"
                htm += "<div>"
                htm += "    <h5 class='font-16 font-600'>" + item.parentName + "</h5>"
                htm += "    <p class='line-height-s mt-1 opacity-70'>This is a sample chat box, it looks pretty sweet and has text in it.</p>"
                htm += "</div>"
                htm += "<div class='align-self-center pl-3'>"
                if (item.hasUnread) {
                    htm += "    <i class='fa fa-star color-yellow-dark'></i>"
                } else {
                    htm += "    <i class='fa fa-star color-white-dark'></i>"
                }
                htm += "</div>"
                htm += "</a>"
                htm += "<div class='divider mb-3'></div>"
            });
            $("#chat_heads").html(htm);
            $("#pro_ads").addClass('hidden');
        }
    } catch (error) {
        $("#menu_option_no_network").showMenu();
        $("#pro_ads").addClass('hidden');
    }
}


if ($("#ChatHeadHidn").length) {
    getMyChatHeads();
}

var _chat_head_id = 0;
function sendChat() {
    if ($("#txtChat").val() == "") {
        $("#warning_text").html("Please enter the message to send! The chat message cannot be empty.");
        $("#warning_title").html("Chat Message")
        $("#menu_warning").showMenu();
        return false;
    }
    var _query = location.search.split('=');
    if (_query[1] != null) {
        _chat_head_id = _query[1];
    } else {

        $("#menu_option_no_parent").showMenu();
        return false;
    }
    var chatPost = {
        ChatHeadId: _chat_head_id,
        TutorId: localStorage.getItem("userid"),
        ChaterId: localStorage.getItem("userid"),
        Messages: $("#txtChat").val(),
        IsRead: false
    };
    sendChatMessage(chatPost);
}

var sendChatMessage = async (chatPost) => {
    $("#aSendChat").addClass('hidden');
    $("#chat_progress").removeClass('hidden');

    try {

        const options = {
            method: 'POST',
            body: JSON.stringify(chatPost),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await fetch(uri_tutors + "/postchats", options);
        if (!res.ok) {

            $('#menu_option_no_network').showMenu();
            $("#aSendChat").removeClass('hidden');
            $("#chat_progress").addClass('hidden');
        }
        const data = await res.json();
        console.log(data);
        if (data != true) {
            $('#menu_option_server_error').showMenu();
            $("#aSendChat").removeClass('hidden');
            $("#chat_progress").addClass('hidden');
        }
        else {
            var htm = "";
            htm += "<div class='speech-bubble speech-left bg-highlight'>"
            htm += $("#txtChat").val()
            htm += "</div>"
            htm += "<div class='clearfix'></div>"

            var today = new Date();
            var ampm = today.getHours >= 12 ? "AM" : "PM";
            var time = today.getHours() + ":" + today.getMinutes() + ":" + ampm;
            htm += "<em class='speech-read mb-4'>Posted - " + time + "</em>"

            $("#com_chat").append(htm);
            $("#txtChat").val('');
            window.scrollTo(0, document.body.scrollHeight);
            $("#aSendChat").removeClass('hidden');
            $("#chat_progress").addClass('hidden');
        }
    } catch (error) {
        $('#menu_option_no_network').showMenu();
        $("#aSendChat").removeClass('hidden');
        $("#chat_progress").addClass('hidden');
    }
}



var getMyChats = async () => {
    $("#aSendChat").addClass('hidden');
    $("#chat_progress").removeClass('hidden');
    try {

        const options = {
            method: 'GET',
            redirect: 'follow'
        };
        var id = localStorage.getItem("userid");

        var _query = location.search.split('=')[1];
        _chat_head_id = _query;
        const res = await fetch(uri_tutors + "/getchat?ChatHeadId=" + _query + "&myid=" + id, options);
        if (!res.ok) {
            $("#menu_option_no_network_1").showMenu();
            $("#aSendChat").removeClass('hidden');
            $("#chat_progress").addClass('hidden');
        }
        const data = await res.json();
        console.log(data);
        if (data.length == 0) {
            $("#aSendChat").removeClass('hidden');
            $("#chat_progress").addClass('hidden');
        }
        else {
            var htm = "";
            $("#com_chat").html(htm);

            if (data.length > 0) {
                var _timer_ = "";
                data.forEach(item => {
                    if (_timer_ == "") {
                        htm += "<p class='text-center mb-0 font-11'>" + item.messageDate + "</p>";
                        _timer_ = item.messageDate;
                    }
                    else {
                        if (_timer_ != item.messageDate) {
                            htm += "<p class='text-center mb-0 font-11'>" + item.messageDate + "</p>";
                            _timer_ = item.messageDate;
                        }
                    }
                    if (item.chaterId == item.tutorId) {
                        htm += "<div class='speech-bubble speech-left bg-highlight'>"
                        htm += item.messages
                        htm += "</div>"
                        htm += "<div class='clearfix'></div>"
                       
                    } else {
                        htm += "<div class='speech-bubble speech-right color-black'>"
                        htm += item.messages
                        htm += "</div>"
                        htm += "<div class='clearfix'></div>"
                    }
                    
                    
                });
                htm += "<p class='text-center mb-0 font-11'>&nbsp;</p>";
                $("#com_chat").html(htm);
                window.scrollTo(0, document.body.scrollHeight);
                setInterval(function () { getTimeOutChat(); }, 180000);
            }
            $("#aSendChat").removeClass('hidden');
            $("#chat_progress").addClass('hidden');
        }
    } catch (error) {
        $("#menu_option_no_network_1").showMenu();
        $("#aSendChat").removeClass('hidden');
        $("#chat_progress").addClass('hidden');
    }
}



var getTimeOutChat = async () => {
    //$("#aSendChat").addClass('hidden');
    //$("#chat_progress").removeClass('hidden');
    try {

        const options = {
            method: 'GET',
            redirect: 'follow'
        };
        var id = localStorage.getItem("userid");

        const res = await fetch(uri_tutors + "/getrefreshedchat?ChatHeadId=" + _chat_head_id + "&myid=" + id, options);
        if (!res.ok) {
            //$("#menu_option_no_network_1").showMenu();
            //$("#aSendChat").removeClass('hidden');
            //$("#chat_progress").addClass('hidden');
        }
        const data = await res.json();
        console.log(data);
        if (data.length == 0) {
            //$("#aSendChat").removeClass('hidden');
            //$("#chat_progress").addClass('hidden');
        }
        else {
            var htm = "";
            $("#com_chat").html(htm);

            if (data.length > 0) {
                var _timer_ = "";
                data.forEach(item => {
                    if (_timer_ == "") {
                        htm += "<p class='text-center mb-0 font-11'>" + item.messageDate + "</p>";
                        _timer_ = item.messageDate;
                    }
                    else {
                        if (_timer_ != item.messageDate) {
                            htm += "<p class='text-center mb-0 font-11'>" + item.messageDate + "</p>";
                            _timer_ = item.messageDate;
                        }
                    }
                    if (item.chaterId == item.tutorId) {
                        htm += "<div class='speech-bubble speech-left bg-highlight'>"
                        htm += item.messages
                        htm += "</div>"
                        htm += "<div class='clearfix'></div>"

                    } else {
                        htm += "<div class='speech-bubble speech-right color-black'>"
                        htm += item.messages
                        htm += "</div>"
                        htm += "<div class='clearfix'></div>"
                    }


                });
                htm += "<p class='text-center mb-0 font-11'>&nbsp;</p>";
                $("#com_chat").append(htm);
                window.scrollTo(0, document.body.scrollHeight); 
            }
            //$("#aSendChat").removeClass('hidden');
            //$("#chat_progress").addClass('hidden');
        }
    } catch (error) {
        //$("#menu_option_no_network_1").showMenu();
        //$("#aSendChat").removeClass('hidden');
        //$("#chat_progress").addClass('hidden');
    }
}

var getMyParChats = function () {
    $("#aSendChat").addClass('hidden');
    $("#chat_progress").removeClass('hidden');
    try {

        const options = {
            method: 'GET',
            redirect: 'follow',
             
        };
        var id = localStorage.getItem("userid");

        var _query = location.search.split('=')[1];
         

        fetch(uri_tutors + "/getparchat?ParentId=" + _query + "&myid=" + id, options)
            .then(response => {
                
                if (!response.ok) {
                    console.log(response.statusText);
                    $("#menu_option_no_network_2").showMenu();
                    $("#aSendChat").removeClass('hidden');
                    $("#chat_progress").addClass('hidden');
                }
                return response.json();
            })
             
            .then(result => {
                if (result == 0) {
                    $("#aSendChat").removeClass('hidden');
                    $("#chat_progress").addClass('hidden');
                }
                else {

                    location.href = "/chat/communication?ChatHeadId=" + result;

                }
            }) 
            .catch(error => {
                console.log("314: " + error);
                $("#menu_option_no_network_2").showMenu();
                $("#aSendChat").removeClass('hidden');
                $("#chat_progress").addClass('hidden');
            });
         
    }
    catch (error) {
        console.log("34: "+error);
        $("#menu_option_no_network_2").showMenu();
        $("#aSendChat").removeClass('hidden');
        $("#chat_progress").addClass('hidden');
    }
}


if ($("#ChatCommHidn").length) {
    if (location.search.includes("parid")) {
        
        getMyParChats();
    } else {
        getMyChats();
    }
}
