import Builder from "../../2B2D/Builder";
import CollsisionTargetHit, { CollsisionTargetHitSignal } from "../../2B2D/Signals/CollsisionTargetHit";
import States from "../States";
import HandleDeathTileTileCollisions from "./Systems/HandleDeathTileTileCollisions";
import HandleFlagTileCollisions from "./Systems/HandleFlagTileCollisions";
import SpawnLevel from "./Systems/SpawnLevel";

export const DeathTileTarget = 'DeathTileTarget';
export const FlagTileTarget = 'FlagTileTarget';

export default function LevelPlugin(builder:Builder) {
  builder.handleFromTyped<CollsisionTargetHitSignal>(CollsisionTargetHit.name, DeathTileTarget, HandleDeathTileTileCollisions);
  builder.handleFromTyped<CollsisionTargetHitSignal>(CollsisionTargetHit.name, FlagTileTarget, HandleFlagTileCollisions);

  builder.enter(States.Gameloop, SpawnLevel);
}