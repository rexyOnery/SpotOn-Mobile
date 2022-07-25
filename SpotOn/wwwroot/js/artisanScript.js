﻿


var getAllArtisans = () => {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(server_url + "/artisan/pages", requestOptions)
        .then(response => response.text())
        .then(result => runTutorPages(result))
        .catch(error => console.log('error', error));

}

var forwardPaging = false;
var backPaging = false;
var runTutorPages = (pages) => {
    var _ult = parseInt(pages) - 1;

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

        for (i = 0; i <= _ult; i++) {
            var num = parseInt(i + 1);
            if (i == 0) {
                localStorage.setItem("currentPage", i);
                paging += "<li id='page-" + i + "' class='page-item active'><a class='page-link rounded-xs color-black bg-highlight shadow-l border-0' href='javascript:artisanPage(" + i + ");'>" + num + "</a></li>";

            }
            else if (i == pages) {
                localStorage.setItem("lastitem", i);
                paging += "<li id='page-" + i + "' class='page-item hidden'><a class='page-link rounded-xs color-black bg-theme shadow-l border-0' href='javascript:artisanPage(" + i + ");'>" + num + "</a></li>";
            }
            else if (i <= 4) {
                paging += "<li id='page-" + i + "' class='page-item'><a class='page-link rounded-xs color-black bg-theme shadow-l border-0' href='javascript:artisanPage(" + i + ");'>" + num + "</a></li>";
            } else {
                forwardPaging = true;
                paging += "<li id='page-" + i + "' class='page-item hidden'><a class='page-link rounded-xs color-black bg-theme shadow-l border-0' href='javascript:artisanPage(" + i + ");'>" + num + "</a></li>";
            }
        }
        paging += "<li class='page-item'>"
        paging += "<a class='page-link rounded-xs color-black bg-transparent bg-theme shadow-l border-0' href='javascript:doArtisanNext();'><i class='fa fa-angle-right'></i></a>"
        paging += "</li>"
        $("#page-items").html(paging);
    }
}

