
//var paymentForm = document.getElementById('paymentForm');
//paymentForm.addEventListener('submit', payWithPaystack, false);
function payWithPaystack() {
    var email = localStorage.getItem('user_email'); 
    var firstname = 'sly'
    var lastname = 'ameh'
    var price = 5000;

    var handler = PaystackPop.setup({
        key: 'pk_test_15272b5ffd2c0c5fc2f84631ff4ec1bd8c9e30ce', // Replace with your public key
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
            updatePayment();
           // $("#menu-success-2").showMenu();
            //  window.location = "verify.php?reference=" + response.reference;
        }
    });
    handler.openIframe();
}

function payWithMonnify() {

    payWithPaystack();




    //var email = "sylvester.ameh@gmail.com";// document.getElementById('email').value;
    //var firstname = "Sylvester";// document.getElementById('firstname').value;
    //var lastname = "Ameh";//document.getElementById('lastname').value;
    //MonnifySDK.initialize({
    //    amount: "5000",
    //    currency: "NGN",
    //    reference: '' + Math.floor((Math.random() * 1000000000) + 1),
    //    customerName: firstname + " " + lastname,
    //    customerEmail: email,
    //    apiKey: "MK_TEST_T37JHPDMRU",
    //    contractCode: "9888465873",
    //    paymentDescription: "Test Pay",
    //    isTestMode: true,
    //    metadata: {
    //        "name": "Sylvester",
    //        "age": 40
    //    },
    //    paymentMethods: ["CARD", "ACCOUNT_TRANSFER"],

    //    onComplete: function (response) {
    //        //Implement what happens when transaction is completed.
    //        console.log(response);
    //        var _stringy = response;

    //        if (_stringy.status == "SUCCESS") {
    //            //$("#menu-success-payment").showMenu();
    //            updatePayment();
    //            //location.href = '/tutors';
    //        }
    //    },
    //    onClose: function (data) {
    //        //Implement what should happen when the modal is closed here
    //        console.log(data);
    //        var _string = data;

    //        if (_string.status == "FAILED") {
    //            $("#menu-cancel-payment").showMenu();
    //        } else {
    //            if (_string.paymentStatus == "USER_CANCELLED") {
    //                $("#menu-cancel-payment").showMenu();
    //            }
    //        }
    //    }
    //});
}

function updatePayment() {

    var id = localStorage.getItem("userid");

    var requestOptions = {
        method: 'PUT',
        redirect: 'follow'
    };

    fetch(server_url + "/artisan/" + id, requestOptions)
        .then(response => {
            if (!response.ok) {
                $("#menu-warning-1").showMenu();
            }
            return response.json();
        })
        .then(result => location.href = "/login")
        .catch(error => $("#menu-warning-1").showMenu());


}
