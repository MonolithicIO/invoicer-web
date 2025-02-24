plugins {
    `kotlin-dsl`
    `version-catalog`
    `java-gradle-plugin`
}

repositories {
    google()
    mavenCentral()
    gradlePluginPortal()
}

dependencies {
    implementation(libs.gradle.plugin.kmp)
}

gradlePlugin {
    plugins {
        create("invoicer-wasm") {
            id = "invoicer.wasm.library"
            implementationClass = "buildlogic.plugins.WasmLibraryPlugin"
        }
    }
}