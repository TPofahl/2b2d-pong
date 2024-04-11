import Animated from "../../../2B2D/Components/Animated";
import KineticBody from "../../../2B2D/Components/KineticBody";
import MappedInput from "../../../2B2D/Components/MappedInput";
import Sprite from "../../../2B2D/Components/Sprite";
import Velocity from "../../../2B2D/Components/Velocity";
import MachineState from "../../../2B2D/MachineState";
import Update from "../../../2B2D/Update";
import PlayerPaddle from "../Components/PlayerPaddle";
import BasePlayerPaddleState from "./BasePlayerPaddleState";

export default class MovingState extends BasePlayerPaddleState {
    readonly updateImmediately: boolean = true;
    private constructor() { super(); }
    public static readonly Instance = new MovingState();

    protected onEnter(update: Update, components: { entity: number; player: PlayerPaddle; input: MappedInput; velocity: Velocity; animation: Animated; sprite: Sprite; body: KineticBody; }): void {
    }
    protected onUpdate(update: Update, components: { entity: number; player: PlayerPaddle; input: MappedInput; velocity: Velocity; animation: Animated; sprite: Sprite; body: KineticBody; }): MachineState | undefined {
        var { up, down } = this.getKeys(update, components);
        console.log("testing");
        if (up || down) {
            return MovingState.Instance;
        }
        console.log("moving");
        this.applyUpAndDownVelocity(update, components);
    }
}