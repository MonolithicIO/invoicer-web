package features.ui.screens.authmenu.components.qrcodesignin

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.material.Button
import androidx.compose.material.CircularProgressIndicator
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.toComposeImageBitmap
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import features.ui.designsystem.components.NumberedList
import features.ui.designsystem.tokens.Spacing
import features.ui.screens.authmenu.QrCodeState
import kotlinx.collections.immutable.persistentListOf
import org.jetbrains.skia.Image
import kotlin.io.encoding.Base64
import kotlin.io.encoding.ExperimentalEncodingApi

@OptIn(ExperimentalEncodingApi::class)
@Composable
internal fun QrCodeSignIn(
    modifier: Modifier = Modifier,
    codeState: QrCodeState,
    qrCodeString: String,
    qrCodeExpiration: String,
    onRequestQrCode: (isRetry: Boolean) -> Unit,
) {
    LaunchedEffect(Unit) { onRequestQrCode(false) }

    Column(
        modifier = modifier,
        verticalArrangement = Arrangement.spacedBy(Spacing.medium),
    ) {
        Text(
            text = "Open the Invoicer app and scan the QR code",
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Center
        )

        NumberedList(
            modifier = Modifier.align(Alignment.CenterHorizontally),
            items = persistentListOf(
                "Open the Invoicer app",
                "Tap on the QR code icon",
                "Scan the QR code",
            )
        )

        when (codeState) {
            QrCodeState.Loading -> {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(256.dp),
                    verticalArrangement = Arrangement.Center,
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text("Generating QrCode")
                    Spacer(Modifier.height(16.dp))
                    CircularProgressIndicator()
                }
            }

            QrCodeState.Error ->
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(256.dp),
                    verticalArrangement = Arrangement.Center,
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text("Something went wrong, try again later")
                    Spacer(Modifier.height(16.dp))
                    Button(onClick = { onRequestQrCode(true) }) { Text("R") }
                }

            QrCodeState.Available -> Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(256.dp),
                verticalArrangement = Arrangement.Center,
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                val qrCode = remember(qrCodeString) {
                    val base64 = Base64.decode(qrCodeString)
                    runCatching {
                        Image.makeFromEncoded(base64).toComposeImageBitmap()
                    }.fold(
                        onSuccess = { it },
                        onFailure = { null }
                    )
                }

                qrCode?.let {
                    Image(
                        bitmap = qrCode,
                        contentDescription = null
                    )
                    Spacer(Modifier.height(16.dp))
                    Text(
                        text = "Expires in ${qrCodeExpiration}"
                    )
                }
            }
        }

    }
}