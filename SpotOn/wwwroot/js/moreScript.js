var uri = 'http://medicall-002-site5.ctempurl.com/api/UserSpotOns';
var specialuri = 'http://medicall-002-site5.ctempurl.com/api/Special';
//let todos = [];

function getPages(page) {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(uri + "/specialpages?special="+page, requestOptions)
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
 

function getSpecialItems(val) {
    
    fetch(uri + "/GetSpecialDoctors?special=" + val + "&page=0&pageSize=10")
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));

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