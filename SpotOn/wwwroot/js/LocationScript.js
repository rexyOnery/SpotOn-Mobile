 
var getStates = () =>{
    $("#state_empty").addClass('hidden');
    var htm = "";
    $("#state").html(htm);
    htm += "<option value='' disabled selected><div id='procreate' class='spinner-border color-green-dark hidden' role='status'>"
    htm += "                <span class='sr-only'>Loading States...</span>"
    htm += "            </div></option>";
    $("#state").html(htm);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(server_url+"/userstate", requestOptions)
        .then(response => {
                if (!response.ok) {
                    reloadState();
                }
                return response.json();
            })
        .then(result => loadStates(result))
        .catch(error => reloadState());

}
var reloadState =()=> {
    var shtm = "";
    $("#state").html(shtm);
    shtm += "<option value='' disabled selected><div id='procreate' class='spinner-border color-green-dark hidden' role='status'>"
    shtm += "                <span class='sr-only'>States Loading Failed</span>"
    shtm += "            </div></option>";
    $("#state").html(shtm);

    var htm = "";
    $("#state_empty").html(htm);
    htm += "<a style='float:right' href='javascript:getStates()';>Reload States"
    htm += "</a>";
    $("#state_empty").html(htm);
    $("#state_empty").removeClass('hidden');
}
var loadStates = (result) =>  {

    var htm = "";
    $("#state").html(htm);
    htm += "<option value='' disabled selected>Select State</option>";
    //$("#docItems").html(htm);
    result.forEach(item => {
        htm += "<option value='" + item.id + "'>" + item.stateName + "</option>";
    });
    $("#state").html(htm);
}

var getLocalAreas =() =>  {
    $("#local_empty").addClass('hidden');
    var category = $("#state option:selected").text();
    var htm = "";
    $("#lga").html(htm);
    htm += "<option value='' disabled selected><div id='procreate' class='spinner-border color-green-dark hidden' role='status'>"
    htm += "                <span class='sr-only'>Loading "+category+" Local Areas...</span>"
    htm += "            </div></option>";
    $("#lga").html(htm);

    var id = $("#state option:selected").val();
    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(server_url + "/localarea/getbystate/" + id, requestOptions)
        .then(response => response.json())
        .then(result => loadLocalAreas(result))
        .catch(error => reloadLocal());

}
var reloadLocal = () => {
    var shtm = "";
    $("#lga").html(shtm);
    shtm += "<option value='' disabled selected><div class='spinner-border color-green-dark hidden' role='status'>"
    shtm += "                <span class='sr-only'>Local Areas Loading Failed</span>"
    shtm += "            </div></option>";
    $("#lga").html(shtm);

    var htm = "";
    $("#local_empty").html(htm);
    htm += "<a style='float:right' href='javascript:getLocalAreas()';>Reload Local Areas"
    htm += "</a>";
    $("#local_empty").html(htm);
    $("#local_empty").removeClass('hidden');
}
var loadLocalAreas = (data) => {
     
    var htm = "";
    $("#lga").html(htm);
    htm += "<option value='' disabled selected>Select Local Area</option>";
    //$("#docItems").html(htm);
    data.forEach(item => {
        htm += "<option value='" + item.id + "'>" + item.locationName + "</option>";
    });
    $("#lga").html(htm);
}

var getArtisanTypes = () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(server_url + "/artisantype", requestOptions)
        .then(response => {
            if (!response.ok) {
                //reloadState();
            }
            return response.json();
        })
        .then(result => {
            var htm = "";
            result.forEach(item => {

                var category = item.category.split(' ')[1] == null ? item.category : item.category.split(' ')[0] + "<br />" + item.category.split(' ')[1];

                htm += "<a href='javascript:setFocusTo(" + item.id + ");'>"
                htm += "    <div data-card-height='170' class='card rounded-m shadow-l bg-" + item.category + "'>"
                htm += "        <div class='card-bottom'>"
                htm += "            <h4 class='color-white font-15 mb-3 ml-3'>" + category + "</h4>"
                htm += "        </div>"
                htm += "        <div class='card-overlay bg-gradient'></div>"
                htm += "    </div>"
                htm += "</a> ";
            });
            $("#artisan_types").html(htm);
        })
        .catch(error => reloadState());

}

var setFocusTo = (result) => {
    alert(result);
}