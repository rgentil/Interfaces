"use strict";

/* Loader */
var Loader = {

    loader: null,
    body: null,
    html: '<span><svg width="40" height="40" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="15"></svg><div class="loading-text">0%</div></span>',
    cssClass: "loader",
    check: function () {
        if (this.body == null) {
            this.body = document.body;
        }
    },
    open: function () {
        this.check();
        if (!this.isOpen()) {
            this.loader = document.createElement("div");
            this.loader.setAttribute("id", "loader");
            this.loader.classList.add("loader_website");
            this.loader.innerHTML = this.html;
            this.body.append(this.loader);
            this.body.classList.add(this.cssClass);
        }
        return this;
    },
    close: function () {
        this.check();
        if (this.isOpen()) {
            this.body.classList.remove(this.cssClass);
            this.loader.remove();
        }
        return this;
    },
    isOpen: function () {
        this.check();
        return this.body.classList.contains(this.cssClass);
    },
    ifOpened: function (callback, close) {
        this.check();
        if (this.isOpen()) {
            if (!!close) this.close();
            if (typeof callback === "function") {
                callback();
            }
        }
        return this;
    },
    ifClosed: function (callback, open) {
        this.check();
        if (!this.isOpen()) {
            if (!!open) this.open();
            if (typeof callback === "function") {
                callback();
            }
        }
        return this;
    },
};
/* Loader */

if (typeof module !== "undefined") {
    module.exports = Loader;
}

document.addEventListener("DOMContentLoaded", function (event) {
    Loader.open();
    const loadText = document.querySelector('.loading-text');

    let load = 0;
    let int = setInterval(blurring, 50);
    function blurring() {
        load++
        if (load > 99) {
            clearInterval(int);
        }
        loadText.innerText = `${load}%`;
        loadText.style.opacity = scale(load, 0, 100, 1, 0);

    }
    function scale(number, inMin, inMax, outMin, outMax) {
        return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }
    setTimeout(() => {
        console.log("Delayed for 10 second.");
        let loader = document.getElementById("loader");
        loader.style.display = 'none';
        console.log(loader);

    }, "5000")
});