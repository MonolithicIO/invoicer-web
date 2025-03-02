package features.ui.screens.authmenu.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import features.ui.designsystem.tokens.Spacing
import features.ui.screens.authmenu.components.identitysignin.IdentitySignInForm
import features.ui.screens.authmenu.components.qrcodesignin.QrCodeSignIn
import invoicerweb.features.ui.generated.resources.Res
import invoicerweb.features.ui.generated.resources.auth_menu_welcome
import org.jetbrains.compose.resources.stringResource

@Composable
internal fun AuthMenuRightSection(
    emailState: String,
    onChangeEmail: (String) -> Unit,
    passwordState: String,
    onChangePassword: (String) -> Unit,
    passwordVisibility: Boolean,
    onTogglePasswordVisibility: () -> Unit,
    isFormEnabled: Boolean,
    isButtonEnabled: Boolean,
    onEmailSignIn: () -> Unit,
    onGoogleSignIn: () -> Unit,
    onFacebookSignIn: () -> Unit,
    onAppleSignIn: () -> Unit,
    onSignUpClick: () -> Unit,
    modifier: Modifier = Modifier,
) {
    val tabIndex = remember { mutableStateOf(0) }

    Box(
        modifier = modifier,
        contentAlignment = Alignment.Center
    ) {
        Column(
            modifier = Modifier.fillMaxWidth(0.7f),
            verticalArrangement = Arrangement.spacedBy(Spacing.medium)
        ) {

            Text(
                text = stringResource(Res.string.auth_menu_welcome),
                style = MaterialTheme.typography.h3,
                textAlign = TextAlign.Center,
                modifier = Modifier.fillMaxWidth()
            )

            SignUpButton(
                onClick = onSignUpClick,
                modifier = Modifier.fillMaxWidth()
            )

            AuthMenuTabs(
                selectedTab = tabIndex.value,
                onSelectTab = { tabIndex.value = it },
                modifier = Modifier.fillMaxWidth()
            )

            when (tabIndex.value) {
                0 -> {
                    IdentitySignInForm(
                        modifier = Modifier.fillMaxWidth(),
                        emailState = emailState,
                        onChangeEmail = onChangeEmail,
                        passwordState = passwordState,
                        onChangePassword = onChangePassword,
                        passwordVisibility = passwordVisibility,
                        onTogglePasswordVisibility = onTogglePasswordVisibility,
                        isButtonEnabled = isButtonEnabled,
                        onGoogleSignIn = onGoogleSignIn,
                        onFacebookSignIn = onFacebookSignIn,
                        onAppleSignIn = onAppleSignIn,
                        isFormEnabled = isFormEnabled,
                        onEmailSignIn = onEmailSignIn
                    )
                }

                1 -> {
                    QrCodeSignIn(
                        modifier = Modifier.fillMaxWidth()
                    )
                }
            }
        }
    }
}