import { db } from "../firebase.js";

import {
    doc,
    getDoc,
    updateDoc,
    Timestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";


const result = document.getElementById("result");


async function onScanSuccess(decodedText, decodedResult){

    // Stop scanner after successful scan
    scanner.clear();


    const ticketId = decodedText;


    result.innerHTML = `
        🔍 Checking ticket...
    `;


    try {


        const guestRef = doc(db, "guests", ticketId);

        const guestSnap = await getDoc(guestRef);



        if(!guestSnap.exists()){


            result.innerHTML = `
                ❌ Invalid Ticket
                <br><br>
                This ticket does not exist.
            `;


            return;

        }



        const guest = guestSnap.data();



        if(guest.checkedIn === true){


            let time = guest.checkInTime
            ? guest.checkInTime.toDate().toLocaleString()
            : "Unknown";


            result.innerHTML = `

                🔴 Already Checked In

                <br><br>

                <strong>${guest.name}</strong>

                <br><br>

                Phone:
                ${guest.phone}

                <br><br>

                Time:
                ${time}

            `;


            return;

        }



        result.innerHTML = `

            ✅ Guest Found

            <br><br>

            <strong>${guest.name}</strong>

            <br><br>

            Phone:
            ${guest.phone}

            <br><br>

            🟢 Not Checked In

            <br><br>

            <button id="checkBtn">

            Check In

            </button>

        `;



        document
        .getElementById("checkBtn")
        .addEventListener("click", async ()=>{


            await updateDoc(guestRef,{

                checkedIn:true,

                checkInTime:Timestamp.now()

            });



            result.innerHTML = `

                ✅ Check In Successful

                <br><br>

                ${guest.name}

            `;


        });



    }

    catch(error){


        console.error(error);


        result.innerHTML = `

        ❌ Error connecting to database

        `;


    }


}



function onScanFailure(error){

    // Ignore scan errors

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
