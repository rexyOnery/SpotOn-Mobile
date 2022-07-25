var uri = 'http://medicall-002-site5.ctempurl.com/api/UserSpotOns';
var specialuri = 'http://medicall-002-site5.ctempurl.com/api/Special';
//let todos = [];

function getPages(page) {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(uri + "/calllistpages?userid=" + page, requestOptions)
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