plugins {
    id("invoicer.wasm.library")
    alias(libs.plugins.composeMultiplatform)
    alias(libs.plugins.composeCompiler)
    alias(libs.plugins.kotlinSerialization)
}

kotlin {
    sourceSets {

        commonMain.dependencies {
            implementation(project.dependencies.platform(libs.koin.bom))
            implementation(libs.bundles.koin)
            implementation(compose.runtime)
            implementation(compose.foundation)
            implementation(compose.material)
            implementation(compose.ui)
            implementation(libs.compose.navigation)

            // App
            implementation(projects.features.data.impl)
            implementation(projects.features.domain.impl)
            implementation(projects.features.ui)
            implementation(projects.foundation)
        }
    }
}