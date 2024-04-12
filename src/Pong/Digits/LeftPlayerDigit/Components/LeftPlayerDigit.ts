import Component from "../../../../2B2D/Component";

export default class LeftPlayerDigit implements Component {
    static readonly NAME: string = 'Left Player Digit';
    readonly name: string = LeftPlayerDigit.NAME;
    controlsEnabled: boolean = true;
}