package features.ui.screens.authmenu

import features.domain.api.auth.model.AuthTokenModel

internal data class AuthMenuState(
    val email: String = "",
    val password: String = "",
    val passwordVisibility: Boolean = false,
    val qrCodeBase64: String = "",
    val qrCodeState: QrCodeState = QrCodeState.Loading,
    val qrCodeExpirationTimer: String = ""
) {
    val buttonEnabled = email.isNotBlank() && password.isNotBlank()
}

internal sealed interface AuthMenuEvents {
    data class Error(val message: String) : AuthMenuEvents
    data class CodeScanned(val code: AuthTokenModel) : AuthMenuEvents
}

internal enum class QrCodeState {
    Loading,
    Error,
    Available
}
