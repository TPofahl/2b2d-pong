import Component from "../../../2B2D/Component";

export default class Ball implements Component {
    static readonly NAME: string = 'Ball';
    readonly name: string = Ball.NAME;
    controlsEnabled: boolean = true;
}