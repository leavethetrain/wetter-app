import { loadDetailView } from "./detailView";
import "../styles/main.scss";
import { renderLoadingScreen } from "./loadingScreen";

export const rootElement = document.querySelector(".app");

loadDetailView();
