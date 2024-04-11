import Builder from "../../2B2D/Builder";
import States from "../States";
import SpawnBall from "./Systems/SpawnBall";

export default function BallPlugin(builder: Builder)
{
    builder.enter(States.Gameloop, SpawnBall);
}