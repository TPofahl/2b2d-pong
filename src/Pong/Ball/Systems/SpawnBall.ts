import LdtkData from "../../../2B2D/Assets/LdtkData";
import KineticBody from "../../../2B2D/Components/KineticBody";
import Position from "../../../2B2D/Components/Position";
import Sprite from "../../../2B2D/Components/Sprite";
import StateMachine from "../../../2B2D/Components/StateMachine";
import UseSpriteRenderer from "../../../2B2D/Components/UseSpriteRenderer";
import Velocity from "../../../2B2D/Components/Velocity";
import Weight from "../../../2B2D/Components/Weight";
import Vec2 from "../../../2B2D/Math/Vec2";
import Update from "../../../2B2D/Update";
import GameAssets from "../../GameAssets";
import { GameloopCleanupTag } from "../../GamePlugin";
import GameStateResouce from "../../GameStateResource";
import Layers from "../../Layers";
import Ball from "../Components/Ball";
import IdleState from "../Machines/IdleState";

export default function SpawnBall(update: Update) {
    const gameState = update.resource<GameStateResouce>(GameStateResouce.NAME);
    const assets = update.assets();

    const ldtk = assets.assume<LdtkData>(GameAssets.LevelData.LdtkData.Handle);

    const levelName = `Level_${gameState.level}`;
    const level = ldtk.levels.find(x => x.identifier == levelName)!;
    const entities = level.layerInstances.find(x => x.__identifier == 'Entities')!;
    const player = entities.entityInstances.find(x => x.__identifier == 'Ball')!;
    const offset = new Vec2(level.pxWid, level.pxHei).scalarMultiply(-0.5);
    const position = new Vec2(player.px[0], level.pxHei - player.px[1]).add(offset);

    update.spawn([
        new Position(position),
        new Sprite(
          GameAssets.LevelData.Ball.Texture.Handle,
          GameAssets.LevelData.Ball.Atlas.Handle,
          Layers.Entities,
        ),
        UseSpriteRenderer,
        new Velocity(Vec2.ZERO),
        new KineticBody(new Vec2(8, 12)),
        new Weight(0), // Turn off gravity.
        new Ball(),
        GameloopCleanupTag,
        new StateMachine(IdleState.Instance),
      ]);
}