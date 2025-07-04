import { rootElement } from "./main";

export function renderLoadingScreen(msg) {
  rootElement.innerHTML = getLoadingScreen(msg);
}

export function getLoadingScreen(msg) {
  return `      <div class="loading-screen">
        <div class="loading-msg">${msg}</div>
        <div class="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>`;
}
