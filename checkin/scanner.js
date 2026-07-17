function onScanSuccess(decodedText){


    document.getElementById("result").innerHTML =

    `
    ✅ Ticket Found
    <br><br>
    Ticket ID:
    <br>
    ${decodedText}
    `;


}



function onScanFailure(error){

    // ignore scan errors

}



let scanner =
new Html5QrcodeScanner(

    "reader",

    {

        fps:10,

        qrbox:250

    }

);



scanner.render(

    onScanSuccess,

    onScanFailure

);