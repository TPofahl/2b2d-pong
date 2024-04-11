import Component from "../../../2B2D/Component";
import Vec2 from "../../../2B2D/Math/Vec2";

export default class PlayerPaddle implements Component {
    static readonly NAME: string = 'Player Paddle';
    readonly name: string = PlayerPaddle.NAME;
    controlsEnabled: boolean = true;
}