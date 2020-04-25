import Utils from "../../util/Utils.js";

const template = `
    <style>
        #root {
            position: absolute;
            background: var(--color-primary);
            z-index: 99;
            color: white;
            padding: 10px;
            display: flex;
            justify-content: center;
            text-align: center;
            bottom: 10px;
            left: 10px;
            right: 10px;
            font-size: 1rem;
            border-radius: 3px;
            white-space: pre-line;
            font-weight: 600;
            box-shadow: 0 0 4px 1px rgba(60, 58, 60, 0.46);
        }

        .slide-up {
            animation: 5s slide-up forwards;
        }

        @keyframes slide-up {
            0% {
                transform: translateY(100%) translateY(10px);
            }
            10% {
                transform: translateY(0px);
            }

            90% {
                transform: translateY(0px);
            }

            100% {
                transform: translateY(100%) translateY(10px);
            }
        }
    </style>

    <div id="root"><slot></slot></div>
`;

export default class WCToast extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = template;
        this.root = this.shadowRoot.getElementById('root');

        Utils.animate(this.root, 'slide-up', e => {
            this.remove();
        });
    }

}