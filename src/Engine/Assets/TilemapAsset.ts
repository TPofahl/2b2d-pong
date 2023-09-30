import Asset from "../Asset";
import Vec2 from "../Math/Vec2";

// A minimum definition of Ldtk's JSON structure
export interface LdtkData {
  defs: {
    tilesets: {
      uid: number,
      __cWid: number,
      __cHei: number,
      tileGridSize: number,
      spacing: number
    }[]
  },
  levels: {
    identifier: string,
    pxWid: number,
    pxHei: number,
    layerInstances: {
      __identifier: string,
      __tilesetDefUid: number,
      __cWid: number,
      __cHei: number,
      gridTiles: {
        px: [number, number], 
        src: [number, number], 
      }[]
    }[]
  }[]
}

export interface TilemapData {
  tileSize:Vec2, 
  spriteTileCount:Vec2,
  mapTileCount:Vec2, 
  data:Uint32Array
}

export default function createTilemapFromLdtkJson(name:string, ldtkJson:any, levelName:string, layerName:string) {
  const ldtkData = ldtkJson as LdtkData;

  const level = ldtkData.levels.find(x => x.identifier == levelName)!;
  const layer = level.layerInstances.find(x => x.__identifier == layerName)!;
  const tileset = ldtkData.defs.tilesets.find(x => x.uid == layer.__tilesetDefUid)!;

  const tileSize = new Vec2(tileset.tileGridSize, tileset.tileGridSize);
  const spriteTileCount = new Vec2(tileset.__cWid, tileset.__cHei);
  const mapTileCount = new Vec2(layer.__cWid, layer.__cHei);

  if (tileset.spacing != 0)
    throw new Error('Tilemaps only work with 0-spacing sprites');

  const totalElements = mapTileCount.x * mapTileCount.y * 2;
  const data = new Uint32Array(totalElements);
  let offset = 0;
  for (let y = 0; y < mapTileCount.y; y++) {
    for (let x = 0; x < mapTileCount.x; x++) {
      const tile = layer.gridTiles.find(i => i.px[0] == x * tileSize.x && i.px[1] == y * tileSize.y)!;
      const srcX = tile.src[0] / tileSize.x;
      const srcY = tile.src[1] / tileSize.y;
      
      data.set([srcX, srcY], offset);
      offset += 2;
    }
  }

  const tilemapData:TilemapData = {
    tileSize,
    spriteTileCount,
    mapTileCount,
    data
  };

  return new Asset<TilemapData>(name, Promise.resolve(tilemapData));
}
