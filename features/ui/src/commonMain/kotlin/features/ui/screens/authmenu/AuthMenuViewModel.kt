package features.ui.screens.authmenu

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import features.domain.api.auth.repository.AuthRepository
import features.domain.api.auth.service.LoginService
import foundation.network.HttpResponse
import foundation.network.launchRequest
import foundation.statemanager.StateManager
import foundation.statemanager.StateOwner
import foundation.uievent.UiEventManager
import foundation.uievent.UiEventOwner
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch
import kotlinx.datetime.Clock
import kotlinx.datetime.Instant
import kotlin.time.Duration.Companion.seconds

internal class AuthMenuViewModel(
    private val dispatcher: CoroutineDispatcher,
    private val loginService: LoginService,
    private val authRepository: AuthRepository,
    private val clock: Clock
) : ViewModel(), StateOwner<AuthMenuState> by StateManager(AuthMenuState()),
    UiEventOwner<AuthMenuEvents> by UiEventManager() {

    private var isFirstQrCodeRequest: Boolean = false
    private var timerJob: Job? = null
    private lateinit var codeExpiration: Instant

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

    fun requestLoginCode() {
        if (isFirstQrCodeRequest.not()) {
            requestNewCode()
            isFirstQrCodeRequest = true
        }
    }

    fun retryLoginCode() {
        requestNewCode()
    }

    private fun requestNewCode() {
        viewModelScope.launch(dispatcher) {
            updateState {
                update { it.copy(qrCodeState = QrCodeState.Loading) }
                runCatching {
                    authRepository.requestLoginQrCode()
                }.onFailure { error ->
                    update {
                        println(error)
                        it.copy(qrCodeState = QrCodeState.Error)
                    }
                }.onSuccess { response ->
                    update { oldState ->
                        codeExpiration = response.expiration
                        startTimer()
                        oldState.copy(
                            qrCodeState = QrCodeState.Available,
                            qrCodeBase64 = response.base64Content,
                        )
                    }
                }
            }
        }
    }

    private fun startTimer() {
        timerJob = viewModelScope.launch(dispatcher) {
            while (true) {
                val newDuration = codeExpiration - clock.now()
                if (newDuration > 0.seconds) {
                    updateState {
                        update {
                            it.copy(qrCodeExpirationTimer = newDuration.inWholeSeconds.toString())
                        }
                    }
                    kotlinx.coroutines.delay(1000)
                } else {
                    break
                }
            }
        }
        timerJob?.invokeOnCompletion { requestNewCode() }
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