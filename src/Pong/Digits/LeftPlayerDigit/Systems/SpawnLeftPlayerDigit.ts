import LdtkData from "../../../../2B2D/Assets/LdtkData";
import KineticBody from "../../../../2B2D/Components/KineticBody";
import Position from "../../../../2B2D/Components/Position";
import Sprite from "../../../../2B2D/Components/Sprite";
import StateMachine from "../../../../2B2D/Components/StateMachine";
import UseSpriteRenderer from "../../../../2B2D/Components/UseSpriteRenderer";
import Velocity from "../../../../2B2D/Components/Velocity";
import Weight from "../../../../2B2D/Components/Weight";
import Vec2 from "../../../../2B2D/Math/Vec2";
import Update from "../../../../2B2D/Update";
import GameAssets from "../../../GameAssets";
import { GameloopCleanupTag } from "../../../GamePlugin";
import GameStateResouce from "../../../GameStateResource";
import Layers from "../../../Layers";
import LeftPlayerDigit from "../Components/LeftPlayerDigit";
import IdleState from "../Machines/IdleState";

export default function SpawnLeftPlayerDigit(update: Update) {
    const gameState = update.resource<GameStateResouce>(GameStateResouce.NAME);
    const assets = update.assets();

    const ldtk = assets.assume<LdtkData>(GameAssets.LevelData.LdtkData.Handle);

    const levelName = `Level_${gameState.level}`;
    const level = ldtk.levels.find(x => x.identifier == levelName)!;
    const entities = level.layerInstances.find(x => x.__identifier == 'Entities')!;
    const player = entities.entityInstances.find(x => x.__identifier == 'Player_Score_Left_Digit')!;
    const offset = new Vec2(level.pxWid, level.pxHei).scalarMultiply(-0.5);
    const position = new Vec2(player.px[0], level.pxHei - player.px[1]).add(offset);

    update.spawn([
        new Position(position),
        new Sprite(
          GameAssets.LevelData.Digit.Texture.Handle,
          GameAssets.LevelData.Digit.Atlas.Handle,
          Layers.Entities,
        ),
        UseSpriteRenderer,
        new Velocity(Vec2.ZERO),
        new KineticBody(new Vec2(16, 32)),
        new Weight(0), // Turn off gravity.
        new LeftPlayerDigit(),
        GameloopCleanupTag,
        new StateMachine(IdleState.Instance),
      ]);
}