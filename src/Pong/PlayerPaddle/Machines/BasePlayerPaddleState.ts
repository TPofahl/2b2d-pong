import KineticBody from "../../../2B2D/Components/KineticBody";
import MappedInput from "../../../2B2D/Components/MappedInput";
import Sprite from "../../../2B2D/Components/Sprite";
import Velocity from "../../../2B2D/Components/Velocity";
import { Entity } from "../../../2B2D/Entity";
import MachineState from "../../../2B2D/MachineState";
import Vec2 from "../../../2B2D/Math/Vec2";
import Update from "../../../2B2D/Update";
import PlayerPaddle from "../Components/PlayerPaddle";
import PlayerPaddleActions from "../PlayerPaddleActions";

export default abstract class BasePlayerPaddleState implements MachineState {
    readonly abstract updateImmediately: boolean;
    readonly speed: number = 0.0003;
    readonly drag: number = 0.08;

    // Keep re-using this query to get better query caching
    getPlayerPaddle(update: Update) {
        const query = update.single([PlayerPaddle.NAME, MappedInput.NAME, Velocity.NAME, Sprite.NAME, KineticBody.NAME]);
        if (!query)
          return;
    
        var [player, input, velocity, sprite, body] = query.components as [PlayerPaddle, MappedInput, Velocity, Sprite, KineticBody];
        return { entity: query.entity, player, input, velocity, sprite, body };
    }

    protected abstract onEnter(update: Update, components: { entity: Entity, player: PlayerPaddle, input: MappedInput, velocity: Velocity, sprite: Sprite, body: KineticBody }): void;
    protected abstract onUpdate(update: Update, components: { entity: Entity, player: PlayerPaddle, input: MappedInput, velocity: Velocity, sprite: Sprite, body: KineticBody }): MachineState | undefined;

    getKeys(update: Update, components: { input: MappedInput }) {
        const up = components.input.isPressed(update, PlayerPaddleActions.Up);
        const down = components.input.isPressed(update, PlayerPaddleActions.Down);
        return { up, down };
    }

    enter(update: Update): void {
        var player = this.getPlayerPaddle(update);
        if (!player)
          return;
    
        this.onEnter(update, player);
    }

    update(update: Update): MachineState | undefined {
        var player = this.getPlayerPaddle(update);
        if (!player) {
            return;
        }
        
        return this.onUpdate(update, player);
    }

    applyUpAndDownVelocity(update: Update, components: { input: MappedInput, velocity: Velocity, player: PlayerPaddle, sprite: Sprite }) {
        const { up, down } = this.getKeys(update, components);
        const { velocity, player } = components;
    
        let newVel = velocity.velocity;
        if (player.controlsEnabled && up)
          newVel = newVel.add(new Vec2(0, -this.speed));

        if (player.controlsEnabled && down)
          newVel = newVel.add(new Vec2(0, -this.speed));
    
        velocity.velocity = newVel.scalarMultiply(this.drag);
    }
}
