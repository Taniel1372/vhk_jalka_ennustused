let q = 1;        // stage (A-D groups + knockouts)
let step = 1;     // 1 = first pick, 2 = second pick
let on = false;

// ===== TEAM DATA =====
const groups = [
  ["10R", "11R", "12R", "a"],
  ["10H", "11H", "12H", "b"],
  ["10M", "11M", "12M", "c"],
  ["10A/K/C", "11A/K/C", "12K/C", "d"]
];

// ===== MAIN =====
function pickWinner(team) {

  const g = groups[q - 1];

  // ================= FIRST PICK =================
  if (step === 1) {
    localStorage.setItem(g[3] + "1", g[team - 1]);

    document.getElementById("bt" + team).disabled = true;
    document.getElementById("bt" + team).style.background = "#70cbef";

    step = 2;
    return;
  }

  // ================= SECOND PICK =================
  const winner = g[team - 1];

  // GROUP STAGES A–D
  if (q <= 4) {

    localStorage.setItem(g[3] + "2", winner);

    q++;
    step = 1;

    if (q <= 4) {
      loadNextGroup();
    }

    if (q === 5) {
      startQuarterFinals();
    }

    return;
  }

  // ================= QUARTER FINALS =================
  if (q === 5) {
    localStorage.setItem("a14", winner);
    setupMatch(localStorage.getItem("c1"), localStorage.getItem("d2"));
    q++;
    step = 1;
    return;
  }

  if (q === 6) {
    localStorage.setItem("b14", winner);
    setupMatch(localStorage.getItem("a2"), localStorage.getItem("b1"));
    q++;
    step = 1;
    return;
  }

  if (q === 7) {
    localStorage.setItem("c14", winner);
    setupMatch(localStorage.getItem("c2"), localStorage.getItem("d1"));
    q++;
    step = 1;
    return;
  }

  if (q === 8) {
    localStorage.setItem("d14", winner);
    document.getElementById("group").innerText = "1/2";
    setupMatch(
      localStorage.getItem("a14"),
      localStorage.getItem("b14")
    );
    q++;
    step = 1;
    return;
  }

  // ================= SEMI FINAL =================
  if (q === 9) {
    localStorage.setItem("a12", winner);
    setupMatch(
      localStorage.getItem("c14"),
      localStorage.getItem("d14")
    );
    q++;
    step = 1;
    return;
  }

  if (q === 10) {
    localStorage.setItem("b12", winner);
    document.getElementById("group").innerText = "3/4";
    setupMatch(
      localStorage.getItem("a13"),
      localStorage.getItem("b13")
    );
    q++;
    step = 1;
    return;
  }

  // ================= FINAL + 3RD =================
  if (q === 11) {
    localStorage.setItem("w3", winner);
    document.getElementById("group").innerText = "Finaal";
    setupMatch(
      localStorage.getItem("a12"),
      localStorage.getItem("b12")
    );
    q++;
    step = 1;
    return;
  }

  if (q === 12) {
    localStorage.setItem("w1", winner);

    const bracketData = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      bracketData[key] = localStorage.getItem(key);
    }

    saveBracket(bracketData, localStorage.getItem("name"));

    document.getElementById("bt1").remove();
    document.getElementById("bt2").remove();
    document.getElementById("bt3").remove();

    document.getElementById("group").innerText = "Sisesta nimi";
    return;
  }
}

// ===== HELPERS =====
function loadNextGroup() {
  const g = groups[q - 1];

  document.getElementById("group").innerText =
    q === 2 ? "Alagrupp B" :
    q === 3 ? "Alagrupp C" :
    q === 4 ? "Alagrupp D" : "";

  document.getElementById("bt1").innerText = g[0];
  document.getElementById("bt2").innerText = g[1];
  document.getElementById("bt3").innerText = g[2];

  resetButtons();
}

function setupMatch(a, b) {
  document.getElementById("bt1").innerText = a;
  document.getElementById("bt2").innerText = b;
  resetButtons();
}

function resetButtons() {
  step = 1;

  document.getElementById("bt1").disabled = false;
  document.getElementById("bt2").disabled = false;
  document.getElementById("bt3")?.remove?.();

  document.getElementById("bt1").style.background = "#2363ec";
  document.getElementById("bt2").style.background = "#2363ec";
}

// ===== SAVE =====
async function saveBracket(brack, name) {
  const res = await fetch("http://localhost:3000/save-bracket", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bracket: brack, name })
  });

  console.log(await res.json());
}

// ===== NAME =====
function saveName(event) {
  event.preventDefault();

  const nimi = document.getElementById("nimi").value;
  localStorage.setItem("name", nimi);

  on = true;

  alert("Nimi salvestatud: " + nimi);
  document.getElementById("vorm").remove();
}
