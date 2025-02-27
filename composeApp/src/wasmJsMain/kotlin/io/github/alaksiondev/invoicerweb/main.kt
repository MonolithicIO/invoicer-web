package io.github.alaksiondev.invoicerweb

import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.window.ComposeViewport
import androidx.navigation.ExperimentalBrowserHistoryApi
import androidx.navigation.bindToNavigation
import androidx.navigation.compose.rememberNavController
import features.data.impl.di.dataDiModule
import features.domain.impl.di.domainDiModule
import features.ui.di.uiDiModule
import foundation.di.foundationDiModule
import kotlinx.browser.document
import kotlinx.browser.window
import org.koin.core.context.startKoin

@OptIn(ExperimentalComposeUiApi::class, ExperimentalBrowserHistoryApi::class)
fun main() {
    ComposeViewport(document.body!!) {
        startKoin {
            modules(dataDiModule, domainDiModule, uiDiModule, foundationDiModule)
        }
        val navController = rememberNavController()

        App(
            navHostController = navController
        )

        LaunchedEffect(Unit) {
            window.bindToNavigation(
                navController = navController
            )
        }
    }
}