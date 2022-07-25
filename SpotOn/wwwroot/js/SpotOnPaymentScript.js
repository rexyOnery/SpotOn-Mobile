
function payWithMonnify() {
    var email = "sylvester.ameh@gmail.com";// document.getElementById('email').value;
    var firstname = "Sylvester";// document.getElementById('firstname').value;
    var lastname = "Ameh";//document.getElementById('lastname').value;
    MonnifySDK.initialize({
        amount: "5000",
        currency: "NGN",
        reference: '' + Math.floor((Math.random() * 1000000000) + 1),
        customerName: firstname + " " + lastname,
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
                updatePayment();
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
 