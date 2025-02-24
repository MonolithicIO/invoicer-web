plugins {
    id("invoicer.wasm.library")
}

kotlin {
    sourceSets.commonMain.dependencies {
        implementation(projects.features.domain.api)
    }
}