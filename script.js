import { db } from "./firebase.js";

import {
    doc,
    setDoc
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

    if (name === "" || phone === "") {
        alert("Please fill all fields.");
        return;
    }

    // Generate unique ticket ID
    currentTicketId =
        "GRAD-" +
        Date.now() +
        "-" +
        Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase();

    try {

        // Save guest using the ticket ID as the Firestore document ID
        await setDoc(doc(db, "guests", currentTicketId), {

            name: name,
            phone: phone,
            checkedIn: false,
            checkInTime: null,
            createdAt: new Date()

        });

        console.log("Guest saved successfully.");

    } catch (error) {

        console.error(error);

        alert("Could not save registration.");

        return;

    }

    // Show ticket
    ticket.style.display = "block";

    // Show only the guest name
    guestName.innerHTML = `<strong>${name}</strong>`;

    // Clear previous QR
    qrContainer.innerHTML = "";

    // Generate QR
    new QRCode(qrContainer, {
        text: currentTicketId,
        width: 220,
        height: 220
    });

    // Scroll to ticket
    ticket.scrollIntoView({
        behavior: "smooth"
    });

});

downloadBtn.addEventListener("click", function () {

    html2canvas(ticket, {
        scale: 3,
        backgroundColor: "#ffffff"
    }).then(canvas => {

        const link = document.createElement("a");

        const name = document.getElementById("name")
            .value
            .trim()
            .replace(/\s+/g, "-")
            .toLowerCase();

        link.download = `${name}-graduation-pass.png`;

        link.href = canvas.toDataURL("image/png");

        link.click();

    });

});
