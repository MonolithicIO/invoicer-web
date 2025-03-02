package features.ui.screens.authmenu

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import features.domain.api.auth.service.LoginService
import foundation.network.HttpResponse
import foundation.network.launchRequest
import foundation.statemanager.StateManager
import foundation.statemanager.StateOwner
import foundation.uievent.UiEventManager
import foundation.uievent.UiEventOwner
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.launch

internal class AuthMenuViewModel(
    private val dispatcher: CoroutineDispatcher,
    private val loginService: LoginService
) : ViewModel(), StateOwner<AuthMenuState> by StateManager(AuthMenuState()),
    UiEventOwner<AuthMenuEvents> by UiEventManager() {

    fun updateEmail(value: String) {
        updateStateSync {
            update {
                it.copy(email = value.trim())
            }
        }
    }

    fun updatePassword(value: String) {
        updateStateSync {
            update {
                it.copy(password = value.trim())
            }
        }
    }

    fun togglePasswordVisibility() {
        updateStateSync {
            update {
                it.copy(passwordVisibility = !it.passwordVisibility)
            }
        }
    }

    fun emailSignIn() {
        viewModelScope.launch(dispatcher) {
            val result = launchRequest {
                loginService.login(state.value.data.email, state.value.data.password)
            }

            when (result) {
                is HttpResponse.Success -> {
                    println("Login success")
                }

                is HttpResponse.Failure -> handleError(result)
            }
        }
    }

    private suspend fun handleError(
        failure: HttpResponse.Failure
    ) {
        val message = when (failure) {
            is HttpResponse.Failure.HttpError -> failure.message
            is HttpResponse.Failure.UnknownError -> failure.cause.message ?: ""
        }

        sendEvent(AuthMenuEvents.Error(message))
    }
}