import LdtkData from "../../../2B2D/Assets/LdtkData";
import CollisionTarget from "../../../2B2D/Components/CollisionTarget";
import Position from "../../../2B2D/Components/Position";
import StaticBody from "../../../2B2D/Components/StaticBody";
import Tilemap from "../../../2B2D/Components/Tilemap";
import Update from "../../../2B2D/Update";
import processLdtkIntGrid from "../../../2B2D/Utils/LdtkUtilities";
import GameAssets from "../../GameAssets";
import { GameloopCleanupTag } from "../../GamePlugin";
import GameStateResouce from "../../GameStateResource";
import Layers from "../../Layers";

export default function SpawnLevel(update: Update) {
  console.log("spawning level");
  const gameState = update.resource<GameStateResouce>(GameStateResouce.NAME);
  // Spawn background tilemap
  update.spawn([
    new Tilemap(
      Layers.BG,
      GameAssets.LevelData.Background.Texture.Handle,
      GameAssets.LevelData.Background.Tilemap.Handle(gameState.level)
    ),
    Position.fromXY(0, 0),
    GameloopCleanupTag
  ]);

  // The foreground tiles
  update.spawn([
    new Tilemap(
      Layers.FG,
      GameAssets.LevelData.Foreground.Texture.Handle,
      GameAssets.LevelData.Foreground.Tilemap.Handle(gameState.level, 0)
    ),
    Position.fromXY(0, 0),
    GameloopCleanupTag
  ]);

  const assets = update.assets();
  const ldtk = assets.assume<LdtkData>(GameAssets.LevelData.LdtkData.Handle);

  // Spawn all the static bodies
  const levelName = `Level_${gameState.level}`;
  processLdtkIntGrid(ldtk, levelName, 'Collisions', 1, (pos, size) => {
    update.spawn([
      new Position(pos),
      new StaticBody(size),
      GameloopCleanupTag
    ]);
  });

  processLdtkIntGrid(ldtk, levelName, 'Collisions', 2, (pos, size) => {
    update.spawn([
      new Position(pos),
      new CollisionTarget("EndZone", size),
      GameloopCleanupTag
    ]);
  });
}