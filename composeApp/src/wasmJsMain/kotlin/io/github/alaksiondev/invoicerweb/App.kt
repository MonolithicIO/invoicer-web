package io.github.alaksiondev.invoicerweb

import androidx.compose.material.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import features.ui.navigation.AppNavigator

@Composable
fun App(
    navHostController: NavHostController
) {
    MaterialTheme {
        AppNavigator(
            navController = navHostController
        )
    }
}