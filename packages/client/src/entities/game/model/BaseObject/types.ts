import { Canvas } from '../../ui/Canvas/Canvas';
import { elementCoords } from '../../ui/Canvas/types';
import { SpriteConstants } from '../../ui/Sprite/SpriteConfig';

export type basicVelocity = {
  dx: number;
  dy: number;
};

export type basicSize = {
  width: number;
  height: number;
};

export type baseObjectProps = {
  scene: Canvas;
  type?: SpriteConstants;
  velocity?: basicVelocity;
  position?: elementCoords;
  size?: basicSize;
};
