import {useActiveAttribute} from "../AttributeItem";
import {useNumericAttribute} from "@viamedici-spc/configurator-react";

export function RangeIndicator() {
    const activeAttribute = useActiveAttribute();
    const {attribute} = useNumericAttribute(activeAttribute);

    return (
        <span style={{color: "var(--color-allowed-values)"}}>
           {`range [${attribute.range.min}; ${attribute.range.max}]`}
        </span>
    )
}

export function DecimalPlacesIndicator() {
    const activeAttribute = useActiveAttribute();
    const {attribute} = useNumericAttribute(activeAttribute);

    return (
        <span style={{color: "var(--color-selection-mode)"}}>{attribute.decimalPlaces} decimal places</span>
    )
}