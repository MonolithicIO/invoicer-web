plugins {
    id("invoicer.wasm.library")
}

kotlin {
    sourceSets {
        commonMain {
            dependencies {
                implementation(project.dependencies.platform(libs.koin.bom))
                implementation(libs.koin.core)
                implementation(projects.features.data.api)
                implementation(projects.features.domain.api)
                implementation(projects.foundation)
                implementation(libs.kotlin.coroutines.core)
                implementation(libs.ktor.core)
            }
        }
        commonTest {
            dependencies {
                implementation(kotlin("test"))
                implementation(libs.kotlin.coroutines.test)
            }
        }
    }
}