import {createRoot} from 'react-dom/client';
import Configurator from "./configurator/Configurator";
import styled, {StyleSheetManager} from "styled-components";
import {GlobalStyle} from "./GlobalStyle";

const Root = styled.div`
    height: 100vh;
    padding-left: 1em;
    padding-right: 1em;
    padding-bottom: 1em;
    display: flex;
    justify-content: center;
`;

createRoot(document.getElementById("app-container"))
    .render((
        <>
            <GlobalStyle/>
            <Root>
                <Configurator/>
            </Root>
        </>
    ));