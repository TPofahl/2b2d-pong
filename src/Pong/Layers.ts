import Builder from "../2B2D/Builder";

const Layers = {
  BG: 'BG',
  Entities: 'Entities',
  FG: 'FG',

  add: function (builder: Builder) {
    builder.layer(Layers.BG);
    builder.layer(Layers.FG);
    builder.layer(Layers.Entities);
  }
};

export default Layers;
