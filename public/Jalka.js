let q = 1;
let koht = 1;
let on = false;
let nameReady = false;

// TEAMS
const r_10 = "10R";
const r_11 = "11R";
const r_12 = "12R";
const h_10 = "10H";
const h_11 = "11H";
const h_12 = "11H";
const m_10 = "10M";
const m_11 = "11M";
const m_12 = "12M";
const k_10 = "10A/K/C";
const k_11 = "11A/K/C";
const k_12 = "12K/C";

// ================= NAME =================
function saveName(event) {
  event.preventDefault();

  if (nameReady) return;

  const nimi = document.getElementById("nimi").value;

  localStorage.setItem("name", nimi);

  on = true;
  nameReady = true;

  alert("Nimi salvestatud: " + nimi);
  document.getElementById("vorm").remove();
}

// ================= PICK WINNER =================
function pickWinner(team) {

  // BLOCK UNTIL NAME EXISTS
  if (!nameReady || !localStorage.getItem("name")) {
    alert("Sisesta nimi enne mängu alustamist!");
    return;
  }

  if (koht==1 && q==1){
    localStorage.setItem("a1", (team==1) ? r_10 :(team==2) ? r_11: r_12);
    document.getElementById("bt"+ team).disabled = true;
    document.getElementById("bt"+ team).style.background = "#70cbef";
    koht++;
  }
  else if (koht==1 && q==2){
    localStorage.setItem("b1", (team==1) ? h_10 :(team==2) ? h_11: h_12);
    document.getElementById("bt"+ team).disabled = true;
    document.getElementById("bt"+ team).style.background = "#70cbef";
    koht++;
  }
  else if (koht==1 && q==3){
    localStorage.setItem("c1", (team==1) ? m_10 :(team==2) ? m_11: m_12);
    document.getElementById("bt"+ team).disabled = true;
    document.getElementById("bt"+ team).style.background = "#70cbef";
    koht++;
  }
  else if (koht==1 && q==4){
    localStorage.setItem("d1", (team==1) ? k_10 :(team==2) ? k_11: k_12);
    document.getElementById("bt"+ team).disabled = true;
    document.getElementById("bt"+ team).style.background = "#70cbef";
    koht++;
  }
  else {
    if (q==1){
      localStorage.setItem("a2", (team==1) ? r_10:(team==2) ? r_11: r_12);
      document.getElementById("group").innerText = "Alagrupp B";
      document.getElementById("bt1").innerText = h_10;
      document.getElementById("bt2").innerText = h_11;
      document.getElementById("bt3").innerText = h_12;
      koht = 1;
    }
    if (q==2){
      localStorage.setItem("b2", (team==1) ? h_10: (team==2) ? h_11: h_12);
      document.getElementById("group").innerText = "Alagrupp C";
      document.getElementById("bt3").style.background = "#2363ec";
      document.getElementById("bt1").innerText = m_10;
      document.getElementById("bt2").innerText = m_11;
      document.getElementById("bt3").innerText = m_12;
      koht = 1;
    }
    if (q==3){
      localStorage.setItem("c2", (team==1) ? m_10: (team==2) ? m_11: m_12);
      document.getElementById("group").innerText = "Alagrupp D";
      document.getElementById("bt1").innerText = k_10;
      document.getElementById("bt2").innerText = k_11;
      document.getElementById("bt3").innerText = k_12;
      koht = 1;
    }
    if (q==4){
      localStorage.setItem("d2", (team==1) ? k_10: (team==2) ? k_11: k_12);
      document.getElementById("bt1").style.background = "#2363ec";
      document.getElementById("bt2").style.background = "#2363ec";
      document.getElementById("loll").remove();
      document.getElementById("bt3").remove();
      document.getElementById("group").innerText = "1/4";
      document.getElementById("bt1").innerText = localStorage.getItem("a1");
      document.getElementById("bt2").innerText = localStorage.getItem("b2");
    }
    if (q==5){
      localStorage.setItem("a14", (team==1) ? localStorage.getItem("a1"): localStorage.getItem("b2"));
      localStorage.setItem("a24", (team==1) ? localStorage.getItem("b2"): localStorage.getItem("a1"));
      document.getElementById("bt1").innerText = localStorage.getItem("c1");
      document.getElementById("bt2").innerText = localStorage.getItem("d2");
    }
    if (q==6){
      localStorage.setItem("b14", (team==1) ? localStorage.getItem("c1"): localStorage.getItem("d2"));
      localStorage.setItem("b24", (team==1) ? localStorage.getItem("d2"): localStorage.getItem("c1"));
      document.getElementById("bt1").innerText = localStorage.getItem("a2");
      document.getElementById("bt2").innerText = localStorage.getItem("b1");
    }
    if (q==7){
      localStorage.setItem("c14", (team==1) ? localStorage.getItem("a2"): localStorage.getItem("b1"));
      localStorage.setItem("c24", (team==1) ? localStorage.getItem("b1"): localStorage.getItem("a2"));
      document.getElementById("bt1").innerText = localStorage.getItem("c2");
      document.getElementById("bt2").innerText = localStorage.getItem("d1");
    }
    if (q==8){
      localStorage.setItem("d14", (team==1) ? localStorage.getItem("c2"): localStorage.getItem("d1"));
      document.getElementById("group").innerText = "1/2";
      document.getElementById("bt1").innerText = localStorage.getItem("a14");
      document.getElementById("bt2").innerText = localStorage.getItem("b14");
    }
    if (q==9){
      localStorage.setItem("a12", (team==1) ? localStorage.getItem("a14"): localStorage.getItem("b14"));
      document.getElementById("bt1").innerText = localStorage.getItem("c14");
      document.getElementById("bt2").innerText = localStorage.getItem("d14");
    }
    if (q==10){
      localStorage.setItem("b12", (team==1) ? localStorage.getItem("c14"): localStorage.getItem("d14"));
      document.getElementById("group").innerText = "3/4";
      document.getElementById("bt1").innerText = localStorage.getItem("a13");
      document.getElementById("bt2").innerText = localStorage.getItem("b13");
    }
    if (q==11){
      localStorage.setItem("w3", (team==1) ? localStorage.getItem("a13"): localStorage.getItem("b13"));
      document.getElementById("group").innerText = "Finaal";
      document.getElementById("bt1").innerText = localStorage.getItem("a12");
      document.getElementById("bt2").innerText = localStorage.getItem("b12");
    }
    if (q==12){
      localStorage.setItem("w1", (team==1) ? localStorage.getItem("a12"): localStorage.getItem("b12"));

      const bracketData = {
        a1: localStorage.getItem("a1"),
        a2: localStorage.getItem("a2"),
        a12: localStorage.getItem("a12"),
        a13: localStorage.getItem("a13"),
        a14: localStorage.getItem("a14"),
        a24: localStorage.getItem("a24"),

        b1: localStorage.getItem("b1"),
        b2: localStorage.getItem("b2"),
        b12: localStorage.getItem("b12"),
        b13: localStorage.getItem("b13"),
        b14: localStorage.getItem("b14"),
        b24: localStorage.getItem("b24"),

        c1: localStorage.getItem("c1"),
        c2: localStorage.getItem("c2"),
        c14: localStorage.getItem("c14"),
        c24: localStorage.getItem("c24"),

        d1: localStorage.getItem("d1"),
        d2: localStorage.getItem("d2"),
        d14: localStorage.getItem("d14"),
        d24: localStorage.getItem("d24"),

        w1: localStorage.getItem("w1"),
        w2: localStorage.getItem("w2"),
        w3: localStorage.getItem("w3"),
        w4: localStorage.getItem("w4"),
      };

      saveBracket(bracketData, localStorage.getItem("name"));

      document.getElementById("bt1").remove();
      document.getElementById("bt2").remove();
      document.getElementById("bt3").remove();
      document.getElementById("group").innerText = "Sisesta nimi";
    }

    q++;
    koht = 1;

    document.getElementById("bt1").disabled = false;
    document.getElementById("bt2").disabled = false;
    document.getElementById("bt3").disabled = false;
  }
}

