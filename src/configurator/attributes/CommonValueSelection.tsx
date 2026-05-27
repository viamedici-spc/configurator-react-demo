import styled from "styled-components";

const Root = styled.select`
    grid-area: value-selection;
`;

export type Value<TId extends string> = {
    id: TId,
    name?: string,
}

export type AllowedValue<TId extends string> = Value<TId> & {
    isImplicit: boolean
    isImmutable: boolean
}

type Props<TId extends string> = {
    nothingValue: Value<TId>,
    allowedValues: ReadonlyArray<AllowedValue<TId>>,
    blockedValues: ReadonlyArray<Value<TId>>,
    unavailableValues?: ReadonlyArray<Value<TId>>,
    isMultiselect: boolean,
    selectedValues: TId | TId[],
    onChange: (value: TId) => void
}

export default function CommonValueSelection<TId extends string>(props: Props<TId>) {
    const allowedValues = props.allowedValues.filter(Boolean);
    const blockedValues = props.blockedValues.filter(Boolean);
    const unavailableValues = props.unavailableValues ? props.unavailableValues.filter(Boolean) : [];

    return (
        <Root value={props.selectedValues}
              multiple={props.isMultiselect}
              onChange={e => props.onChange(e.currentTarget.value as TId)}>

            <Option value={props.nothingValue}/>

            {allowedValues.map(v => (
                <Option key={v.id} value={v}/>
            ))}

            {blockedValues.length > 0 && (
                <optgroup label="Blocked">
                    {blockedValues.map(v => (
                        <Option key={v.id} value={v}/>
                    ))}
                </optgroup>
            )}
            {unavailableValues.length > 0 && (
                <optgroup label="Unavailable">
                    {unavailableValues.map(v => (
                        <Option key={v.id} value={v}/>
                    ))}
                </optgroup>
            )}
        </Root>
    )
}

function Option<TId extends string>({ value }: { value: Value<TId> }) {
    return (
        <option key={value.id} value={value.id}>
            {"isImplicit" in value && value.isImplicit ? ("isImmutable" in value && value.isImmutable ? "Fixed: " : "Implicit: ") : ""}
            {value.name ?? value.id}
        </option>
    );
}