package features.ui.screens.authmenu.components.identitysignin

import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.unit.dp
import invoicerweb.features.ui.generated.resources.Res
import invoicerweb.features.ui.generated.resources.apple
import invoicerweb.features.ui.generated.resources.facebook
import invoicerweb.features.ui.generated.resources.google
import org.jetbrains.compose.resources.painterResource

private const val ImageSize = 32
private val FacebookBlue = Color(0xff0866ff)

@Composable
internal fun SocialSignIn(
    modifier: Modifier = Modifier,
    onGoogleSignIn: () -> Unit,
    onFacebookSignIn: () -> Unit,
    onAppleSignIn: () -> Unit,
) {
    Row(
        modifier = modifier,
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        SocialButton(
            modifier = Modifier.weight(1f),
            onClick = onGoogleSignIn,
            painter = painterResource(Res.drawable.google),
            contentDescription = "Google",
            tint = Color.Unspecified
        )
        SocialButton(
            onClick = onFacebookSignIn,
            painter = painterResource(Res.drawable.facebook),
            contentDescription = "Facebook",
            tint = FacebookBlue,
            modifier = Modifier.weight(1f),
        )
        SocialButton(
            onClick = onAppleSignIn,
            painter = painterResource(Res.drawable.apple),
            contentDescription = "Apple",
            tint = Color.Black,
            modifier = Modifier.weight(1f),
        )
    }
}

@Composable
private fun SocialButton(
    onClick: () -> Unit,
    painter: Painter,
    tint: Color = LocalContentColor.current.copy(alpha = LocalContentAlpha.current),
    contentDescription: String,
    modifier: Modifier = Modifier
) {
    IconButton(
        onClick = onClick,
        modifier = modifier
            .clip(RoundedCornerShape(48.dp))
            .border(width = 1.dp, color = MaterialTheme.colors.onSurface, shape = RoundedCornerShape(48.dp))
    ) {
        Icon(
            modifier = Modifier.size(ImageSize.dp),
            painter = painter,
            contentDescription = contentDescription,
            tint = tint
        )
    }
}