import Builder from "../../2B2D/Builder";
import States from "../States";
import SpawnComputerPaddle from "./Systems/SpawnComputer";

export default function ComputerPaddlePlugin(builder: Builder)
{
    builder.enter(States.Gameloop, SpawnComputerPaddle);
}