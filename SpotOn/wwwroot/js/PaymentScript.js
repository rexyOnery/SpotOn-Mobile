var uri = 'http://medicall-002-site5.ctempurl.com/api/UserSpotOns';
var userType = "";
function getItemPacks() {
    var id = localStorage.getItem("userid");

    if (id == null)
        location.href = "/login";

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };  

    fetch(uri + "/getpack?id=" + id, requestOptions)
        .then(response => {
            if (!response.ok) {
                console.log('Network response was not ok');
                $("#menu-warning-2").showMenu();
            }
            return response.json();
        })
        .then(data => _displayItems(data))
        .catch(error => processLoadingError('Unable to get items.', error));

}

function processLoadingError(val) {
    $("#item-preloader").addClass("hidden");
    $("#menu-loading-error").showMenu();
}

function _displayItems(data) {

    console.log(data);

    data.forEach(item => {
        $("#email").val(item.emailAddress);
        $("#firstname").val(item.firstName);
        $("#lastname").val(item.lastName);
        userType = item.userType;
        if (item.userType == "user") {
            $("#tutor").addClass("hidden");
            $("#parent").removeClass("hidden");
            $("#item-preloader").addClass("hidden");
        }
        if (item.package == "Health") {
       
           // $("#healthpacks").html(item.price);
            $("#email").val(item.emailAddress);
            $("#firstname").val(item.firstName);
            $("#lastname").val(item.lastName);
            $("#healthprice").val(item.price);
            $("#healthpacks").html(item.price);
            //var paymentForm = document.getElementById('paymentForm');
            //paymentForm.addEventListener("submit", payHealthWithPaystack, false);

            
        }
        else if (item.package == "Artisans") {
           // $("#artisanpacks").html(item.price);
            $("#email").val(item.emailAddress);
            $("#firstname").val(item.firstName);
            $("#lastname").val(item.lastName);
            $("#artisanprice").val(item.price); 
            //var paymentArtisanForm = document.getElementById('paymentArtisanForm');
            //paymentArtisanForm.addEventListener("submit", payArtisanWithPaystack, false);

            

        } else if (item.package == "Chefs") {
           // $("#chefpacks").html(item.price);
            $("#email").val(item.emailAddress);
            $("#firstname").val(item.firstName);
            $("#lastname").val(item.lastName);
            $("#chefprice").val(item.price);  
            //var paymentChefForm = document.getElementById('paymentChefForm');
            //paymentChefForm.addEventListener("submit", payChefWithPaystack, false);

            

        } else if (item.package == "Products") {
            //$("#productpacks").html(item.price);
            $("#email").val(item.emailAddress);
            $("#firstname").val(item.firstName);
            $("#lastname").val(item.lastName);
            $("#productprice").val(item.price);   
            //var paymentProductForm = document.getElementProductById('paymenProducttForm');
            //paymentProductForm.addEventListener("submit", payProductWithPaystack, false);

            

        } else if (item.package == "Tutors") {
           // $("#tutorpacks").html(item.price);
            $("#email").val(item.emailAddress);
            $("#firstname").val(item.firstName);
            $("#lastname").val(item.lastName);
            $("#tutorprice").val(item.price);

            $("#tutor").removeClass("hidden");
            $("#parent").addClass("hidden");
            $("#item-preloader").addClass("hidden");
            //var paymentTutorForms = document.getElementById('paymentTutorFormBtn');
            //paymentTutorForms.addEventListener("submit", payTutorWithPaystack, false);

            
        }

    });
}

const _key_ = "pk_test_eda062a81ed9102f087935cbf3d78dbbe5297105";

function payArtisanWithPaystack() {
   // e.preventDefault();
    var email = document.getElementById('email').value;
    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    var price = document.getElementById('artisanprice').value;

    var handler = PaystackPop.setup({
        key: _key_, // Replace with your public key
        email: email,//document.getElementById("email-address").value,
        amount: price * 100,
        firstname: firstname,//document.getElementById("first-name").value,
        lastname: lastname,//document.getElementById("first-name").value,
        ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        // label: "Optional string that replaces customer email"
        onClose: function () {
            $("#menu-cancel-payment").showMenu();
        },
        callback: function (response) {
            $("#menu-success-2").showMenu();
            //  window.location = "verify.php?reference=" + response.reference;
        }
    });

    handler.openIframe();
}


function payHealthWithPaystack() {
    //e.preventDefault();
    var email = document.getElementById('email').value;
    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    var price = document.getElementById('healthprice').value;

    var handler = PaystackPop.setup({
        key: _key_, // Replace with your public key
        email: email,//document.getElementById("email-address").value,
        amount: price * 100,
        firstname: firstname,//document.getElementById("first-name").value,
        lastname: lastname,//document.getElementById("first-name").value,
        ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        // label: "Optional string that replaces customer email"
        onClose: function () {
           $("#menu-cancel-payment").showMenu();
        },
        callback: function (response) {
            updatePayment("health");
            
            //  window.location = "verify.php?reference=" + response.reference;
        }
    });

    handler.openIframe();
}

