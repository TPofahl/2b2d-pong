import KineticBody from "../../../../2B2D/Components/KineticBody";
import MappedInput from "../../../../2B2D/Components/MappedInput";
import Sprite from "../../../../2B2D/Components/Sprite";
import Velocity from "../../../../2B2D/Components/Velocity";
import { Entity } from "../../../../2B2D/Entity";
import MachineState from "../../../../2B2D/MachineState";
import Update from "../../../../2B2D/Update";
import LeftComputerDigit from "../Components/LeftComputerDigit";

export default abstract class BaseLeftComputerDigitState implements MachineState {
    readonly abstract updateImmediately: boolean;

    // Keep re-using this query to get better query caching
    getLeftComputerDigit(update: Update) {
        const query = update.single([LeftComputerDigit.NAME, MappedInput.NAME, Velocity.NAME, Sprite.NAME, KineticBody.NAME]);
        if (!query)
          return;
    
        var [player, input, velocity, sprite, body] = query.components as [LeftComputerDigit, MappedInput, Velocity, Sprite, KineticBody];
        return { entity: query.entity, player, input, velocity, sprite, body };
    }

    protected abstract onEnter(update: Update, components: { entity: Entity, player: LeftComputerDigit, input: MappedInput, velocity: Velocity, sprite: Sprite, body: KineticBody }): void;
    protected abstract onUpdate(update: Update, components: { entity: Entity, player: LeftComputerDigit, input: MappedInput, velocity: Velocity, sprite: Sprite, body: KineticBody }): MachineState | undefined;

    enter(update: Update): void {
        var leftComputerDigit = this.getLeftComputerDigit(update);
        if (!leftComputerDigit)
          return;
    
        this.onEnter(update, leftComputerDigit);
    }

    update(update: Update): MachineState | undefined {
        var leftComputerDigit = this.getLeftComputerDigit(update);
        if (!leftComputerDigit) {
            return;
        }
        
        return this.onUpdate(update, leftComputerDigit);
    }
}
