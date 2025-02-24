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