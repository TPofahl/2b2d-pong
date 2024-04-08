import loadJsonAsset from "../2B2D/Assets/JsonAsset";
import LdtkData from "../2B2D/Assets/LdtkData";
import loadTextureAsset from "../2B2D/Assets/TextureAsset";
import createTilemapFromLdtkJson from "../2B2D/Assets/TilemapData";
import AssetsResource from "../2B2D/Resources/AssetsResource";
import AudioResource from "../2B2D/Resources/AudioResource";

const GameAssets = {
  LevelData: {
    LdtkData: {
      Handle: 'ldtk-data',
      Load: () => loadJsonAsset<LdtkData>(GameAssets.LevelData.LdtkData.Handle, 'assets/scenes.ldtk')
    },
    // The black background.
    Background: {
      Texture: {
        Handle: 'level-bg-texture',
        Load: () => loadTextureAsset(GameAssets.LevelData.Background.Texture.Handle, 'assets/pong-background.png'),
      },
      Tilemap: {
        Handle: (id: number) => `level-bg-layer-${id}`
      }
    },
    // "Tiles" make up the platforms AND foreground tiles.
    Foreground: {
      Texture: {
        Handle: 'level-fg-texture',
        Load: () => loadTextureAsset(GameAssets.LevelData.Foreground.Texture.Handle, 'assets/pong-foreground.png')
      },
      Tilemap: {
        Handle: (level: number, frame: number) => `level-fg-tilemap-${level}-${frame}`
      }
    }
  },
  Init: (assets: AssetsResource, audio: AudioResource) => {
    assets.add(GameAssets.LevelData.LdtkData.Load());
    assets.add(GameAssets.LevelData.Background.Texture.Load());
    assets.add(GameAssets.LevelData.Foreground.Texture.Load());
  },
  IsLoaded: (assets: AssetsResource) => {
    return assets.loaded([
      GameAssets.LevelData.LdtkData.Handle,
      GameAssets.LevelData.Background.Texture.Handle,
      GameAssets.LevelData.Foreground.Texture.Handle,
    ]);
  },
  GenerateTilemaps: (assets: AssetsResource) => {
    const ldtk = assets.assume<LdtkData>(GameAssets.LevelData.LdtkData.Handle);

    for (let i = 0; i < ldtk.levels.length; i++) {
      // Background tiles
      assets.add(createTilemapFromLdtkJson(GameAssets.LevelData.Background.Tilemap.Handle(i), ldtk, `Level_${i}`, 'Background', 0));

      // Foreground tiles
      assets.add(createTilemapFromLdtkJson(GameAssets.LevelData.Foreground.Tilemap.Handle(i, 0), ldtk, `Level_${i}`, 'Foreground', 0));
    }
  }
};

export default GameAssets;
