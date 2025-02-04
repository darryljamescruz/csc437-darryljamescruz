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
            font-size: 1.25em;
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
        .container {
            flex-direction: column; /* Stack elements vertically */
            align-items: flex-start; /* Align items to the start */
        }
        
        nav ul {
            flex-direction: column;
            display: none;  /* Hidden by default on mobile */
        }
        
        .menu-button {
            display: block;
        }
        
    }
    </style>
    <header>
        <div class="container">
            <h1>Darryl James Cruz</h1>
            <button class="menu-button">Menu</button>
            <nav>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="winter_schedule.html">Winter 2025 Schedule</a></li>
                    <li><a href="resume.html">Course Resume</a></li>
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
            const isVisible = navLinks.style.display === 'block';
            navLinks.style.display = isVisible ? 'none' : 'block';
        });

        // Close the menu when clicking outside the header
        document.addEventListener('click', (event) => {
            const path = event.composedPath();
            const isClickInside = path.includes(this);
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