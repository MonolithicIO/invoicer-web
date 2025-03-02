package features.ui.screens.signup.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.material.Icon
import androidx.compose.material.IconButton
import androidx.compose.material.OutlinedTextField
import androidx.compose.material.Text
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
internal fun SignUpForm(
    email: String,
    confirmEmail: String,
    password: String,
    isPasswordVisible: Boolean,
    onChangeEmail: (String) -> Unit,
    onChangeConfirmEmail: (String) -> Unit,
    onChangePassword: (String) -> Unit,
    onTogglePassword: () -> Unit,
    isFormEnabled: Boolean,
    modifier: Modifier = Modifier,
) {
    Column(
        modifier = modifier,
        verticalArrangement = Arrangement.spacedBy(Spacing.medium),
    ) {
        EmailField(
            value = email,
            onChange = onChangeEmail,
            isEnabled = isFormEnabled
        )

        ConfirmEmailField(
            value = confirmEmail,
            onChange = onChangeConfirmEmail,
            isEnabled = isFormEnabled
        )

        PasswordField(
            value = password,
            onChange = onChangePassword,
            passwordVisibility = isPasswordVisible,
            onTogglePasswordVisibility = onTogglePassword,
            isEnabled = isFormEnabled
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
private fun ConfirmEmailField(
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