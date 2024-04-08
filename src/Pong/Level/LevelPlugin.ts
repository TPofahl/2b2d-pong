import Builder from "../../2B2D/Builder";
import States from "../States";
import SpawnLevel from "./Systems/SpawnLevel";

export default function LevelPlugin(builder: Builder) {

  builder.enter(States.Gameloop, SpawnLevel);
}
