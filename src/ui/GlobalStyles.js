export const inputStyle = `
    input {
        --color-primary: #8899a9;
        --color-primary-dark: #34495e;
        font: inherit;
        margin: 15px 0;
        outline: none;
        border: 3px solid;
        border-color: #b9b9b9;
        border-radius: 3px;
        padding: 5px;
        font-size: 1rem;
        transition: border-color .2s;
    }

    input:focus {
        animation: glow 1.5s infinite;
    }
        
    @keyframes glow {
        0% { border-color: var(--color-primary); }
        50% { border-color: var(--color-primary-dark); }
        100% { border-color: var(--color-primary); }
    }
`;

export const timeSelector = `
    <style>
        #time-selector {
            display: flex;
        }

        #time-selector > wc-button {
            --button-font-size: 1rem;
            --button-padding: 5px;
        }

        #time-selector > wc-button:nth-of-type(1) {
            --button-radius: 35px 0 0 35px;
        }

        #time-selector > wc-button:nth-of-type(2) {
            --button-radius: 0 35px 35px 0;
        }
    </style>

    <div id="time-selector">
        <wc-button type="solid">AM</wc-button>
        <wc-button type="outline">PM</wc-button>
    </div>
`;

export const cardStyle = `
    .card {
        background: white;
        box-shadow: 0px 2px 50px 0px rgba(209, 202, 209, 1);
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`;

const parseTime = time => (`${(time/1000).toFixed(1)}s`);

export const fadeAnim = (fadeInTime = 5000, fadeOutTime = 3000) => `
    .fade-in {
        animation: fade-in ${parseTime(fadeInTime)};
    }

    .fade-out {
        animation: fade-out ${parseTime(fadeOutTime)};
    }

    @keyframes fade-in {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }

    @keyframes fade-out {
        0% { opacity: 1; }
        100% { opacity: 0; }
    }
`;

export const slideYAnim = (offsetYIn = '100%', offsetYOut = '100%') => `
    @keyframes slide-in-y {
        0% { transform: translateY(${offsetYIn}px); }
        100% { transform: translateY(0px); }
    }

    @keyframes slide-out-y {
        100% { transform: translateY(${offsetYOut}px); }
    }
`;

export const slideXAnim = (offsetXIn = '100%', offsetXOut = '100%') => `
    @keyframes slide-in-x {
        0% { transform: translateX(${offsetXIn}); }
        100% { transform: translateX(0px); }
    }

    @keyframes slide-out-x {
        100% { transform: translateX(${offsetXOut}); }
    }
`;

export const scaleAnim = (scaleIn = 10, scaleOut = 10) => `
    @keyframes scale-in {
        0% { 
            transform: perspective(100px) translateZ(${scaleIn}px);
        }
        100% { 
            transform: perspective(100px) translateZ(0px);
        }
    }

    @keyframes scale-out {
        0% { 
            transform: perspective(100px) translateZ(0px);
        }
        100% { 
            transform: perspective(100px) translateZ(${scaleOut}px);
        }
    }
`

export const shakeAnim = `
    #dialogue.shake {
        animation: shake 0.82s cubic-bezier(.36, .07, .19, .97) both;
    }

    @keyframes shake {
    10%, 90% {
        transform: translateX(-1px);
        }

    20%, 80% {
        transform: translateX(2px);
        }

        30%, 50%, 70% {
        transform: translateX(-4px);
        }

        40%, 60% {
        transform: translateX(4px);
        }
    }
`;

