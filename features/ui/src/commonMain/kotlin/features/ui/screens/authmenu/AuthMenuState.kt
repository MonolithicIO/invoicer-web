package features.ui.screens.authmenu

internal data class AuthMenuState(
    val email: String = "",
    val password: String = "",
    val passwordVisibility: Boolean = false,
) {
    val buttonEnabled = email.isNotBlank() && password.isNotBlank()
}

internal sealed interface AuthMenuEvents {
    data class Error(val message: String) : AuthMenuEvents
}
