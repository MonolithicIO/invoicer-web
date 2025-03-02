package features.ui.screens.authmenu

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import features.ui.screens.authmenu.components.AuthMenuLeftSection
import features.ui.screens.authmenu.components.AuthMenuRightSection
import foundation.statemanager.StateMode

@Composable
internal fun AuthMenuScreen(
    modifier: Modifier = Modifier,
    viewModel: AuthMenuViewModel
) {
    val state by viewModel.state.collectAsStateWithLifecycle()

    Scaffold(
        modifier = modifier
    ) {
        Row(
            modifier = Modifier.fillMaxSize()
        ) {
            AuthMenuLeftSection(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxHeight()
                    .background(MaterialTheme.colors.primary)
            )

            AuthMenuRightSection(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxHeight(),
                emailState = state.data.email,
                onChangeEmail = viewModel::updateEmail,
                passwordState = state.data.password,
                onChangePassword = viewModel::updatePassword,
                passwordVisibility = state.data.passwordVisibility,
                onTogglePasswordVisibility = viewModel::togglePasswordVisibility,
                isButtonEnabled = state.data.buttonEnabled,
                onGoogleSignIn = {},
                onFacebookSignIn = {},
                onAppleSignIn = {},
                onSignUpClick = {},
                isFormEnabled = state.mode !is StateMode.Loading
            )
        }
    }
}