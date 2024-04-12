import Builder from "../../../2B2D/Builder";
import States from "../../States";
import SpawnLeftPlayerDigit from "./Systems/SpawnLeftPlayerDigit";

export default function LeftPlayerDigitPlugin(builder: Builder)
{
    builder.enter(States.Gameloop, SpawnLeftPlayerDigit);
}