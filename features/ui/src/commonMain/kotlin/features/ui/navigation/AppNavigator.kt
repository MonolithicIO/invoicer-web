package features.ui.navigation

import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import features.ui.screens.authmenu.AuthMenuScreen
import features.ui.screens.signup.SignUpScreen
import org.koin.compose.viewmodel.koinViewModel

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
            AuthMenuScreen(
                viewModel = koinViewModel(),
                onGoToSignUp = {
                    navController.navigate(InvoicerRoute.Auth.SignUp)
                }
            )
        }

        composable<InvoicerRoute.Auth.SignUp> {
            SignUpScreen(
                onBack = {
                    navController.popBackStack()
                }
            )
        }

        composable<InvoicerRoute.Auth.SignIn> {

        }
    }
}