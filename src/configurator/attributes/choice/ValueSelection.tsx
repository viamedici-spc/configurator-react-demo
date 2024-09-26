import {ChoiceValueDecisionState, ChoiceValueId, ConfiguratorErrorType, DecisionKind, ExplainQuestionType,} from "@viamedici-spc/configurator-ts";
import {useActiveAttribute} from "../AttributeItem";
import {useChoiceAttribute} from "@viamedici-spc/configurator-react";
import {handleDecisionResponse} from "../../../common/PromiseErrorHandling";
import {attributeIdToString} from "../../../common/Naming";
import CommonValueSelection, {Value} from "../CommonValueSelection";
import {handleExplain} from "../../../common/Explain";

/*
    Value id for "nothing selected"-option resp. reset-option
 */
const nothingChoiceValueId = "<nothing>";

export default function ValueSelection() {
    const activeAttribute = useActiveAttribute();
    const {attribute, makeDecision, explain, applySolution, clearDecisions, getAllowedChoiceValues, getIncludedChoiceValues, getBlockedChoiceValues, isMultiSelect} = useChoiceAttribute(activeAttribute);
    const allowedChoiceValues = getAllowedChoiceValues()
        .map(v => ({id: v.id, isImplicit: v.decision?.kind === DecisionKind.Implicit} satisfies Value<ChoiceValueId>));
    const includedChoiceValueIds = getIncludedChoiceValues()
        .map(a => a.id satisfies ChoiceValueId);
    const includedChoiceValueId = includedChoiceValueIds[0] ?? nothingChoiceValueId;

    const onChange = async (choiceValueId: ChoiceValueId) => {
        if (choiceValueId === nothingChoiceValueId) {
            if (includedChoiceValueIds.length === 1) {
                console.info("Reset decision for %s.%s", attributeIdToString(attribute.id), includedChoiceValueId);
                await handleDecisionResponse(() => makeDecision(includedChoiceValueId, null));
            } else if (includedChoiceValueIds.length > 1) {
                console.info("Reset all decisions for %s", attributeIdToString(attribute.id), includedChoiceValueId);
                await handleDecisionResponse(() => clearDecisions());
            }
        } else if (allowedChoiceValues.some(v => v.id === choiceValueId)) {
            console.info("Make decision for %s.%s", attributeIdToString(attribute.id), choiceValueId);
            const state = includedChoiceValueIds.some(v => v === choiceValueId)
                ? null
                : ChoiceValueDecisionState.Included;

            await handleDecisionResponse(() => makeDecision(choiceValueId, state),
                (e) => {
                    if (e.type === ConfiguratorErrorType.ConflictWithConsequence) {
                        return () => handleExplain(() => explain({
                            question: ExplainQuestionType.whyIsStateNotPossible,
                            choiceValueId: choiceValueId,
                            state,
                        }, "full"), s => applySolution(s));
                    }
                    return null;
                });
        } else if (choiceValueId != null && choiceValueId !== "") {
            console.info("Explain blocked value for %s.%s", attributeIdToString(attribute.id), choiceValueId);

            await handleExplain(() => explain({question: ExplainQuestionType.whyIsStateNotPossible, choiceValueId: choiceValueId, state: ChoiceValueDecisionState.Included}, "full"), applySolution);
        }
    };

    return (
        <CommonValueSelection
            nothingValue={{id: nothingChoiceValueId, name: includedChoiceValueIds.length > 0 ? "Reset" : ""}}
            allowedValues={allowedChoiceValues}
            blockedValues={getBlockedChoiceValues()}
            isMultiselect={isMultiSelect()}
            selectedValues={isMultiSelect() ? includedChoiceValueIds : includedChoiceValueId}
            onChange={onChange}
        />
    )
}