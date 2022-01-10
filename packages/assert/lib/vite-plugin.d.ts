import type * as rollup from 'rollup'
import type * as vite from 'vite'

export interface PluginFactory {
	(handlers: Partial<Handlers>): Plugin
}

export type Plugin = vite.Plugin

export interface Handlers {
	load: LoadHandler
	transform: TransformHandler
}

export interface LoadHandler {
	(
		this: rollup.PluginContext,
		id: string,
		assert: AssertionData,
		ssr?: boolean
	): rollup.LoadResult | Promise<rollup.LoadResult>
}

export interface TransformHandler {
	(
		this: rollup.TransformPluginContext,
		code: string,
		id: string,
		assert: AssertionData,
		ssr?: boolean
	): Promise<rollup.TransformResult> | rollup.TransformResult
}

export interface AssertionMap {
	[id: string]: AssertionInfo
}

export interface AssertionInfo {
	id: string
	assert: AssertionData
}

export type AssertionData = { [key: string]: JsonLike }

export type JsonLike = string | number | boolean | null | { [k: string]: JsonLike } | JsonLike[];

declare var vitePlugin: PluginFactory
