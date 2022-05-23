import * as PIXI from 'pixi.js'
import { ParticleContainer } from 'pixi.js'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { useTweaks } from './use-tweaks'
import { Ant } from './ant'

export type WorldState = {
	app: PIXI.Application | undefined
	ticks: number
	antCount: number
	targetAntCount: number
}

export const App = () => {
	useLayoutEffect(() => {
		;(window as any).PIXI = PIXI
	}, [])
	const containerRef = useRef<HTMLDivElement>(null!)

	const stateRef = useRef<WorldState>({
		app: undefined,
		ticks: 0,
		antCount: 0,
		targetAntCount: 100,
	})
	useTweaks(stateRef.current)

	useEffect(() => {
		const app = new PIXI.Application({
			antialias: true,
			resizeTo: window,
		})

		const SIZE = 5000
		const world = new ParticleContainer(SIZE, {
			position: true,
			rotation: true,
		})
		app.stage.addChild(world)

		stateRef.current.antCount = SIZE

		stateRef.current.ticks = 0
		app.ticker.add(dt => {
			let antCount = 0
			world.children.forEach(child => {
				const padding = 10
				if (child.name === 'ant') {
					const ant = child as Ant
					ant.update(dt)
					if (ant.x < padding) {
						ant.x = padding
						ant.flipHor()
					} else if (ant.x > app.screen.width - padding) {
						ant.x = app.screen.width - padding
						ant.flipHor()
					}
					if (ant.y < padding) {
						ant.y = padding
						ant.flipVer()
					} else if (ant.y > app.screen.height - padding) {
						ant.y = app.screen.height - padding
						ant.flipVer()
					}
					antCount++
				}
			})
			stateRef.current.antCount = antCount

			if (stateRef.current.targetAntCount < stateRef.current.antCount) {
				world.removeChildAt(0)
			} else if (stateRef.current.targetAntCount > stateRef.current.antCount) {
				world.addChild(
					new Ant(
						stateRef.current,
						Math.random() * app.screen.width,
						Math.random() * app.screen.height
					)
				)
			}

			stateRef.current.ticks++
		})

		stateRef.current.app = app
		containerRef.current.replaceChildren(app.view)
		return () => app.destroy()
	}, [])

	return <div ref={containerRef}></div>
}
