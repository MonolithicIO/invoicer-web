package features.ui.screens.authmenu

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import foundation.statemanager.StateManager
import foundation.statemanager.StateOwner
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.launch

internal class AuthMenuViewModel(
    private val dispatcher: CoroutineDispatcher
) : ViewModel(), StateOwner<AuthMenuState> by StateManager(AuthMenuState()) {

    fun updateEmail(email: String) {
        viewModelScope.launch(dispatcher) {
            updateState {
                update {
                    it.copy(email = email)
                }
            }
        }
    }
}