import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
@font-face {
    font-family: 'Anton';
    src: url('/fonts/Anton/anton.woff2') format('woff2'); 
    font-weight: 400;
    font-style: normal;
    font-display: block; 
  }


:root{
  --font-logo: 'Anton', sans-serif;
  --bg-primary: 0 0% 0%;
  --bg-secondary:0 0% 15%;


    --text-primary: 0 0% 100%;
    --text-secondary: 0 0% 50%;

    --warning: 0 84% 60%;


    --border: 0 0% 20%;
    --grain-opacity: 0.03; 
}

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  overflow-x: hidden;
  background-color: hsl(var(--bg-primary));
  color: hsl(var(--text-primary));
  font-family: "JetBrains Mono", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: antialiased;
 
}

body::selection {
  background: hsl(var(--text-primary));
  color: hsl(var(--bg-primary));
}

a {
    text-decoration: none;
    color: inherit;
  }
  
  ul {
    list-style: none;
  }




@keyframes grain {
  0%,
  100% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(-5%, -10%);
  }
  20% {
    transform: translate(-15%, 5%);
  }
  30% {
    transform: translate(7%, -25%);
  }
  40% {
    transform: translate(-5%, 25%);
  }
  50% {
    transform: translate(-15%, 10%);
  }
  60% {
    transform: translate(15%, 0%);
  }
  70% {
    transform: translate(0%, 15%);
  }
  80% {
    transform: translate(3%, 35%);
  }
  90% {
    transform: translate(-10%, 10%);
  }
}


`;

export default GlobalStyles;
