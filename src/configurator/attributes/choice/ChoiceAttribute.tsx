import styled from "styled-components";
import {AvailableValuesIndicator, MandatoryIndicator, SelectionModeIndicator} from "./Indicators";
import ValueSelection from "./ValueSelection";
import SatisfactionIndicator from "../SatisfactionIndicator";

const Root = styled.div`
    grid-area: selection;
    display: grid;
    grid-template-rows: [value-selection] auto [gap] 0.2em [indicators] 1.2em;
    grid-template-columns: [value-selection indicators] 1fr;
`;

const Indicators = styled.div`
    grid-area: indicators;
    font-size: 0.8em;
`;

export default function ChoiceAttribute() {
    return (
        <>
            <Root>
                <ValueSelection/>
                <Indicators>
                    <SatisfactionIndicator/>
                    <span> · </span>
                    <MandatoryIndicator/>
                    <span> · </span>
                    <SelectionModeIndicator/>
                    <span> · </span>
                    <AvailableValuesIndicator/>
                </Indicators>
            </Root>
        </>
    );
}