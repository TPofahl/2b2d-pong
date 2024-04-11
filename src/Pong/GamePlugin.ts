import Builder from "../2B2D/Builder";
import ApplyAabbPhysics from "../2B2D/Systems/ApplyAabbPhysics";
import DetectCollisionTargetHits from "../2B2D/Systems/DetectCollisionTargetHits";
import Update from "../2B2D/Update";
import BallPlugin from "./Ball/BallPlugin";
import ComputerPaddlePlugin from "./ComputerPaddle/ComputerPaddlePlugin";
import Config from "./Config";
import GameStateResouce from "./GameStateResource";
import InitPlugin, { InitializationComplete } from "./Init/InitPlugin";
import Layers from "./Layers";
import LevelPlugin from "./Level/LevelPlugin";
import PlayerPaddlePlugin from "./PlayerPaddle/PlayerPaddlePlugin";
import States from "./States";

export const GameloopCleanupTag = 'GameloopCleanupTag';
export const ExitingGameLoopSignal = 'ExitingGameLoopSignal';

export default function GamePlugin(builder: Builder) {
  Layers.add(builder);

  builder.resource(new GameStateResouce());

  // Init plugin loads stuff, spawns camera, etc.
  builder.plugin(InitPlugin);

  // Spawns/despawns the level, runs level collisions
  builder.plugin(LevelPlugin);

  // Spawns the player paddle
  builder.plugin(PlayerPaddlePlugin)

  // Spawns the computer paddle
  builder.plugin(ComputerPaddlePlugin);

  // Spawns the ball
  builder.plugin(BallPlugin);
  
  // Global systems and events
  builder.update(States.Gameloop, ApplyAabbPhysics);
  builder.update(States.Gameloop, DetectCollisionTargetHits);
  builder.cleanup(States.Gameloop, GameloopCleanupTag);
  builder.handle(InitializationComplete, startGameLoop);
}

function startGameLoop(update: Update) {
  const res = update.resource<GameStateResouce>(GameStateResouce.NAME);

  res.level = Config.StartLevelId;

  update.enter(States.Gameloop);
}