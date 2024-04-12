import Builder from "../../../2B2D/Builder";
import States from "../../States";
import SpawnRightPlayerDigit from "./Systems/SpawnRightPlayerDigit";

export default function RightPlayerDigitPlugin(builder: Builder)
{
    builder.enter(States.Gameloop, SpawnRightPlayerDigit);
}