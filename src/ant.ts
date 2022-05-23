import { Sprite, Texture } from 'pixi.js'
import AntImage from './ant.jpeg'
import { WorldState } from './app'

export class Ant extends Sprite {
	name = 'ant' as const

	public tick: number = 0

	static SPEED = 5

	state: 'fromColony' | 'fromFood' = 'fromColony'

	constructor(protected worldState: WorldState, x: number, y: number) {
		super()
		this.texture = Texture.from(AntImage)
		this.texture.rotate = 6
		this.x = x
		this.y = y
		this.width = 20
		this.height = 10
		this.anchor.x = 0.5
		this.anchor.y = 0.5
		this.tint = Math.random() * 0xa0a0a0
	}

	update(dt: number) {
		if (Math.random() > 0.9) {
			this.rotation = Math.random() * Math.PI * 2
		}

		this.x += dt * Ant.SPEED * Math.cos(this.rotation)
		this.y += dt * Ant.SPEED * Math.sin(this.rotation)

		this.tick++
	}

	flipHor() {
		this.rotation = Math.PI - this.rotation
	}

	flipVer() {
		this.rotation = 2 * Math.PI - this.rotation
	}

	releasePheromone() {}
}
