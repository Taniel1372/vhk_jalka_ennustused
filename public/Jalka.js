let q = 1;
let koht = 1;
let on = false;
let nameUsed = false;

// TEAMS
const r_10 = "10R", r_11 = "11R", r_12 = "12R";
const h_10 = "10H", h_11 = "11H", h_12 = "12H";
const m_10 = "10M", m_11 = "11M", m_12 = "12M";
const k_10 = "10A/K/C", k_11 = "11A/K/C", k_12 = "12K/C";

// ================= NAME =================
function saveName(event) {
  event.preventDefault();

  if (nameUsed) return; // only once

  const nimi = document.getElementById("nimi").value;
  localStorage.setItem("name", nimi);

  on = true;
  nameUsed = true;

  alert("Nimi salvestatud: " + nimi);
  document.getElementById("vorm").remove();
}

// ================= MAIN =================
function pickWinner(team) {

  // BLOCK IF NO NAME
  if (!localStorage.getItem("name")) {
    alert("Sisesta nimi enne mängu jätkamist!");
    return;
  }

  // ================= GROUP STAGE (FIRST CLICK) =================
  if (koht == 1 && q == 1) {
    localStorage.setItem("a1", team == 1 ? r_10 : team == 2 ? r_11 : r_12);
  }
  else if (koht == 1 && q == 2) {
    localStorage.setItem("b1", team == 1 ? h_10 : team == 2 ? h_11 : h_12);
  }
  else if (koht == 1 && q == 3) {
    localStorage.setItem("c1", team == 1 ? m_10 : team == 2 ? m_11 : m_12);
  }
  else if (koht == 1 && q == 4) {
    localStorage.setItem("d1", team == 1 ? k_10 : team == 2 ? k_11 : k_12);
  }

  // FIRST CLICK BEHAVIOUR (LOCK BUTTON)
  if (koht == 1) {
    document.getElementById("bt" + team).disabled = true;
    document.getElementById("bt" + team).style.background = "#70cbef";
    koht = 2;
    return;
  }

  // ================= SECOND CLICK =================
  if (koht == 2) {

    if (q == 1) {
      localStorage.setItem("a2", team == 1 ? r_10 : team == 2 ? r_11 : r_12);

      document.getElementById("group").innerText = "Alagrupp B";
      document.getElementById("bt1").innerText = h_10;
      document.getElementById("bt2").innerText = h_11;
      document.getElementById("bt3").innerText = h_12;
    }

    else if (q == 2) {
      localStorage.setItem("b2", team == 1 ? h_10 : team == 2 ? h_11 : h_12);

      document.getElementById("group").innerText = "Alagrupp C";
      document.getElementById("bt1").innerText = m_10;
      document.getElementById("bt2").innerText = m_11;
      document.getElementById("bt3").innerText = m_12;
    }

    else if (q == 3) {
      localStorage.setItem("c2", team == 1 ? m_10 : team == 2 ? m_11 : m_12);

      document.getElementById("group").innerText = "Alagrupp D";
      document.getElementById("bt1").innerText = k_10;
      document.getElementById("bt2").innerText = k_11;
      document.getElementById("bt3").innerText = k_12;
    }

    else if (q == 4) {
      localStorage.setItem("d2", team == 1 ? k_10 : team == 2 ? k_11 : k_12);

      document.getElementById("bt1").style.background = "#2363ec";
      document.getElementById("bt2").style.background = "#2363ec";
      document.getElementById("loll")?.remove();

      document.getElementById("group").innerText = "1/4";

      document.getElementById("bt1").innerText = localStorage.getItem("a1");
      document.getElementById("bt2").innerText = localStorage.getItem("b2");
    }

    else if (q == 5) {
      localStorage.setItem("a14", team == 1 ? localStorage.getItem("a1") : localStorage.getItem("b2"));
      localStorage.setItem("a24", team == 1 ? localStorage.getItem("b2") : localStorage.getItem("a1"));

      document.getElementById("bt1").innerText = localStorage.getItem("c1");
      document.getElementById("bt2").innerText = localStorage.getItem("d2");
    }

    else if (q == 6) {
      localStorage.setItem("b14", team == 1 ? localStorage.getItem("c1") : localStorage.getItem("d2"));
      localStorage.setItem("b24", team == 1 ? localStorage.getItem("d2") : localStorage.getItem("c1"));

      document.getElementById("bt1").innerText = localStorage.getItem("a2");
      document.getElementById("bt2").innerText = localStorage.getItem("b1");
    }

    else if (q == 7) {
      localStorage.setItem("c14", team == 1 ? localStorage.getItem("a2") : localStorage.getItem("b1"));
      localStorage.setItem("c24", team == 1 ? localStorage.getItem("b1") : localStorage.getItem("a2"));

      document.getElementById("bt1").innerText = localStorage.getItem("c2");
      document.getElementById("bt2").innerText = localStorage.getItem("d1");
    }

    else if (q == 8) {
      localStorage.setItem("d14", team == 1 ? localStorage.getItem("c2") : localStorage.getItem("d1"));

      document.getElementById("group").innerText = "1/2";

      document.getElementById("bt1").innerText = localStorage.getItem("a14");
      document.getElementById("bt2").innerText = localStorage.getItem("b14");
    }

    else if (q == 9) {
      localStorage.setItem("a12", team == 1 ? localStorage.getItem("a14") : localStorage.getItem("b14"));

      document.getElementById("bt1").innerText = localStorage.getItem("c14");
      document.getElementById("bt2").innerText = localStorage.getItem("d14");
    }

    else if (q == 10) {
      localStorage.setItem("b12", team == 1 ? localStorage.getItem("c14") : localStorage.getItem("d14"));

      document.getElementById("group").innerText = "3/4";

      document.getElementById("bt1").innerText = localStorage.getItem("a13");
      document.getElementById("bt2").innerText = localStorage.getItem("b13");
    }

    else if (q == 11) {
      localStorage.setItem("w3", team == 1 ? localStorage.getItem("a13") : localStorage.getItem("b13"));

      document.getElementById("group").innerText = "Finaal";

      document.getElementById("bt1").innerText = localStorage.getItem("a12");
      document.getElementById("bt2").innerText = localStorage.getItem("b12");
    }

    else if (q == 12) {
      localStorage.setItem("w1", team == 1 ? localStorage.getItem("a12") : localStorage.getItem("b12"));

      const bracketData = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        bracketData[key] = localStorage.getItem(key);
      }

      saveBracket(bracketData, localStorage.getItem("name"));

      document.getElementById("bt1").remove();
      document.getElementById("bt2").remove();
      document.getElementById("group").innerText = "Sisesta nimi";
    }

    q++;
    koht = 1;
  }

  // ================= RESET UI =================
  document.getElementById("bt1").disabled = false;
  document.getElementById("bt2").disabled = false;

  if (document.getElementById("bt3")) {
    document.getElementById("bt3").disabled = false;
    document.getElementById("bt3").style.background = "#2363ec";
  }

  document.getElementById("bt1").style.background = "#2363ec";
  document.getElementById("bt2").style.background = "#2363ec";

  document.getElementById("bt" + team).style.background = "#70cbef";
}

// ================= SAVE =================
async function saveBracket(brack, name) {
  const response = await fetch("http://localhost:3000/save-bracket", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bracket: brack, name })
  });

  console.log(await response.json());
}
