import { attachShadow } from "./utils.mjs";

const TEMPLATE = document.createElement("template");
TEMPLATE.innerHTML = `
    <style>
        header {
            font-family: var(--font-family-heading);
            color: white;
            background-color: var(--color-header-footer);
            border-bottom: 2px solid var(--color-heading);
            padding: 1rem;
            font-size: 1.25em;
        }

        .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
        }

        .header-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        nav ul {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            flex-grow: 1;
        }

        nav ul li {
            margin-right: 1rem;
            padding: 0.5rem 0 0.5rem 1rem;
            }

        nav ul li a {
            text-decoration: none;
            color: var(--color-link);
            font-weight: var(--font-weight-bold);
            flex-grow: 1; /* Allow each link to grow and shrink */

        }

        .menu-button {
            display: none;
        }
            
        @media (max-width: 768px) {
        .container {
            flex-direction: column; /* Stack elements vertically */
            align-items: flex-start; /* Align items to the start */
        }

        .header-row {
            width: 100%;
        }
        
        nav ul {
            flex-direction: column;
            display: none;  /* Hidden by default on mobile */
            width: 100%;
        }
        
        .menu-button {
            font-family: var(--font-family-heading);
            font-size: 1em;
            display: initial; /* Show button on mobile */
            cursor: pointer;
            background-color: var(--color-link);
            color: white;
            border-radius: 8px;
            border-style: none;
        }

        label {
            display: flex;
            align-items: center;
            margin-right: 1rem;
        }

        .dark-mode-toggle {
            margin-right: 0.5rem;
        }
    }
    </style>
    <header>
        <div class="container">
            <div class="header-row">    
                <h1>Darryl James Cruz</h1>
                <button class="menu-button">Menu</button>
            </div>
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
            if (!isClickInside && window.innerWidth <= 768) {
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