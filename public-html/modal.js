"use strict";
export class Modal {
    constructor(elements) {
        this.elements = elements;
        const N = 16;
        this.id = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(N)))).substring(0, N).replace(/[^a-zA-Z]+/g, "a");
        this.label = this.id + "_label";
    }
    make_md() {
        return `
  <button type="button" class="my_title btn btn-primary" data-toggle="modal" data-target="#${this.id}">
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
        <input type="hidden" class="point" value=${this.elements.title.split("pt")[0].match(/[0-9]*[0-9]+$/)[0]}>
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
