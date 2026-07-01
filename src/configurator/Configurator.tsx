import Attributes from "./attributes/Attributes";
import styled from "styled-components";
import ConfigurationSatisfactionIndicator from "./ConfigurationSatisfactionIndicator";
import {Suspense, useMemo, useState} from "react";
import {InitializationError, UpdateError} from "./ErrorIndicator";
import {Configuration} from "@viamedici-spc/configurator-react";
import {
    AllowedRulesInExplainType,
    AttributeType,
    ChoiceValueDecisionState,
    ConfigurationModelSourceType,
    SessionContext
} from "@viamedici-spc/configurator-ts";
import * as config from "../config";
import Menu from "./Menu";
import StoringMenu from "./StoringMenu";

const Root = styled.div`
    max-width: 1250px;
    flex-grow: 1;
    display: grid;
    grid-template-rows: [header] auto [satisfaction menu storing-menu sales-region] auto [gap] 1em [main] auto;
    grid-template-columns: [satisfaction header-start main-start] 1fr [gap] 1em [sales-region] auto [gap] 1em [storing-menu] auto [gap] 1em [menu] auto [header-end main-end];
    align-content: start;
`;

const Header = styled.div`
    grid-area: header;
    display: grid;
    grid-template-columns: [title] 1fr auto;
    margin-top: 1em;
`;

const SalesRegionSelect = styled.label`
    grid-area: sales-region;
    display: flex;
    align-items: center;
    gap: 0.5em;
    background-color: var(--color-base-1);
    padding: var(--size-card-padding);
    border-radius: var(--shape-card-border-radius);
    box-shadow: var(--shadow-card);
`;

const Main = styled.div`
    grid-area: main;
    display: grid;
    grid-template-rows:[error-indicator attributes] auto;
    grid-template-columns: [error-indicator attributes] 1fr;
`;

// The Sales Region selector is hard-coded: its value is sent as a Fixed Decision when the session is created (empty =
// none). The same attribute is also shown dynamically in the list to reveal the effect of fixing it.
type SalesRegion = "EU" | "US";

export default function Configurator() {
    // Empty by default: no region is fixed, so no Fixed Decision is sent and SalesRegion stays freely selectable.
    const [salesRegion, setSalesRegion] = useState<SalesRegion | "">("");

    // A new SessionContext (by reference) makes the Configuration component re-create the session, so changing the
    // region re-initializes - with the Fixed Decision when a region is chosen, or without one when the choice is empty.
    const sessionContext: SessionContext = useMemo(() => ({
        apiBaseUrl: config.hcaEngineEndpoint,
        sessionInitialisationOptions: {
            accessToken: config.hcaEngineAccessToken,
        },
        configurationModelSource: {
            type: ConfigurationModelSourceType.Channel,
            deploymentName: config.configurationModelPackage.deploymentName,
            channel: config.configurationModelPackage.channel
        },
        allowedInExplain: {rules: {type: AllowedRulesInExplainType.all}},
        fixedDecisions: salesRegion
            ? [{
                type: AttributeType.Choice,
                attributeId: {sharedConfigurationModelId: "SalesShared", localId: "SalesRegion"},
                choiceValueId: salesRegion,
                state: ChoiceValueDecisionState.Included
            }]
            : undefined
    }), [salesRegion]);

    return (
        <Root>
            <Header>
                <h1>Demo Configurator with React</h1>
            </Header>

            <SalesRegionSelect>
                Sales Region (fixed):
                <select value={salesRegion} onChange={e => setSalesRegion(e.target.value as SalesRegion | "")}>
                    <option value="">(none)</option>
                    {["EU", "US"].map(region => (
                        <option key={region} value={region}>{region}</option>
                    ))}
                </select>
            </SalesRegionSelect>

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
