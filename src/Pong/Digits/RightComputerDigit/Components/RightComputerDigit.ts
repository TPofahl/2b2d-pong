import Component from "../../../../2B2D/Component";

export default class RightComputerDigit implements Component {
    static readonly NAME: string = 'Right Computer Digit';
    readonly name: string = RightComputerDigit.NAME;
    controlsEnabled: boolean = true;
}