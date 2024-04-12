import Component from "../../../../2B2D/Component";

export default class LeftComputerDigit implements Component {
    static readonly NAME: string = 'Left Computer Digit';
    readonly name: string = LeftComputerDigit.NAME;
    controlsEnabled: boolean = true;
}