var artisanPage = (id) => {

    var _prevPage = localStorage.getItem("currentPage");
    var _prev_Page = "#page-" + _prevPage;
    var _prev_Page_a = "#page-" + _prevPage + " a";

    var _curPage = "#page-" + id;
    var _curPage_a = "#page-" + id + " a";
    if (_prevPage != id) {
        $("#item-preloader").removeClass('hidden');

        fetch(server_url + "/artisan/pagedartisans/" + id + "/10")
            .then(response => response.json())
            .then(data => _displayArtisanItems(data))
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

var doPrevious = () => {
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

var doArtisanNext = () => {
    var allPages = parseInt(localStorage.getItem("allTimePages"));
    var currVisiblePage = parseInt(localStorage.getItem("currentVisiblePages"));
    var lastItem = parseInt(localStorage.getItem("lastitem"));

    console.log("all: " + allPages);
    //console.log("last: " + lastItem);
    console.log("Cur Vis: " + currVisiblePage);

    var hide = localStorage.getItem("hide");
    var show = localStorage.getItem("show");

    var hidePage = "#page-" + hide;
    var showPage = "#page-" + show;

    if (forwardPaging) {
        if (currVisiblePage <= allPages) {

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

var getArtisanItems = () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(server_url + "/artisan/pagedartisans/0/10", requestOptions)
        .then(response => {
            if (!response.ok) {
                console.log('Network response was not ok');
                displayError(1);
            }
            return response.json();
        })
        .then(data => _displayArtisanItems(data))
        .catch(error => displayError(2));
}

var displayError = (id) => {
    if (id == 2) {

        $('#menu_option_no_network').showMenu();
        $("#item-preloader").addClass("hidden");
    }
    else if (id == 1) {

        $('#menu_warning_wrong').showMenu();
        $("#item-preloader").addClass("hidden");
    }
}


var _displayArtisanItems = (data) => {

    if (data.length == 0) {
        var err = "";
        err += "<div' class='card card-style bg-yellow-dark alert' data-menu='menu-prescription-1' role='button'>"
        err += "            <div class='d-flex py-2'>"
        err += "                 <div>"
        err += "                    <i class='fa fa-exclamation-circle mr-3 scale-box fa-4x color-white'></i>"
        err += "                </div>"
        err += "                <div>"
        err += "                    <p class='color-highlight mb-n1 font-12 font-600'>Empty</p>"
        err += "                    <h1 class='mb-0'>No Artisan Found!</h1>"
        err += "                </div>"

        err += "           </div>"
        err += "       </div>"
        $("#docItems").html(err);
        $("#docItems").removeClass('hidden');
        $("#btnFilterArtisan").removeClass('hidden');
        $("#item-preloader").addClass("hidden");
    }
    else {
        var htm = "";
        //$("#docItems").html(htm);
        data.forEach(item => {
             
            htm += "<div class='d-flex'>"
            htm += "        <div class='mr-3'>"
            htm += "            <img width='120' height='180' class='fluid-img rounded-m shadow-xl' src='" + item.photo + "'>"
            htm += "        </div>"
            htm += "        <div>"
            htm += "            <p class='color-highlight font-600 mb-n1'>" + item.location + ".</p>"
            htm += "            <h2>" + item.name + "</h2>"
            htm += "            <p class='mt-2'>"
            htm += "                Profession:  " + item.category + ""
            htm += "            </p>"
            htm += "            <a href='/artisan/details?id=" + item.id + "' class='btn btn-sm rounded-s font-13 font-600 gradient-highlight'>View Detail</a>"
            htm += "        </div>"
            htm += "    </div> "
            htm += "    <div class='divider mt-4'></div>"
        });
        $("#docItems").html(htm);
        $("#docItems").removeClass('hidden');
        $("#btnFilterArtisan").removeClass('hidden');
        $("#item-preloader").addClass("hidden");
    }
    $("#item-preloader").addClass('hidden');
}

var getArtisansByType = (id) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    $("#docItems").html("");
    $("#item-preloader").removeClass("hidden");
    fetch(server_url + "/artisan/paged-artisans-typeid/" + id + "/0/10", requestOptions)
        .then(response => {
            if (!response.ok) {
                console.log('Network response was not ok');
                displayError(1);
            }
            return response.json();
        })
        .then(data => _displayArtisanItems(data))
        .catch(error => displayError(2));
}


var filterArtisan = () => {



    var locationid = document.getElementById('lga').value.trim();
    var location = document.getElementById('location').value.trim();

    if (locationid == "") {
        $("#menu-title-error").html("Missing Location");
        $("#warningTextError").html("Missing Location. Please enter the location");
        $('#menu-warning-error').showMenu();
        return false;
    }
    if (location == "") {
        $("#menu-title-error").html("Missing Local Area");
        $("#warningTextError").html("Missing Local Area. Please select the local area");
        $('#menu-warning-error').showMenu();
        return false;
    }

    if (_artisanFilter == 0) {

        var filter = {
            LocalAreaId: locationid,
            Location: location
        };

        $("#docItems").addClass('hidden');
        $("#item-preloader").removeClass('hidden');
        $("#btnFilterArtisan").addClass('hidden');
        try {

            const options = {
                method: 'POST',
                body: JSON.stringify(filter),
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow'
            }

            fetch(server_url + "/artisan/filter", options)
                .then(response => {
                    if (!response.ok) {
                        $("#failedTitle").html("Error!");
                        $("#failedText").html("This could be as a result of<br /> poor network connection.<br />Please, try again");
                        $("#menu-code-fail").showMenu();
                        $("#item-preloader").addClass('hidden');
                        $("#btnFilterArtisan").removeClass('hidden');
                    }
                    return response.json();
                })
                .then(data => _displayArtisanItems(data))
                .catch(error => displayError(2));

        } catch (error) {
            $("#failedTitle").html("Error!");
            $("#failedText").html("Something went wrong.<br />Please, try again");
            $("#menu-code-fail").showMenu();
            $("#item-preloader").addClass('hidden');
            $("#btnAdvert").removeClass('hidden');
        }
    }
    else {
        var filter = {
            LocalAreaId: locationid,
            Location: location,
            ArtisanTypeId: _artisanFilter
        };

        $("#docItems").addClass('hidden');
        $("#item-preloader").removeClass('hidden');
        $("#btnFilterArtisan").addClass('hidden');
        try {

            const options = {
                method: 'POST',
                body: JSON.stringify(filter),
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow'
            }

            fetch(server_url + "/artisan/filter-by-type", options)
                .then(response => {
                    if (!response.ok) {
                        $("#failedTitle").html("Error!");
                        $("#failedText").html("This could be as a result of<br /> poor network connection.<br />Please, try again");
                        $("#menu-code-fail").showMenu();
                        $("#item-preloader").addClass('hidden');
                        $("#btnFilterArtisan").removeClass('hidden');
                    }
                    return response.json();
                })
                .then(data => _displayArtisanItems(data))
                .catch(error => displayError(2));

        } catch (error) {
            $("#failedTitle").html("Error!");
            $("#failedText").html("Something went wrong.<br />Please, try again");
            $("#menu-code-fail").showMenu();
            $("#item-preloader").addClass('hidden');
            $("#btnAdvert").removeClass('hidden');
        }
    }
}



var getArtisanDetail = () => {
    $("#procreate").removeClass('hidden');
    const options = {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
        redirect: 'follow'
    };
    var id = location.search.split('=')[1];
     
    fetch(server_url + "/artisan/" + id, options)
        .then(response => {
            if (!response.ok) {
                $("#dash_description").html("Network Error! <a href='javascript: getArtisanDetail();'>Reload Artisan profile</a>");
                $("#btnMoreTutorSubjects").removeClass('hidden');
                $("#procreate").addClass('hidden');
            }
            return response.json();
        })
        .then(data => {
            
            if (data.length == 0) {
                $("#dash_description").html("Something wrong! <a href='javascript: getArtisanDetail();'>Reload Artisan profile</a>");
                $("#btnMoreTutorSubjects").removeClass('hidden');
                $("#procreate").addClass('hidden');
            } else {
                data.forEach(item => {
                    document.getElementById('bg_img').style = "background-image: url(" + item.photo + ")";
                    $("#f_name").html(item.name.split(" ")[0]);
                    $("#l_name").html(item.name.split(" ")[1]);
                    $("#dash_location").html(item.location);
                    $("#dash_description").html(item.name + " is a/an " + item.category + " with SpotOn Artisan");
                    $("#tel").html("<a href='tel:" + item.phone +"' class='btn btn-l font-14 shadow-l btn-full rounded-s font-600 bg-green-dark text-start mb-2'><span class='ms-n2'>Direct Line:</span><span class='float-end me-n1'>"+item.phone+"</span></a>")
                   // $("#menu-call").showMenu();
                    $("#procreate").addClass('hidden');
                    $("#call_button").removeClass('hidden');
                }) 
                
            }
        })
        .catch(error => {
            $("#dash_description").html("Network Error! <a href='javascript: getArtisanDetail();'>Reload my profile</a>");
            $("#btnMoreTutorSubjects").removeClass('hidden');
            $("#procreate").addClass('hidden');
        });

}

var getArtisanDashBoard = () => {

    const options = {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
        redirect: 'follow'
    };
    var id = localStorage.getItem("userid");

    fetch(server_url + "/artisan/" + id, options)
        .then(response => {
            if (!response.ok) {
                $("#dash_description").html("Network Error! <a href='javascript: getArtisanDetail();'>Reload Artisan profile</a>");
                $("#btnMoreTutorSubjects").removeClass('hidden');
                $("#procreate").addClass('hidden');
            }
            return response.json();
        })
        .then(data => {

            if (data.length == 0) {
                $("#dash_description").html("Something wrong! <a href='javascript: getArtisanDetail();'>Reload Artisan profile</a>");
                $("#btnMoreTutorSubjects").removeClass('hidden');
                $("#procreate").addClass('hidden');
            } else {
                data.forEach(item => {
                    document.getElementById('bg_img').style = "background-image: url(" + item.photo + ")";
                    $("#f_name").html(item.name.split(" ")[0]);
                    $("#l_name").html(item.name.split(" ")[1]);
                    $("#dash_location").html(item.location);
                    $("#dash_description").html(item.category + " with SpotOn Artisan");
                    $("#tel").html("<a href='tel:" + item.phone + "' class='btn btn-l font-14 shadow-l btn-full rounded-s font-600 bg-green-dark text-start mb-2'><span class='ms-n2'>Direct Line:</span><span class='float-end me-n1'>" + item.phone + "</span></a>")
                    // $("#menu-call").showMenu();
                    $("#procreate").addClass('hidden'); 
                })

            }
        })
        .catch(error => {
            $("#dash_description").html("Network Error! <a href='javascript: getArtisanDetail();'>Reload my profile</a>");
            $("#btnMoreTutorSubjects").removeClass('hidden');
            $("#procreate").addClass('hidden');
        });

}