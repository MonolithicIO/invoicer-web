plugins {
    id("invoicer.wasm.library")
}

kotlin {
    sourceSets.commonMain.dependencies {
        implementation(project.dependencies.platform(libs.koin.bom))
        implementation(libs.koin.core)
        implementation(projects.features.data.api)
        implementation(projects.features.domain.api)
    }
}