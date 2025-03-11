package features.ui.screens.authmenu

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Scaffold
import androidx.compose.material.SnackbarHost
import androidx.compose.material.SnackbarHostState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import features.ui.screens.authmenu.components.AuthMenuLeftSection
import features.ui.screens.authmenu.components.AuthMenuRightSection
import foundation.statemanager.StateMode

@Composable
internal fun AuthMenuScreen(
    modifier: Modifier = Modifier,
    viewModel: AuthMenuViewModel,
    onGoToSignUp: () -> Unit,
) {
    val state by viewModel.state.collectAsStateWithLifecycle()
    val snackbarHost = remember { SnackbarHostState() }

    LaunchedEffect(viewModel) {
        viewModel.events.collect { event ->
            when (event) {
                is AuthMenuEvents.Error -> snackbarHost.showSnackbar(message = event.message)
            }
        }
    }

    Scaffold(
        modifier = modifier,
        snackbarHost = {
            SnackbarHost(
                hostState = snackbarHost,
            )
        }
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
                onSignUpClick = onGoToSignUp,
                isFormEnabled = state.mode !is StateMode.Loading,
                onEmailSignIn = viewModel::emailSignIn,
                onRequestQrCode = { isRetry ->
                    if (isRetry) viewModel.retryLoginCode()
                    else viewModel.requestLoginCode()
                },
                qrCodeState = state.data.qrCodeState,
                qrCode = state.data.qrCodeBase64
            )
        }
    }
}