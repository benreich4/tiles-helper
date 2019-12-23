// ==UserScript==
// @name         NYTimes Tile Game Helper
// @version      0.1
// @description  Help with NYTimes Tile Game
// @author       Ben Reich
// @match        https://www.nytimes.com/puzzles/tiles
// @grant        none
// @require      https://code.jquery.com/jquery-latest.js
// ==/UserScript==

this.$ = jQuery.noConflict(true);

function currentIndex(){
    return $("#tls-tileset .tls-tile .tls-selector").toArray().map(x => $(x).hasClass("selected")).indexOf(true)
}

function board(){
    return $("#tls-tileset .tls-tile .tls-tile__frame").toArray()
        .map(tile => $(tile).find(".tls-tile__layer").toArray()
             .filter(layer => !layer.classList.contains("matched"))
             .map(layer => $(layer).find("use").attr("xlink:href")))
}

function overlapLetter(board, a, b, prefix) {
    const x = board[a].filter(i => i.startsWith(prefix));
    const y = board[b].filter(i => i.startsWith(prefix));
    return x.length == 1 && x[0] == y[0];
}

function overlap(board, a, b){
    return ["#A", "#B", "#C"].filter(pre => overlapLetter(board, a, b, pre)).length
}

function color(index, lvl) {
    var el = $("#tls-tileset .tls-tile .tls-selector").eq(index)
    el.css("background-color", "red");
    el.css("opacity", lvl / 3.0);
}

function clearColors() {
    $("#tls-tileset .tls-tile .tls-selector").css("opacity", 0.0);
}

$(window).click(function(e){
    clearColors();
    const b = board();
    const ci = currentIndex();
    const current = b[ci];
    if (current) {
        const z = b.map((e, i) => overlap(b, ci, i));
        z.forEach((v, i) => color(i, v));
    }
});
