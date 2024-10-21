import styled from "styled-components";
import {useConfigurationInitialization, useConfigurationSatisfaction, useExplain} from "@viamedici-spc/configurator-react";
import {handleExplain} from "../common/Explain";

const Root = styled.div`
    grid-area: satisfaction;
    display: grid;
    grid-template-rows: [text explain-button] auto;
    grid-template-columns: [text] auto [explain-button] auto;
    gap: 0.5em;
    justify-content: start;
    align-content: center;
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

const Text = styled.div`
    grid-area: text;
    align-self: center;
`

const ExplainButton = styled.button`
    grid-area: explain-button;
`

export default function ConfigurationSatisfactionIndicator() {
    const {isSatisfied, explain} = useConfigurationSatisfaction();
    const {applySolution} = useExplain();

    const onExplain = () => {
        handleExplain(() => explain("full"), applySolution);
    };

    return (
        <Root className={isSatisfied && "satisfied"}>
            <Text>
                {isSatisfied ? "Configuration satisfied" : "Configuration unsatisfied"}
            </Text>
            {!isSatisfied && <ExplainButton onClick={onExplain}>Explain</ExplainButton>}
        </Root>
    )
}