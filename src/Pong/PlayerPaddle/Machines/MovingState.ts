import Animated from "../../../2B2D/Components/Animated";
import KineticBody from "../../../2B2D/Components/KineticBody";
import MappedInput from "../../../2B2D/Components/MappedInput";
import Sprite from "../../../2B2D/Components/Sprite";
import Velocity from "../../../2B2D/Components/Velocity";
import MachineState from "../../../2B2D/MachineState";
import Vec2 from "../../../2B2D/Math/Vec2";
import Update from "../../../2B2D/Update";
import PlayerPaddle from "../Components/PlayerPaddle";
import BasePlayerPaddleState from "./BasePlayerPaddleState";
import IdleState from "./IdleState";

export default class MovingState extends BasePlayerPaddleState {
    readonly updateImmediately = true;
    private constructor() { super(); }
    public static readonly Instance = new MovingState();

    readonly moveSpeed = 2.2;

    protected onEnter(update: Update, components: { entity: number; player: PlayerPaddle; input: MappedInput; velocity: Velocity; sprite: Sprite; body: KineticBody; }): void {
    }
    protected onUpdate(update: Update, components: { entity: number; player: PlayerPaddle; input: MappedInput; velocity: Velocity; sprite: Sprite; body: KineticBody; }): MachineState | undefined {
        const { velocity } = components;
        var { up, down } = this.getKeys(update, components);

        if (!up && !down) return IdleState.Instance;
        if (up) velocity.velocity = velocity.velocity.add(new Vec2(0, this.moveSpeed));
        if (down) velocity.velocity = velocity.velocity.add(new Vec2(0, -this.moveSpeed));

        this.applyUpAndDownVelocity(update, components);
    }
}