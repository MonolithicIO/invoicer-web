package features.ui.navigation

import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import features.ui.screens.authmenu.AuthMenuScreen

@Composable
fun AppNavigator(
    navController: NavHostController
) {
    NavHost(
        modifier = Modifier.fillMaxSize(),
        navController = navController,
        startDestination = InvoicerRoute.Auth.AuthMenu
    ) {

        composable<InvoicerRoute.Auth.AuthMenu> {
            AuthMenuScreen()
        }

        composable<InvoicerRoute.Auth.SignUp> {

        }

        composable<InvoicerRoute.Auth.SignIn> {

        }
    }
}