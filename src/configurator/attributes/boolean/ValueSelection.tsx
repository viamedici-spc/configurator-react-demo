import {useActiveAttribute} from "../AttributeItem";
import {useBooleanAttribute} from "@viamedici-spc/configurator-react";
import {ConfiguratorErrorType, DecisionKind, ExplainQuestionType, } from "@viamedici-spc/configurator-ts";
import {handleDecisionResponse} from "../../../common/PromiseErrorHandling";
import {attributeIdToString} from "../../../common/Naming";
import CommonValueSelection, {Value} from "../CommonValueSelection";
import {handleExplain} from "../../../common/Explain";

/*
    Value id for "nothing selected"-option resp. reset-option
 */
const nothingValueId = "<nothing>";
const trueValueId = "true";
const falseValueId = "false";

export default function ValueSelection() {
    const activeAttribute = useActiveAttribute();
    const {attribute, makeDecision, explain, applySolution} = useBooleanAttribute(activeAttribute);

    const onChange = async (valueId: string) => {
        if (valueId === nothingValueId) {
            if (attribute.decision?.kind === DecisionKind.Explicit) {
                console.info("Reset decision for %s", attributeIdToString(attribute.id));
                await handleDecisionResponse(() => makeDecision(null));
            }
        } else {
            const value = valueId === trueValueId;

            if (attribute.possibleDecisionStates.includes(value)) {
                console.info("Make decision for %s: %s", attributeIdToString(attribute.id), value.toString());

                await handleDecisionResponse(() => makeDecision(value),
                    (e) => {
                        if (e.type === ConfiguratorErrorType.ConflictWithConsequence) {
                            return () => handleExplain(() => explain({
                                question: ExplainQuestionType.whyIsStateNotPossible,
                                state: value,
                            }, "full"), s => applySolution(s));
                        }
                        return null;
                    }
                );
            } else {
                console.info("Explain blocked value for %s: %s", attributeIdToString(attribute.id), value.toString());

                await handleExplain(() => explain({question: ExplainQuestionType.whyIsStateNotPossible, state: value}, "full"), applySolution);
            }
        }
    };

    const selectedValue = attribute.decision?.state === true
        ? trueValueId
        : attribute.decision?.state === false
            ? falseValueId
            : nothingValueId;

    const isTrueValuePossible = attribute.possibleDecisionStates.includes(true);
    const isFalseValuePossible = attribute.possibleDecisionStates.includes(false);
    const falseValue: Value<string> = {
        id: falseValueId,
        name: "no",
        isImplicit: attribute.decision?.state === false && attribute.decision?.kind === DecisionKind.Implicit
    };
    const trueValue: Value<string> = {
        id: trueValueId,
        name: "yes",
        isImplicit: attribute.decision?.state === true && attribute.decision?.kind === DecisionKind.Implicit
    };
    const allowedValues = [
        isFalseValuePossible && falseValue,
        isTrueValuePossible && trueValue
    ];
    const blockedValues = [
        (!isFalseValuePossible) && falseValue,
        (!isTrueValuePossible) && trueValue
    ];

    return (
        <CommonValueSelection
            nothingValue={{id: nothingValueId, name: selectedValue !== nothingValueId ? "Reset" : ""}}
            allowedValues={allowedValues}
            blockedValues={blockedValues}
            isMultiselect={false}
            selectedValues={selectedValue}
            onChange={onChange}
        />
    );
}