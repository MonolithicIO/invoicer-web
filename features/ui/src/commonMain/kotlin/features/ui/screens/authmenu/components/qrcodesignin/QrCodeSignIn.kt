package features.ui.screens.authmenu.components.qrcodesignin

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import features.ui.designsystem.components.NumberedList
import features.ui.designsystem.tokens.Spacing
import invoicerweb.features.ui.generated.resources.Res
import invoicerweb.features.ui.generated.resources.fake_qrcode
import kotlinx.collections.immutable.persistentListOf
import org.jetbrains.compose.resources.painterResource

@Composable
internal fun QrCodeSignIn(
    modifier: Modifier = Modifier,
) {
    Column(
        modifier = modifier,
        verticalArrangement = Arrangement.spacedBy(Spacing.medium),
    ) {
        Text(
            text = "Open the Invoicer app and scan the QR code",
        )

        NumberedList(
            items = persistentListOf(
                "Open the Invoicer app",
                "Tap on the QR code icon",
                "Scan the QR code",
            )
        )

        Image(
            painter = painterResource(Res.drawable.fake_qrcode),
            contentDescription = null,
            alignment = Alignment.Center
        )
    }
}