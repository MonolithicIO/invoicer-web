package foundation.statemanager

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.update

sealed interface StateMode {
    data object Content : StateMode
    data object Loading : StateMode
    data class Error(val cause: Throwable) : StateMode
}

data class UiState<T>(
    val data: T,
    val mode: StateMode
)

/**
 * Interface describing a state handling class that can be used for managing state in a ViewModel or Presenter.
 * */
interface StateOwner<T> {
    val state: StateFlow<UiState<T>>

    /**
     * Launches a suspend context with default error handling and loading state management. Unhandled exceptions
     * will automatically set the state to [StateMode.Error]. Use the [showLoading] and [resumeOnContentMode] to customize
     * the behavior of the state manager.
     *
     * @param showLoading Whether the state mode should be set to loading before executing the block. Default is true.
     * Useful for cases where a loading state is expected during the execution of [block].
     *
     * @param resumeOnContentMode Whether the state mode should be set to [StateMode.Content] after
     * [block] is successfully executed. Defaults to true.
     * */
    suspend fun updateState(
        showLoading: Boolean = false,
        resumeOnContentMode: Boolean = true,
        block: suspend StateManager<T>.StateUpdater<T>.() -> Unit,
    )

    /**
     * Launches a context with default error handling and loading state management. Unhandled exceptions
     * will automatically set the state to [StateMode.Error]. Use [resumeOnContentMode] to customize
     * the behavior of the state manager.
     *
     * @param resumeOnContentMode Whether the state mode should be set to [StateMode.Content] after
     * [block] is successfully executed. Defaults to true.
     * */
    fun updateStateSync(
        resumeOnContentMode: Boolean = true,
        block: StateManager<T>.StateUpdater<T>.() -> Unit,
    )

    /**
     * Launches a suspend context with default error handling and loading state management. Unhandled exceptions
     * will set the state to [StateMode.Error]. Use this method when you don't need to update the state.
     */
    suspend fun launchAsync(
        block: suspend () -> Unit
    )
}

class StateManager<T>(
    initialState: T,
    initialMode: StateMode = StateMode.Content
) : StateOwner<T> {
    private val _state = MutableStateFlow(UiState(initialState, initialMode))
    private val stateUpdater = StateUpdater(_state)

    override val state: StateFlow<UiState<T>> = _state

    override suspend fun launchAsync(block: suspend () -> Unit) {
        runCatching {
            block()
        }.onFailure {
            _state.update { oldState -> oldState.copy(mode = StateMode.Error(it)) }
        }
    }

    override fun updateStateSync(
        resumeOnContentMode: Boolean,
        block: StateUpdater<T>.() -> Unit
    ) {
        val resumeMode = runCatching {
            block(stateUpdater)
        }.fold(
            onSuccess = {
                if (resumeOnContentMode) StateMode.Content
                else null
            },
            onFailure = {
                StateMode.Error(it)
            }
        )
        resumeMode?.let { mode ->
            _state.update { oldState -> oldState.copy(mode = mode) }
        }
    }

    override suspend fun updateState(
        showLoading: Boolean,
        resumeOnContentMode: Boolean,
        block: suspend StateUpdater<T>.() -> Unit,
    ) {
        val resumeMode = runCatching {
            if (showLoading) {
                _state.update { oldState ->
                    oldState.copy(
                        mode = StateMode.Loading
                    )
                }
            }
            block(stateUpdater)
        }.fold(
            onSuccess = {
                if (resumeOnContentMode) StateMode.Content
                else null
            },
            onFailure = {
                StateMode.Error(it)
            }
        )
        resumeMode?.let { mode ->
            _state.update { oldState -> oldState.copy(mode = mode) }
        }
    }

    /**
     * Wrapper class around StateFlow to disallow consumer classes to update the state directly.
     * @param [state] An instance of MutableStateFlow to be mutated.
     */
    inner class StateUpdater<T>(
        private val state: MutableStateFlow<UiState<T>>
    ) {
        /**
         * Launches an execution context with the current value of [state] and allows the consumer to update the state.
         * */
        fun update(block: (T) -> T) {
            state.update { oldState ->
                oldState.copy(
                    data = block(state.value.data),
                    mode = oldState.mode
                )
            }
        }
    }
}