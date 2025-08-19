import "../styles/main.scss";
import "../styles/mainMenu.scss";
import { loadCities } from "./mainMenu";

export const rootElement = document.getElementById("app");
loadCities();
