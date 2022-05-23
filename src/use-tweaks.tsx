import { useEffect } from 'react'
import { Pane } from 'tweakpane'
import * as TPEssentialPlugins from '@tweakpane/plugin-essentials'
import { WorldState } from './app'

export const useTweaks = (state: WorldState) => {
	useEffect(() => {
		const pane = new Pane({ title: 'Simulation' })
		pane.registerPlugin(TPEssentialPlugins)

		const MAX_ANTS = 10000

		const controls = pane.addFolder({ title: 'Controls' })
		controls.addInput(state, 'targetAntCount', {
			label: 'Ant Count',
			min: 0,
			max: MAX_ANTS,
			step: 1,
		})

		const stats = pane.addFolder({ title: 'Stats' })
		stats.addMonitor(state, 'ticks', { label: 'Ticks', interval: 16 })
		stats.addMonitor(state, 'antCount', { label: 'Current Ants' })
		stats.addMonitor(state, 'antCount', {
			label: 'Current Ants',
			view: 'graph',
			min: 0,
			max: MAX_ANTS,
		})
		const fpsGraph: any = stats.addBlade({ view: 'fpsgraph' })
		state.app?.ticker?.add(() => {
			fpsGraph.begin()
			fpsGraph.end()
		})

		pane.on('change', ev => ((state as any)[ev.presetKey!] = ev.value))

		return () => pane.dispose()
	}, [state, state.app, state.app?.ticker])
}
