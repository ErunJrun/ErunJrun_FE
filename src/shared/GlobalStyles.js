import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { scrollbar } from "./scrollbar";

const GlobalStyles = createGlobalStyle`
	${reset};
    
  * {
		${scrollbar};
		box-sizing : border-box;
	}
	html {
		margin : 0;
		padding: 0;
		box-sizing: border-box;
		font-size:62.5%;
	}
	body{
		/* position: relative; */
		margin: 0;
		padding: 0;
		font-family: "Spoqa Han Sans Neo", "sans-serif";
	}
	a { 
		color: var(--black);
		text-decoration:none;
	}
	input,
	textarea,
	button {
    font-family: "Spoqa Han Sans Neo", "sans-serif";
		color: var(--black);
		border: none;
		outline: none;
	}
	button {
		padding: 0;
		background-color: transparent;
		cursor: pointer;
	}
`;

export default GlobalStyles;
