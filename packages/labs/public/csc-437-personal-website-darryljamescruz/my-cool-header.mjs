import { attachShadow } from "./utils.mjs";

const TEMPLATE = document.createElement("template");
TEMPLATE.innerHTML = `
    <style>
        header {
            background-color: var(--color-header-footer);
            border-bottom: 2px solid var(--color-heading);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            font-size: 1em;
        }
        .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
        }
        nav {
            display: flex;
            align-items: center;
        }
        nav ul {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        nav ul li {
            margin-left: 1rem;
        }
        nav ul li a {
            text-decoration: none;
            color: var(--color-heading);
            font-weight: var(--font-weight-bold);
        }
        nav ul li a.active {
            color: var(--color-link-hover);
            font-weight: bold;
            text-decoration: underline;
        }

        @media (max-width: 768px) {
        .container {
            flex-direction: column; /* Stack elements vertically */
            align-items: flex-start; /* Align items to the start */
        }

        nav {
            margin-top: 1rem; /* Add space between h1 and nav */
        }

        nav ul {
            flex-direction: column;
        }
    }
    </style>
    <header>
        <div class="container">
            <h1>Darryl James Cruz</h1>
            <nav>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="winter_schedule.html">Winter 2025 Schedule</a></li>
                </ul>
            </nav>
        </div>
    </header>
`;

class MyCoolHeader extends HTMLElement {
    connectedCallback() {
        const shadowRoot = attachShadow(this, TEMPLATE);

    }
}

customElements.define("my-cool-header", MyCoolHeader);