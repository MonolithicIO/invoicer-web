package features.ui.screens.authmenu.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
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
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import invoicerweb.features.ui.generated.resources.Res
import invoicerweb.features.ui.generated.resources.auth_menu_login_button
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
    isButtonEnabled: Boolean,
    modifier: Modifier = Modifier,
) {
    Box(
        modifier = modifier,
        contentAlignment = Alignment.Center
    ) {
        Column(
            modifier = Modifier.fillMaxWidth(0.7f),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {

            Text(
                text = stringResource(Res.string.auth_menu_welcome),
                style = MaterialTheme.typography.h3,
                textAlign = TextAlign.Center
            )

            SignUpButton(
                onClick = { /*TODO*/ },
                modifier = Modifier.fillMaxWidth()
            )

            EmailField(
                modifier = Modifier.fillMaxWidth(),
                value = emailState,
                onChange = onChangeEmail
            )

            PasswordField(
                value = passwordState,
                onChange = onChangePassword,
                passwordVisibility = passwordVisibility,
                onTogglePasswordVisibility = onTogglePasswordVisibility,
                modifier = Modifier.fillMaxWidth(),
            )

            Button(
                onClick = { /*TODO*/ },
                enabled = isButtonEnabled,
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(text = stringResource(Res.string.auth_menu_login_button))
            }
        }
    }
}

@Composable
private fun EmailField(
    value: String,
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
        }
    )
}

@Composable
private fun PasswordField(
    value: String,
    passwordVisibility: Boolean,
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
        visualTransformation = transformation
    )
}