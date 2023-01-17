// ==UserScript==
// @name         dump-chatgpt-conversation
// @namespace    http://appli.se/
// @version      0.13
// @author       Niklas Hallqvist <niklas@appli.se>
// @match        https://chat.openai.com/*
// @grant        none
// @description  Saves conversation as HTML table, using chat's title as filename.
// ==/UserScript==

(function() {
    'use strict';

    function createDownloadButton() {
        var button = document.createElement("button");
        var svg = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 10L12 15L17 10" stroke="#9898a0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </svg>';
        button.innerHTML = svg;
        button.style.cssText = "position:absolute; top:10px; right:10px; width:24px; height:24px;";
        button.addEventListener("click", downloadConversation);
        return button;
    }

    function downloadConversation() {
        var title = document.querySelector("head > title").textContent.replace(/\s+/g,' ').trim();
        var fileName = title + ".html";
        mainDiv.querySelectorAll("button").forEach(function(elem) {
            elem.remove();
        });
        var blob = new Blob([mainDiv.outerHTML], { type: "text/html" });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    // Select the main div element using full XPath
    var mainDiv = document.evaluate("/html/body/div[1]/div[1]/div[1]/main/div[1]/div/div", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Modify the HTML of the main div element
    mainDiv.innerHTML = mainDiv.innerHTML.replace(/<pre>/g, "<pre style='background-color: black; color: #ffd700; font-family: monospace; white-space: pre-wrap;'>");

    var parent = document.body;
    parent.style.position = "relative";
    mainDiv.querySelectorAll("pre").forEach(function(pre) {
        pre.style.backgroundColor = "black";
        pre.style.color = "#ffd700";
        pre.style.fontFamily = "monospace";
        pre.style.whiteSpace = "pre-wrap";
    });

    var downloadButton = createDownloadButton();
    parent.appendChild(downloadButton);
})();





