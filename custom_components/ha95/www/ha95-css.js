/*
 * HA 95 – lädt ha95.css (Pixel-Schrift, Mauszeiger, Scrollleisten)
 * Version: 4.4.0
 *
 * Wird von der Integration HA 95 als Frontend-Skript eingetragen; die
 * Stylesheet-Datei liegt daneben.
 */
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = new URL("ha95.css", import.meta.url).href;
document.head.appendChild(link);
