"use strict";
class Modal {
    constructor(elements) {
        this.elements = elements;
        const N = 16;
        this.id = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(N)))).substring(0, N).replace(/[^a-zA-Z]+/g, "a");
        this.label = this.id + "_label";
    }
    make_md() {
        return `
  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#${this.id}">
    ${this.elements.title}
  </button>

<!-- Modal -->
<div class="modal" id="${this.id}" tabindex="-1" role="dialog" aria-labelledby="${this.label}" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="${this.label}">${this.elements.title}</h5>
      </div>
      <div class="modal-body">
        ${this.elements.text}
        <input type="hidden" class="genre" value=${this.elements.genre}>
        <input type="hidden" class="num" value=${this.elements.title.split(":")[0].split("#")[1]}>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Flag</span>
          </div>
          <input type="text" class="flag_input" />
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary my_send_flag">Send Flag</button>
      </div>
    </div>
  </div>
</div>`;
    }
}
const test_modal = new Modal({ genre: "crypt", title: "#1:initial challenge", text: `<p>hello! I\'ll confirm your <u>sanity.</u></p> <p>Please type \"HOGEHOGE\" below Flag box, and push \"Send Flag\"button.</p><br>` });
const test_modal2 = new Modal({ genre: "crypt", title: "#2:second challenge", text: `<p>hello! you type below command in terminal!</p><samp class="d-block bg-dark text-white">nc 100.28.172.108 8888</samp><br>` });
const test_modal3 = new Modal({ genre: "crypt", title: "#3:third challenge", text: `<p>hello! you type below command in terminal!</p><samp class="d-block bg-dark text-white">nc 100.28.172.108 8888</samp><br>` });
const test_modal4 = new Modal({ genre: "crypt", title: "#4:dummy challenge", text: `<p>hello! you type below command in terminal!</p><samp class="d-block bg-dark text-white">nc 100.28.172.108 8888</samp><br>` });
const test_modal5 = new Modal({ genre: "crypt", title: "#5:dummy challenge", text: `<p>hello! you type below command in terminal!</p><samp class="d-block bg-dark text-white">nc 100.28.172.108 8888</samp><br>` });
const test_modal6 = new Modal({ genre: "crypt", title: "#6:dummy challenge", text: `<p>hello! you type below command in terminal!</p><samp class="d-block bg-dark text-white">nc 100.28.172.108 8888</samp><br>` });
document.getElementById('root').innerHTML = test_modal.make_md();
document.getElementById('root2').innerHTML = test_modal2.make_md();
document.getElementById('root3').innerHTML = test_modal3.make_md();
document.getElementById('root4').innerHTML = test_modal4.make_md();
document.getElementById('root5').innerHTML = test_modal5.make_md();
document.getElementById('root6').innerHTML = test_modal6.make_md();
function req_json(i) {
    const flag_inputs = document.getElementsByClassName("flag_input");
    const genres = document.getElementsByClassName("genre");
    const nums = document.getElementsByClassName("num");
    let param = "?genre=" + genres[i].value + "&num=" + nums[i].value + "&flag=" + flag_inputs[i].value;
    let url = 'https://evening-anchorage-52082.herokuapp.com/scoring' + param + "&pretty";
    console.log(url);
    fetch(url)
    .then((res) => {
      return res.text();
    })
    .then((text) => {
      alert(text);
    })
    .catch((e) => {
      console.log(e.name);  //エラーをキャッチし表示     
    })
}
function send_func() {
    const sends = document.getElementsByClassName("my_send_flag");
    for (let i = 0; i < sends.length; i++) {
        sends[i].onclick = function () { req_json(i); };
    }
}
send_func();
