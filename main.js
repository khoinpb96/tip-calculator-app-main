const $ = document.querySelector.bind(document);
const bill = $(".bill");
const guess = $("#guess");
const errorMes = $(".error-message");
const radios = document.querySelectorAll('input[name="tips"]');
const t5 = $("#t5");
const t10 = $("#t10");
const t15 = $("#t15");
const t20 = $("#t20");
const t50 = $("#t50");
const tC = $("#tC");
const tip = $("#tip");
const total = $("#total");
const rsBtn = $(".rs-btn");
let tipRate = "";

function totalRender() {
  radioCheck();
  if (bill.value && guess.value) {
    total.innerText = `$${(bill.value / guess.value).toPrecision(3)}`;
  }
  if (tC.value) {
    customTipsBtn();
  }
  if (tipRate) {
    this.checked = true;
    tC.value = "";
    total.innerText = `$${(
      (bill.value / guess.value) * tipRate +
      bill.value / guess.value
    ).toPrecision(3)}`;
    tip.innerText = `$${(
      (bill.value / guess.value) * tipRate +
      bill.value / guess.value -
      bill.value / guess.value
    ).toPrecision(2)}`;
  }
  activeRsBtn();
}

function radioCheck() {
  for (let i of radios) {
    if (i.checked) {
      return (tipRate = i.value);
    }
  }
}

function customTipsBtn() {
  if (tC.value && bill.value && guess.value) {
    for (let i of radios) i.checked = false;
    total.innerText = `$${(
      ((bill.value / guess.value) * tC.value) / 100 +
      bill.value / guess.value
    ).toPrecision(3)}`;
    tip.innerText = `$${(
      ((bill.value / guess.value) * tC.value) / 100 +
      bill.value / guess.value -
      bill.value / guess.value
    ).toPrecision(2)}`;
  }
}

bill.onblur = totalRender;
t5.onclick = totalRender;
t10.onclick = totalRender;
t15.onclick = totalRender;
t20.onclick = totalRender;
t50.onclick = totalRender;
tC.onblur = customTipsBtn;

function checkGuess() {
  if (guess.value == 0) {
    guess.classList.add("error-border");
    errorMes.classList.remove("hidden");
  } else {
    guess.classList.remove("error-border");
    errorMes.classList.add("hidden");
  }
  totalRender();
}

guess.onblur = checkGuess;

function activeRsBtn() {
  if (total.innerText !== "$0.00") {
    rsBtn.classList.add("active");
  }
}

function reset() {
  if (rsBtn.classList.contains("active")) {
    bill.value = "";
    guess.value = "";
    tC.value = "";
    tipRate = "";
    for (let i of radios) i.checked = false;
    total.innerText = "$0.00";
    tip.innerText = "$0.00";
  }
}

rsBtn.onclick = reset;
