package features.ui.screens.authmenu

import androidx.compose.runtime.Stable

@Stable
internal data class AuthMenuState(
    val email: String = "",
    val password: String = "",
    val passwordVisibility: Boolean = false,
) {
    val buttonEnabled = email.isNotBlank() && password.isNotBlank()
}
