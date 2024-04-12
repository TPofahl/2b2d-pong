import Component from "../../../../2B2D/Component";

export default class RightPlayerDigit implements Component {
    static readonly NAME: string = 'Right Player Digit';
    readonly name: string = RightPlayerDigit.NAME;
    controlsEnabled: boolean = true;
}