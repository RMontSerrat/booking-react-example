/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";

export const GlobalStyles: React.FC = () => (
  <Global
    styles={css`
      :root {
        font-family: Roboto, system-ui, Avenir, Helvetica, Arial, sans-serif;
        line-height: 1.5;
        font-weight: 400;
        color-scheme: light dark;
        color: rgba(255, 255, 255, 0.87);
        background-color: #242424;
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      body {
        margin: 0;
        display: flex;
        min-width: 320px;
        min-height: 100vh;
        background-color: #fff;
      }

      #root {
        max-width: 600px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
        width: 100%;
      }
    `}
  />
);
