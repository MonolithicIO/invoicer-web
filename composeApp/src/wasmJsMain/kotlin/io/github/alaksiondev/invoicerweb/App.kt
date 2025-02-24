package io.github.alaksiondev.invoicerweb

import androidx.compose.material.Button
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.lifecycle.ViewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import kotlinx.serialization.Serializable
import org.koin.compose.viewmodel.koinViewModel
import org.koin.core.context.startKoin
import org.koin.core.module.dsl.viewModel
import org.koin.dsl.module

@Serializable
data object Test

@Serializable
data object Test2

@Composable
fun App() {
    startKoin {
        modules(module)
    }

    MaterialTheme {
        val navController = rememberNavController()
        NavHost(
            navController = navController,
            startDestination = Test
        ) {

            composable<Test> {
                Text("Hello I'm test1")
                Button(
                    onClick = { navController.navigate(Test2) }
                ) {
                    val viewModel = koinViewModel<TestViewModel>()
                    Text("Go to Test2")
                }
            }

            composable<Test2> {
                Text("Hello I'm test2")
                Button(
                    onClick = {
                        navController.navigate(Test)
                    }
                ) {
                    Text("Go to Test1")
                }
            }
        }
    }
}

val module = module {
    viewModel { TestViewModel() }
}

class TestViewModel : ViewModel() {

}