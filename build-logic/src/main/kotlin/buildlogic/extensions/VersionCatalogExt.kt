package buildlogic.extensions

import org.gradle.api.Project
import org.gradle.api.artifacts.VersionCatalogsExtension
import org.gradle.api.provider.Provider
import org.gradle.plugin.use.PluginDependency

private val Project.versionCatalog
    get() = extensions.getByType(VersionCatalogsExtension::class.java).named("libs")

internal fun Project.getPlugin(pluginName: String): Provider<PluginDependency> {
    return versionCatalog.findPlugin(pluginName).get()
}