import KineticBody from "../../../2B2D/Components/KineticBody";
import MappedInput from "../../../2B2D/Components/MappedInput";
import Sprite from "../../../2B2D/Components/Sprite";
import Velocity from "../../../2B2D/Components/Velocity";
import MachineState from "../../../2B2D/MachineState";
import Update from "../../../2B2D/Update";
import Ball from "../Components/Ball";
import BaseBallState from "./BaseBallState";

export default class IdleState extends BaseBallState {
    readonly updateImmediately = true;
    private constructor() { super(); }
    public static readonly Instance = new IdleState();

    protected onEnter(update: Update, components: { entity: number; player: Ball; input: MappedInput; velocity: Velocity; sprite: Sprite; body: KineticBody; }): void {
    }
    protected onUpdate(update: Update, components: { entity: number; player: Ball; input: MappedInput; velocity: Velocity; sprite: Sprite; body: KineticBody; }): MachineState | undefined {
        return IdleState.Instance;
    }
}