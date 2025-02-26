package features.ui.screens.authmenu

import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow

internal class AuthMenuViewModel : ViewModel() {
    private val _state = MutableStateFlow(AuthMenuState())
}