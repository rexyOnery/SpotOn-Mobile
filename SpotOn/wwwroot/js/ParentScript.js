var uri_tutors = 'http://medicall-002-site5.ctempurl.com/api/TutorsSpotOn';
if (localStorage.getItem("userid") == null)
    location.href = "/login";

if (!$("#ChatTutCommHidn")) {
    document.getElementById('bg_img').style.backgroundImage = "url(/images/menu2-bg.jpg)";
}
var getTutorDetailDashBoard = async () => {
     
    $("#procreate").removeClass('hidden');
    try {

        const options = {
            method: 'GET',
            redirect: 'follow'
        };
        var id =  location.search.split('=')[1];
        console.log(id);
        const res = await fetch(uri_tutors + "/gettutordashboard?myid=" + id, options);
        if (!res.ok) {
            $("#dash_description").html("Network Error! <a href='javascript: getTutorDetailDashBoard();'>Reload Tutor profile</a>");
            $("#btnMoreTutorSubjects").removeClass('hidden');
            $("#procreate").addClass('hidden');
        }
        const data = await res.json();
        console.log(data);
        if (data.length == 0) {
            $("#dash_description").html("Something wrong! <a href='javascript: getTutorDetailDashBoard();'>Reload TUtor profile</a>");
            $("#btnMoreTutorSubjects").removeClass('hidden');
            $("#procreate").addClass('hidden');
        }
        else {

            data.forEach(item => {

                document.getElementById('bg_img').style.backgroundImage = "url(http://medicall-002-site5.ctempurl.com/uploads/" + item.photo+")";
                 
                
                $("#dash_description").html(item.description);
                $("#dash_location").html(item.locationName);
                $("#f_name").html(item.firstName);
                $("#l_name").html(item.lastName);
                $("#class_name").html(item.classCategory);
            });
            $("#procreate").addClass('hidden');
            $("#pro_subs").removeClass('hidden');
            getParentTutorSubjects(id);
        }
    } catch (error) {
        $("#dash_description").html("Network Error! <a href='javascript: getTutorDetailDashBoard();'>Reload my dashboard profile</a>");
        $("#btnMoreTutorSubjects").removeClass('hidden');
        $("#procreate").addClass('hidden');
    }
}

var getParentTutorSubjects = async (id) => {
    $("#pro_subs").removeClass('hidden');
    try {

        const options = {
            method: 'GET',
            redirect: 'follow'
        }; 

        const res = await fetch(uri_tutors + "/getparenttutormysubjects?myid=" + id, options);
        if (!res.ok) {

            $("#pro_subs").addClass('hidden');
            $("#tutor_subjects_list_error").removeClass('hidden');
        }
        const data = await res.json();
        console.log(data);
        if (data.length == 0) {
            $("#tutor_subjects_list_error").html("Network Error! <a href='javascript: getTutorSubjects("+ id +");'>Reload Tutor subjects</a>");
            $("#pro_subs").addClass('hidden');
        }
        else {
            var htm = "";
            $("#tutor_subjects_list").html(htm);
            data.forEach(item => {

                htm += " <a href='/chat/tutorcommunication?tutorid=" + item.id + "' class='border border-green-dark rounded-s shadow-xs'>"
                htm += "     <i class='fa font-20 fa-book-open color-blue-dark'></i>"
                htm += "     <span>" + item.subjects + "</span>"
                htm += "     <strong>" + item.className + "</strong>"
                htm += "     <div style='flex-direction:row; flex:1; float:right'>"
                htm += "         <u id='u-" + item.id + "' class='color-yellow-dark mt-4 mr-3' style='font-size:13px'>CHAT</u>"
                htm += "         <i id='i-" + item.id + "' class='fa fa-comment-dots fa-2x mr-3 color-green-dark'></i>"
                htm += "         <i id='prg-" + item.id + "' class='spinner-border color-green-dark mt-3 hidden'></i>"
                htm += "     </div>"
                htm += " </a>"
                 
            });
            $("#tutor_subjects_list").html(htm);
            $("#tutor_subjects_list").removeClass('hidden');
            $("#pro_subs").addClass('hidden');
            ///getChatParents();
        }
    } catch (error) {

        $("#tutor_subjects_list_error").html("Network Error! <a href='javascript: getTutorSubjects(" + id +");'>Reload Tutor Subjects</a>");
        $("#pro_subs").addClass('hidden');
    }
}



var getChatParents = async () => {
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


var _chat_head_id = 0;
function sendChat() {
    if ($("#txtChat").val() == "") {
        $("#warning_text").html("Please enter the message to send! The chat message cannot be empty.");
        $("#warning_title").html("Chat Message")
        $("#menu_warning").showMenu();
        return false;
    }
    
    var chatPost = {
        ChatHeadId: _chat_head_id,
        TutorId: _chat_head_id,
        ParentId: localStorage.getItem("userid"),
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

            var today = new Date();
            var ampm = today.getHours >= 12 ? "AM" : "PM";
            var time = today.getHours() + ":" + today.getMinutes() + ":" + ampm;
            htm += "<em class='speech-read mb-4'>Posted - " + time + "</em>"

            htm += "<div class='speech-bubble speech-left bg-highlight'>"
            htm += $("#txtChat").val()
            htm += "</div>"
            htm += "<div class='clearfix'></div>"

           

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

function getId() {
    getChatHeadOrSetId();
}

var getChatHeadOrSetId = async () => {
    $("#aSendChat").addClass('hidden');
    $("#chat_progress").removeClass('hidden');
    try {

        const options = {
            method: 'GET',
            redirect: 'follow'
        };
        var id = localStorage.getItem("userid");

        var _tutorId = location.search.split('=')[1];

        const res = await fetch(uri_tutors + "/getsetchathead?tutorid=" + _tutorId + "&parentid=" + id, options);
        if (!res.ok) {
            $("#menu_option_no_network_1").showMenu();
            $("#aSendChat").removeClass('hidden');
            $("#chat_progress").addClass('hidden');
        }
        const data = await res.json();
        console.log(data);
        if (data == 0) {
            $("#aSendChat").removeClass('hidden');
            $("#chat_progress").addClass('hidden');
        }
        else {

            _chat_head_id = data;
            getMyChats()
        }
    } catch (error) {
        $("#menu_option_no_network_1").showMenu();
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
         
        const res = await fetch(uri_tutors + "/getparentchat?ChatHeadId=" + _chat_head_id + "&myid=" + id, options);
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
                    if (item.chaterId != item.tutorId) {
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

        const res = await fetch(uri_tutors + "/getrefreshedparentchat?ChatHeadId=" + _chat_head_id + "&myid=" + id, options);
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
                    if (item.chaterId != item.tutorId) {
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