// ================= BRACKET =================
function bracket() {
  document.getElementById("smegma").innerHTML = `
    <h1>VHK gümnaasiumi jalgpalliturniir</h1>

    <div id="a1"></div>
    <div id="a2"></div>
    <div id="b1"></div>
    <div id="b2"></div>
    <div id="c1"></div>
    <div id="c2"></div>
    <div id="d1"></div>
    <div id="d2"></div>

    <div id="a14"></div>
    <div id="b14"></div>
    <div id="c14"></div>
    <div id="d14"></div>

    <div id="a12"></div>
    <div id="b12"></div>
  `;

  document.getElementById("a1").innerText = localStorage.getItem("a1");
  document.getElementById("a2").innerText = localStorage.getItem("a2");
  document.getElementById("b1").innerText = localStorage.getItem("b1");
  document.getElementById("b2").innerText = localStorage.getItem("b2");
  document.getElementById("c1").innerText = localStorage.getItem("c1");
  document.getElementById("c2").innerText = localStorage.getItem("c2");
  document.getElementById("d1").innerText = localStorage.getItem("d1");
  document.getElementById("d2").innerText = localStorage.getItem("d2");

  document.getElementById("a14").innerText = localStorage.getItem("a14");
  document.getElementById("b14").innerText = localStorage.getItem("b14");
  document.getElementById("c14").innerText = localStorage.getItem("c14");
  document.getElementById("d14").innerText = localStorage.getItem("d14");

  document.getElementById("a12").innerText = localStorage.getItem("a12");
  document.getElementById("b12").innerText = localStorage.getItem("b12");
}

// ================= SAVE =================
async function saveBracket(brack, name) {
  const response = await fetch("http://localhost:3000/save-bracket", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      bracket: brack,
      name: name
    })
  });

  const result = await response.json();
  console.log(result);
}
