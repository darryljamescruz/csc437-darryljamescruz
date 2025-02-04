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
            font-size: 1.5em;
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
        .menu-button {
            display: none;
        }
        @media (max-width: 768px) {
            nav ul {
                display: none;
                flex-direction: column;
            }
            .menu-button {
                display: block;
            }
        }
    </style>
    <header>
        <div class="container">
            <h1>Main Navigation</h1>
            <nav>
                <button class="menu-button">Menu</button>
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
        const menuButton = shadowRoot.querySelector('.menu-button');
        const navLinks = shadowRoot.querySelector('nav ul');

        // Toggle the visibility of the nav links
        menuButton.addEventListener('click', () => {
            const isVisible = navLinks.style.display === 'flex';
            navLinks.style.display = isVisible ? 'none' : 'flex';
        });

        // Close the menu when clicking outside the header
        document.addEventListener('click', (event) => {
            const isClickInside = this.contains(event.composedPath()[0]);
            if (!isClickInside) {
                navLinks.style.display = 'none';
            }
        });
    }
}

customElements.define("my-cool-header", MyCoolHeader);