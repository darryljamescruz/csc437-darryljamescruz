import { attachShadow } from "./utils.mjs";

const TEMPLATE = document.createElement("template");
TEMPLATE.innerHTML = `
    <style>
        header {
            font-family: var(--font-family-heading);
            background-color: var(--color-header-footer);
            border-bottom: 2px solid var(--color-heading);
            padding: 1rem;
            font-size: 1.25em;
            color: var(--color-main-heading);
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
            color: var(--color-text);
        }

        .light-mode-toggle {
            margin-right: 0.5rem;
        }
    }
    </style>
    <header>
        <div class="container">
            <div class="header-row">    
                <h1>Darryl James Cruz</h1>
                <div style="display: flex; align-items: center;">
                    <button class="menu-button">Menu</button>
                </div>
            </div>
            <label>
                <input type="checkbox" class="light-mode-toggle" autocomplete="off">
                Light mode
            </label>
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
        const lightModeToggle = shadowRoot.querySelector('.light-mode-toggle');

        // Initialize light mode from localStorage
        const isLightMode = localStorage.getItem('lightMode') === 'true';
        lightModeToggle.checked = isLightMode;
        if (isLightMode) {
            document.body.classList.add('light-mode');
        }

        // Handle light mode toggle
        lightModeToggle.addEventListener('change', () => {
            if (lightModeToggle.checked) {
                document.body.classList.add('light-mode');
                localStorage.setItem('lightMode', 'true');
            } else {
                document.body.classList.remove('light-mode');
                localStorage.setItem('lightMode', 'false');
            }
        });

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