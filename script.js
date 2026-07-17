import { db } from "./firebase.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const form = document.getElementById("guestForm");
const ticket = document.getElementById("ticket");
const guestName = document.getElementById("guestName");
const qrContainer = document.getElementById("qrcode");
const downloadBtn = document.getElementById("downloadBtn");

let currentTicketId = "";

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if(name === "" || phone === ""){
        alert("Please fill all fields.");
        return;
    }

    currentTicketId =
        "GRAD-" +
        Date.now() +
        "-" +
        Math.random()
        .toString(36)
        .substring(2,8)
        .toUpperCase();

    try{

        await addDoc(collection(db,"guests"),{

            name:name,
            phone:phone,
            ticketId:currentTicketId,
            checkedIn:false,
            checkInTime:null,
            createdAt:new Date()

        });

        console.log("Guest saved.");

    }

    catch(error){

        console.error(error);

        alert("Could not save registration.");

        return;

    }

    ticket.style.display="block";

    guestName.innerHTML=`
        <strong>${name}</strong>
    `;

    qrContainer.innerHTML="";

    new QRCode(qrContainer,{
        text:currentTicketId,
        width:220,
        height:220
    });

    ticket.scrollIntoView({
        behavior:"smooth"
    });

});

downloadBtn.addEventListener("click",function(){

    html2canvas(ticket,{
        scale:3,
        backgroundColor:"#ffffff"
    })

    .then(canvas=>{

        const link=document.createElement("a");

        const name=document
        .getElementById("name")
        .value
        .trim()
        .replace(/\s+/g,"-")
        .toLowerCase();

        link.download=name+"-graduation-pass.png";

        link.href=canvas.toDataURL("image/png");

        link.click();

    });

});