plugins {
    id("invoicer.wasm.library")
}

kotlin {
    sourceSets {
        commonMain {
            dependencies {
                implementation(libs.kotlin.datetime)
                implementation(libs.kotlin.coroutines.core)
            }
        }
    }
}