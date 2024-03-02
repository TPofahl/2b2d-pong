import LdtkData from "../../../2B2D/Assets/LdtkData";
import Component from "../../../2B2D/Component";
import Camera from "../../../2B2D/Components/Camera";
import Position, { PositionComponent } from "../../../2B2D/Components/Position";
import Vec2 from "../../../2B2D/Math/Vec2";
import Update from "../../../2B2D/Update";
import GameAssets from "../../GameAssets";
import { GameStateResouce } from "../../GameStateResource";
import Player from "../Components/Player";

let levelId:number | undefined = undefined;
let topLeft = Vec2.ZERO;
let bottomRight = Vec2.ZERO;


export default function cameraFollowPlayer(update:Update) {

  const player = update.single([ Player.name, Position.name ]);
  const camera = update.single([ Camera.name, Position.name ]);

  if (!player || !camera)
    return;

  const gameState = update.resource<GameStateResouce>(GameStateResouce.name);
  const assets = update.assets();
  if (levelId != gameState.level) {
    const ldtk = assets.assume<LdtkData>(GameAssets.LevelData.LdtkData.Handle);
    const levelName = `Level_${gameState.level}`;
    const level = ldtk.levels.find(x => x.identifier == levelName)!;

    const screenSize = new Vec2(update.data.rendering.width, update.data.rendering.height)
      .scalarMultiply(0.125);
    const levelSize = new Vec2(level.pxWid, level.pxHei).scalarMultiply(0.5);

    topLeft = Vec2.ZERO.sub(levelSize).add(screenSize);
    bottomRight = Vec2.ZERO.add(levelSize).sub(screenSize);

    levelId = gameState.level;
  }
  
  const [ _player, playerPosition ] = player.components as [ Component, PositionComponent ];
  const [ _camera, cameraPosition ] = camera.components as [ Component, PositionComponent ];

  cameraPosition.pos = playerPosition.pos.max(topLeft).min(bottomRight);
}