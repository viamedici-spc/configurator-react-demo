import Attributes from "./attributes/Attributes";
import styled from "styled-components";
import ConfigurationSatisfactionIndicator from "./ConfigurationSatisfactionIndicator";
import {Suspense} from "react";
import {InitializationError, UpdateError} from "./ErrorIndicator";
import {Configuration} from "@viamedici-spc/configurator-react";
import {AllowedRulesInExplainType, ConfigurationModelSourceType, SessionContext} from "@viamedici-spc/configurator-ts";
import * as config from "../config";
import Menu from "./Menu";
import StoringMenu from "./StoringMenu";

const Root = styled.div`
    max-width: 1250px;
    flex-grow: 1;
    display: grid;
    grid-template-rows: [header] auto [satisfaction menu storing-menu] auto [gap] 1em [main] auto;
    grid-template-columns: [satisfaction header-start main-start] 1fr [gap] 1em [storing-menu] auto [gap] 1em [menu] auto [header-end main-end];
    align-content: start;
`;

const Header = styled.div`
    grid-area: header;
    display: grid;
    grid-template-columns: [title] 1fr auto;
    margin-top: 1em;
`;

const Main = styled.div`
    grid-area: main;
    display: grid;
    grid-template-rows:[error-indicator attributes] auto;
    grid-template-columns: [error-indicator attributes] 1fr;
`;

const sessionContext: SessionContext = {
    apiBaseUrl: config.hcaEngineEndpoint,
    sessionInitialisationOptions: {
        accessToken: config.hcaEngineAccessToken,
    },
    configurationModelSource: {
        type: ConfigurationModelSourceType.Channel,
        deploymentName: config.configurationModelPackage.deploymentName,
        channel: config.configurationModelPackage.channel
    },
    allowedInExplain: {rules: {type: AllowedRulesInExplainType.all}}
};

export default function Configurator() {
    return (
        <Root>
            <Header>
                <h1>Demo Configurator with React</h1>
            </Header>

            <Configuration sessionContext={sessionContext}>

               <Suspense>
                   <ConfigurationSatisfactionIndicator/>
                   <StoringMenu/>
                   <Menu/>
               </Suspense>

                <Main>
                    <InitializationError/>

                    <Suspense fallback={<span>Configuration loading …</span>}>
                        <UpdateError/>
                        <Attributes/>
                    </Suspense>
                </Main>

            </Configuration>
        </Root>
    )
}