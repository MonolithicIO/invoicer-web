package features.ui.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController

@Composable
fun AppNavigator() {
    val navController = rememberNavController()
    NavHost(
        navController = navController,
        startDestination = InvoicerRoute.Auth.AuthMenu
    ) {

        composable<InvoicerRoute.Auth.AuthMenu> {

        }

        composable<InvoicerRoute.Auth.SignIn> {

        }

        composable<InvoicerRoute.Auth.SignUp> {

        }
    }
}