function payChefWithPaystack() {
    //e.preventDefault();
    var email = document.getElementById('email').value;
    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    var price = document.getElementById('chefprice').value;

    var handler = PaystackPop.setup({
        key: _key_, // Replace with your public key
        email: email,//document.getElementById("email-address").value,
        amount: price * 100,
        firstname: firstname,//document.getElementById("first-name").value,
        lastname: lastname,//document.getElementById("first-name").value,
        ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        // label: "Optional string that replaces customer email"
        onClose: function () {
           $("#menu-cancel-payment").showMenu();
        },
        callback: function (response) {
            $("#menu-success-2").showMenu();
            //  window.location = "verify.php?reference=" + response.reference;
        }
    });

    handler.openIframe();
}


function payProductWithPaystack() {
    //e.preventDefault();
    var email = document.getElementById('email').value;
    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    var price = document.getElementById('productprice').value;

    var handler = PaystackPop.setup({
        key: _key_, // Replace with your public key
        email: email,//document.getElementById("email-address").value,
        amount: price * 100,
        firstname: firstname,//document.getElementById("first-name").value,
        lastname: lastname,//document.getElementById("first-name").value,
        ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        // label: "Optional string that replaces customer email"
        onClose: function () {
           $("#menu-cancel-payment").showMenu();
        },
        callback: function (response) {
            $("#menu-success-2").showMenu();
            //  window.location = "verify.php?reference=" + response.reference;
        }
    });

    handler.openIframe();
}


function payTutorWithPaystack() {
    //e.preventDefault();
    var email = document.getElementById('email').value;
    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    var price = document.getElementById('tutorprice').value;

    var handler = PaystackPop.setup({
        key: _key_, // Replace with your public key
        email: email,//document.getElementById("email-address").value,
        amount: price * 100,
        firstname: firstname,//document.getElementById("first-name").value,
        lastname: lastname,//document.getElementById("first-name").value,
        ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        // label: "Optional string that replaces customer email"
        onClose: function () {
           $("#menu-cancel-payment").showMenu();
        },
        callback: function (response) {
            $("#menu-success-2").showMenu();
            //  window.location = "verify.php?reference=" + response.reference;
        }
    });

    handler.openIframe();
}

function payWithMonnify() {
    var email = "sylvester.ameh@gmail.com";// document.getElementById('email').value;
    var firstname = "Sylvester";// document.getElementById('firstname').value;
    var lastname = "Ameh";//document.getElementById('lastname').value;
    MonnifySDK.initialize({
        amount: "5000",
        currency: "NGN",
        reference: '' + Math.floor((Math.random() * 1000000000) + 1),
        customerName: firstname+" "+lastname,
        customerEmail: email,
        apiKey: "MK_TEST_T37JHPDMRU",
        contractCode: "9888465873",
        paymentDescription: "Test Pay",
        isTestMode: true,
        metadata: {
            "name": "Sylvester",
            "age": 40
        },
        paymentMethods: ["CARD", "ACCOUNT_TRANSFER"],
         
        onComplete: function (response) {
            //Implement what happens when transaction is completed.
            console.log(response);
            var _stringy = response;

            if (_stringy.status == "SUCCESS") {
                //$("#menu-success-payment").showMenu();
                updatePayment("tutor");
                //location.href = '/tutors';
            }
        },
        onClose: function (data) {
            //Implement what should happen when the modal is closed here
            console.log(data);
            var _string = data;

            if (_string.status == "FAILED") {
                $("#menu-cancel-payment").showMenu();
            } else {
                if (_string.paymentStatus == "USER_CANCELLED") {
                    $("#menu-cancel-payment").showMenu();
                }
            }
        }
    });
}

function updatePayment(pack) {
    
    var id = localStorage.getItem("userid");

    var requestOptions = {
        method: 'PUT',
        redirect: 'follow'
    };

    fetch(uri +"/updatepayment?userid="+id+"&pack="+pack, requestOptions)
        .then(response => {
            if (!response.ok) {
                console.log('Network response was not ok');
                $("#menu-warning-1").showMenu();
            }
            return response.json();
        })
        .then(result => processDash()) 
        .catch(error => $("#menu-warning-1").showMenu());

    
}

function processDash() {
    if (userType == "tutor") {
        $("#menu-tutor-dash").showMenu()
    } else if (userType == "user") {
        $("#menu-tutor-index").showMenu()
    }
}

var fetchSponsorship =  function(id)  {
    try {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

         
        fetch(uri + "/checksponsorship?id=" + id, requestOptions)
            .then(response => {
                if (!response.ok) {
                    console.log('Network response was not ok');
                    $("#menu-warning-1").showMenu();
                } 
            })
            .then(response => console.log(response))
            .then(data => processResult(data))
         
    } catch (error) {
        console.log(error);
    }
}
 
function processResult(result) { 
    return result;
}