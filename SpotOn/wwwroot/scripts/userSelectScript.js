 
window.onload = function () {
    
    

    $("#checkP").click(function () {
        $("#checkP").prop("checked", true);
        $("#checkArt").prop("checked", false);
        //$("#checkChef").prop("checked", false);
        //$("#checkHealth").prop("checked", false);
        //$("#checkProduct").prop("checked", false);
        //$("#checkTutor").prop("checked", false);
        //$("#checkTaxi").prop("checked", false);
        $("#menu-trial").showMenu();

        $("#btnAndroid").addClass('hidden');
        $("#btnIOS").addClass('hidden');

        $("#btnAndroidUser").removeClass('hidden');
        $("#btnIOSUser").removeClass('hidden');
    });

    $("#checkArt").click(function () {
        $("#checkArt").prop("checked", true);
        $("#checkP").prop("checked", false);
        //$("#checkChef").prop("checked", false);
        //$("#checkHealth").prop("checked", false);
        //$("#checkProduct").prop("checked", false);
        //$("#checkTutor").prop("checked", false);
        //$("#checkTaxi").prop("checked", false);
        $("#menu-trial").showMenu();

        $("#artAndroid").addClass('hidden');
        $("#artIOS").addClass('hidden');

        $("#artAndroidUser").removeClass('hidden');
        $("#artIOSUser").removeClass('hidden');
    });

    var CheckChangeChef = () => {
        $("#checkChef").prop("checked", true);
        $("#checkArt").prop("checked", false);
        $("#checkP").prop("checked", false);
        $("#checkHealth").prop("checked", false);
        $("#checkProduct").prop("checked", false);
        $("#checkTutor").prop("checked", false);
        $("#checkTaxi").prop("checked", false);
        $("#menu-trial").showMenu();

        $("#chefAndroid").addClass('hidden');
        $("#chefIOS").addClass('hidden');

        $("#chefAndroidUser").removeClass('hidden');
        $("#chefIOSUser").removeClass('hidden');
    }

    var CheckChangeHealth = () => {
        $("#checkHealth").prop("checked", true);
        $("#checkArt").prop("checked", false);
        $("#checkP").prop("checked", false);
        $("#checkChef").prop("checked", false);
        $("#checkProduct").prop("checked", false);
        $("#checkTutor").prop("checked", false);
        $("#checkTaxi").prop("checked", false);
        $("#menu-trial").showMenu();

        $("#healthAndroid").addClass('hidden');
        $("#healthIOS").addClass('hidden');

        $("#healthAndroidUser").removeClass('hidden');
        $("#healthIOSUser").removeClass('hidden');
    }

    var CheckChangeProduct = () => {
        $("#checkProduct").prop("checked", true);
        $("#checkHealth").prop("checked", false);
        $("#checkArt").prop("checked", false);
        $("#checkP").prop("checked", false);
        $("#checkChef").prop("checked", false);
        $("#checkTutor").prop("checked", false);
        $("#checkTaxi").prop("checked", false);
        $("#menu-trial").showMenu();

        $("#productAndroid").addClass('hidden');
        $("#productIOS").addClass('hidden');

        $("#productAndroidUser").removeClass('hidden');
        $("#productIOSUser").removeClass('hidden');
    }

    var CheckChangeTutor = () => {
        $("#checkTutor").prop("checked", true);
        $("#checkProduct").prop("checked", false);
        $("#checkHealth").prop("checked", false);
        $("#checkArt").prop("checked", false);
        $("#checkP").prop("checked", false);
        $("#checkChef").prop("checked", false);
        $("#checkTaxi").prop("checked", false);
        $("#menu-trial").showMenu();

        $("#tutorAndroid").addClass('hidden');
        $("#tutorIOS").addClass('hidden');

        $("#tutorAndroidUser").removeClass('hidden');
        $("#tutorIOSUser").removeClass('hidden');
    }

    var CheckChangeTaxi = () => {
        $("#checkTaxi").prop("checked", true);
        $("#checkTutor").prop("checked", false);
        $("#checkProduct").prop("checked", false);
        $("#checkHealth").prop("checked", false);
        $("#checkArt").prop("checked", false);
        $("#checkP").prop("checked", false);
        $("#checkChef").prop("checked", false);
        $("#menu-trial").showMenu();

        $("#taxiAndroid").addClass('hidden');
        $("#taxiIOS").addClass('hidden');

        $("#taxiAndroidUser").removeClass('hidden');
        $("#taxiIOSUser").removeClass('hidden');
    }

}

var SetRegistration = (option) => {
    if (option == 'user') {
        $("#checkP").prop("checked", false);
        $("#btnAndroid").removeClass('hidden');
        $("#btnIOS").removeClass('hidden');

        $("#btnAndroidUser").addClass('hidden');
        $("#btnIOSUser").addClass('hidden');

        localStorage.setItem("designation", option);
        location.href = '/signup';
    } else {

        if (option == 'artisan') {
            $("#checkArt").prop("checked", false);

            $("#artAndroid").removeClass('hidden');
            $("#artIOS").removeClass('hidden');

            $("#artAndroidUser").addClass('hidden');
            $("#artIOSUser").addClass('hidden');

            localStorage.setItem("designation", option);
            $("#failed-task").toast('show');
            location.href = '/signup';
        } else {

            if (option == 'chef') {
                $("#checkChef").prop("checked", false);

                $("#chefAndroid").removeClass('hidden');
                $("#chefIOS").removeClass('hidden');

                $("#chefAndroidUser").addClass('hidden');
                $("#chefIOSUser").addClass('hidden');

                localStorage.setItem("designation", option);
                $("#failed-task").toast('show');
                location.href = '/signup';
            } else {

                if (option == 'health') {
                    $("#checkHealth").prop("checked", false);

                    $("#healthAndroid").removeClass('hidden');
                    $("#healthIOS").removeClass('hidden');

                    $("#healthAndroidUser").addClass('hidden');
                    $("#healthIOSUser").addClass('hidden');

                    localStorage.setItem("designation", option);
                    $("#failed-task").toast('show');
                    location.href = '/signup';
                } else {

                    if (option == 'product') {
                        $("#checkProduct").prop("checked", false);

                        $("#productAndroid").removeClass('hidden');
                        $("#productIOS").removeClass('hidden');

                        $("#productAndroidUser").addClass('hidden');
                        $("#productIOSUser").addClass('hidden');

                        localStorage.setItem("designation", option);
                        $("#failed-task").toast('show');
                        location.href = '/signup';
                    } else {

                        if (option == 'tutor') {
                            $("#checkTutor").prop("checked", false);

                            $("#tutorAndroid").removeClass('hidden');
                            $("#tutorIOS").removeClass('hidden');

                            $("#tutorAndroidUser").addClass('hidden');
                            $("#tutorIOSUser").addClass('hidden');

                            localStorage.setItem("designation", option);
                            $("#failed-task").toast('show');
                            location.href = '/signup';
                        } else {

                            if (option == 'taxi') {
                                $("#checkTaxi").prop("checked", false);

                                $("#taxiAndroid").removeClass('hidden');
                                $("#taxiIOS").removeClass('hidden');

                                $("#taxiAndroidUser").addClass('hidden');
                                $("#taxiIOSUser").addClass('hidden');

                                localStorage.setItem("designation", option);
                                $("#failed-task").toast('show');
                                location.href = '/signup';
                            }
                        }
                    }
                }
            }
        }
    }

}