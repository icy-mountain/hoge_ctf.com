import { Modal } from "./modal.js";

const test_modal = new Modal({ genre: "sanity_check", title: "#1: まずはこれから 10pt", text: `<p>ハロー! これからあなたの正気度を確かめるよ!</p> <p>下のFlag boxに\"HOGEHOGE\"と入力して、\"Send Flag\"ボタンを押してね!</p><br>` });
const test_modal2 = new Modal({ genre: "crypt", title: "#1: トゥ デシマル 50pt", text: `
  <div class="container">
    <p class="h5 row justify-content-center">(1) 7×V×4 → 868</p>
    <p class="h5 row justify-content-center">(2) 2×24+12 → 35</p>
    <p class="h5 row justify-content-center">(3) D4C×RA9-8ZZ2Z4  → ?</p>
    <div class="font-weight-bold">HINT:</div><p class="d-flex justify-content-center font-weight-light">(1) 32→10 (2) 5→10 (3) 36→10</p>
  </div><br>` });
const test_modal3 = new Modal({ genre: "crypt", title: "#2: 0から127 50pt", text: `
  <div class="container">
    <p class="h5 row justify-content-center">(1) (18×8-7×11)(23×3-4)(252÷3)→CAT</p>
    <p class="h5 row justify-content-center">(2) (103-6)(89-3×19)(80)(66+35)(110)→a Pen</p>
    <p class="h5 row justify-content-center">(3) (130÷2)(224-3×47)(88 - 21)(73)(73)→?</p>
    <div class="font-weight-bold">HINT:</div><p class="d-flex justify-content-center font-weight-light"><sp>&nbsp→32</p>
  </div><br>` });
const test_modal4 = new Modal({ genre: "app", title: "#1: 四則演算100本ノック 500pt", text: `<p>Macならターミナルを開いて下のコマンドを入力してね！Windowsだと対応してないのでムリです！WSL入れたらイケるよ。相談してね！</p><p><b>2021年8月でAWSのクレジットが無くなってしまったため、サーバーへアクセスできません。アクセスして遊んでみたい人は相談してね！</b></p><samp class="d-block bg-dark text-white">nc 3.88.122.62 8888</samp><br>` });
const test_modal5 = new Modal({ genre: "riddle", title: "#1: うんこほんやく 300pt", text: `<p>下の絵文字を<strong>アルファベット</strong>と<strong>数字</strong>と<strong>記号</strong>に変換してね！</p><p class="h1 d-flex justify-content-center">💩</p><br>` });
const test_modal6 = new Modal({ genre: "riddle", title: "#2: EBCDIC-US 1000pt", text: `<p>Flagはこの<a href="./enc.txt" download="flag.txt">ファイル</a>に書いてあります。</p>` });
document.getElementById('san1').innerHTML = test_modal.make_md();
document.getElementById('cry1').innerHTML = test_modal2.make_md();
document.getElementById('cry2').innerHTML = test_modal3.make_md();
document.getElementById('app1').innerHTML = test_modal4.make_md();
document.getElementById('rid1').innerHTML = test_modal5.make_md();
document.getElementById('rid2').innerHTML = test_modal6.make_md();

function init() {
  let caught = get_storage("caught");
  const btn_title = document.getElementsByClassName("my_title");
  console.log(caught);
  console.log(btn_title);
  let score = 0;

  if (caught === undefined) {
    set_storage("caught", JSON.stringify({}));
    return;
  }
  caught = JSON.parse(caught);
  Object.keys(caught).forEach(val => {
    let idx = parseInt(val);
    score += parseInt(caught[val]);
    btn_title[idx].className = "my_title btn btn-secondary";
  });
  set_storage("score", score.toString());
  score_counter();
}

function req_json(i) {
    const flag_inputs = document.getElementsByClassName("flag_input");
    const genres = document.getElementsByClassName("genre");
    const nums = document.getElementsByClassName("num");
    let param = "?genre=" + genres[i].value + "&num=" + nums[i].value + "&flag=" + flag_inputs[i].value;
    let url = 'https://evening-anchorage-52082.herokuapp.com/scoring' + param + "&pretty";
  
    fetch(url)
        .then((res) => {
        return res.text();
    })
        .then((text) => {
        if (text == "OK"){
          if_correct(i)
        } else {
          alert("残念。また、チャレンジしてね");
        }
    })
        .catch((e) => {
        console.log(e.name); //エラーをキャッチし表示     
    });
}

function send_func() {
    const sends = document.getElementsByClassName("my_send_flag");
    for (let i = 0; i < sends.length; i++) {
        sends[i].onclick = function () { req_json(i); };
    }
}

function if_correct(idx) {
  alert("You are Correct! Congrats!!");
  const btn_title = document.getElementsByClassName("my_title");
  const points = document.getElementsByClassName("point");
  const caught = JSON.parse(get_storage("caught"));
  let score = get_storage("score");

  if (Object.keys(caught).includes(idx.toString()))
    return;
  btn_title[idx].className = "my_title btn btn-secondary";
  if (score !== undefined) 
    score = (parseInt(score) + parseInt(points[idx].value)).toString();
  if (score === undefined)
    score = points[idx].value;
  set_storage("score", score);
  score_counter();
  caught[idx.toString()] = points[idx].value;
  set_storage("caught", JSON.stringify(caught));
}

function score_counter() {
  const score = get_storage("score");
  if (score === undefined)
    return ;
  const counter = document.getElementById("score_counter");
  counter.textContent = score;
  anime({
    targets: "#score_counter",
    textContent: [0, score],
    round: 1,
    easing: 'linear',
    duration: 5000,
    easing: "easeOutExpo",
    delay: 2000
  });
}

document.getElementById('my_footer').innerHTML = `<div class="d-flex d-block justify-content-center bg-transparent">
<span class="d-inline h1 bg-light text-bg">your score: <span id="score_counter">0</span></span></div>`
init();

send_func();
