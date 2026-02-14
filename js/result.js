// Capitalize each word properly
function capitalizeWords(name) {
    if (!name) return "";
    return name
        .trim()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

// Numerology value for name
function nameValue(name) {
    return name
        .toUpperCase()
        .replace(/[^A-Z]/g, "")
        .split("")
        .reduce((sum, char) => sum + (char.charCodeAt(0) - 64), 0);
}



// FINAL LOVE CALCULATION METHOD (Hybrid)
function calculateLovePercent(name1, name2) {

    // Normalize names
    let n1 = name1.toLowerCase().replace(/\s/g, "");
    let n2 = name2.toLowerCase().replace(/\s/g, "");

    // 🔁 Sort names so order never matters
    [n1, n2] = [n1, n2].sort();

    // 1️⃣ Length Compatibility (max 30)
    const lengthScore = 30 - Math.abs(n1.length - n2.length);

    // 2️⃣ Common Unique Letters (max 40)
    const set1 = new Set(n1);
    const set2 = new Set(n2);

    let commonCount = 0;
    set1.forEach(char => {
        if (set2.has(char)) commonCount++;
    });

    const commonScore = Math.min(40, commonCount * 4);

    // 3️⃣ Vowel Balance (max 20)
    const vowels = ["a", "e", "i", "o", "u"];
    const v1 = [...n1].filter(c => vowels.includes(c)).length;
    const v2 = [...n2].filter(c => vowels.includes(c)).length;
    const vowelScore = 20 - Math.abs(v1 - v2) * 2;

    // 4️⃣ Destiny Boost (order-safe)
    const destinyBoost =
        (nameValue(n1) + nameValue(n2)) % 35;

    // Final score
    let percent = lengthScore + commonScore + vowelScore + destinyBoost;

    // Clamp between 40–99
    percent = Math.max(40, Math.min(99, percent));

    return percent;
}




// Get data from localStorage
const yourName = capitalizeWords(localStorage.getItem("yourName"));
const partnerName = capitalizeWords(localStorage.getItem("partnerName"));

// Calculate dynamically (NOT random)
const lovePercent = calculateLovePercent(yourName, partnerName);


// Save percentage for sharing
localStorage.setItem("lovePercent", lovePercent);


const resultCard = document.getElementById("resultCard");

let emoji = "";
let title = "";
let message = "";

// Result logic
if (lovePercent >= 90) {
    emoji = "💍👩‍❤️‍👨✨";
    title = "Soulmates!";
    message = "Your hearts are deeply aligned. Trust, care, and understanding make this bond truly special 🌟";
} 
else if (lovePercent >= 75) {
    emoji = "😍💖🌈";
    title = "True Love!";
    message = "A beautiful emotional connection filled with warmth, affection, and shared happiness 😍";
} 
else if (lovePercent >= 60) {
    emoji = "😊💕🌸";
    title = "Sweet Bond!";
    message = "A meaningful connection that grows stronger with time, honesty, and mutual respect 🌷";
} 
else if (lovePercent >= 40) {
    emoji = "🙂💗🌱";
    title = "Growing Love!";
    message = "Love takes patience. With effort and care, something beautiful can bloom 🌞";
} 
else {
    emoji = "😅💞✨";
    title = "Cute Connection!";
    message = "Sometimes love begins as friendship. Enjoy the journey and let things flow naturally 😉";
}

// Inject result into UI
resultCard.innerHTML = `
    <h2>${emoji}</h2>
    <h3>${title}</h3>

    <div class="name-stack">
        <span class="name">${yourName}</span>
        <span class="heart">❤️</span>
        <span class="name">${partnerName}</span>
    </div>

    <h1>${lovePercent}%</h1>
    <p>${message}</p>
`;

// Try again (DO NOT remove login/session data)
function again() {
    localStorage.removeItem("yourName");
    localStorage.removeItem("partnerName");
    localStorage.removeItem("lovePercent");

    window.location.href = "lovecalculator.html";
}

// Share result (global-friendly)
function shareResult() {
    const text = `💖 Love Result 💖
${yourName} ❤️ ${partnerName}
Compatibility: ${lovePercent}%

Try it yourself on Spread Love 💕`;

    if (navigator.share) {
        navigator.share({ text });
    } else {
        navigator.clipboard.writeText(text);
        alert("Result copied! Share it with love 💕");
    }
}
