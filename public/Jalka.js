let q = 1;
let koht = 1;
const r_10 = "10R";
const r_11 = "11R";
const r_12 = "12R";
const h_10 = "10H";
const h_11 = "11H";
const h_12 = "12H";
const m_10 = "10M/C";
const m_11 = "11M";
const m_12 = "12M";
const k_10 = "10A/K/C";
const k_11 = "11A/K/C";
const k_12 = "12K/C";

let nameReady = false;
let on = false;

// ================= PICK WINNER =================
function pickWinner(team) {

  // ❗ BLOCK GAME UNTIL NAME IS ENTERED
  if (!nameReady) {
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

    document.getElementById("bt"+ team).style.background = "#70cbef";
    document.getElementById("bt1").style.background = "#2363ec";
    document.getElementById("bt2").style.background = "#2363ec";
    document.getElementById("bt3").style.background = "#2363ec";
  }
}
