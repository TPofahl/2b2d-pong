import Builder from "../../../2B2D/Builder";
import States from "../../States";
import SpawnRightComputerDigit from "./Systems/SpawnRightComputerDigit";

export default function RightComputerDigitPlugin(builder: Builder)
{
    builder.enter(States.Gameloop, SpawnRightComputerDigit);
}