import styled from "styled-components/macro";
import {useConfiguration, useConfigurationInitialization, useExplain} from "@viamedici-spc/configurator-react";
import {handleExplain} from "../common/Explain";

const Root = styled.div`
    margin-bottom: 1em;
    display: grid;
    grid-template-rows: [text explain-button] auto;
    grid-template-columns: [text] auto [explain-button] auto;
    gap: 0.5em;
    justify-content: start;
    background-color: var(--color-unsatisfied-bg);
    color: var(--color-unsatisfied);
    padding: var(--size-card-padding);
    border-radius: var(--shape-card-border-radius);
    font-weight: bolder;
    box-shadow: var(--shadow-card);

    &.satisfied {
        background-color: var(--color-satisfied-bg);
        color: var(--color-satisfied);
    }
`

const Text=styled.span`
    grid-area: text;
    align-self: center;
`

const ExplainButton=styled.button`
    grid-area: explain-button;
`

export default function ConfigurationSatisfactionIndicator() {
    const {isInitializing} = useConfigurationInitialization();

    if (isInitializing) {
        return null;
    }

    return <Indicator/>
}

function Indicator() {
    const {configuration} = useConfiguration();
    const {explain, applySolution} = useExplain();
    const isSatisfied = configuration.isSatisfied;

    const onExplain = () => {
        handleExplain(() => explain(b => b.whyIsNotSatisfied.configuration, "full"), applySolution);
    };

    return (
        <Root className={isSatisfied && "satisfied"}>
            <Text>{isSatisfied ? "Configuration satisfied" : "Configuration unsatisfied"}</Text>
            {!isSatisfied && <ExplainButton onClick={onExplain}>Explain</ExplainButton>}
        </Root>
    )
}