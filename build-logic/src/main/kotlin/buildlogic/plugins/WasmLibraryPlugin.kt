package buildlogic.plugins

import buildlogic.extensions.getPlugin
import org.gradle.api.Plugin
import org.gradle.api.Project
import org.gradle.internal.extensions.stdlib.capitalized
import org.gradle.kotlin.dsl.configure
import org.jetbrains.kotlin.gradle.ExperimentalWasmDsl
import org.jetbrains.kotlin.gradle.dsl.KotlinMultiplatformExtension
import org.jetbrains.kotlin.gradle.targets.js.webpack.KotlinWebpackConfig

class WasmLibraryPlugin : Plugin<Project> {

    @OptIn(ExperimentalWasmDsl::class)
    override fun apply(target: Project) = with(target) {
        val projectName = getModuleName(target)
        val jsProjectName = "$projectName.js"

        pluginManager.apply(
            getPlugin("kotlinMultiplatform").get().pluginId
        )

        configure<KotlinMultiplatformExtension> {
            wasmJs {
                moduleName = projectName
                browser {
                    val rootDirPath = project.rootDir.path
                    val projectDirPath = project.projectDir.path
                    commonWebpackConfig {
                        outputFileName = jsProjectName
                        devServer = (devServer ?: KotlinWebpackConfig.DevServer()).apply {
                            static = (static ?: mutableListOf()).apply {
                                // Serve sources to debug inside browser
                                add(rootDirPath)
                                add(projectDirPath)
                            }
                        }
                    }
                }
                binaries.executable()
            }
        }
    }

    private fun getModuleName(
        project: Project
    ): String {
        val sanitized = project.path
            .drop(1)
            .replace(":", ".")
            .split(".")
            .joinToString(separator = "") { it.capitalized() }

        return sanitized
    }
}