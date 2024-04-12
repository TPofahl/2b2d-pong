import KineticBody from "../../../../2B2D/Components/KineticBody";
import MappedInput from "../../../../2B2D/Components/MappedInput";
import Sprite from "../../../../2B2D/Components/Sprite";
import Velocity from "../../../../2B2D/Components/Velocity";
import { Entity } from "../../../../2B2D/Entity";
import MachineState from "../../../../2B2D/MachineState";
import Update from "../../../../2B2D/Update";
import LeftPlayerDigit from "../Components/LeftPlayerDigit";

export default abstract class BaseLeftPlayerDigitState implements MachineState {
    readonly abstract updateImmediately: boolean;

    // Keep re-using this query to get better query caching
    getLeftPlayerDigit(update: Update) {
        const query = update.single([LeftPlayerDigit.NAME, MappedInput.NAME, Velocity.NAME, Sprite.NAME, KineticBody.NAME]);
        if (!query)
          return;
    
        var [player, input, velocity, sprite, body] = query.components as [LeftPlayerDigit, MappedInput, Velocity, Sprite, KineticBody];
        return { entity: query.entity, player, input, velocity, sprite, body };
    }

    protected abstract onEnter(update: Update, components: { entity: Entity, player: LeftPlayerDigit, input: MappedInput, velocity: Velocity, sprite: Sprite, body: KineticBody }): void;
    protected abstract onUpdate(update: Update, components: { entity: Entity, player: LeftPlayerDigit, input: MappedInput, velocity: Velocity, sprite: Sprite, body: KineticBody }): MachineState | undefined;

    enter(update: Update): void {
        var leftPlayerDigit = this.getLeftPlayerDigit(update);
        if (!leftPlayerDigit)
          return;
    
        this.onEnter(update, leftPlayerDigit);
    }

    update(update: Update): MachineState | undefined {
        var leftPlayerDigit = this.getLeftPlayerDigit(update);
        if (!leftPlayerDigit) {
            return;
        }
        
        return this.onUpdate(update, leftPlayerDigit);
    }
}
