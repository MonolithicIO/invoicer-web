plugins {
    id("invoicer.wasm.library")
}

kotlin {
    sourceSets.commonMain.dependencies {
        implementation(projects.features.domain.api)
        implementation(project.dependencies.platform(libs.koin.bom))
        implementation(libs.koin.core)
    }
}