import { rootElement } from "./main";

export function getLoadingScreen() {
  return `      <div class="loading-screen">
        <div class="loading-msg">Lade Muenchen...</div>
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

export function loadLoadingScreen() {
  rootElement.innerHTML = getLoadingScreen();
}
