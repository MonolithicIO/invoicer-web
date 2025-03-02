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
        startDestination = "auth_menu"
    ) {

        composable("auth_menu") {
            AuthMenuScreen(
                viewModel = koinViewModel(),
                onGoToSignUp = {
                    navController.navigate("sign_up")
                }
            )
        }

        composable("sign_up") {
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