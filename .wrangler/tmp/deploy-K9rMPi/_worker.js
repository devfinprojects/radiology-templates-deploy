// _worker.js - Cloudflare Pages adapter for Next.js standalone output
import { getAssetFromKV, handleRequest } from '@cloudflare/next-on-pages';

/**
 * The debug flag controls verbose logging
 * Set it to true to see detailed request handling
 */
const debug = false;

/**
 * @param {FetchEvent} event
 * @returns {Promise<Response>}
 */
export default {
	async fetch(request, env, context) {
		try {
			// First try to serve static assets from KV
			const asset = await getAssetFromKV(request, { cloudflareEnv: env });
			if (asset) {
				return asset;
			}
			// Fall back to Next.js dynamic request handling
			return await handleRequest(request, { debug, cloudflareEnv: env });
		} catch (e) {
			if (debug) {
				return new Response(e.message + '\n' + e.stack, { status: 500 });
			}
			return new Response('Internal Server Error', { status: 500 });
		}
	},

	/**
	 * @param {DurableObjectNamespace} namespace
	 * @param {DurableObjectState} state
	 * @param {Environment} env
	 */
	async scheduled(controller, env, ctx) {
		// Handle scheduled tasks if needed
	},
};