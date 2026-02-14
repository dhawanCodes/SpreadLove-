function calculateLove() {
    const yourNameInput = document.getElementById("yourName");
    const partnerNameInput = document.getElementById("partnerName");
    const resultDiv = document.getElementById("result");

    const yourName = yourNameInput.value.trim();
    const partnerName = partnerNameInput.value.trim();

    const namePattern = /^[a-zA-Z\s]+$/;

    if (!yourName || !partnerName) {
        resultDiv.textContent = "Please enter both names 💕";
        return;
    }

    if (!namePattern.test(yourName) || !namePattern.test(partnerName)) {
        resultDiv.textContent = "Names should contain only letters 💌";
        return;
    }

    const lovePercent = Math.floor(Math.random() * 61) + 40;

    localStorage.setItem("yourName", yourName);
    localStorage.setItem("partnerName", partnerName);
    localStorage.setItem("lovePercent", lovePercent);

    window.location.href = "result.html";
}
