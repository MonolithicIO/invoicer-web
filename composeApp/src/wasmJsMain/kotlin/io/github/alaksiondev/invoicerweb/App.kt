package io.github.alaksiondev.invoicerweb

import androidx.compose.material.MaterialTheme
import androidx.compose.runtime.Composable
import features.data.impl.di.dataDiModule
import features.domain.impl.di.domainDiModule
import features.ui.di.uiDiModule
import features.ui.navigation.AppNavigator
import org.koin.core.context.startKoin

@Composable
fun App() {
    startKoin {
        modules(dataDiModule, domainDiModule, uiDiModule)
    }

    MaterialTheme {
        AppNavigator()
    }
}