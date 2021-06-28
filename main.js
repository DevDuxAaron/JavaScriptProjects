import { hello } from "./samples/hello.js";
import { bye } from "./samples/bye.js";
import { showCountries } from "./samples/xhr.js"

document.addEventListener("click", (e) => {
    const xhr = document.getElementById("btnXhr")
    const async = document.getElementById("btnAsync")

    if (e.target === xhr) {
        showCountries()
    } else if (e.target === async) {
        console.log("async");
    }
})

// hello()
// bye()
