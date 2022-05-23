import { Circle, Container, Graphics, Text } from 'pixi.js'
import { World } from './world'

export class Food extends Container {
	bounds: Circle
	circle: Graphics
	text: Text

	constructor(
		public world: World,
		x: number,
		y: number,
		public amount: number
	) {
		super()
		this.x = x
		this.y = y
		this.width = 50
		this.height = 50
		this.bounds = new Circle(this.x, this.y, 50)

		this.circle = new Graphics()
		this.circle.beginFill(0x00ff00)
		this.circle.drawCircle(this.x, this.y, 50)
		this.circle.endFill()
		this.addChild(this.circle)

		this.text = new Text(this.amount.toPrecision(4).toString(), {
			fontFamily: 'Arial',
			fontSize: 24,
			fill: 0xff1010,
			align: 'center',
		})
		this.text.x = this.x
		this.text.y = this.y
		this.addChild(this.text)
	}

	update(dt: number) {
		if (Math.random() > 0.8) this.amount--
		this.text.text = this.amount.toPrecision(4).toString()
		if (this.amount < 0) this.world.removeChild(this)
	}
}
