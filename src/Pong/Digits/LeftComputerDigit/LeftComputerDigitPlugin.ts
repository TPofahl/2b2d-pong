import Builder from "../../../2B2D/Builder";
import States from "../../States";
import SpawnLeftComputerDigit from "./Systems/SpawnLeftComputerDigit";

export default function LeftComputerDigitPlugin(builder: Builder)
{
    builder.enter(States.Gameloop, SpawnLeftComputerDigit);
}