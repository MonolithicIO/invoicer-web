package features.ui.screens.authmenu.components.identitysignin

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import features.ui.designsystem.tokens.Spacing
import invoicerweb.features.ui.generated.resources.*
import org.jetbrains.compose.resources.stringResource

@Composable
internal fun IdentitySignInForm(
    modifier: Modifier = Modifier,
    emailState: String,
    onChangeEmail: (String) -> Unit,
    passwordState: String,
    onChangePassword: (String) -> Unit,
    passwordVisibility: Boolean,
    onTogglePasswordVisibility: () -> Unit,
    isButtonEnabled: Boolean,
    isFormEnabled: Boolean,
    onEmailSignIn: () -> Unit,
    onGoogleSignIn: () -> Unit,
    onFacebookSignIn: () -> Unit,
    onAppleSignIn: () -> Unit,
) {
    Column(
        modifier = modifier,
        verticalArrangement = Arrangement.spacedBy(Spacing.medium),
    ) {
        EmailField(
            modifier = modifier,
            value = emailState,
            onChange = onChangeEmail,
            isEnabled = isFormEnabled
        )

        PasswordField(
            value = passwordState,
            onChange = onChangePassword,
            passwordVisibility = passwordVisibility,
            onTogglePasswordVisibility = onTogglePasswordVisibility,
            modifier = Modifier.fillMaxWidth(),
            isEnabled = isFormEnabled
        )

        Button(
            onClick = onEmailSignIn,
            enabled = isButtonEnabled,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(text = stringResource(Res.string.auth_menu_login_button))
        }

        SocialSignIn(
            modifier = Modifier.fillMaxWidth(),
            onGoogleSignIn = onGoogleSignIn,
            onFacebookSignIn = onFacebookSignIn,
            onAppleSignIn = onAppleSignIn,
        )
    }
}

@Composable
private fun EmailField(
    value: String,
    isEnabled: Boolean,
    modifier: Modifier = Modifier,
    onChange: (String) -> Unit,
) {
    OutlinedTextField(
        modifier = modifier,
        value = value,
        onValueChange = onChange,
        maxLines = 1,
        leadingIcon = {
            Icon(
                imageVector = Icons.Default.Email,
                contentDescription = null
            )
        },
        placeholder = {
            Text(text = stringResource(Res.string.auth_sign_in_email_placeholder))
        },
        label = {
            Text(text = stringResource(Res.string.auth_sign_in_email_label))
        },
        enabled = isEnabled
    )
}

@Composable
private fun PasswordField(
    value: String,
    passwordVisibility: Boolean,
    isEnabled: Boolean,
    modifier: Modifier = Modifier,
    onTogglePasswordVisibility: () -> Unit,
    onChange: (String) -> Unit,
) {
    val icon = remember(onTogglePasswordVisibility) {
        if (passwordVisibility) Icons.Default.VisibilityOff
        else Icons.Default.Visibility
    }

    val transformation = remember(passwordVisibility) {
        if (passwordVisibility) VisualTransformation.None
        else PasswordVisualTransformation()
    }

    OutlinedTextField(
        modifier = modifier,
        value = value,
        onValueChange = onChange,
        maxLines = 1,
        leadingIcon = {
            Icon(
                imageVector = Icons.Default.Lock,
                contentDescription = null
            )
        },
        trailingIcon = {
            IconButton(
                onClick = onTogglePasswordVisibility
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = null
                )
            }
        },
        visualTransformation = transformation,
        placeholder = {
            Text(text = stringResource(Res.string.auth_sign_in_password_placeholder))
        },
        label = {
            Text(text = stringResource(Res.string.auth_sign_in_password_label))
        },
        enabled = isEnabled
    )
}