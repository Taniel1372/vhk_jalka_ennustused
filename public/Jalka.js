// ===== STATE (safe, isolated) =====
const Tournament = {
  q: 1,
  koht: 1,
  on: false
};

// ===== TEAMS =====
const teams = {
  r: ["10R", "11R", "12R"],
  h: ["10H", "11H", "12H"],
  m: ["10M", "11M", "12M"],
  k: ["10A/K/C", "11A/K/C", "12K/C"]
};

// ===== CORE FUNCTION =====
function pickWinner(team) {
  const { q } = Tournament;

  const set = (key, value) => localStorage.setItem(key, value);

  // ---- GROUP STAGE ----
  if (Tournament.koht === 1) {
    const map = {
      1: ["a1", teams.r],
      2: ["b1", teams.h],
      3: ["c1", teams.m],
      4: ["d1", teams.k]
    };

    const [key, arr] = map[q];
    set(key, arr[team - 1]);

    disableButton(team);
    Tournament.koht++;
    return;
  }

  // ---- STAGE ADVANCE ----
  if (q === 1) {
    set("a2", teams.r[team - 1]);
    switchGroup("Alagrupp B", teams.h);
  }

  if (q === 2) {
    set("b2", teams.h[team - 1]);
    switchGroup("Alagrupp C", teams.m);
  }

  if (q === 3) {
    set("c2", teams.m[team - 1]);
    switchGroup("Alagrupp D", teams.k);
  }

  if (q === 4) {
    set("d2", teams.k[team - 1]);
    startQuarterFinals();
  }

  if (q === 5) {
    set("a14", team === 1 ? get("a1") : get("b2"));
    set("a24", team === 1 ? get("b2") : get("a1"));
    setMatch(["c1", "d2"]);
  }

  if (q === 6) {
    set("b14", team === 1 ? get("c1") : get("d2"));
    set("b24", team === 1 ? get("d2") : get("c1"));
    setMatch(["a2", "b1"]);
  }

  if (q === 7) {
    set("c14", team === 1 ? get("a2") : get("b1"));
    set("c24", team === 1 ? get("b1") : get("a2"));
    setMatch(["c2", "d1"]);
  }

  if (q === 8) {
    set("d14", team === 1 ? get("c2") : get("d1"));
    set("group", "1/2");
    setMatch(["a14", "b14"]);
  }

  if (q === 9) {
    set("a12", team === 1 ? get("a14") : get("b14"));
    setMatch(["c14", "d14"]);
  }

  if (q === 10) {
    set("b12", team === 1 ? get("c14") : get("d14"));
    set("group", "3/4");
    setMatch(["a13", "b13"]);
  }

  if (q === 11) {
    set("w3", team === 1 ? get("a13") : get("b13"));
    set("w4", team === 1 ? get("b13") : get("a13"));
    setMatch(["a12", "b12"]);
  }

  if (q === 12) {
    set("w1", team === 1 ? get("a12") : get("b12"));
    set("w2", team === 1 ? get("b12") : get("a12"));

    const bracketData = {};
    Object.keys(localStorage).forEach(k => {
      bracketData[k] = localStorage.getItem(k);
    });

    saveBracket(bracketData, get("name"));

    endTournament();
  }

  Tournament.q++;
  resetButtons(team);
}

// ===== HELPERS =====
function get(k) {
  return localStorage.getItem(k);
}

function setMatch(keys) {
  document.getElementById("bt1").innerText = get(keys[0]);
  document.getElementById("bt2").innerText = get(keys[1]);
}

function switchGroup(name, newTeams) {
  document.getElementById("group").innerText = name;
  document.getElementById("bt1").innerText = newTeams[0];
  document.getElementById("bt2").innerText = newTeams[1];
  document.getElementById("bt3").innerText = newTeams[2];
  Tournament.koht = 1;
}

function disableButton(team) {
  const btn = document.getElementById("bt" + team);
  btn.disabled = true;
  btn.style.background = "#70cbef";
}

function resetButtons(team) {
  ["bt1", "bt2", "bt3"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.disabled = false;
      el.style.background = "#2363ec";
    }
  });

  const active = document.getElementById("bt" + team);
  if (active) active.style.background = "#70cbef";
}

// ===== FINAL SCREEN =====
function endTournament() {
  document.getElementById("bt1")?.remove();
  document.getElementById("bt2")?.remove();
  document.getElementById("bt3")?.remove();

  document.getElementById("group").innerText = "Sisesta nimi";
}

// ===== SAVE =====
async function saveBracket(brack, name) {
  const res = await fetch("http://localhost:3000/save-bracket", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bracket: brack, name })
  });

  return await res.json();
}

// ===== NAME =====
function saveName(event) {
  event.preventDefault();

  const nimi = document.getElementById("nimi").value;
  localStorage.setItem("name", nimi);

  Tournament.on = true;

  alert("Nimi salvestatud: " + nimi);
  document.getElementById("vorm")?.remove();
}
