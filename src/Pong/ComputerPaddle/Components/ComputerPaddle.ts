import Component from "../../../2B2D/Component";

export default class ComputerPaddle implements Component {
    static readonly NAME: string = 'Computer Paddle';
    readonly name: string = ComputerPaddle.NAME;
    controlsEnabled: boolean = true;
}