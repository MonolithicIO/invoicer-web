plugins {
    id("invoicer.wasm.library")
    alias(libs.plugins.composeMultiplatform)
    alias(libs.plugins.composeCompiler)
    alias(libs.plugins.kotlinSerialization)
}

kotlin {
    sourceSets.commonMain.dependencies {
        implementation(project.dependencies.platform(libs.koin.bom))
        implementation(libs.bundles.koin)
        implementation(libs.kotlin.serialization)
        implementation(libs.androidx.lifecycle.viewmodel)
        implementation(libs.androidx.lifecycle.runtime.compose)
        implementation(libs.compose.navigation)
        implementation(compose.runtime)
        implementation(compose.foundation)
        implementation(compose.material)
        implementation(compose.ui)
        implementation(compose.components.resources)
        implementation(compose.components.uiToolingPreview)
        implementation(projects.features.domain.api)
    }
}