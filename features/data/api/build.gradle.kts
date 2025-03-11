plugins {
    id("invoicer.wasm.library")
    alias(libs.plugins.kotlinSerialization)
}

kotlin {
    sourceSets.commonMain.dependencies {
        implementation(libs.kotlin.serialization)
        implementation(libs.kotlin.datetime)
    }
}