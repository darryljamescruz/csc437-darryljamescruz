import { toHtmlElement } from './toHtmlElement.mjs';

function createHeader() {
    const headerHTML = `
        <header>
            <div class="container">
                <h1>Darryl's Personal Website</h1>
                <nav>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="winter_schedule.html">Winter 2025 Schedule</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    `;
    return toHtmlElement(headerHTML);
}

window.addEventListener("load", () => {
    const header = createHeader();
    const body = document.querySelector('body');
    console.log("Loading header/navbar ahead of time using event listener");
    const existingHeader = document.querySelector('header');
    if (existingHeader) {
        existingHeader.replaceWith(header);
    } else {
        body.prepend(header);
    }

});

