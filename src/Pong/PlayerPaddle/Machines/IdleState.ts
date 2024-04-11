import KineticBody from "../../../2B2D/Components/KineticBody";
import MappedInput from "../../../2B2D/Components/MappedInput";
import Sprite from "../../../2B2D/Components/Sprite";
import Velocity from "../../../2B2D/Components/Velocity";
import MachineState from "../../../2B2D/MachineState";
import Update from "../../../2B2D/Update";
import PlayerPaddle from "../Components/PlayerPaddle";
import BasePlayerPaddleState from "./BasePlayerPaddleState"
import MovingState from "./MovingState";

export default class IdleState extends BasePlayerPaddleState {
    readonly updateImmediately = true;
    private constructor() { super(); }
    public static readonly Instance = new IdleState();

    protected onEnter(update: Update, components: { entity: number; player: PlayerPaddle; input: MappedInput; velocity: Velocity; sprite: Sprite; body: KineticBody; }): void {
    }
    protected onUpdate(update: Update, components: { entity: number; player: PlayerPaddle; input: MappedInput; velocity: Velocity; sprite: Sprite; body: KineticBody; }): MachineState | undefined {
        var { up, down } = this.getKeys(update, components);
        if (up || down) {
            return MovingState.Instance;
        }

        this.applyUpAndDownVelocity(update, components);
    }
}