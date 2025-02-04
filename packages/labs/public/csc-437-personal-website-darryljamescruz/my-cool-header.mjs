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
            font-size: 1.0em;
            padding: 0.5rem;
        }
        .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding: inherit;
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
            background: none;
            border: none;
            font-size: 1em;
            cursor: pointer;
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
            <h1>Darryl James Cruz</h1>
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
            console.log('Menu button clicked'); // Debugging statement
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

        // Reset nav links display on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.style.display = 'flex';
            } else {
                navLinks.style.display = 'none';
            }
        });
    }
}

customElements.define("my-cool-header", MyCoolHeader);