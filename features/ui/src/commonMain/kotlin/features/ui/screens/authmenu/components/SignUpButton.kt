package features.ui.screens.authmenu.components

import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.material.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.withStyle
import invoicerweb.features.ui.generated.resources.Res
import invoicerweb.features.ui.generated.resources.auth_menu_new_user
import invoicerweb.features.ui.generated.resources.auth_menu_sign_up_now
import org.jetbrains.compose.resources.stringResource

@Composable
internal fun SignUpButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val spanStyle = MaterialTheme.typography.body2.toSpanStyle()

    TextButton(
        onClick = onClick,
        modifier = modifier
    ) {
        Text(
            buildAnnotatedString {
                withStyle(spanStyle) {
                    append(stringResource(Res.string.auth_menu_new_user))
                }
                withStyle(spanStyle.copy(color = MaterialTheme.colors.primary)) {
                    append(stringResource(Res.string.auth_menu_sign_up_now))
                }
            },
            textAlign = TextAlign.Center
        )
    }
}