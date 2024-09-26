import styled from "styled-components";
import {useConfigurationReset, useSessionReinitialization} from "@viamedici-spc/configurator-react";

const Root = styled.div`
    grid-area: menu;
    display: flex;
    flex-direction: column;
    gap: 1em;
    background-color: var(--color-base-1);
    padding: var(--size-card-padding);
    border-radius: var(--shape-card-border-radius);
    box-shadow: var(--shadow-card);
`;

export default function Menu() {
    const {reinitializeSession} = useSessionReinitialization();
    const {resetConfiguration, canResetConfiguration} = useConfigurationReset();

    return (
        <Root>
            <button onClick={resetConfiguration} disabled={!canResetConfiguration}>Reset Configuration</button>
            <button onClick={reinitializeSession}>Re-initialize Configuration</button>
        </Root>
    )
}