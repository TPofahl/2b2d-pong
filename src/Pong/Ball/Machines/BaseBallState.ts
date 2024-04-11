import KineticBody from "../../../2B2D/Components/KineticBody";
import MappedInput from "../../../2B2D/Components/MappedInput";
import Sprite from "../../../2B2D/Components/Sprite";
import Velocity from "../../../2B2D/Components/Velocity";
import { Entity } from "../../../2B2D/Entity";
import MachineState from "../../../2B2D/MachineState";
import Vec2 from "../../../2B2D/Math/Vec2";
import Update from "../../../2B2D/Update";
import Ball from "../Components/Ball";

export default abstract class BaseBallState implements MachineState {
    readonly abstract updateImmediately: boolean;
    readonly speed: number = 0.0003;
    readonly drag: number = 0.08;

    // Keep re-using this query to get better query caching
    getBall(update: Update) {
        const query = update.single([Ball.NAME, MappedInput.NAME, Velocity.NAME, Sprite.NAME, KineticBody.NAME]);
        if (!query)
          return;
    
        var [player, input, velocity, sprite, body] = query.components as [Ball, MappedInput, Velocity, Sprite, KineticBody];
        return { entity: query.entity, player, input, velocity, sprite, body };
    }

    protected abstract onEnter(update: Update, components: { entity: Entity, player: Ball, input: MappedInput, velocity: Velocity, sprite: Sprite, body: KineticBody }): void;
    protected abstract onUpdate(update: Update, components: { entity: Entity, player: Ball, input: MappedInput, velocity: Velocity, sprite: Sprite, body: KineticBody }): MachineState | undefined;

    enter(update: Update): void {
        var ball = this.getBall(update);
        if (!ball)
          return;
    
        this.onEnter(update, ball);
    }

    update(update: Update): MachineState | undefined {
        var ball = this.getBall(update);
        if (!ball) {
            return;
        }
        
        return this.onUpdate(update, ball);
    }

    applyUpAndDownVelocity(update: Update, components: { input: MappedInput, velocity: Velocity, player: Ball, sprite: Sprite }) {
        const { velocity, player } = components;
    
        let newVel = velocity.velocity;
    
        velocity.velocity = newVel.scalarMultiply(this.drag);
    }
}
