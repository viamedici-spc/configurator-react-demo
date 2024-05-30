import Attributes from "./attributes/Attributes";
import styled from "styled-components";
import ConfigurationSatisfactionIndicator from "./ConfigurationSatisfactionIndicator";
import {Suspense} from "react";
import {InitializationError, UpdateError} from "./ErrorIndicator";
import {Configuration, ConfigurationSuspender} from "@viamedici-spc/configurator-react";
import {AllowedRulesInExplainType, ClientSideLifeTimeHandlerOptions, ConfigurationModelFromChannel, ConfigurationModelSourceType, createClient} from "@viamedici-spc/configurator-ts";
import * as config from "../config";

const Root = styled.div`
    max-width: 1250px;
    flex-grow: 1;
`;

const Header = styled.div`
    display: grid;
    grid-template-columns: [title] 1fr auto;
    margin-top: 1em;
`;

const Main = styled.div`
    display: grid;
    grid-template-rows:[error-indicator attributes] auto;
    grid-template-columns: [error-indicator attributes] 1fr;
`;

const configuratorClient = createClient({
    sessionHandler: {accessToken: config.hcaEngineAccessToken} satisfies ClientSideLifeTimeHandlerOptions,
    hcaEngineBaseUrl: config.hcaEngineEndpoint
});
const configurationModelSource = {
    type: ConfigurationModelSourceType.Channel,
    deploymentName: config.configurationModelPackage.deploymentName,
    channel: config.configurationModelPackage.channel
} satisfies ConfigurationModelFromChannel;

export default function Configurator() {
    return (
        <Root>
            <Header>
                <h1>Configurator React Demo</h1>
            </Header>

            <Configuration configuratorClient={configuratorClient}
                           configurationModelSource={configurationModelSource}
                           allowedInExplain={{rules: {type: AllowedRulesInExplainType.all}}}>

                <ConfigurationSatisfactionIndicator/>

                <Main>
                    <InitializationError/>

                    <Suspense fallback={<span>Configuration loading …</span>}>
                        <UpdateError/>

                        <ConfigurationSuspender>
                            <Attributes/>
                        </ConfigurationSuspender>
                    </Suspense>
                </Main>

            </Configuration>
        </Root>
    )
}