import Builder from "../../2B2D/Builder";
import States from "../States";
import SpawnPlayerPaddle from "./Systems/SpawnPlayer";

export default function PlayerPaddlePlugin(builder: Builder)
{
    builder.enter(States.Gameloop, SpawnPlayerPaddle);
}
