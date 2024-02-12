export { preview }

async function preview() {
  const { preview: previewVite } = await import('vite')
  const { resolveConfig } = await import('./resolveConfig.js')
  const { isVikeCli } = await import('./isVikeCli.js')
  // Adds vike to viteConfig if not present
  const { viteConfig, viteConfigResolved: resolvedConfig } = await resolveConfig({}, 'preview')
  if (!isVikeCli) return previewVite(viteConfig)

  const { default: pc } = await import('@brillout/picocolors')
  try {
    const server = await previewVite(viteConfig)
    server.printUrls()
    server.bindCLIShortcuts({ print: true })
    return server
  } catch (e: any) {
    resolvedConfig.logger.error(pc.red(`error when starting preview server:\n${e.stack}`), {
      error: e
    })
    process.exit(1)
  }
}